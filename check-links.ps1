param(
    [string]$DataFile = (Join-Path $PSScriptRoot "data.js"),
    [string]$OutputFile = (Join-Path $PSScriptRoot "link-report.json"),
    [int]$TimeoutSeconds = 12,
    [int]$ThrottleLimit = 12
)

$ErrorActionPreference = "Stop"
if (-not (Test-Path -LiteralPath $DataFile)) {
    throw "Data file not found: $DataFile"
}

$content = Get-Content -LiteralPath $DataFile -Raw -Encoding UTF8
$match = [regex]::Match($content, 'const DEFAULT_DATA = (\{[\s\S]*?\n\});\r?\n  const LEGACY_DEFAULT_URLS')
if (-not $match.Success) {
    throw "DEFAULT_DATA was not found in $DataFile"
}
$data = $match.Groups[1].Value | ConvertFrom-Json
$sites = @($data.sites)

$worker = {
    param($Site, $TimeoutSeconds)

    Add-Type -AssemblyName System.Net.Http
    $handler = New-Object System.Net.Http.HttpClientHandler
    $handler.AllowAutoRedirect = $true
    $client = New-Object System.Net.Http.HttpClient($handler)
    $client.Timeout = [TimeSpan]::FromSeconds($TimeoutSeconds)
    $client.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 NavLinkChecker/1.0")

    $method = "HEAD"
    $response = $null
    $errorText = ""
    try {
        $request = New-Object System.Net.Http.HttpRequestMessage([System.Net.Http.HttpMethod]::Head, $Site.url)
        $response = $client.SendAsync($request).GetAwaiter().GetResult()
        $headStatus = [int]$response.StatusCode
        if ($headStatus -ge 400 -and $headStatus -notin @(401, 403, 429)) {
            $response.Dispose()
            $method = "GET"
            $response = $client.GetAsync($Site.url, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
        }
    } catch {
        $errorText = $_.Exception.GetBaseException().Message
        try {
            $method = "GET"
            $response = $client.GetAsync($Site.url, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
            $errorText = ""
        } catch {
            $errorText = $_.Exception.GetBaseException().Message
        }
    }

    $httpStatus = $null
    $finalUrl = $Site.url
    $status = "review"
    if ($response) {
        $httpStatus = [int]$response.StatusCode
        $finalUrl = $response.RequestMessage.RequestUri.AbsoluteUri
        $redirected = $finalUrl.TrimEnd('/').ToLowerInvariant() -ne $Site.url.TrimEnd('/').ToLowerInvariant()
        if ($httpStatus -ge 200 -and $httpStatus -lt 300) {
            $status = if ($redirected) { "redirect" } else { "active" }
        } elseif ($httpStatus -eq 404 -or $httpStatus -eq 410) {
            $status = "dead"
        } else {
            $status = "review"
        }
    } elseif ($errorText -match 'No such host|Name or service not known|nodename nor servname|远程名称无法解析|不知道这样的主机') {
        $status = "dead"
    }

    [pscustomobject]@{
        id = $Site.id
        name = $Site.name
        url = $Site.url
        status = $status
        httpStatus = $httpStatus
        finalUrl = $finalUrl
        checkedAt = (Get-Date).ToUniversalTime().ToString("o")
        method = $method
        error = $errorText
    }

    if ($response) { $response.Dispose() }
    $client.Dispose()
    $handler.Dispose()
}

$pool = [RunspaceFactory]::CreateRunspacePool(1, $ThrottleLimit)
$pool.Open()
$jobs = foreach ($site in $sites) {
    $powershell = [PowerShell]::Create()
    $powershell.RunspacePool = $pool
    [void]$powershell.AddScript($worker).AddArgument($site).AddArgument($TimeoutSeconds)
    [pscustomobject]@{ PowerShell = $powershell; Handle = $powershell.BeginInvoke() }
}

$results = foreach ($job in $jobs) {
    try {
        $job.PowerShell.EndInvoke($job.Handle)
    } finally {
        $job.PowerShell.Dispose()
    }
}
$pool.Close()
$pool.Dispose()

$results | Sort-Object name | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $OutputFile -Encoding UTF8
$summary = $results | Group-Object status | Sort-Object Name | ForEach-Object { "$($_.Name)=$($_.Count)" }
Write-Host ("Checked {0} sites: {1}" -f $results.Count, ($summary -join ", "))
Write-Host "Report: $OutputFile"
