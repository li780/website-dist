/* Shared navigation data and v4 -> v5 migration. */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'nav_data_v5';
  const LEGACY_KEY = 'nav_data_v4';
  const LEGACY_FAVORITES_KEY = 'nav_favorites_v4';
  const DEFAULT_DATA = {
  "version": 5,
  "categories": [
    {
      "id": "ai",
      "name": "AI工具",
      "icon": "🤖",
      "order": 0
    },
    {
      "id": "dev",
      "name": "开发工具",
      "icon": "💻",
      "order": 1
    },
    {
      "id": "design",
      "name": "设计资源",
      "icon": "🎨",
      "order": 2
    },
    {
      "id": "media",
      "name": "影音娱乐",
      "icon": "🎬",
      "order": 3
    },
    {
      "id": "study",
      "name": "学习教育",
      "icon": "📚",
      "order": 4
    },
    {
      "id": "tool",
      "name": "在线工具",
      "icon": "🔧",
      "order": 5
    },
    {
      "id": "news",
      "name": "资讯阅读",
      "icon": "📰",
      "order": 6
    },
    {
      "id": "social",
      "name": "社交平台",
      "icon": "💬",
      "order": 7
    },
    {
      "id": "cloud",
      "name": "云服务",
      "icon": "☁️",
      "order": 8
    },
    {
      "id": "game",
      "name": "游戏天地",
      "icon": "🎮",
      "order": 9
    },
    {
      "id": "life",
      "name": "生活服务",
      "icon": "🏠",
      "order": 10
    },
    {
      "id": "search",
      "name": "搜索引擎",
      "icon": "🔍",
      "order": 11
    },
    {
      "id": "image",
      "name": "图片素材",
      "icon": "🖼️",
      "order": 12
    },
    {
      "id": "video",
      "name": "视频平台",
      "icon": "📹",
      "order": 13
    },
    {
      "id": "font",
      "name": "字体资源",
      "icon": "🔤",
      "order": 14
    },
    {
      "id": "color",
      "name": "配色方案",
      "icon": "🎯",
      "order": 15
    },
    {
      "id": "network",
      "name": "网络服务",
      "icon": "🌐",
      "order": 16
    },
    {
      "id": "ip",
      "name": "IP 工具",
      "icon": "📡",
      "order": 17
    },
    {
      "id": "ebook",
      "name": "电子书",
      "icon": "📚",
      "order": 18
    },
    {
      "id": "business",
      "name": "业务管理",
      "icon": "💼",
      "order": 19
    },
    {
      "id": "research",
      "name": "学术研究",
      "icon": "🎓",
      "order": 20
    }
  ],
  "sites": [
    {
      "id": "s1",
      "name": "ChatGPT",
      "url": "https://chat.openai.com",
      "desc": "OpenAI 智能对话助手",
      "icon": "🤖",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://chat.openai.com/",
      "lastChecked": "2026-06-17T14:30:19.4066015Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s2",
      "name": "Claude",
      "url": "https://claude.ai",
      "desc": "Anthropic AI 智能助手",
      "icon": "🧠",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://claude.ai/",
      "lastChecked": "2026-06-17T14:30:18.6308863Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s3",
      "name": "文心一言",
      "url": "https://yiyan.baidu.com",
      "desc": "百度大语言模型",
      "icon": "💬",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://yiyan.baidu.com/",
      "lastChecked": "2026-06-17T14:30:16.8666742Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s4",
      "name": "通义千问",
      "url": "https://tongyi.aliyun.com",
      "desc": "阿里巴巴 AI 助手",
      "icon": "🌟",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://tongyi.aliyun.com/",
      "lastChecked": "2026-06-17T14:30:16.9469077Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s5",
      "name": "Midjourney",
      "url": "https://www.midjourney.com",
      "desc": "AI 绘画生成工具",
      "icon": "🎨",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://www.midjourney.com",
      "lastChecked": "2026-06-17T14:30:18.9941992Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s6",
      "name": "Stable Diffusion",
      "url": "https://stability.ai",
      "desc": "开源 AI 图像生成",
      "icon": "🖼️",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://stability.ai/",
      "lastChecked": "2026-06-17T14:30:18.6940593Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s7",
      "name": "Perplexity",
      "url": "https://www.perplexity.ai",
      "desc": "AI 搜索引擎",
      "icon": "🔍",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://www.perplexity.ai/",
      "lastChecked": "2026-06-17T14:30:20.8334179Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s8",
      "name": "Poe",
      "url": "https://poe.com",
      "desc": "多模型 AI 聚合平台",
      "icon": "⚡",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://poe.com/",
      "lastChecked": "2026-06-17T14:30:18.6782362Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s9",
      "name": "Kimi",
      "url": "https://kimi.moonshot.cn",
      "desc": "月之暗面长文本 AI 助手",
      "icon": "🌙",
      "category": "ai",
      "status": "redirect",
      "finalUrl": "https://www.kimi.com/",
      "lastChecked": "2026-06-17T14:30:17.0399009Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s10",
      "name": "豆包",
      "url": "https://www.doubao.com",
      "desc": "字节跳动 AI 助手",
      "icon": "🫘",
      "category": "ai",
      "status": "redirect",
      "finalUrl": "https://www.doubao.com/chat/",
      "lastChecked": "2026-06-17T14:30:17.5718751Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s11",
      "name": "Gemini",
      "url": "https://gemini.google.com",
      "desc": "Google AI 助手",
      "icon": "💎",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://gemini.google.com/",
      "lastChecked": "2026-06-17T14:30:19.5238636Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "s12",
      "name": "Cursor",
      "url": "https://cursor.sh",
      "desc": "AI 编程 IDE",
      "icon": "🖱️",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://cursor.sh/",
      "lastChecked": "2026-06-17T14:30:19.5657184Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d1",
      "name": "GitHub",
      "url": "https://github.com",
      "desc": "全球最大代码托管平台",
      "icon": "🐙",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://github.com/",
      "lastChecked": "2026-06-17T14:30:18.9447736Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d2",
      "name": "Gitee",
      "url": "https://gitee.com",
      "desc": "国内代码托管平台",
      "icon": "📦",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://gitee.com/",
      "lastChecked": "2026-06-17T14:30:17.1453625Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d3",
      "name": "VS Code",
      "url": "https://code.visualstudio.com",
      "desc": "强大的代码编辑器",
      "icon": "📝",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://code.visualstudio.com/",
      "lastChecked": "2026-06-17T14:30:20.2678128Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d4",
      "name": "Stack Overflow",
      "url": "https://stackoverflow.com",
      "desc": "程序员问答社区",
      "icon": "📋",
      "category": "dev",
      "status": "redirect",
      "finalUrl": "https://stackoverflow.com/questions",
      "lastChecked": "2026-06-17T14:30:19.6773820Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d5",
      "name": "MDN Web Docs",
      "url": "https://developer.mozilla.org",
      "desc": "Web 开发文档",
      "icon": "📖",
      "category": "dev",
      "status": "redirect",
      "finalUrl": "https://developer.mozilla.org/en-US/",
      "lastChecked": "2026-06-17T14:30:20.4754815Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d6",
      "name": "CodePen",
      "url": "https://codepen.io",
      "desc": "在线代码编辑和展示",
      "icon": "✏️",
      "category": "dev",
      "status": "review",
      "finalUrl": "https://codepen.io/",
      "lastChecked": "2026-06-17T14:30:21.2774388Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d7",
      "name": "Can I Use",
      "url": "https://caniuse.com",
      "desc": "浏览器兼容性查询",
      "icon": "🔎",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://caniuse.com/",
      "lastChecked": "2026-06-17T14:30:20.5340479Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d8",
      "name": "npm",
      "url": "https://www.npmjs.com",
      "desc": "Node.js 包管理器",
      "icon": "📦",
      "category": "dev",
      "status": "review",
      "finalUrl": "https://www.npmjs.com/",
      "lastChecked": "2026-06-17T14:30:22.5653519Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d9",
      "name": "LeetCode",
      "url": "https://leetcode.cn",
      "desc": "算法练习刷题平台",
      "icon": "🧩",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://leetcode.cn/",
      "lastChecked": "2026-06-17T14:30:19.8953944Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "d10",
      "name": "Vercel",
      "url": "https://vercel.com",
      "desc": "前端部署与托管",
      "icon": "▲",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://vercel.com/",
      "lastChecked": "2026-06-17T14:30:22.4361867Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de1",
      "name": "Dribbble",
      "url": "https://dribbble.com",
      "desc": "设计师交流平台",
      "icon": "🏀",
      "category": "design",
      "status": "active",
      "finalUrl": "https://dribbble.com/",
      "lastChecked": "2026-06-17T14:30:23.1353804Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de2",
      "name": "Behance",
      "url": "https://www.behance.net",
      "desc": "Adobe 设计作品展示",
      "icon": "🅱️",
      "category": "design",
      "status": "active",
      "finalUrl": "https://www.behance.net/",
      "lastChecked": "2026-06-17T14:30:23.1290502Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de3",
      "name": "站酷",
      "url": "https://www.zcool.com.cn",
      "desc": "设计师互动学习平台",
      "icon": "🎭",
      "category": "design",
      "status": "active",
      "finalUrl": "https://www.zcool.com.cn/",
      "lastChecked": "2026-06-17T14:30:20.2038737Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de4",
      "name": "Figma",
      "url": "https://www.figma.com",
      "desc": "在线协作设计工具",
      "icon": "🖌️",
      "category": "design",
      "status": "active",
      "finalUrl": "https://www.figma.com/",
      "lastChecked": "2026-06-17T14:30:22.3851028Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de5",
      "name": "花瓣网",
      "url": "https://huaban.com",
      "desc": "设计灵感与素材",
      "icon": "🌸",
      "category": "design",
      "status": "active",
      "finalUrl": "https://huaban.com/",
      "lastChecked": "2026-06-17T14:30:20.2042448Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de6",
      "name": "Canva",
      "url": "https://www.canva.cn",
      "desc": "在线设计平台",
      "icon": "🎨",
      "category": "design",
      "status": "review",
      "finalUrl": "https://www.canva.cn/",
      "lastChecked": "2026-06-17T14:30:20.3490063Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de7",
      "name": "即时设计",
      "url": "https://js.design",
      "desc": "国产在线 UI 设计工具",
      "icon": "✨",
      "category": "design",
      "status": "active",
      "finalUrl": "https://js.design/",
      "lastChecked": "2026-06-17T14:30:20.3150090Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "de8",
      "name": "UI8",
      "url": "https://ui8.net",
      "desc": "UI 设计素材市场",
      "icon": "🎁",
      "category": "design",
      "status": "review",
      "finalUrl": "https://ui8.net/",
      "lastChecked": "2026-06-17T14:30:23.5418445Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "m1",
      "name": "哔哩哔哩",
      "url": "https://www.bilibili.com",
      "desc": "视频弹幕网站",
      "icon": "📺",
      "category": "media",
      "status": "active",
      "finalUrl": "https://www.bilibili.com/",
      "lastChecked": "2026-06-17T14:30:20.5702903Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "m2",
      "name": "网易云音乐",
      "url": "https://music.163.com",
      "desc": "在线音乐平台",
      "icon": "🎵",
      "category": "media",
      "status": "active",
      "finalUrl": "https://music.163.com/",
      "lastChecked": "2026-06-17T14:30:20.4168180Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "m3",
      "name": "YouTube",
      "url": "https://www.youtube.com",
      "desc": "全球最大视频平台",
      "icon": "▶️",
      "category": "media",
      "status": "active",
      "finalUrl": "https://www.youtube.com/",
      "lastChecked": "2026-06-17T14:30:23.6478257Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "m4",
      "name": "Spotify",
      "url": "https://www.spotify.com",
      "desc": "全球音乐流媒体",
      "icon": "🎧",
      "category": "media",
      "status": "redirect",
      "finalUrl": "https://open.spotify.com/",
      "lastChecked": "2026-06-17T14:30:26.2103702Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "m5",
      "name": "爱奇艺",
      "url": "https://www.iqiyi.com",
      "desc": "在线视频平台",
      "icon": "🎬",
      "category": "media",
      "status": "active",
      "finalUrl": "https://www.iqiyi.com/",
      "lastChecked": "2026-06-17T14:30:20.6447917Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "m6",
      "name": "抖音",
      "url": "https://www.douyin.com",
      "desc": "短视频平台",
      "icon": "🎶",
      "category": "media",
      "status": "active",
      "finalUrl": "https://www.douyin.com/",
      "lastChecked": "2026-06-17T14:30:21.2310071Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "st1",
      "name": "中国知网",
      "url": "https://www.cnki.net",
      "desc": "学术文献检索",
      "icon": "📚",
      "category": "study",
      "status": "active",
      "finalUrl": "https://www.cnki.net/",
      "lastChecked": "2026-06-17T14:30:20.7662443Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "st2",
      "name": "知乎",
      "url": "https://www.zhihu.com",
      "desc": "高质量问答社区",
      "icon": "💡",
      "category": "study",
      "status": "redirect",
      "finalUrl": "https://www.zhihu.com/signin?next=%2F",
      "lastChecked": "2026-06-17T14:30:21.0030845Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "st3",
      "name": "Coursera",
      "url": "https://www.coursera.org",
      "desc": "在线学习平台",
      "icon": "🎓",
      "category": "study",
      "status": "active",
      "finalUrl": "https://www.coursera.org/",
      "lastChecked": "2026-06-17T14:30:26.2168812Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "st4",
      "name": "慕课网",
      "url": "https://www.imooc.com",
      "desc": "IT 技能学习平台",
      "icon": "💻",
      "category": "study",
      "status": "active",
      "finalUrl": "https://www.imooc.com/",
      "lastChecked": "2026-06-17T14:30:21.8686675Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "st6",
      "name": "Wikipedia",
      "url": "https://zh.wikipedia.org",
      "desc": "自由的百科全书",
      "icon": "📖",
      "category": "study",
      "status": "redirect",
      "finalUrl": "https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5",
      "lastChecked": "2026-06-17T14:30:25.2791586Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t1",
      "name": "TinyPNG",
      "url": "https://tinypng.com",
      "desc": "图片压缩工具",
      "icon": "🐼",
      "category": "tool",
      "status": "active",
      "finalUrl": "https://tinypng.com/",
      "lastChecked": "2026-06-17T14:30:23.2294065Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t2",
      "name": "Remove.bg",
      "url": "https://www.remove.bg",
      "desc": "AI 自动抠图",
      "icon": "✂️",
      "category": "tool",
      "status": "active",
      "finalUrl": "https://www.remove.bg/",
      "lastChecked": "2026-06-17T14:30:25.7993710Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t3",
      "name": "草料二维码",
      "url": "https://cli.im",
      "desc": "二维码生成器",
      "icon": "📱",
      "category": "tool",
      "status": "active",
      "finalUrl": "https://cli.im/",
      "lastChecked": "2026-06-17T14:30:22.5610225Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t4",
      "name": "DeepL",
      "url": "https://www.deepl.com",
      "desc": "高质量翻译工具",
      "icon": "🌐",
      "category": "tool",
      "status": "redirect",
      "finalUrl": "https://www.deepl.com/en",
      "lastChecked": "2026-06-17T14:30:25.7161205Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t5",
      "name": "ProcessOn",
      "url": "https://www.processon.com",
      "desc": "在线画流程图",
      "icon": "📊",
      "category": "tool",
      "status": "active",
      "finalUrl": "https://www.processon.com/",
      "lastChecked": "2026-06-17T14:30:22.7308777Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t6",
      "name": "Carbon",
      "url": "https://carbon.now.sh",
      "desc": "代码片段美化",
      "icon": "💎",
      "category": "tool",
      "status": "active",
      "finalUrl": "https://carbon.now.sh/",
      "lastChecked": "2026-06-17T14:30:26.5902648Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "t7",
      "name": "JSON Editor",
      "url": "https://jsoneditoronline.org",
      "desc": "JSON 在线编辑器",
      "icon": "📝",
      "category": "tool",
      "status": "active",
      "finalUrl": "https://jsoneditoronline.org/",
      "lastChecked": "2026-06-17T14:30:24.6097283Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "n1",
      "name": "今日头条",
      "url": "https://www.toutiao.com",
      "desc": "个性化资讯推荐",
      "icon": "📰",
      "category": "news",
      "status": "active",
      "finalUrl": "https://www.toutiao.com/",
      "lastChecked": "2026-06-17T14:30:23.3129487Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "n2",
      "name": "少数派",
      "url": "https://sspai.com",
      "desc": "高效数字生活",
      "icon": "📱",
      "category": "news",
      "status": "active",
      "finalUrl": "https://sspai.com/",
      "lastChecked": "2026-06-17T14:30:23.9129772Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "n3",
      "name": "36氪",
      "url": "https://36kr.com",
      "desc": "科技商业媒体",
      "icon": "🚀",
      "category": "news",
      "status": "active",
      "finalUrl": "https://36kr.com/",
      "lastChecked": "2026-06-17T14:30:23.3396857Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "n4",
      "name": "V2EX",
      "url": "https://www.v2ex.com",
      "desc": "技术创意社区",
      "icon": "💬",
      "category": "news",
      "status": "active",
      "finalUrl": "https://www.v2ex.com/",
      "lastChecked": "2026-06-17T14:30:25.1791608Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "n5",
      "name": "Hacker News",
      "url": "https://news.ycombinator.com",
      "desc": "黑客新闻",
      "icon": "🔶",
      "category": "news",
      "status": "active",
      "finalUrl": "https://news.ycombinator.com/",
      "lastChecked": "2026-06-17T14:30:26.8845255Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "so1",
      "name": "微信",
      "url": "https://weixin.qq.com",
      "desc": "即时通讯工具",
      "icon": "💚",
      "category": "social",
      "status": "active",
      "finalUrl": "https://weixin.qq.com/",
      "lastChecked": "2026-06-17T14:30:23.8143349Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "so2",
      "name": "微博",
      "url": "https://weibo.com",
      "desc": "社交媒体平台",
      "icon": "🔴",
      "category": "social",
      "status": "redirect",
      "finalUrl": "https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2F&domain=weibo.com&ua=Mozilla%2F5.0%20NavLinkChecker%2F1.0&_rand=1781706623667&sudaref=",
      "lastChecked": "2026-06-17T14:30:23.8919669Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "so3",
      "name": "Twitter/X",
      "url": "https://x.com",
      "desc": "全球社交网络",
      "icon": "🐦",
      "category": "social",
      "status": "review",
      "finalUrl": "https://x.com/",
      "lastChecked": "2026-06-17T14:30:27.6128721Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "so4",
      "name": "小红书",
      "url": "https://www.xiaohongshu.com",
      "desc": "生活分享社区",
      "icon": "📕",
      "category": "social",
      "status": "redirect",
      "finalUrl": "https://www.xiaohongshu.com/explore",
      "lastChecked": "2026-06-17T14:30:24.4187000Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "so5",
      "name": "Discord",
      "url": "https://discord.com",
      "desc": "社区语音聊天",
      "icon": "🎮",
      "category": "social",
      "status": "active",
      "finalUrl": "https://discord.com/",
      "lastChecked": "2026-06-17T14:30:26.8769385Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "c1",
      "name": "阿里云",
      "url": "https://www.aliyun.com",
      "desc": "云计算服务",
      "icon": "☁️",
      "category": "cloud",
      "status": "active",
      "finalUrl": "https://www.aliyun.com/",
      "lastChecked": "2026-06-17T14:30:24.6000104Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "c2",
      "name": "腾讯云",
      "url": "https://cloud.tencent.com",
      "desc": "云计算服务",
      "icon": "🌤️",
      "category": "cloud",
      "status": "active",
      "finalUrl": "https://cloud.tencent.com/",
      "lastChecked": "2026-06-17T14:30:24.8090177Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "c3",
      "name": "又拍云",
      "url": "https://www.upyun.com",
      "desc": "CDN 和云存储",
      "icon": "⬆️",
      "category": "cloud",
      "status": "active",
      "finalUrl": "https://www.upyun.com/",
      "lastChecked": "2026-06-17T14:30:24.9106925Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "c4",
      "name": "Cloudflare",
      "url": "https://www.cloudflare.com",
      "desc": "CDN 安全加速",
      "icon": "🔶",
      "category": "cloud",
      "status": "active",
      "finalUrl": "https://www.cloudflare.com/",
      "lastChecked": "2026-06-17T14:30:31.4285858Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "c5",
      "name": "Netlify",
      "url": "https://www.netlify.com",
      "desc": "静态站点部署",
      "icon": "🌐",
      "category": "cloud",
      "status": "active",
      "finalUrl": "https://www.netlify.com/",
      "lastChecked": "2026-06-17T14:30:29.3494124Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "g1",
      "name": "Steam",
      "url": "https://store.steampowered.com",
      "desc": "游戏数字商城",
      "icon": "🎮",
      "category": "game",
      "status": "active",
      "finalUrl": "https://store.steampowered.com/",
      "lastChecked": "2026-06-17T14:30:27.2213797Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "g2",
      "name": "TapTap",
      "url": "https://www.taptap.cn",
      "desc": "手游社区",
      "icon": "📱",
      "category": "game",
      "status": "active",
      "finalUrl": "https://www.taptap.cn/",
      "lastChecked": "2026-06-17T14:30:25.3971603Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "g3",
      "name": "Epic Games",
      "url": "https://www.epicgames.com",
      "desc": "游戏商城",
      "icon": "🎯",
      "category": "game",
      "status": "review",
      "finalUrl": "https://www.epicgames.com/",
      "lastChecked": "2026-06-17T14:30:28.2336004Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "g4",
      "name": "游民星空",
      "url": "https://www.gamersky.com",
      "desc": "游戏资讯",
      "icon": "⭐",
      "category": "game",
      "status": "active",
      "finalUrl": "https://www.gamersky.com/",
      "lastChecked": "2026-06-17T14:30:25.8195396Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "l1",
      "name": "淘宝",
      "url": "https://www.taobao.com",
      "desc": "综合购物平台",
      "icon": "🛒",
      "category": "life",
      "status": "active",
      "finalUrl": "https://www.taobao.com/",
      "lastChecked": "2026-06-17T14:30:25.9181229Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "l2",
      "name": "京东",
      "url": "https://www.jd.com",
      "desc": "综合电商平台",
      "icon": "🏬",
      "category": "life",
      "status": "active",
      "finalUrl": "https://www.jd.com/",
      "lastChecked": "2026-06-17T14:30:25.9025472Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "l3",
      "name": "美团",
      "url": "https://www.meituan.com",
      "desc": "生活服务平台",
      "icon": "🍕",
      "category": "life",
      "status": "active",
      "finalUrl": "https://www.meituan.com/",
      "lastChecked": "2026-06-17T14:30:26.0375780Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "l4",
      "name": "高德地图",
      "url": "https://www.amap.com",
      "desc": "地图导航",
      "icon": "🗺️",
      "category": "life",
      "status": "active",
      "finalUrl": "https://www.amap.com/",
      "lastChecked": "2026-06-17T14:30:26.0442073Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "l5",
      "name": "大众点评",
      "url": "https://www.dianping.com",
      "desc": "美食生活信息",
      "icon": "⭐",
      "category": "life",
      "status": "active",
      "finalUrl": "https://www.dianping.com/",
      "lastChecked": "2026-06-17T14:30:26.2098497Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "se1",
      "name": "Google",
      "url": "https://www.google.com",
      "desc": "全球搜索引擎",
      "icon": "🔍",
      "category": "search",
      "status": "active",
      "finalUrl": "https://www.google.com/",
      "lastChecked": "2026-06-17T14:30:30.3639723Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "se2",
      "name": "百度",
      "url": "https://www.baidu.com",
      "desc": "中文搜索引擎",
      "icon": "🔎",
      "category": "search",
      "status": "active",
      "finalUrl": "https://www.baidu.com/",
      "lastChecked": "2026-06-17T14:30:26.3735876Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "se3",
      "name": "Bing",
      "url": "https://www.bing.com",
      "desc": "微软搜索引擎",
      "icon": "🌐",
      "category": "search",
      "status": "active",
      "finalUrl": "https://www.bing.com/",
      "lastChecked": "2026-06-17T14:30:28.9718308Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "se4",
      "name": "DuckDuckGo",
      "url": "https://duckduckgo.com",
      "desc": "隐私搜索引擎",
      "icon": "🦆",
      "category": "search",
      "status": "active",
      "finalUrl": "https://duckduckgo.com/",
      "lastChecked": "2026-06-17T14:30:28.2133951Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "i1",
      "name": "Unsplash",
      "url": "https://unsplash.com",
      "desc": "免费高清图片",
      "icon": "📷",
      "category": "image",
      "status": "review",
      "finalUrl": "https://unsplash.com/.within.website?redir=%2F",
      "lastChecked": "2026-06-17T14:30:33.6365956Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "i2",
      "name": "Pexels",
      "url": "https://www.pexels.com",
      "desc": "免费图片视频素材",
      "icon": "🖼️",
      "category": "image",
      "status": "review",
      "finalUrl": "https://www.pexels.com/",
      "lastChecked": "2026-06-17T14:30:29.2134728Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "i3",
      "name": "Pixabay",
      "url": "https://pixabay.com",
      "desc": "免费图片插画",
      "icon": "🎭",
      "category": "image",
      "status": "review",
      "finalUrl": "https://pixabay.com/",
      "lastChecked": "2026-06-17T14:30:32.2344039Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "i4",
      "name": "iconfont",
      "url": "https://www.iconfont.cn",
      "desc": "阿里巴巴图标库",
      "icon": "🎯",
      "category": "image",
      "status": "active",
      "finalUrl": "https://www.iconfont.cn/",
      "lastChecked": "2026-06-17T14:30:27.3504136Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "i5",
      "name": "Flaticon",
      "url": "https://www.flaticon.com",
      "desc": "矢量图标库",
      "icon": "📐",
      "category": "image",
      "status": "review",
      "finalUrl": "https://www.flaticon.com/",
      "lastChecked": "2026-06-17T14:30:31.1406023Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "v3",
      "name": "优酷",
      "url": "https://www.youku.com",
      "desc": "在线视频平台",
      "icon": "🎬",
      "category": "video",
      "status": "active",
      "finalUrl": "https://www.youku.com/",
      "lastChecked": "2026-06-17T14:30:27.4771432Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "v4",
      "name": "西瓜视频",
      "url": "https://www.ixigua.com",
      "desc": "长视频平台",
      "icon": "🍉",
      "category": "video",
      "status": "active",
      "finalUrl": "https://www.ixigua.com/",
      "lastChecked": "2026-06-17T14:30:27.5867099Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "f1",
      "name": "100font",
      "url": "https://www.100font.com",
      "desc": "免费商用字体",
      "icon": "🔤",
      "category": "font",
      "status": "active",
      "finalUrl": "https://www.100font.com/",
      "lastChecked": "2026-06-17T14:30:27.8585056Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "f2",
      "name": "Google Fonts",
      "url": "https://fonts.google.com",
      "desc": "谷歌免费字体",
      "icon": "🅶",
      "category": "font",
      "status": "active",
      "finalUrl": "https://fonts.google.com/",
      "lastChecked": "2026-06-17T14:30:29.8288469Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "f3",
      "name": "字体天下",
      "url": "https://www.fonts.net.cn",
      "desc": "中英文字体下载",
      "icon": "📝",
      "category": "font",
      "status": "active",
      "finalUrl": "https://www.fonts.net.cn/",
      "lastChecked": "2026-06-17T14:30:27.9975699Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "f4",
      "name": "猫啃网",
      "url": "https://www.maoken.com",
      "desc": "免费商用字体",
      "icon": "🐱",
      "category": "font",
      "status": "active",
      "finalUrl": "https://www.maoken.com/",
      "lastChecked": "2026-06-17T14:30:28.1772798Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "co1",
      "name": "Coolors",
      "url": "https://coolors.co",
      "desc": "配色方案生成器",
      "icon": "🎨",
      "category": "color",
      "status": "active",
      "finalUrl": "https://coolors.co/",
      "lastChecked": "2026-06-17T14:30:30.4435328Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "co2",
      "name": "Color Hunt",
      "url": "https://www.colorhunt.co",
      "desc": "色卡灵感",
      "icon": "🎯",
      "category": "color",
      "status": "active",
      "finalUrl": "https://www.colorhunt.co/",
      "lastChecked": "2026-06-17T14:30:30.1793157Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "co3",
      "name": "中国色",
      "url": "https://zhongguose.com",
      "desc": "中国传统颜色",
      "icon": "🏮",
      "category": "color",
      "status": "active",
      "finalUrl": "https://zhongguose.com/",
      "lastChecked": "2026-06-17T14:30:28.3900309Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "co4",
      "name": "Adobe Color",
      "url": "https://color.adobe.com",
      "desc": "在线调色工具",
      "icon": "🌈",
      "category": "color",
      "status": "active",
      "finalUrl": "https://color.adobe.com/",
      "lastChecked": "2026-06-17T14:30:30.7373075Z",
      "source": "builtin",
      "visibility": true
    },
    {
      "id": "bk01",
      "name": "NotebookLM",
      "url": "https://notebooklm.google.com",
      "desc": "Google AI 笔记与资料研究",
      "icon": "📓",
      "category": "ai",
      "status": "redirect",
      "finalUrl": "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fnotebooklm.google.com%2Flogin%3Fcontinue%3Dhttps%3A%2F%2Fnotebooklm.google.com%2F&dsh=S1178056942%3A1781706635481493&followup=https%3A%2F%2Fnotebooklm.google.com%2Flogin%3Fcontinue%3Dhttps%3A%2F%2Fnotebooklm.google.com%2F&osid=1&passive=1209600&flowName=WebLiteSignIn&flowEntry=ServiceLogin&ifkv=AcDsRvzDhciBD3phhLAlkXsBdJSwcfqvux7JwbyktTNLN_z-mdRXF0v0d3AyWJ00z4vQtemcEIGObQ",
      "lastChecked": "2026-06-17T14:30:37.1045034Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk02",
      "name": "YouMind",
      "url": "https://youmind.com/boards",
      "desc": "AI 创作与知识管理工作台",
      "icon": "🧩",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://youmind.com/boards",
      "lastChecked": "2026-06-17T14:30:31.2080047Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk03",
      "name": "Claude Use Cases",
      "url": "https://www.claude.com/resources/use-cases",
      "desc": "Claude 官方使用案例",
      "icon": "📘",
      "category": "ai",
      "status": "redirect",
      "finalUrl": "https://claude.com/resources/use-cases",
      "lastChecked": "2026-06-17T14:30:35.5225181Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk04",
      "name": "GPT Images Gallery",
      "url": "https://gptimges.com/gallery",
      "desc": "AI 图片案例画廊",
      "icon": "🖼️",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://gptimges.com/gallery",
      "lastChecked": "2026-06-17T14:30:34.9646919Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk05",
      "name": "GPT3.5 Plus",
      "url": "https://gpt3plus.com",
      "desc": "AI 对话与工具入口",
      "icon": "✨",
      "category": "ai",
      "status": "active",
      "finalUrl": "https://gpt3plus.com/",
      "lastChecked": "2026-06-17T14:30:34.0864357Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk06",
      "name": "AI Go Code",
      "url": "https://aigocode.com/dashboard/console",
      "desc": "AI 编程控制台",
      "icon": "⌨️",
      "category": "ai",
      "status": "review",
      "finalUrl": "https://aigocode.com/dashboard/console",
      "lastChecked": "2026-06-17T14:30:34.3938371Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk07",
      "name": "瓜梯子",
      "url": "https://guatizi.com",
      "desc": "网络服务入口",
      "icon": "🌐",
      "category": "network",
      "status": "active",
      "finalUrl": "https://guatizi.com/",
      "lastChecked": "2026-06-17T14:30:33.6713260Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk08",
      "name": "DGY 登录",
      "url": "https://a03.dgy02.com/#/login",
      "desc": "网络服务登录入口",
      "icon": "🔐",
      "category": "network",
      "status": "active",
      "finalUrl": "https://a03.dgy02.com/#/login",
      "lastChecked": "2026-06-17T14:30:32.9799588Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk09",
      "name": "FBWeb 控制台",
      "url": "https://w20.fbwebc13.cc/user#",
      "desc": "网络服务用户中心",
      "icon": "🔐",
      "category": "network",
      "status": "redirect",
      "finalUrl": "https://w20.fbwebc13.cc/auth/login",
      "lastChecked": "2026-06-17T14:30:34.5564230Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk10",
      "name": "二次元网络",
      "url": "https://2cy.mom/user",
      "desc": "网络服务用户中心",
      "icon": "🌐",
      "category": "network",
      "status": "redirect",
      "finalUrl": "https://xn--z4q834d.vip/user",
      "lastChecked": "2026-06-17T14:30:36.6689441Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk11",
      "name": "XMRTH",
      "url": "https://xmrth.lol/auth/login",
      "desc": "网络服务登录入口",
      "icon": "🔐",
      "category": "network",
      "status": "review",
      "finalUrl": "https://xmrth.lol/auth/login",
      "lastChecked": "2026-06-17T14:30:36.8023606Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk12",
      "name": "WgetCloud",
      "url": "https://katp7luhifu2zxnpy8cs.wgetcloud.org/login",
      "desc": "网络服务登录入口",
      "icon": "☁️",
      "category": "network",
      "status": "review",
      "finalUrl": "https://katp7luhifu2zxnpy8cs.wgetcloud.org/login",
      "lastChecked": "2026-06-17T14:30:34.6840573Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk13",
      "name": "ClashX Pro",
      "url": "https://clashx.pro/latest/",
      "desc": "网络工具与客户端信息",
      "icon": "🧭",
      "category": "network",
      "status": "active",
      "finalUrl": "https://clashx.pro/latest/",
      "lastChecked": "2026-06-17T14:30:35.1598282Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk14",
      "name": "CrossGo",
      "url": "https://crossgo.cc/#/login",
      "desc": "网络服务登录入口",
      "icon": "🔐",
      "category": "network",
      "status": "active",
      "finalUrl": "https://crossgo.cc/#/login",
      "lastChecked": "2026-06-17T14:30:36.1328509Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk15",
      "name": "FFAFF 状态",
      "url": "https://inv01.ffaff.cc/server_status",
      "desc": "网络服务状态页",
      "icon": "📡",
      "category": "network",
      "status": "redirect",
      "finalUrl": "https://inv01.ffaff.cc/login",
      "lastChecked": "2026-06-17T14:30:36.4817659Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk16",
      "name": "飞机云",
      "url": "https://feijiyun99.com/user/node",
      "desc": "网络服务节点页",
      "icon": "✈️",
      "category": "network",
      "status": "redirect",
      "finalUrl": "https://feijiyun99.com/auth/login",
      "lastChecked": "2026-06-17T14:30:37.7548286Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk17",
      "name": "SCVIP",
      "url": "https://w04.scvipaffa10.cc/user",
      "desc": "网络服务用户中心",
      "icon": "🔐",
      "category": "network",
      "status": "redirect",
      "finalUrl": "https://w04.scvipaffa10.cc/verify?next=%2Fuser",
      "lastChecked": "2026-06-17T14:30:37.9960251Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk18",
      "name": "FlowerCloud",
      "url": "https://api-flowercloud.com/clientarea.php?action=productdetails&id=199461",
      "desc": "网络服务产品页",
      "icon": "🌸",
      "category": "network",
      "status": "review",
      "finalUrl": "https://api-flowercloud.com/clientarea.php?action=productdetails&id=199461",
      "lastChecked": "2026-06-17T14:30:37.1593045Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk19",
      "name": "Yep",
      "url": "https://yep.top",
      "desc": "网络服务入口",
      "icon": "🌐",
      "category": "network",
      "status": "active",
      "finalUrl": "https://yep.top/",
      "lastChecked": "2026-06-17T14:30:36.8011038Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk20",
      "name": "一元机场",
      "url": "https://xn--9kqz23b19z.com/#/login",
      "desc": "网络服务登录入口",
      "icon": "🔐",
      "category": "network",
      "status": "active",
      "finalUrl": "https://xn--9kqz23b19z.com/#/login",
      "lastChecked": "2026-06-17T14:30:36.8620622Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk21",
      "name": "Ping0",
      "url": "https://ping0.cc",
      "desc": "IP 与网络连通性检测",
      "icon": "📶",
      "category": "ip",
      "status": "active",
      "finalUrl": "https://ping0.cc/",
      "lastChecked": "2026-06-17T14:30:38.4997132Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk22",
      "name": "IP.SY",
      "url": "https://ip.sy",
      "desc": "公网 IP 信息查询",
      "icon": "🧭",
      "category": "ip",
      "status": "active",
      "finalUrl": "https://ip.sy/",
      "lastChecked": "2026-06-17T14:30:38.6861833Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk23",
      "name": "SKK IP",
      "url": "https://ip.skk.moe",
      "desc": "浏览器与网络信息检测",
      "icon": "🔎",
      "category": "ip",
      "status": "review",
      "finalUrl": "https://ip.skk.moe/",
      "lastChecked": "2026-06-17T14:30:39.5523868Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk24",
      "name": "Claude 网络检测",
      "url": "https://ip.net.coffee/claude/",
      "desc": "Claude 可用性检测",
      "icon": "☕",
      "category": "ip",
      "status": "active",
      "finalUrl": "https://ip.net.coffee/claude/",
      "lastChecked": "2026-06-17T14:30:38.5049789Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk25",
      "name": "电子书宝箱",
      "url": "https://jbiaojerry.github.io/ebook-treasure-chest/",
      "desc": "电子书资源索引",
      "icon": "📚",
      "category": "ebook",
      "status": "active",
      "finalUrl": "https://jbiaojerry.github.io/ebook-treasure-chest/",
      "lastChecked": "2026-06-17T14:30:38.6645725Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk26",
      "name": "导航站项目",
      "url": "https://li780.github.io/website-dist/",
      "desc": "个人导航站在线版本",
      "icon": "🧭",
      "category": "dev",
      "status": "active",
      "finalUrl": "https://li780.github.io/website-dist/",
      "lastChecked": "2026-06-17T14:30:40.0721275Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk27",
      "name": "卖号管家",
      "url": "https://maihaoguanjia.com",
      "desc": "账号业务管理入口",
      "icon": "💼",
      "category": "business",
      "status": "active",
      "finalUrl": "https://maihaoguanjia.com/",
      "lastChecked": "2026-06-17T14:30:43.0886567Z",
      "source": "bookmark",
      "visibility": true
    },
    {
      "id": "bk28",
      "name": "XR Scholar",
      "url": "https://xr-scholar.com/Journals/Search",
      "desc": "学术期刊检索",
      "icon": "🎓",
      "category": "research",
      "status": "review",
      "finalUrl": "https://xr-scholar.com/Journals/Search",
      "lastChecked": "2026-06-17T14:30:41.4990475Z",
      "source": "bookmark",
      "visibility": true
    }
  ],
  "favorites": [],
  "searchEngines": [
    {
      "id": "local",
      "name": "站内搜索",
      "icon": "🔍",
      "urlTemplate": ""
    },
    {
      "id": "google",
      "name": "Google",
      "icon": "🇬",
      "urlTemplate": "https://www.google.com/search?q={q}"
    },
    {
      "id": "baidu",
      "name": "百度",
      "icon": "🅱️",
      "urlTemplate": "https://www.baidu.com/s?wd={q}"
    },
    {
      "id": "bing",
      "name": "Bing",
      "icon": "🌐",
      "urlTemplate": "https://www.bing.com/search?q={q}"
    },
    {
      "id": "zhihu",
      "name": "知乎",
      "icon": "💡",
      "urlTemplate": "https://www.zhihu.com/search?type=content&q={q}"
    },
    {
      "id": "bilibili",
      "name": "哔哩哔哩",
      "icon": "📺",
      "urlTemplate": "https://search.bilibili.com/all?keyword={q}"
    },
    {
      "id": "github",
      "name": "GitHub",
      "icon": "🐙",
      "urlTemplate": "https://github.com/search?q={q}"
    },
    {
      "id": "douyin",
      "name": "抖音",
      "icon": "🎵",
      "urlTemplate": "https://www.douyin.com/search/{q}"
    },
    {
      "id": "duckduckgo",
      "name": "DuckDuckGo",
      "icon": "🦆",
      "urlTemplate": "https://duckduckgo.com/?q={q}"
    }
  ],
  "settings": {
    "showTime": true,
    "showDate": true,
    "showSeconds": true,
    "showSearch": true,
    "showFavorites": true,
    "showThemeToggle": true,
    "showStats": true,
    "showDescriptions": true
  }
};
  const LEGACY_DEFAULT_URLS = new Set([
  "https://chat.openai.com",
  "https://claude.ai",
  "https://yiyan.baidu.com",
  "https://tongyi.aliyun.com",
  "https://www.midjourney.com",
  "https://stability.ai",
  "https://www.perplexity.ai",
  "https://poe.com",
  "https://kimi.moonshot.cn",
  "https://www.doubao.com",
  "https://gemini.google.com",
  "https://cursor.sh",
  "https://github.com",
  "https://gitee.com",
  "https://code.visualstudio.com",
  "https://stackoverflow.com",
  "https://developer.mozilla.org",
  "https://codepen.io",
  "https://caniuse.com",
  "https://www.npmjs.com",
  "https://leetcode.cn",
  "https://vercel.com",
  "https://dribbble.com",
  "https://www.behance.net",
  "https://www.zcool.com.cn",
  "https://www.figma.com",
  "https://huaban.com",
  "https://www.canva.cn",
  "https://js.design",
  "https://ui8.net",
  "https://www.bilibili.com",
  "https://music.163.com",
  "https://www.youtube.com",
  "https://www.spotify.com",
  "https://www.iqiyi.com",
  "https://www.douyin.com",
  "https://www.cnki.net",
  "https://www.zhihu.com",
  "https://www.coursera.org",
  "https://www.imooc.com",
  "https://www.bilibili.com/learning",
  "https://zh.wikipedia.org",
  "https://tinypng.com",
  "https://www.remove.bg",
  "https://cli.im",
  "https://www.deepl.com",
  "https://www.processon.com",
  "https://carbon.now.sh",
  "https://jsoneditoronline.org",
  "https://www.toutiao.com",
  "https://sspai.com",
  "https://36kr.com",
  "https://www.v2ex.com",
  "https://news.ycombinator.com",
  "https://weixin.qq.com",
  "https://weibo.com",
  "https://x.com",
  "https://www.xiaohongshu.com",
  "https://discord.com",
  "https://www.aliyun.com",
  "https://cloud.tencent.com",
  "https://www.upyun.com",
  "https://www.cloudflare.com",
  "https://www.netlify.com",
  "https://store.steampowered.com",
  "https://www.taptap.cn",
  "https://www.epicgames.com",
  "https://www.gamersky.com",
  "https://www.taobao.com",
  "https://www.jd.com",
  "https://www.meituan.com",
  "https://www.amap.com",
  "https://www.dianping.com",
  "https://www.google.com",
  "https://www.baidu.com",
  "https://www.bing.com",
  "https://duckduckgo.com",
  "https://unsplash.com",
  "https://www.pexels.com",
  "https://pixabay.com",
  "https://www.iconfont.cn",
  "https://www.flaticon.com",
  "https://www.youku.com",
  "https://www.ixigua.com",
  "https://www.100font.com",
  "https://fonts.google.com",
  "https://www.fonts.net.cn",
  "https://www.maoken.com",
  "https://coolors.co",
  "https://www.colorhunt.co",
  "https://zhongguose.com",
  "https://color.adobe.com"
].map(value => value.replace('://www.', '://')));

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeUrl(value) {
    try {
      const url = new URL(String(value).trim());
      url.hash = '';
      url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
      if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
      return url.toString().replace(/\/$/, '').toLowerCase();
    } catch (error) {
      return String(value || '').trim().replace(/\/$/, '').toLowerCase();
    }
  }

  function normalizeData(input) {
    const source = input && typeof input === 'object' ? input : {};
    const output = clone(DEFAULT_DATA);
    if (Array.isArray(source.categories) && source.categories.length) output.categories = source.categories;
    if (Array.isArray(source.searchEngines) && source.searchEngines.length) output.searchEngines = source.searchEngines;
    output.settings = Object.assign({}, DEFAULT_DATA.settings, source.settings || {});

    const unique = new Map();
    const sites = Array.isArray(source.sites) ? source.sites : output.sites;
    sites.forEach((site, index) => {
      if (!site || !site.url) return;
      const key = normalizeUrl(site.url);
      if (unique.has(key)) return;
      unique.set(key, Object.assign({
        id: 'site-' + Date.now() + '-' + index,
        name: new URL(site.url).hostname,
        desc: '',
        icon: '',
        category: 'tool',
        status: 'unchecked',
        finalUrl: site.url,
        lastChecked: '',
        source: 'custom',
        visibility: true
      }, site));
    });
    output.sites = Array.from(unique.values());
    output.favorites = Array.isArray(source.favorites) ? Array.from(new Set(source.favorites)) : [];
    output.version = 5;
    return output;
  }

  function migrateLegacy() {
    let legacy;
    try { legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null'); } catch (error) { legacy = null; }
    const migrated = clone(DEFAULT_DATA);
    if (!legacy || typeof legacy !== 'object') return migrated;

    const defaultIdsByUrl = new Map(migrated.sites.map(site => [normalizeUrl(site.url), site.id]));
    const oldSitesById = new Map((legacy.sites || []).map(site => [site.id, site]));
    const customSites = (legacy.sites || []).filter(site => site.url && !LEGACY_DEFAULT_URLS.has(normalizeUrl(site.url)));
    customSites.forEach((site, index) => {
      const key = normalizeUrl(site.url);
      if (defaultIdsByUrl.has(key)) return;
      const id = 'migrated-' + Date.now() + '-' + index;
      migrated.sites.push(Object.assign({}, site, { id, source: 'migrated', status: 'unchecked', finalUrl: site.url, lastChecked: '', visibility: site.visibility !== false }));
      defaultIdsByUrl.set(key, id);
    });

    let favoriteIds = Array.isArray(legacy.favorites) ? legacy.favorites : [];
    try {
      const separate = JSON.parse(localStorage.getItem(LEGACY_FAVORITES_KEY) || '[]');
      if (Array.isArray(separate)) favoriteIds = favoriteIds.concat(separate);
    } catch (error) {}
    migrated.favorites = Array.from(new Set(favoriteIds.map(id => {
      const oldSite = oldSitesById.get(id);
      return oldSite ? defaultIdsByUrl.get(normalizeUrl(oldSite.url)) : null;
    }).filter(Boolean)));
    return migrated;
  }

  function load() {
    let saved;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (error) { saved = null; }
    const data = normalizeData(saved || migrateLegacy());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  function save(data) {
    const normalized = normalizeData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function reset() {
    const data = clone(DEFAULT_DATA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  global.NavStore = { STORAGE_KEY, DEFAULT_DATA, normalizeUrl, normalizeData, load, save, reset, clone };
})(window);

