'use client';

import { useRef, useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Blocks,
  Box,
  BookOpen,
  BrainCircuit,
  Camera,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CircleAlert,
  CircleHelp,
  Clock3,
  Cpu,
  Eye,
  EyeOff,
  FileImage,
  FileText,
  Flame,
  Gauge,
  Gift,
  GraduationCap,
  History,
  Image as ImageIcon,
  Link2,
  KeyRound,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageSquarePlus,
  Mic,
  MonitorSmartphone,
  MoreHorizontal,
  Pencil,
  PenLine,
  Plus,
  RotateCcw,
  ScanLine,
  Search,
  Send,
  School,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Settings,
  Sparkles,
  Star,
  Smartphone,
  Target,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PhotoStep = null | 'camera' | 'ocr' | 'guide' | 'feedback';
type DemoStage = null | 'menu' | 'login' | 'bind' | 'tour';
type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  attachment?: 'captured-photo';
};
type PhotoConversation = {
  id: number;
  request: string;
};
type ChatAttachment = {
  id: string;
  name: string;
  kind: 'image' | 'file';
  size: string;
};
type StudentProfile = {
  nickname: string;
  region: string;
  grade: string;
  school: string;
  textbook: string;
  focusSubject: string;
  weakTopics: string;
  learningGoal: string;
  guidanceStyle: string;
};
type TutoringPreferences = {
  guidanceMode: string;
  detailLevel: string;
  difficulty: string;
  hintPace: string;
  tone: string;
  askBeforeAnswer: boolean;
  autoSaveMistakes: boolean;
  lessonSummary: boolean;
};
type ChatModeId = 'default' | 'photo' | 'homework' | 'mistakes' | 'practice';
type AppView =
  | 'chat'
  | 'skills'
  | 'growth'
  | 'settings'
  | 'security'
  | 'profile'
  | 'preferences'
  | 'points'
  | 'devices'
  | 'channels'
  | 'tasks';
type BingoDevice = {
  id: string;
  name: string;
  code: string;
  online: boolean;
};
type RemoteChannel = {
  id: string;
  name: string;
  description: string;
  account: string;
  connected: boolean;
  recommended?: boolean;
  logo: string;
};
type ScheduledTask = {
  id: string;
  name: string;
  instruction: string;
  expert: string;
  schedule: string;
  channel: string;
  active: boolean;
  lastRun?: string;
  source: 'app' | 'chat';
};
type PointTransaction = {
  id: string;
  title: string;
  detail: string;
  time: string;
  amount: number;
};
type Skill = {
  id: string;
  name: string;
  author: string;
  description: string;
  category: string;
  users: string;
  version: string;
  image: string;
  capabilities: string[];
  example: string;
};
type ModelOption = {
  id: string;
  name: string;
  description: string;
  multiplier: string;
  icon: LucideIcon;
  color: string;
};
type ChatMode = {
  id: ChatModeId;
  label: string;
  name: string;
  subtitle: string;
  headline: string;
  description: string;
  placeholder: string;
  icon: LucideIcon;
  image: string;
  iconStyle: string;
  suggestions: string[];
  reply: string;
};
type GrowthPeriod = 'daily' | 'weekly' | 'monthly';
type GrowthReport = {
  id: string;
  title: string;
  date: string;
  summary: string;
  score: number;
  change: string;
  focus: string;
  highlight: string;
  nextStep: string;
};

const features: {
  label: string;
  hint: string;
  icon: LucideIcon;
  iconColor: string;
}[] = [
  {
    label: '技能广场',
    hint: '发现并安装学习技能',
    icon: Blocks,
    iconColor: 'bg-violet-50 text-violet-600',
  },
  {
    label: '成长报告',
    hint: '本周正确率 +12%',
    icon: BarChart3,
    iconColor: 'bg-indigo-50 text-indigo-600',
  },
  {
    label: '定时任务',
    hint: '学习提醒与家长报告',
    icon: CalendarClock,
    iconColor: 'bg-fuchsia-50 text-fuchsia-600',
  },
];

const rechargePlans = [
  { id: 'starter', price: 6, points: 600, label: '轻量补充' },
  { id: 'popular', price: 18, points: 2000, label: '最受欢迎' },
  { id: 'value', price: 30, points: 3600, label: '加赠 600' },
  { id: 'max', price: 68, points: 8800, label: '加赠 2,000' },
];

const skills: Skill[] = [
  {
    id: 'thinking-coach',
    name: '解题思路教练',
    author: 'BingoLab',
    description: '不直接给答案，用追问帮你找到关键突破口。',
    category: '数学辅导',
    users: '8.6k',
    version: '1.4.0',
    image: '/skills/thinking-coach.png',
    capabilities: [
      '分步骤拆解题目',
      '识别卡点并给出提示',
      '完成后生成同类练习',
    ],
    example: '我不会做这道二次函数题，先给我一个提示。',
  },
  {
    id: 'english-partner',
    name: '英语口语陪练',
    author: 'BingoLab',
    description: '围绕课本话题对练，实时纠正常见表达问题。',
    category: '英语学习',
    users: '6.3k',
    version: '1.2.1',
    image: '/skills/english-partner.png',
    capabilities: [
      '课本主题情景对话',
      '逐句发音与语法建议',
      '自动整理今日表达',
    ],
    example: '陪我练习一次在餐厅点餐的英语对话。',
  },
  {
    id: 'focus-timer',
    name: '番茄专注钟',
    author: 'BingoLab',
    description: '把学习任务切成短时专注段，结束后轻量复盘。',
    category: '学习效率',
    users: '5.1k',
    version: '2.0.0',
    image: '/skills/focus-timer.png',
    capabilities: ['25 分钟专注计时', '休息提醒', '生成专注记录'],
    example: '帮我安排 45 分钟完成数学作业。',
  },
  {
    id: 'mistake-review',
    name: '错题复习规划师',
    author: 'BingoLab',
    description: '根据错因和掌握度，自动安排今天该复习的题。',
    category: '复习规划',
    users: '4.8k',
    version: '1.3.2',
    image: '/skills/mistake-review.png',
    capabilities: ['按掌握度安排复习', '归纳高频错因', '追踪复习效果'],
    example: '从我的错题里挑 5 道今天最该复习的。',
  },
  {
    id: 'paper-maker',
    name: '试卷生成助手',
    author: 'BingoLab',
    description: '按章节、题型和难度生成练习，并附答案解析。',
    category: '智能练习',
    users: '5.4k',
    version: '0.9.5',
    image: '/skills/paper-maker.png',
    capabilities: ['选择章节与题型', '设置难度与题量', '生成答案和解析'],
    example: '出一份八年级一次函数小测，共 10 道题。',
  },
  {
    id: 'daily-brief',
    name: '每日知识简报',
    author: 'BingoLab',
    description: '把当天的新知识整理成三分钟可读的学习卡片。',
    category: '知识拓展',
    users: '3.2k',
    version: '1.1.0',
    image: '/skills/daily-brief.png',
    capabilities: ['每日知识点精选', '关键词快速解释', '收藏后生成小测'],
    example: '给我一份今天的科技知识简报。',
  },
];

const models: ModelOption[] = [
  {
    id: 'auto',
    name: 'Auto',
    description: '根据问题智能选择合适模型',
    multiplier: 'x1.0 积分',
    icon: Box,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'hy3',
    name: 'Hy3',
    description: '均衡快速，适合日常学习',
    multiplier: 'x0.5 积分',
    icon: Gauge,
    color: 'bg-cyan-50 text-cyan-700',
  },
  {
    id: 'deepseek-pro',
    name: 'DeepSeek-V4-Pro',
    description: '复杂题目与深度推理',
    multiplier: 'x1.2 积分',
    icon: BrainCircuit,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    id: 'deepseek-flash',
    name: 'DeepSeek-V4-Flash',
    description: '快速回答与知识问答',
    multiplier: 'x0.5 积分',
    icon: Zap,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'glm',
    name: 'GLM-5.2',
    description: '长文本与综合学习任务',
    multiplier: 'x2.5 积分',
    icon: Cpu,
    color: 'bg-slate-100 text-slate-700',
  },
];

const chatModes: Record<ChatModeId, ChatMode> = {
  default: {
    id: 'default',
    label: 'BingoMate',
    name: 'BingoMate 学伴',
    subtitle: '在线 · 启发式辅导',
    headline: '今天想学点什么？',
    description: '问一道题、检查思路，或者把今天的复习交给我安排。',
    placeholder: '发消息或创建学习任务…',
    icon: Sparkles,
    image: '/brand/bingomate-owl.png',
    iconStyle: 'bg-blue-50 text-blue-600',
    suggestions: [],
    reply: '可以。先告诉我你具体卡在哪一步？我会先给提示，不会直接把完整答案丢给你。',
  },
  photo: {
    id: 'photo',
    label: '拍题辅导',
    name: '拍题辅导专家',
    subtitle: '识别题目 · 分步启发',
    headline: '拍下题目，我陪你拆解思路',
    description: '先识别题目和你的解题过程，再从卡住的那一步开始提示。',
    placeholder: '描述题目、说说你的思路，或上传题目照片…',
    icon: Camera,
    image: '/features/photo-tutor-3d.png',
    iconStyle: 'bg-blue-50 text-blue-600',
    suggestions: [
      '帮我分析下这道题',
      '检查一下我的解题思路',
      '只提示我下一步怎么做',
      '帮我讲清楚这道题的知识点',
    ],
    reply: '我先帮你识别题目条件，再从关键突破口开始提示。你也可以把已经做到的步骤一起发给我。',
  },
  homework: {
    id: 'homework',
    label: '作业批阅',
    name: '作业批改与学情分析专家',
    subtitle: '智能批改 · 错因分析 · 薄弱点诊断',
    headline: 'Hi，我是作业批改与学情分析专家',
    description: '智能批改、错因分析和薄弱点诊断，帮助学生找到真正需要加强的环节。',
    placeholder: '描述批改任务，或上传学生作业…',
    icon: PenLine,
    image: '/features/homework-review-3d.png',
    iconStyle: 'bg-violet-50 text-violet-600',
    suggestions: [
      '请批改这份学生作业',
      '帮我分析这次作业的错题原因',
      '总结这份作业的薄弱知识点',
      '给这位学生一些改进建议',
    ],
    reply: '可以。我会先检查答案和过程，再归纳错因、薄弱知识点以及下一步练习建议。请上传作业或题目。',
  },
  mistakes: {
    id: 'mistakes',
    label: '错题复习',
    name: '错题复习专家',
    subtitle: '错因归纳 · 掌握度追踪',
    headline: '把错题真正变成会做的题',
    description: '按错因和掌握度安排复习，用相似题确认知识点是否已经掌握。',
    placeholder: '上传错题，或告诉我今天想复习的科目…',
    icon: RotateCcw,
    image: '/features/mistake-review-3d.png',
    iconStyle: 'bg-orange-50 text-orange-600',
    suggestions: [
      '从错题本挑 5 道复习',
      '分析我最近反复出错的原因',
      '帮我整理今天上传的错题',
      '根据这道错题出一道同类题',
    ],
    reply: '我会先判断错因和掌握度，再安排复习顺序，并用一道相似题确认你是否真正掌握。',
  },
  practice: {
    id: 'practice',
    label: '智能练习',
    name: '智能练习专家',
    subtitle: '按薄弱点出题 · 难度自适应',
    headline: '为你生成刚刚好的练习',
    description: '根据年级、章节和薄弱知识点生成练习，完成后自动调整下一组难度。',
    placeholder: '告诉我科目、章节、题量和难度…',
    icon: BrainCircuit,
    image: '/features/smart-practice-3d.png',
    iconStyle: 'bg-emerald-50 text-emerald-600',
    suggestions: [
      '生成 10 道一次函数练习',
      '根据最近错题出一组巩固题',
      '给我一组难度适中的数学题',
      '出 5 道英语语法选择题',
    ],
    reply: '好的。告诉我年级、章节、题量和期望难度，我会生成练习并在完成后给出解析。',
  },
};

const histories = [
  {
    group: '今天',
    items: [
      {
        title: '二次函数顶点问题',
        tag: '拍题辅导',
        tagStyle: 'bg-blue-50 text-blue-700',
      },
      {
        title: '英语阅读理解怎么概括',
        tag: '智能辅导',
        tagStyle: 'bg-emerald-50 text-emerald-700',
      },
    ],
  },
  {
    group: '过去 7 天',
    items: [
      {
        title: '几何证明辅助线',
        tag: '拍题辅导',
        tagStyle: 'bg-blue-50 text-blue-700',
      },
      {
        title: 'Unit 3 错词复习',
        tag: '错题复习',
        tagStyle: 'bg-orange-50 text-orange-700',
      },
      {
        title: '数学周测错题讲解',
        tag: '作业批阅',
        tagStyle: 'bg-violet-50 text-violet-700',
      },
    ],
  },
];

const growthReports: Record<
  GrowthPeriod,
  {
    label: string;
    range: string;
    insight: string;
    trend: number[];
    reports: GrowthReport[];
  }
> = {
  daily: {
    label: '每日',
    range: '今天 · 9月2日',
    insight: '今天完成了 3 次专注学习，二次函数的解题步骤比昨天更完整。',
    trend: [42, 58, 50, 66, 62, 76, 84],
    reports: [
      {
        id: 'daily-0902',
        title: '今日学习小结',
        date: '9月2日 21:10',
        summary: '完成数学拍题辅导与英语错词复习，主动订正了 4 道题。',
        score: 88,
        change: '+6',
        focus: '二次函数 · 英语词汇',
        highlight: '遇到难题时开始主动写出已知条件，解题耐心明显提升。',
        nextStep: '明天用 10 分钟复习二次函数顶点公式，再完成 2 道同类题。',
      },
      {
        id: 'daily-0901',
        title: '昨日学习小结',
        date: '9月1日 20:45',
        summary: '完成 45 分钟专注学习，英语阅读概括题正确率达到 80%。',
        score: 82,
        change: '+3',
        focus: '阅读理解 · 几何证明',
        highlight: '能够先圈出段落关键词，再组织概括答案。',
        nextStep: '继续练习一篇阅读理解，并尝试把答案压缩到 30 字以内。',
      },
      {
        id: 'daily-0831',
        title: '周末学习小结',
        date: '8月31日 19:30',
        summary: '复习本周错题 8 道，其中 6 道已经能够独立完成。',
        score: 79,
        change: '+4',
        focus: '错题复习 · 计算检查',
        highlight: '订正后会主动说明原来的错误原因。',
        nextStep: '保留仍未掌握的 2 道题，三天后再次复习。',
      },
    ],
  },
  weekly: {
    label: '每周',
    range: '本周 · 8月31日—9月6日',
    insight: '本周学习稳定性提升，数学正确率提高 12%，连续学习已保持 18 天。',
    trend: [48, 55, 61, 58, 70, 76, 86],
    reports: [
      {
        id: 'weekly-36',
        title: '第 36 周成长报告',
        date: '本周 · 更新至今天',
        summary: '学习节奏更稳定，数学推理和错题复盘是本周最明显的进步。',
        score: 86,
        change: '+12%',
        focus: '数学推理 · 自主订正',
        highlight: '本周主动向 AI 追问 9 次，能够用自己的语言复述解题过程。',
        nextStep: '保持每日一次错题回顾，周末完成一组函数综合练习。',
      },
      {
        id: 'weekly-35',
        title: '第 35 周成长报告',
        date: '8月24日—8月30日',
        summary: '完成 7 项学习任务，开始形成“先思考、再求助”的学习习惯。',
        score: 78,
        change: '+7%',
        focus: '学习习惯 · 英语阅读',
        highlight: '连续 7 天按计划完成晚间复习，拖延次数减少。',
        nextStep: '阅读概括题继续练习关键词提取，注意答案表达的完整性。',
      },
      {
        id: 'weekly-34',
        title: '第 34 周成长报告',
        date: '8月17日—8月23日',
        summary: '错题复习开始规律化，基础计算准确率稳步回升。',
        score: 72,
        change: '+5%',
        focus: '错题整理 · 基础计算',
        highlight: '能够区分“不会做”和“粗心错”，复习目标更明确。',
        nextStep: '每天保留 15 分钟无提示独立作答，记录检查过程。',
      },
    ],
  },
  monthly: {
    label: '每月',
    range: '本月 · 2026年9月',
    insight: '近 30 天累计学习 124 小时，薄弱知识点减少 6 个，成长趋势持续向上。',
    trend: [38, 47, 52, 63, 72, 86],
    reports: [
      {
        id: 'monthly-09',
        title: '9月成长月报',
        date: '9月 · 持续更新',
        summary: '自主学习意愿增强，函数与阅读理解已成为优势增长项。',
        score: 86,
        change: '+9.2%',
        focus: '自主学习 · 综合应用',
        highlight: '本月已完成 38 次有效对话，主动复盘比例达到 76%。',
        nextStep: '在保持稳定学习时长的同时，增加综合题和限时训练。',
      },
      {
        id: 'monthly-08',
        title: '8月成长月报',
        date: '8月1日—8月31日',
        summary: '建立稳定的晚间学习节奏，累计掌握 12 个重点知识点。',
        score: 77,
        change: '+11%',
        focus: '习惯养成 · 基础巩固',
        highlight: '连续学习天数从 5 天提升到 17 天，任务完成率达到 89%。',
        nextStep: '把错题复习从“看懂”升级到“隔天能独立做对”。',
      },
      {
        id: 'monthly-07',
        title: '7月成长月报',
        date: '7月1日—7月31日',
        summary: '开始使用 BingoMate 制订计划，逐步找到适合自己的学习节奏。',
        score: 66,
        change: '+8%',
        focus: '目标规划 · 作业管理',
        highlight: '能够把较大的学习任务拆成多个可完成的小目标。',
        nextStep: '固定每天开始学习的时间，减少临时安排带来的拖延。',
      },
    ],
  },
};

const initialRemoteChannels: RemoteChannel[] = [
  {
    id: 'wechat',
    name: '微信',
    description: '关联微信联系人，在微信中直接与 BingoMate 对话。',
    account: '林小满的微信',
    connected: true,
    recommended: true,
    logo: '/channels/wechat.svg',
  },
  {
    id: 'wecom',
    name: '企业微信',
    description: '接入企微群聊或私聊，适合班级与学习小组协作。',
    account: '暂未配置 Agent',
    connected: false,
    recommended: true,
    logo: '/channels/wecom.svg',
  },
  {
    id: 'qq',
    name: 'QQ',
    description: '将 BingoMate 接入 QQ，随时在群聊或私聊中互动。',
    account: 'BingoMate 学习助手',
    connected: true,
    recommended: true,
    logo: '/channels/qq.svg',
  },
  {
    id: 'feishu',
    name: '飞书',
    description: '接入飞书机器人，在群聊或私聊中完成学习任务。',
    account: '暂未配置 Agent',
    connected: false,
    logo: '/channels/feishu.svg',
  },
  {
    id: 'dingtalk',
    name: '钉钉',
    description: '接入钉钉机器人，支持班级群和学习团队协作。',
    account: 'BingoMate 班级助手',
    connected: true,
    logo: '/channels/dingtalk.svg',
  },
];

const initialScheduledTasks: ScheduledTask[] = [
  {
    id: 'homework-reminder',
    name: '晚间作业检查',
    instruction: '提醒学生检查当天作业是否完成，并整理明天需要携带的课本。',
    expert: '学习规划助手',
    schedule: '每天 20:00',
    channel: 'My BingoClaw',
    active: true,
    lastRun: '昨天 20:00 · 成功',
    source: 'app',
  },
  {
    id: 'word-review',
    name: '英语单词晨间复习',
    instruction: '从本周错词中选择 10 个单词，带学生快速复习和朗读。',
    expert: '英语陪练助手',
    schedule: '工作日 07:10',
    channel: 'App 通知',
    active: true,
    lastRun: '今天 07:10 · 成功',
    source: 'chat',
  },
  {
    id: 'parent-report',
    name: '每周学习报告',
    instruction: '汇总本周学习时长、错题变化和下周建议，发送给家长。',
    expert: '成长报告助手',
    schedule: '每周日 20:30',
    channel: '微信',
    active: false,
    lastRun: '8月30日 20:30 · 成功',
    source: 'app',
  },
];

function IconBox({
  icon: Icon,
  color,
}: {
  icon: LucideIcon;
  color: string;
}) {
  return (
    <span
      className={`grid size-10 shrink-0 place-items-center rounded-xl ${color}`}
    >
      <Icon className="size-5" />
    </span>
  );
}

function PointsIcon({ className = 'size-11' }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm shadow-orange-200 ring-2 ring-white ${className}`}
    >
      <Star className="size-5 fill-current" />
    </span>
  );
}

function Header({
  title,
  subtitle,
  onBack,
  onMenu,
  backLabel = '返回聊天',
  brandMark,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onMenu?: () => void;
  backLabel?: string;
  brandMark?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 min-h-[72px] border-b bg-background/95 px-4 pt-[max(8px,env(safe-area-inset-top))] backdrop-blur md:px-8">
      <div className="mx-auto flex min-h-[63px] w-full max-w-6xl items-center gap-3">
        <button
          aria-label={onMenu ? '打开菜单' : backLabel}
          onClick={onMenu ?? onBack}
          className="grid size-11 shrink-0 place-items-center rounded-2xl border bg-card transition-colors hover:bg-muted"
        >
          {onMenu ? (
            <Menu className="size-5" />
          ) : (
            <ArrowLeft className="size-5" />
          )}
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {brandMark}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold">{title}</h1>
            {subtitle && (
              <p className="truncate text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {right}
      </div>
    </header>
  );
}

function SkillsView({
  onBack,
  onSelect,
  installedSkills,
}: {
  onBack: () => void;
  onSelect: (skill: Skill) => void;
  installedSkills: Set<string>;
}) {
  const skillCategoryGroups: { label: string; categories: string[] }[] = [
    { label: '全部', categories: [] },
    { label: '学科辅导', categories: ['数学辅导', '英语学习'] },
    { label: '复习练习', categories: ['复习规划', '智能练习'] },
    { label: '学习效率', categories: ['学习效率'] },
    { label: '知识拓展', categories: ['知识拓展'] },
  ];
  const [activeCategory, setActiveCategory] = useState('全部');
  const selectedCategory = skillCategoryGroups.find(
    (group) => group.label === activeCategory,
  );
  const filteredSkills =
    activeCategory === '全部'
      ? skills
      : skills.filter((skill) =>
          selectedCategory?.categories.includes(skill.category),
        );

  return (
    <>
      <Header
        title="技能广场"
        subtitle="为 BingoMate 添加新能力"
        onBack={onBack}
        backLabel="返回聊天"
      />
      <div className="mx-auto h-[calc(100dvh-72px)] w-full max-w-6xl overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              {activeCategory === '全部' ? '热门技能' : activeCategory}
            </h2>
            <p className="text-xs text-muted-foreground">
              全部免费 · 随时可以使用
            </p>
          </div>
          <Badge variant="secondary" className="h-7 px-3">
            {filteredSkills.length} 个技能
          </Badge>
        </div>

        <nav
          aria-label="技能分类"
          className="-mx-4 mb-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
        >
          <div className="flex w-max gap-2 md:w-full md:flex-wrap">
            {skillCategoryGroups.map((group) => {
              const selected = activeCategory === group.label;
              return (
                <button
                  key={group.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(group.label)}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    selected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
          {filteredSkills.map((skill) => {
            const installed = installedSkills.has(skill.id);
            return (
              <button
                key={skill.id}
                aria-label={`查看技能：${skill.name}`}
                onClick={() => onSelect(skill)}
                className="group grid w-full grid-cols-[112px_minmax(0,1fr)] gap-3 rounded-[24px] border bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md active:translate-y-0 active:bg-blue-50 sm:grid-cols-[128px_minmax(0,1fr)]"
              >
                <div className="aspect-square w-full self-center overflow-hidden rounded-[20px] bg-slate-100">
                  <img
                    src={skill.image}
                    alt={`${skill.name}卡通插画`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-col py-0.5">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <h3 className="truncate font-bold">{skill.name}</h3>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {skill.author} · {skill.category}
                      </p>
                    </div>
                    <ChevronRight className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {skill.description}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-2 text-xs text-muted-foreground">
                    {installed ? (
                      <Badge className="h-6 shrink-0 gap-1 bg-emerald-50 px-2 text-emerald-700">
                        <Check className="size-3" />
                        已安装
                      </Badge>
                    ) : (
                      <span className="font-semibold text-foreground">免费</span>
                    )}
                    <span className="flex shrink-0 items-center gap-1 tabular-nums">
                      <Flame className="size-3.5" />
                      {skill.users}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function SkillDetailView({
  skill,
  installed,
  onBack,
  onInstall,
}: {
  skill: Skill;
  installed: boolean;
  onBack: () => void;
  onInstall: (skill: Skill) => void;
}) {
  return (
    <>
      <Header
        title="技能详情"
        subtitle={skill.category}
        onBack={onBack}
        backLabel="返回技能广场"
      />
      <div className="flex h-[calc(100dvh-72px)] flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto w-full max-w-4xl">
          <section className="rounded-[28px] border border-blue-100 bg-blue-50 p-5">
            <div className="flex items-start gap-4">
              <div className="size-24 shrink-0 overflow-hidden rounded-[24px] bg-white shadow-sm">
                <img
                  src={skill.image}
                  alt={`${skill.name}卡通插画`}
                  width={512}
                  height={512}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-tight">
                  {skill.name}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{skill.author}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <Badge variant="outline" className="border-blue-200 bg-white">
                    {skill.category}
                  </Badge>
                  <span>v{skill.version}</span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" />
                    {skill.users}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-700">
              {skill.description}
            </p>
          </section>

          <Tabs defaultValue="overview" className="mt-5">
            <TabsList variant="line" className="grid h-11 w-full grid-cols-3">
              <TabsTrigger value="overview" className="min-h-11">
                产品介绍
              </TabsTrigger>
              <TabsTrigger value="details" className="min-h-11">
                技能详情
              </TabsTrigger>
              <TabsTrigger value="reviews" className="min-h-11">
                用户评价
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-5 space-y-4">
              <section className="rounded-3xl border bg-white p-5">
                <h3 className="font-bold">这个技能能做什么</h3>
                <div className="mt-4 space-y-3">
                  {skill.capabilities.map((capability) => (
                    <div key={capability} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                        <Check className="size-3.5" />
                      </span>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {capability}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-3xl border bg-white p-5">
                <div className="flex items-center gap-2">
                  <Sparkle className="size-5 text-primary" />
                  <h3 className="font-bold">使用示例</h3>
                </div>
                <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-700">
                  “{skill.example}”
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  安装后，在聊天框输入需求，BingoMate 会自动选择并调用这个技能。
                </p>
              </section>
            </TabsContent>

            <TabsContent value="details" className="mt-5 space-y-4">
              <section className="rounded-3xl border bg-white p-5">
                <h3 className="font-bold">基本信息</h3>
                <dl className="mt-4 space-y-4 text-sm">
                  {[
                    ['开发者', skill.author],
                    ['版本', skill.version],
                    ['适用范围', skill.category],
                    ['费用', '免费'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section className="rounded-3xl border bg-white p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-emerald-600" />
                  <h3 className="font-bold">隐私与权限</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  仅在你主动选择资料时访问相关内容，安装技能前会清楚说明所需权限。
                </p>
              </section>
            </TabsContent>

            <TabsContent value="reviews" className="mt-5">
              <section className="rounded-3xl border bg-white p-5">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold tabular-nums">4.9</span>
                  <div className="pb-1">
                    <div
                      className="flex gap-0.5 text-amber-500"
                      aria-label="5 星评价"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      来自 328 位学生的体验反馈
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['提示清楚', '操作简单', '适合复习'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="h-8 px-3">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
          </div>
        </div>

        <div className="shrink-0 border-t bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 md:px-8">
          <div className="mx-auto flex w-full max-w-4xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-bold">免费</p>
              <p className="text-xs text-muted-foreground">安装后立即可用</p>
            </div>
            <Button
              disabled={installed}
              onClick={() => onInstall(skill)}
              className="h-12 min-w-32 rounded-2xl text-base"
            >
              {installed ? (
                <>
                  <Check className="size-5" />
                  已安装
                </>
              ) : (
                <>
                  <Plus className="size-5" />
                  免费安装
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Sidebar({
  open,
  onClose,
  onFeature,
  onHistory,
  onSettings,
  onPoints,
  currentDeviceName,
  onSwitchDevice,
  points,
  notify,
}: {
  open: boolean;
  onClose: () => void;
  onFeature: (label: string) => void;
  onHistory: (title: string) => void;
  onSettings: () => void;
  onPoints: () => void;
  currentDeviceName: string;
  onSwitchDevice: () => void;
  points: number;
  notify: (message: string) => void;
}) {
  return (
    <div
      className={`${open ? 'flex' : 'hidden'} fixed inset-0 z-50 justify-start bg-slate-950/55 backdrop-blur-[2px]`}
    >
      <aside
        aria-label="功能与聊天记录"
        className="flex h-dvh w-[min(340px,88vw)] flex-col border-r bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b px-4 pb-4 pt-[max(20px,env(safe-area-inset-top))]">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-200 ring-2 ring-blue-50"
            >
              <UserRound className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">林小满</p>
              <button
                aria-label={`切换设备，当前为${currentDeviceName}`}
                onClick={onSwitchDevice}
                className="mt-0.5 flex max-w-[190px] items-center gap-1.5 rounded-lg text-left text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-100"
                />
                <span className="sr-only">设备连接正常：</span>
                <span className="truncate">{currentDeviceName}</span>
                <ChevronsUpDown className="size-3.5 shrink-0" />
              </button>
            </div>
          </div>
          <button
            aria-label="关闭菜单"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-xl bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <button
            onClick={() => onHistory('新对话')}
            className="mb-5 flex min-h-12 w-full items-center gap-3 rounded-2xl bg-primary px-4 text-left font-semibold text-white"
          >
            <MessageSquarePlus className="size-5" />
            新对话
          </button>
          <section>
            <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
              其他功能
            </p>
            <div className="space-y-1">
              {features.map(({ label, hint, icon, iconColor }) => (
                <button
                  key={label}
                  onClick={() => onFeature(label)}
                  className="flex min-h-[62px] w-full items-center gap-3 rounded-2xl px-2 text-left transition-colors hover:bg-muted"
                >
                  <IconBox icon={icon} color={iconColor} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {hint}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
          <div className="my-5 border-t" />
          <section>
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-xs font-semibold text-muted-foreground">
                聊天记录
              </p>
              <button
                aria-label="搜索聊天记录"
                onClick={() => notify('输入关键词即可查找聊天记录')}
                className="grid size-9 place-items-center rounded-xl hover:bg-muted"
              >
                <Search className="size-4" />
              </button>
            </div>
            {histories.map((group) => (
              <div key={group.group} className="mb-4">
                <p className="mb-1 px-2 text-[11px] text-muted-foreground">
                  {group.group}
                </p>
                {group.items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => onHistory(item.title)}
                    className="flex min-h-[58px] w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <History className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{item.title}</span>
                      <span
                        className={`mt-1 inline-flex w-fit rounded-md px-1.5 py-0.5 text-[10px] font-medium ${item.tagStyle}`}
                      >
                        {item.tag}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </section>
        </div>
        <div className="flex items-center gap-3 border-t bg-white px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
          <div className="flex min-h-16 min-w-0 flex-1 items-center rounded-2xl bg-amber-50 pr-2 transition-colors hover:bg-amber-100">
            <button
              aria-label={`查看积分明细，当前剩余${points}积分`}
              onClick={onPoints}
              className="flex min-h-16 min-w-0 flex-1 items-center gap-3 px-3 text-left"
            >
              <PointsIcon />
              <span className="min-w-0">
                <span className="block text-xs text-amber-800/70">剩余积分</span>
                <span className="block truncate font-bold tabular-nums text-amber-900">
                  {points.toLocaleString()}
                </span>
              </span>
            </button>
            <button
              aria-label="充值积分"
              onClick={onPoints}
              className="min-h-11 shrink-0 rounded-xl border border-amber-200 bg-white px-3 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100"
            >
              充值
            </button>
          </div>
          <button
            aria-label="打开设置"
            onClick={onSettings}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-md shadow-blue-200 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Settings className="size-5" />
          </button>
        </div>
      </aside>
      <button
        aria-label="关闭侧栏"
        onClick={onClose}
        className="h-full flex-1"
      />
    </div>
  );
}

function SettingsView({
  onBack,
  onProfile,
  onPreferences,
  onSecurity,
  onDevices,
  onChannels,
  currentDeviceName,
  profileCompleted,
  preferences,
  notify,
}: {
  onBack: () => void;
  onProfile: () => void;
  onPreferences: () => void;
  onSecurity: () => void;
  onDevices: () => void;
  onChannels: () => void;
  currentDeviceName: string;
  profileCompleted: boolean;
  preferences: TutoringPreferences;
  notify: (message: string) => void;
}) {
  const sections: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: LucideIcon;
      color: string;
      reward?: string;
    }[];
  }[] = [
    {
      title: '学习设置',
      items: [
        {
          label: '学生档案',
          description: profileCompleted
            ? '资料已完善 · AI 将结合学情提供辅导'
            : '待补充地区、学校和教材信息',
          icon: UserRound,
          color: 'bg-blue-50 text-blue-600',
          reward: profileCompleted ? undefined : '完善送 100 积分',
        },
        {
          label: '辅导偏好',
          description: `${preferences.guidanceMode} · ${preferences.detailLevel}讲解 · ${preferences.tone}`,
          icon: SlidersHorizontal,
          color: 'bg-violet-50 text-violet-600',
        },
      ],
    },
    {
      title: '设备与提醒',
      items: [
        {
          label: 'BingoMate 设备',
          description: `${currentDeviceName} · 当前已连接`,
          icon: MonitorSmartphone,
          color: 'bg-orange-50 text-orange-600',
        },
        {
          label: '通知提醒',
          description: '复习计划、定时试卷与低余额提醒',
          icon: Bell,
          color: 'bg-rose-50 text-rose-600',
        },
      ],
    },
    {
      title: '账号与支持',
      items: [
        {
          label: '账号与安全',
          description: '密码、手机号与登录保护',
          icon: LockKeyhole,
          color: 'bg-slate-100 text-slate-700',
        },
        {
          label: '第三方绑定',
          description: '微信、企业微信、QQ、飞书、钉钉等远控通道',
          icon: Link2,
          color: 'bg-sky-50 text-sky-600',
        },
        {
          label: '隐私设置',
          description: '学习记录、设备与权限管理',
          icon: ShieldCheck,
          color: 'bg-teal-50 text-teal-700',
        },
        {
          label: '帮助与反馈',
          description: '常见问题与问题反馈',
          icon: CircleHelp,
          color: 'bg-indigo-50 text-indigo-600',
        },
      ],
    },
  ];

  return (
    <>
      <Header
        title="设置"
        subtitle="学习偏好、设备与账号"
        onBack={onBack}
        backLabel="返回聊天"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
                {section.title}
              </h2>
              <div className="overflow-hidden rounded-3xl border bg-white">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() =>
                        item.label === '学生档案'
                          ? onProfile()
                          : item.label === '辅导偏好'
                            ? onPreferences()
                          : item.label === '账号与安全'
                            ? onSecurity()
                          : item.label === 'BingoMate 设备'
                            ? onDevices()
                            : item.label === '第三方绑定'
                              ? onChannels()
                          : notify(`已打开${item.label}`)
                      }
                      className={`flex min-h-[72px] w-full items-center gap-3 px-4 text-left transition-colors hover:bg-muted ${index ? 'border-t' : ''}`}
                    >
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-2xl ${item.color}`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">
                            {item.label}
                          </span>
                          {item.reward && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-800">
                              <Gift className="size-3" />
                              {item.reward}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <button
            onClick={() => notify('退出登录需要二次确认')}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="size-5" />
            退出登录
          </button>
        </div>
      </div>
    </>
  );
}

function StudentProfileView({
  profile,
  completed,
  onBack,
  onSave,
}: {
  profile: StudentProfile;
  completed: boolean;
  onBack: () => void;
  onSave: (profile: StudentProfile) => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState('');
  const requiredFields: (keyof StudentProfile)[] = [
    'nickname',
    'region',
    'grade',
    'school',
    'textbook',
    'focusSubject',
    'learningGoal',
  ];
  const completedCount = requiredFields.filter(
    (field) => draft[field].trim().length > 0,
  ).length;
  const completion = Math.round(
    (completedCount / requiredFields.length) * 100,
  );

  const updateProfile = (field: keyof StudentProfile, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const saveProfile = () => {
    if (completedCount < requiredFields.length) {
      setError('请先完成带“必填”标识的信息，再领取积分奖励。');
      return;
    }
    onSave(draft);
  };

  const inputClassName =
    'mt-2 min-h-12 w-full rounded-2xl border bg-slate-50 px-4 text-base text-slate-900 outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100';

  return (
    <>
      <Header
        title="学生档案"
        subtitle="让 AI 更懂你的学习情况"
        onBack={onBack}
        backLabel="返回设置"
      />
      <div className="flex h-[calc(100dvh-72px)] flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-lg shadow-blue-100">
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <GraduationCap className="size-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-bold">档案完整度</h2>
                    <span className="text-lg font-bold tabular-nums">
                      {completion}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white transition-[width] duration-300"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-blue-50">
                    {completed
                      ? '档案已完善，后续修改会自动更新 AI 的辅导参考。'
                      : '补全关键学习信息，AI 的讲解和练习会更贴合你。'}
                  </p>
                </div>
              </div>
              {!completed && (
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2.5 text-sm font-semibold ring-1 ring-white/20">
                  <Gift className="size-5" />
                  首次完善档案，赠送 100 积分
                </div>
              )}
            </section>

            <section className="rounded-3xl border bg-white p-4 md:p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold">基本学习信息</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    帮助 AI 判断所在地区的课程范围、年级难度和学校进度。
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label htmlFor="profile-nickname" className="text-sm font-semibold">
                  学生昵称 <span className="text-rose-500">必填</span>
                  <input
                    id="profile-nickname"
                    value={draft.nickname}
                    onChange={(event) =>
                      updateProfile('nickname', event.target.value)
                    }
                    placeholder="例如：林小满"
                    className={inputClassName}
                  />
                </label>
                <label htmlFor="profile-grade" className="text-sm font-semibold">
                  当前年级 <span className="text-rose-500">必填</span>
                  <select
                    id="profile-grade"
                    value={draft.grade}
                    onChange={(event) =>
                      updateProfile('grade', event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">请选择年级</option>
                    {[
                      '一年级',
                      '二年级',
                      '三年级',
                      '四年级',
                      '五年级',
                      '六年级',
                      '七年级',
                      '八年级',
                      '九年级',
                      '高一',
                      '高二',
                      '高三',
                    ].map((grade) => (
                      <option key={grade}>{grade}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="profile-region" className="text-sm font-semibold">
                  所在地区 <span className="text-rose-500">必填</span>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="profile-region"
                      value={draft.region}
                      onChange={(event) =>
                        updateProfile('region', event.target.value)
                      }
                      placeholder="例如：广东省深圳市"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </label>
                <label htmlFor="profile-school" className="text-sm font-semibold">
                  学校 <span className="text-rose-500">必填</span>
                  <div className="relative">
                    <School className="pointer-events-none absolute left-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="profile-school"
                      value={draft.school}
                      onChange={(event) =>
                        updateProfile('school', event.target.value)
                      }
                      placeholder="可填写学校简称"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                  <span className="mt-1.5 block text-xs font-normal text-muted-foreground">
                    仅用于匹配本地教学进度
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-3xl border bg-white p-4 md:p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
                  <BookOpen className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold">课程与学习目标</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    教材、薄弱点和目标会用于生成更合适的例题与复习计划。
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label htmlFor="profile-subject" className="text-sm font-semibold">
                  重点科目 <span className="text-rose-500">必填</span>
                  <select
                    id="profile-subject"
                    value={draft.focusSubject}
                    onChange={(event) =>
                      updateProfile('focusSubject', event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">请选择重点科目</option>
                    {['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'].map(
                      (subject) => (
                        <option key={subject}>{subject}</option>
                      ),
                    )}
                  </select>
                </label>
                <label htmlFor="profile-textbook" className="text-sm font-semibold">
                  教材版本 <span className="text-rose-500">必填</span>
                  <select
                    id="profile-textbook"
                    value={draft.textbook}
                    onChange={(event) =>
                      updateProfile('textbook', event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">请选择教材版本</option>
                    {['人教版', '北师大版', '苏教版', '沪教版', '浙教版', '鲁教版', '其他版本'].map(
                      (textbook) => (
                        <option key={textbook}>{textbook}</option>
                      ),
                    )}
                  </select>
                </label>
              </div>
              <label htmlFor="profile-weak-topics" className="mt-4 block text-sm font-semibold">
                当前薄弱点 <span className="font-normal text-muted-foreground">选填</span>
                <textarea
                  id="profile-weak-topics"
                  value={draft.weakTopics}
                  onChange={(event) =>
                    updateProfile('weakTopics', event.target.value)
                  }
                  placeholder="例如：二次函数、几何证明容易丢分"
                  rows={3}
                  className={`${inputClassName} resize-none py-3 leading-relaxed`}
                />
              </label>
              <label htmlFor="profile-goal" className="mt-4 block text-sm font-semibold">
                阶段目标 <span className="text-rose-500">必填</span>
                <div className="relative">
                  <Target className="pointer-events-none absolute left-4 top-6 size-4 text-slate-400" />
                  <textarea
                    id="profile-goal"
                    value={draft.learningGoal}
                    onChange={(event) =>
                      updateProfile('learningGoal', event.target.value)
                    }
                    placeholder="例如：期末数学稳定在 90 分以上"
                    rows={3}
                    className={`${inputClassName} resize-none py-3 pl-11 leading-relaxed`}
                  />
                </div>
              </label>
            </section>

            <section className="rounded-3xl border bg-white p-4 md:p-5">
              <label htmlFor="profile-guidance" className="text-sm font-semibold">
                AI 辅导方式
                <select
                  id="profile-guidance"
                  value={draft.guidanceStyle}
                  onChange={(event) =>
                    updateProfile('guidanceStyle', event.target.value)
                  }
                  className={inputClassName}
                >
                  <option>先启发思考，再给完整解析</option>
                  <option>先讲知识点，再带我做题</option>
                  <option>直接指出错误，并给出改进建议</option>
                </select>
              </label>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                这些资料只用于个性化学习辅助，可随时回来修改。
              </p>
            </section>
          </div>
        </div>
        <div className="shrink-0 border-t bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:px-8">
          <div className="mx-auto w-full max-w-3xl">
            {error && (
              <p role="alert" className="mb-2 text-sm font-medium text-rose-600">
                {error}
              </p>
            )}
            <Button
              onClick={saveProfile}
              className="h-12 w-full rounded-2xl text-base font-bold"
            >
              {completed ? (
                '保存档案'
              ) : (
                <>
                  <Gift className="size-5" />
                  完善档案并领取 100 积分
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function TutoringPreferencesView({
  preferences,
  onBack,
  onSave,
}: {
  preferences: TutoringPreferences;
  onBack: () => void;
  onSave: (preferences: TutoringPreferences) => void;
}) {
  const [draft, setDraft] = useState(preferences);

  const updatePreference = <K extends keyof TutoringPreferences>(
    field: K,
    value: TutoringPreferences[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const choiceGroups: {
    label: string;
    description: string;
    field: keyof Pick<
      TutoringPreferences,
      'detailLevel' | 'difficulty' | 'hintPace' | 'tone'
    >;
    options: string[];
  }[] = [
    {
      label: '讲解详细度',
      description: '控制每次回答包含多少步骤和说明',
      field: 'detailLevel',
      options: ['精简', '标准', '详细'],
    },
    {
      label: '练习难度',
      description: 'AI 会根据选择调整例题与追问难度',
      field: 'difficulty',
      options: ['巩固基础', '跟随进度', '适当挑战'],
    },
    {
      label: '提示节奏',
      description: '遇到困难时，AI 应该一次提示多少内容',
      field: 'hintPace',
      options: ['一次一点', '关键步骤', '完整思路'],
    },
    {
      label: '回答语气',
      description: '选择更适合当前学生的沟通方式',
      field: 'tone',
      options: ['耐心鼓励', '简洁直接', '考试导向'],
    },
  ];

  const behaviorSettings: {
    label: string;
    description: string;
    field: keyof Pick<
      TutoringPreferences,
      'askBeforeAnswer' | 'autoSaveMistakes' | 'lessonSummary'
    >;
  }[] = [
    {
      label: '先让学生尝试作答',
      description: '在给出答案前，先邀请学生说出自己的思路',
      field: 'askBeforeAnswer',
    },
    {
      label: '自动加入错题记录',
      description: '发现稳定错因后，自动沉淀到错题复习',
      field: 'autoSaveMistakes',
    },
    {
      label: '对话结束生成小结',
      description: '总结知识点、掌握情况和下一步建议',
      field: 'lessonSummary',
    },
  ];

  return (
    <>
      <Header
        title="辅导偏好"
        subtitle="设置适合自己的 AI 学习方式"
        onBack={onBack}
        backLabel="返回设置"
      />
      <div className="flex h-[calc(100dvh-72px)] flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <section className="rounded-3xl border bg-white p-4 md:p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  <SlidersHorizontal className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold">辅导方式</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    决定 AI 如何带领学生理解和解决问题
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  {
                    value: '启发式引导',
                    description: '先提问和提示，引导学生自己找到答案',
                  },
                  {
                    value: '分步讲解',
                    description: '把问题拆成小步骤，一步一步完成',
                  },
                  {
                    value: '直接纠错',
                    description: '快速指出问题，并给出正确方法',
                  },
                ].map((option) => {
                  const selected = draft.guidanceMode === option.value;
                  return (
                    <button
                      key={option.value}
                      aria-pressed={selected}
                      onClick={() =>
                        updatePreference('guidanceMode', option.value)
                      }
                      className={`flex min-h-[68px] items-center gap-3 rounded-2xl border px-3 text-left transition-colors ${selected ? 'border-violet-300 bg-violet-50' : 'bg-slate-50 hover:bg-slate-100'}`}
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full ${selected ? 'bg-violet-600 text-white' : 'border bg-white text-transparent'}`}
                      >
                        <Check className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">
                          {option.value}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border bg-white p-4 md:p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Gauge className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold">内容与节奏</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    控制答案长度、练习挑战和互动节奏
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-5">
                {choiceGroups.map((group) => (
                  <div key={group.field}>
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="text-sm font-semibold">{group.label}</h3>
                      <p className="text-right text-[11px] text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1.5">
                      {group.options.map((option) => {
                        const selected = draft[group.field] === option;
                        return (
                          <button
                            key={option}
                            aria-pressed={selected}
                            onClick={() =>
                              updatePreference(group.field, option)
                            }
                            className={`min-h-11 rounded-xl px-2 text-xs font-semibold transition-[background-color,color,box-shadow] ${selected ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-white/60'}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
                学习记录与反馈
              </h2>
              <div className="overflow-hidden rounded-3xl border bg-white">
                {behaviorSettings.map((setting, index) => {
                  const checked = draft[setting.field];
                  return (
                    <button
                      key={setting.field}
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      onClick={() =>
                        updatePreference(setting.field, !checked)
                      }
                      className={`flex min-h-[76px] w-full items-center gap-3 px-4 text-left transition-colors hover:bg-muted ${index ? 'border-t' : ''}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {setting.label}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {setting.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors ${checked ? 'justify-end bg-blue-600' : 'justify-start bg-slate-300'}`}
                      >
                        <span className="size-6 rounded-full bg-white shadow-sm" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

          </div>
        </div>
        <div className="shrink-0 border-t bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:px-8">
          <div className="mx-auto w-full max-w-3xl">
            <Button
              onClick={() => onSave(draft)}
              className="h-12 w-full rounded-2xl text-base font-bold"
            >
              保存辅导偏好
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function AccountSecurityView({
  phone,
  passwordUpdatedAt,
  onBack,
  onPhoneChange,
  onPasswordChange,
}: {
  phone: string;
  passwordUpdatedAt: string;
  onBack: () => void;
  onPhoneChange: (phone: string) => void;
  onPasswordChange: () => void;
}) {
  const [phoneSheetOpen, setPhoneSheetOpen] = useState(false);
  const [passwordSheetOpen, setPasswordSheetOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const maskedPhone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1 **** $2');

  const resetPhoneForm = () => {
    setNewPhone('');
    setVerificationCode('');
    setCodeSent(false);
    setPhoneError('');
  };

  const sendVerificationCode = () => {
    if (!/^1[3-9]\d{9}$/.test(newPhone)) {
      setPhoneError('请输入正确的 11 位中国大陆手机号。');
      return;
    }
    if (newPhone === phone) {
      setPhoneError('新手机号不能与当前手机号相同。');
      return;
    }
    setPhoneError('');
    setCodeSent(true);
  };

  const savePhone = () => {
    if (!codeSent) {
      setPhoneError('请先获取验证码。');
      return;
    }
    if (!/^\d{4,6}$/.test(verificationCode)) {
      setPhoneError('请输入收到的 4—6 位验证码。');
      return;
    }
    onPhoneChange(newPhone);
    setPhoneSheetOpen(false);
    resetPhoneForm();
  };

  const resetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswords(false);
    setPasswordError('');
  };

  const savePassword = () => {
    if (!currentPassword) {
      setPasswordError('请输入当前密码。');
      return;
    }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      setPasswordError('新密码至少 8 位，并同时包含字母和数字。');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('两次输入的新密码不一致。');
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError('新密码不能与当前密码相同。');
      return;
    }
    onPasswordChange();
    setPasswordSheetOpen(false);
    resetPasswordForm();
  };

  const inputClassName =
    'h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100';

  return (
    <>
      <Header
        title="账号与安全"
        subtitle="手机号、密码与登录保护"
        onBack={onBack}
        backLabel="返回设置"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-3xl">
          <section>
            <h2 className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
              登录信息
            </h2>
            <div className="overflow-hidden rounded-3xl border bg-white">
              <div className="flex min-h-[88px] items-center gap-3 px-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Smartphone className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">账号手机号</p>
                  <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                    {maskedPhone}
                  </p>
                </div>
                <button
                  onClick={() => setPhoneSheetOpen(true)}
                  className="min-h-11 shrink-0 rounded-xl bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  修改
                </button>
              </div>
              <div className="flex min-h-[88px] items-center gap-3 border-t px-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                  <KeyRound className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">登录密码</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {passwordUpdatedAt}
                  </p>
                </div>
                <button
                  onClick={() => setPasswordSheetOpen(true)}
                  className="min-h-11 shrink-0 rounded-xl bg-violet-50 px-4 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100"
                >
                  修改
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Drawer
        open={phoneSheetOpen}
        onOpenChange={(open) => {
          setPhoneSheetOpen(open);
          if (!open) resetPhoneForm();
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px] [--drawer-height:min(62dvh,500px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">更换手机号</DrawerTitle>
            <DrawerDescription className="text-left">
              当前绑定 {maskedPhone}，验证新手机号后即可更换。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭更换手机号"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <label htmlFor="security-phone" className="block text-sm font-semibold">
                新手机号
                <input
                  id="security-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={newPhone}
                  onChange={(event) => {
                    setNewPhone(event.target.value.replace(/\D/g, '').slice(0, 11));
                    setPhoneError('');
                    setCodeSent(false);
                  }}
                  placeholder="请输入 11 位手机号"
                  className={`mt-2 ${inputClassName}`}
                />
              </label>
              <label htmlFor="security-code" className="block text-sm font-semibold">
                短信验证码
                <span className="mt-2 flex gap-2">
                  <input
                    id="security-code"
                    inputMode="numeric"
                    value={verificationCode}
                    onChange={(event) => {
                      setVerificationCode(event.target.value.replace(/\D/g, '').slice(0, 6));
                      setPhoneError('');
                    }}
                    placeholder="请输入验证码"
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    className="min-h-12 min-w-[112px] shrink-0 rounded-2xl border bg-slate-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                  >
                    {codeSent ? '已发送' : '获取验证码'}
                  </button>
                </span>
              </label>
            </div>
            {codeSent && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-700">
                <Check className="size-4" />
                验证码已发送至新手机号
              </p>
            )}
            {phoneError && (
              <p role="alert" className="mt-3 text-sm font-medium text-rose-600">
                {phoneError}
              </p>
            )}
            <Button
              onClick={savePhone}
              className="mt-6 h-12 w-full rounded-2xl text-base font-bold"
            >
              确认更换
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={passwordSheetOpen}
        onOpenChange={(open) => {
          setPasswordSheetOpen(open);
          if (!open) resetPasswordForm();
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px] [--drawer-height:min(74dvh,610px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">修改登录密码</DrawerTitle>
            <DrawerDescription className="text-left">
              新密码至少 8 位，并同时包含字母和数字。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭修改密码"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              {[
                {
                  id: 'current-password',
                  label: '当前密码',
                  value: currentPassword,
                  setValue: setCurrentPassword,
                  placeholder: '请输入当前登录密码',
                },
                {
                  id: 'new-password',
                  label: '新密码',
                  value: newPassword,
                  setValue: setNewPassword,
                  placeholder: '至少 8 位，包含字母和数字',
                },
                {
                  id: 'confirm-password',
                  label: '确认新密码',
                  value: confirmPassword,
                  setValue: setConfirmPassword,
                  placeholder: '请再次输入新密码',
                },
              ].map((field) => (
                <label key={field.id} htmlFor={field.id} className="block text-sm font-semibold">
                  {field.label}
                  <span className="relative mt-2 block">
                    <input
                      id={field.id}
                      type={showPasswords ? 'text' : 'password'}
                      autoComplete={field.id === 'current-password' ? 'current-password' : 'new-password'}
                      value={field.value}
                      onChange={(event) => {
                        field.setValue(event.target.value);
                        setPasswordError('');
                      }}
                      placeholder={field.placeholder}
                      className={`${inputClassName} pr-12`}
                    />
                  </span>
                </label>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={showPasswords}
              onClick={() => setShowPasswords((current) => !current)}
              className="mt-3 flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-medium text-slate-600 transition-colors hover:bg-muted"
            >
              {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              {showPasswords ? '隐藏密码' : '显示密码'}
            </button>
            {passwordError && (
              <p role="alert" className="mt-2 text-sm font-medium text-rose-600">
                {passwordError}
              </p>
            )}
            <Button
              onClick={savePassword}
              className="mt-5 h-12 w-full rounded-2xl text-base font-bold"
            >
              保存新密码
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function DevicesView({
  devices,
  currentDeviceId,
  onBack,
  onBind,
  onRename,
}: {
  devices: BingoDevice[];
  currentDeviceId: string;
  onBack: () => void;
  onBind: (deviceCode: string, activationCode: string, name: string) => void;
  onRename: (deviceId: string, name: string) => void;
}) {
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [deviceCode, setDeviceCode] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [deviceName, setDeviceName] = useState('我的 BingoMate');
  const [renameDevice, setRenameDevice] = useState<BingoDevice | null>(null);
  const [renameName, setRenameName] = useState('');
  const canBind =
    deviceCode.trim().length > 0 &&
    activationCode.trim().length > 0 &&
    deviceName.trim().length > 0;

  const bindDevice = () => {
    if (!canBind) return;
    onBind(deviceCode.trim(), activationCode.trim(), deviceName.trim());
    setDeviceCode('');
    setActivationCode('');
    setDeviceName('我的 BingoMate');
    setAddDeviceOpen(false);
  };

  const openRename = (device: BingoDevice) => {
    setRenameDevice(device);
    setRenameName(device.name);
  };

  const saveDeviceName = () => {
    if (!renameDevice || !renameName.trim()) return;
    onRename(renameDevice.id, renameName.trim());
    setRenameDevice(null);
    setRenameName('');
  };

  return (
    <>
      <Header
        title="设备管理"
        subtitle="管理已绑定的 BingoMate"
        onBack={onBack}
        backLabel="返回设置"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-3 flex items-end justify-between px-1">
            <div>
              <h2 className="text-lg font-bold">设备列表</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                已绑定 {devices.length} 台设备
              </p>
            </div>
            <Button
              onClick={() => setAddDeviceOpen(true)}
              className="h-10 rounded-xl px-4"
            >
              <Plus className="size-4" />
              添加设备
            </Button>
          </div>

          <section className="overflow-hidden rounded-3xl border bg-white">
            {devices.map((device, index) => {
              const isCurrent = device.id === currentDeviceId;
              return (
                <div
                  key={device.id}
                  className={`flex min-h-[82px] items-center gap-3 px-4 py-3 ${index ? 'border-t' : ''}`}
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl ${isCurrent ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
                  >
                    <MonitorSmartphone className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">
                        {device.name}
                      </p>
                      {isCurrent && (
                        <Badge className="shrink-0 bg-blue-50 text-blue-700">
                          当前设备
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className={`size-2 rounded-full ${device.online ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        />
                        {device.online ? '在线' : '离线'}
                      </span>
                      <span className="truncate">设备码 {device.code}</span>
                    </div>
                  </div>
                  <button
                    aria-label={`编辑设备名称：${device.name}`}
                    onClick={() => openRename(device)}
                    className="grid size-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="size-4" />
                  </button>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <Drawer open={addDeviceOpen} onOpenChange={setAddDeviceOpen} showSwipeHandle>
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(68dvh,560px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
              <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <MonitorSmartphone className="size-5" />
              </span>
              添加 BingoMate 设备
            </DrawerTitle>
            <DrawerDescription className="text-left">
              输入设备机身上的设备码和激活码完成绑定。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭添加设备"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <div>
                <span className="mb-2 block text-sm font-semibold">设备码</span>
                <div className="flex gap-2">
                  <input
                    aria-label="设备码"
                    value={deviceCode}
                    onChange={(event) => setDeviceCode(event.target.value)}
                    placeholder="例如 BM-20260901"
                    autoComplete="off"
                    className="h-12 min-w-0 flex-1 rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    aria-label="扫码录入设备码"
                    onClick={() => setDeviceCode('BM-20260901')}
                    className="flex h-12 shrink-0 items-center gap-1.5 rounded-2xl border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    <ScanLine className="size-5" />
                    扫码
                  </button>
                </div>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">激活码</span>
                <input
                  aria-label="激活码"
                  value={activationCode}
                  onChange={(event) => setActivationCode(event.target.value)}
                  placeholder="请输入设备激活码"
                  autoComplete="off"
                  className="h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">设备名称</span>
                <input
                  aria-label="设备名称"
                  value={deviceName}
                  onChange={(event) => setDeviceName(event.target.value)}
                  placeholder="给设备起一个名称"
                  autoComplete="off"
                  className="h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
            <Button
              disabled={!canBind}
              onClick={bindDevice}
              className="mt-6 h-12 w-full rounded-2xl text-base font-bold"
            >
              绑定设备
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={Boolean(renameDevice)}
        onOpenChange={(open) => {
          if (!open) setRenameDevice(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(40dvh,330px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">编辑设备名称</DrawerTitle>
            <DrawerDescription className="text-left">
              设置一个容易辨认的名称，后续还可以继续修改。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭编辑名称"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">设备名称</span>
              <input
                aria-label="修改设备名称"
                value={renameName}
                onChange={(event) => setRenameName(event.target.value)}
                placeholder="请输入设备名称"
                autoComplete="off"
                className="h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <Button
              disabled={!renameName.trim()}
              onClick={saveDeviceName}
              className="mt-5 h-12 w-full rounded-2xl text-base font-bold"
            >
              保存名称
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function TasksView({
  tasks,
  onBack,
  onCreate,
  onToggle,
}: {
  tasks: ScheduledTask[];
  onBack: () => void;
  onCreate: (task: ScheduledTask) => void;
  onToggle: (taskId: string) => void;
}) {
  const [tab, setTab] = useState<'list' | 'history'>('list');
  const [createOpen, setCreateOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [instruction, setInstruction] = useState('');
  const [expert, setExpert] = useState('学习规划助手');
  const [frequency, setFrequency] = useState('每天');
  const [time, setTime] = useState('20:00');
  const [channel, setChannel] = useState('My BingoClaw');
  const canSave = Boolean(taskName.trim() && instruction.trim() && time);

  const saveTask = () => {
    if (!canSave) return;
    const schedule =
      frequency === '每周'
        ? `每周日 ${time}`
        : frequency === '单次'
          ? `明天 ${time}`
          : `${frequency} ${time}`;
    onCreate({
      id: `task-${Date.now()}`,
      name: taskName.trim(),
      instruction: instruction.trim(),
      expert,
      schedule,
      channel,
      active: true,
      source: 'app',
    });
    setTaskName('');
    setInstruction('');
    setExpert('学习规划助手');
    setFrequency('每天');
    setTime('20:00');
    setChannel('My BingoClaw');
    setCreateOpen(false);
  };

  return (
    <>
      <Header
        title="定时任务"
        subtitle="学习提醒与自动报告"
        onBack={onBack}
        backLabel="返回聊天"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 rounded-2xl bg-muted p-1">
              {[
                ['list', '任务列表'],
                ['history', '执行历史'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={tab === value}
                  onClick={() => setTab(value as 'list' | 'history')}
                  className={`min-h-10 flex-1 rounded-xl px-3 text-sm font-semibold transition-colors ${tab === value ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setCreateOpen(true)}
              className="h-12 shrink-0 rounded-2xl px-4"
            >
              <Plus className="size-4" />
              创建任务
            </Button>
          </div>

          {tab === 'list' ? (
            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className="rounded-[24px] border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl ${task.active ? 'bg-fuchsia-50 text-fuchsia-600' : 'bg-slate-100 text-slate-500'}`}
                    >
                      <CalendarClock className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold">{task.name}</h2>
                        {task.source === 'chat' && (
                          <Badge className="bg-blue-50 text-blue-700">AI 创建</Badge>
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {task.instruction}
                      </p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={task.active}
                      aria-label={`${task.active ? '暂停' : '启用'}任务：${task.name}`}
                      onClick={() => onToggle(task.id)}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${task.active ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <span
                        className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform ${task.active ? 'left-6' : 'left-1'}`}
                      />
                    </button>
                  </div>
                  <div className="mt-4 grid gap-2 border-t pt-3 text-xs text-muted-foreground sm:grid-cols-2">
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="size-4" />
                      {task.schedule}
                    </span>
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <Send className="size-4" />
                      {task.channel}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-4" />
                      {task.expert}
                    </span>
                    <span className="truncate sm:text-right">
                      {task.lastRun ?? '等待首次执行'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <section className="mt-4 overflow-hidden rounded-3xl border bg-white">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`flex min-h-[76px] items-center gap-3 px-4 py-3 ${index ? 'border-t' : ''}`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Check className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{task.name}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {task.lastRun ?? '暂无执行记录'}
                    </p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700">成功</Badge>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <Drawer open={createOpen} onOpenChange={setCreateOpen} showSwipeHandle>
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[620px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(84dvh,700px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
              <span className="grid size-10 place-items-center rounded-2xl bg-fuchsia-50 text-fuchsia-600">
                <CalendarClock className="size-5" />
              </span>
              创建定时任务
            </DrawerTitle>
            <DrawerDescription className="text-left">
              设置学习提醒、复习安排或家长学习报告。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭创建任务"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">任务名称</span>
                <input
                  aria-label="任务名称"
                  value={taskName}
                  onChange={(event) => setTaskName(event.target.value)}
                  placeholder="例如：晚间作业检查"
                  autoComplete="off"
                  className="h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">执行助手</span>
                <select
                  aria-label="执行助手"
                  value={expert}
                  onChange={(event) => setExpert(event.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option>学习规划助手</option>
                  <option>作业辅导助手</option>
                  <option>英语陪练助手</option>
                  <option>成长报告助手</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">任务内容</span>
                <textarea
                  aria-label="任务内容"
                  value={instruction}
                  onChange={(event) => setInstruction(event.target.value)}
                  placeholder="描述需要提醒或自动完成的事情"
                  rows={3}
                  className="w-full resize-none rounded-2xl border bg-white px-4 py-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <div>
                <span className="mb-2 block text-sm font-semibold">执行时间</span>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <select
                    aria-label="重复周期"
                    value={frequency}
                    onChange={(event) => setFrequency(event.target.value)}
                    className="h-12 min-w-0 appearance-none rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    <option>每天</option>
                    <option>工作日</option>
                    <option>每周</option>
                    <option>单次</option>
                  </select>
                  <input
                    type="time"
                    aria-label="执行时间"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="h-12 min-w-0 rounded-2xl border bg-white px-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">提醒渠道</span>
                <select
                  aria-label="提醒渠道"
                  value={channel}
                  onChange={(event) => setChannel(event.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option>My BingoClaw</option>
                  <option>App 通知</option>
                  <option>微信</option>
                </select>
              </label>
            </div>
            <Button
              disabled={!canSave}
              onClick={saveTask}
              className="mt-6 h-12 w-full rounded-2xl text-base font-bold"
            >
              保存任务
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ChannelsView({
  channels,
  onBack,
  onConnect,
  onDisconnect,
}: {
  channels: RemoteChannel[];
  onBack: () => void;
  onConnect: (channel: RemoteChannel) => void;
  onDisconnect: (channel: RemoteChannel) => void;
}) {
  const [actionChannel, setActionChannel] = useState<RemoteChannel | null>(null);
  const [configChannel, setConfigChannel] = useState<RemoteChannel | null>(null);
  const [setupChannel, setSetupChannel] = useState<RemoteChannel | null>(null);
  const [selectedAgent, setSelectedAgent] = useState('小满学习助手');
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const canConnect = Boolean(
    setupChannel && selectedAgent && appId.trim() && appSecret.trim(),
  );
  const openSetup = (channel: RemoteChannel) => {
    setSetupChannel(channel);
    setSelectedAgent('小满学习助手');
    setAppId('');
    setAppSecret('');
  };

  const connectSetupChannel = () => {
    if (!setupChannel || !canConnect) return;
    onConnect(setupChannel);
    setSetupChannel(null);
  };

  return (
    <>
      <Header
        title="远控通道"
        subtitle="在常用聊天工具中使用 BingoMate"
        onBack={onBack}
        backLabel="返回设置"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-3 flex items-end justify-between px-1">
            <div>
              <h2 className="text-lg font-bold">通道列表</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                已连接 {channels.filter((channel) => channel.connected).length} 个通道
              </p>
            </div>
            <Badge variant="secondary" className="h-7 px-3">
              {channels.length} 个平台
            </Badge>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
            {channels.map((channel) => {
              return (
                <article
                  key={channel.id}
                  className="flex min-h-[210px] flex-col rounded-[24px] border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border bg-white p-2.5 shadow-sm">
                      <img
                        src={channel.logo}
                        alt={`${channel.name} Logo`}
                        width={32}
                        height={32}
                        className="size-8 object-contain"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{channel.name}</h3>
                        {channel.recommended && (
                          <Badge className="bg-emerald-50 text-emerald-700">
                            推荐
                          </Badge>
                        )}
                      </div>
                    </div>
                    {channel.connected ? (
                      <Badge variant="outline" className="h-8 shrink-0 bg-slate-50 px-3">
                        已连接
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => openSetup(channel)}
                        variant="outline"
                        className="h-9 shrink-0 rounded-xl px-4"
                      >
                        添加
                      </Button>
                    )}
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {channel.description}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t pt-3">
                    <span
                      aria-hidden="true"
                      className={`size-2.5 shrink-0 rounded-full ${channel.connected ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                      {channel.account}
                    </span>
                    <button
                      aria-label={`${channel.name}更多操作`}
                      onClick={() => setActionChannel(channel)}
                      className="grid size-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <MoreHorizontal className="size-5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <Drawer
        open={Boolean(setupChannel)}
        onOpenChange={(open) => {
          if (!open) setSetupChannel(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[620px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(72dvh,590px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <div className="flex items-center gap-3 pr-12">
              {setupChannel && (
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border bg-white p-2.5 shadow-sm">
                  <img
                    src={setupChannel.logo}
                    alt={`${setupChannel.name} Logo`}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />
                </span>
              )}
              <div className="min-w-0">
                <DrawerTitle className="truncate text-xl font-bold">
                  添加{setupChannel?.name}通道
                </DrawerTitle>
                <DrawerDescription className="mt-1 truncate text-left">
                  {setupChannel?.description}
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose
              aria-label="关闭添加通道"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  选择连接 Agent <span className="text-red-500">*</span>
                </span>
                <select
                  aria-label="选择连接 Agent"
                  value={selectedAgent}
                  onChange={(event) => setSelectedAgent(event.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="小满学习助手">小满学习助手</option>
                  <option value="作业辅导 Agent">作业辅导 Agent</option>
                  <option value="英语陪练 Agent">英语陪练 Agent</option>
                </select>
              </label>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-bold">连接配置</h3>
                  <button className="min-h-9 rounded-xl border px-3 text-xs font-semibold text-muted-foreground">
                    查看配置指南 ↗
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      {setupChannel?.name} App ID <span className="text-red-500">*</span>
                    </span>
                    <input
                      aria-label={`${setupChannel?.name ?? ''} App ID`}
                      value={appId}
                      onChange={(event) => setAppId(event.target.value)}
                      placeholder={`请输入${setupChannel?.name ?? ''}开放平台 App ID`}
                      autoComplete="off"
                      className="h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold">
                      {setupChannel?.name} App Secret <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="password"
                      aria-label={`${setupChannel?.name ?? ''} App Secret`}
                      value={appSecret}
                      onChange={(event) => setAppSecret(event.target.value)}
                      placeholder={`请输入${setupChannel?.name ?? ''}开放平台 App Secret`}
                      autoComplete="new-password"
                      className="h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>
              </div>
            </div>
            <Button
              disabled={!canConnect}
              onClick={connectSetupChannel}
              className="mt-6 h-12 w-full rounded-2xl text-base font-bold"
            >
              连接{setupChannel?.name}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={Boolean(actionChannel)}
        onOpenChange={(open) => {
          if (!open) setActionChannel(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(38dvh,310px)]">
          <DrawerHeader className="relative px-5 pb-3 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">
              {actionChannel?.name}
            </DrawerTitle>
            <DrawerDescription className="text-left">
              选择要执行的通道操作
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭通道操作"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="space-y-2 px-4 pb-[max(18px,env(safe-area-inset-bottom))]">
            <button
              onClick={() => {
                if (!actionChannel) return;
                setConfigChannel(actionChannel);
                setActionChannel(null);
              }}
              className="flex min-h-12 w-full items-center gap-3 rounded-2xl bg-muted px-4 text-left text-sm font-semibold"
            >
              <Settings className="size-5 text-blue-600" />
              查看配置
              <ChevronRight className="ml-auto size-4 text-muted-foreground" />
            </button>
            <button
              disabled={!actionChannel?.connected}
              onClick={() => {
                if (!actionChannel) return;
                onDisconnect(actionChannel);
                setActionChannel(null);
              }}
              className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50"
            >
              <LogOut className="size-5" />
              {actionChannel?.connected ? '断开连接' : '当前未连接'}
            </button>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={Boolean(configChannel)}
        onOpenChange={(open) => {
          if (!open) setConfigChannel(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(52dvh,430px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">通道配置</DrawerTitle>
            <DrawerDescription className="text-left">
              {configChannel?.name} 的连接信息
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭通道配置"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
            <dl className="overflow-hidden rounded-3xl border bg-white text-sm">
              {[
                ['连接状态', configChannel?.connected ? '已连接' : '未连接'],
                ['绑定账号', configChannel?.account ?? '—'],
                ['AppID', configChannel?.connected ? 'BM_APP_••••9286' : '未配置'],
                ['Secret', configChannel?.connected ? '••••••••••••••••' : '未配置'],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`flex min-h-14 items-center gap-4 px-4 ${index ? 'border-t' : ''}`}
                >
                  <dt className="shrink-0 text-muted-foreground">{label}</dt>
                  <dd className="ml-auto truncate text-right font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function GrowthReportView({ onBack }: { onBack: () => void }) {
  const [period, setPeriod] = useState<GrowthPeriod>('weekly');
  const [selectedReport, setSelectedReport] = useState<GrowthReport | null>(null);
  const [indexHelpOpen, setIndexHelpOpen] = useState(false);
  const current = growthReports[period];
  const indexDimensions = [
    {
      label: '知识掌握',
      score: 88,
      weight: 30,
      detail: '正确率、订正后掌握度和同类题迁移表现',
      color: 'bg-blue-500',
    },
    {
      label: '学习投入',
      score: 90,
      weight: 25,
      detail: '有效学习时长、任务完成率和连续学习情况',
      color: 'bg-indigo-500',
    },
    {
      label: '主动思考',
      score: 84,
      weight: 20,
      detail: '独立作答、主动追问和用自己的语言复述思路',
      color: 'bg-violet-500',
    },
    {
      label: '复习执行',
      score: 82,
      weight: 15,
      detail: '错题回顾完成率和间隔复习后的掌握变化',
      color: 'bg-emerald-500',
    },
    {
      label: '成长稳定',
      score: 80,
      weight: 10,
      detail: '近 30 天学习节奏与能力表现的稳定程度',
      color: 'bg-amber-500',
    },
  ];

  return (
    <>
      <Header
        title="成长报告"
        subtitle="林小满 · 每一次努力都有记录"
        onBack={onBack}
        backLabel="返回聊天"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(28px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-5xl">
          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-[0_16px_40px_rgba(67,56,202,.22)] md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-x-2">
                  <p className="text-sm font-medium text-blue-100">综合成长指数</p>
                  <button
                    aria-label="了解什么是成长指数"
                    onClick={() => setIndexHelpOpen(true)}
                    className="flex min-h-11 items-center gap-1 rounded-xl px-1 text-xs font-medium text-white/90 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    <CircleHelp className="size-3.5" />
                    什么是成长指数？
                  </button>
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <strong className="text-5xl font-bold leading-none tabular-nums">86</strong>
                  <span className="mb-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
                    本月 +9.2%
                  </span>
                </div>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15">
                <BarChart3 className="size-6" />
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-50">
              小满正在形成稳定的自主学习习惯，数学推理和错题复盘进步最明显。
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/15 pt-4">
              {[
                ['18天', '连续学习'],
                ['124h', '累计学习'],
                ['78%', '知识掌握'],
              ].map(([value, label]) => (
                <div key={label} className="min-w-0">
                  <p className="text-lg font-bold tabular-nums md:text-xl">{value}</p>
                  <p className="mt-0.5 truncate text-[11px] text-blue-100 md:text-xs">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <div
            role="tablist"
            aria-label="成长报告周期"
            className="mt-5 grid grid-cols-3 rounded-2xl bg-slate-100 p-1"
          >
            {(Object.keys(growthReports) as GrowthPeriod[]).map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={period === item}
                onClick={() => setPeriod(item)}
                className={`min-h-11 rounded-xl text-sm font-semibold transition-all ${period === item ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {growthReports[item].label}
              </button>
            ))}
          </div>

          <section className="mt-4 rounded-3xl border border-blue-100 bg-blue-50/70 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-blue-700">{current.range}</p>
                <h2 className="mt-1 font-bold">这段时间的成长</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{current.insight}</p>
              </div>
            </div>
            <div
              className="mt-5 flex h-20 items-end gap-2"
              role="img"
              aria-label={`${current.label}成长趋势持续上升，当前成长指数为86`}
            >
              {current.trend.map((value, index) => (
                <span
                  key={`${period}-${index}`}
                  className="min-w-0 flex-1 rounded-t-lg bg-blue-200 last:bg-blue-600"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-500">
              <span>{period === 'daily' ? '7天前' : period === 'weekly' ? '6周前' : '6个月前'}</span>
              <span>持续提升</span>
              <span>现在</span>
            </div>
          </section>

          <section className="mt-6">
            <div className="flex items-end justify-between gap-3 px-1">
              <div>
                <h2 className="text-lg font-bold">{current.label}成长记录</h2>
                <p className="mt-1 text-xs text-muted-foreground">按周期自动沉淀学习表现与进步</p>
              </div>
              <span className="text-xs text-muted-foreground">共 {current.reports.length} 份</span>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {current.reports.map((report) => (
                <button
                  key={report.id}
                  aria-label={`查看${report.title}`}
                  onClick={() => setSelectedReport(report)}
                  className="flex min-h-[164px] w-full flex-col rounded-3xl border bg-white p-4 text-left shadow-sm transition-[border-color,box-shadow] hover:border-blue-200 hover:shadow-md active:bg-blue-50/40"
                >
                  <div className="flex w-full items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <BarChart3 className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold">{report.title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{report.date}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-xl font-bold text-blue-700 tabular-nums">{report.score}</span>
                      <span className="block text-[11px] font-medium text-emerald-700">{report.change}</span>
                    </span>
                  </div>
                  <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{report.summary}</span>
                  <span className="mt-auto flex w-full items-center gap-2 pt-3 text-xs text-slate-500">
                    <Sparkles className="size-3.5 shrink-0 text-amber-500" />
                    <span className="truncate">{report.focus}</span>
                    <ChevronRight className="ml-auto size-4 shrink-0" />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange-50 text-orange-600">
                <UserRound className="size-6" />
              </span>
              <div>
                <h2 className="font-bold">小满的学习画像</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">根据近期学习行为持续更新</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['坚持型学习者', '数学推理进步快', '善于主动追问', '晚间效率最高'].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              {[
                ['自主学习', 86, 'bg-blue-500'],
                ['错题复盘', 78, 'bg-violet-500'],
                ['专注稳定', 74, 'bg-emerald-500'],
              ].map(([label, value, color]) => (
                <div key={label as string}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{label}</span>
                    <span className="font-semibold tabular-nums">{value}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
              给家长的观察：小满对具体、及时的鼓励反应很好。建议多肯定她坚持思考的过程，不只关注最终分数。
            </p>
          </section>
        </div>
      </div>

      <Drawer
        open={Boolean(selectedReport)}
        onOpenChange={(open) => !open && setSelectedReport(null)}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[620px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(72dvh,640px)]">
          {selectedReport && (
            <>
              <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
                <DrawerTitle className="pr-12 text-xl font-bold">{selectedReport.title}</DrawerTitle>
                <DrawerDescription className="text-left">{selectedReport.date}</DrawerDescription>
                <DrawerClose
                  aria-label="关闭成长报告"
                  className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
                >
                  <X className="size-5" />
                </DrawerClose>
              </DrawerHeader>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(20px,env(safe-area-inset-bottom))]">
                <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white">
                  <p className="text-sm text-blue-100">本期成长指数</p>
                  <div className="mt-1 flex items-end gap-2">
                    <strong className="text-4xl tabular-nums">{selectedReport.score}</strong>
                    <span className="mb-1 text-sm font-semibold text-emerald-200">{selectedReport.change}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-blue-50">{selectedReport.summary}</p>
                </section>
                <section className="mt-4 rounded-3xl border bg-white p-5">
                  <h3 className="font-bold">本期亮点</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{selectedReport.highlight}</p>
                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-amber-50 px-3 py-3 text-sm text-amber-900">
                    <Sparkles className="size-4 shrink-0" />
                    {selectedReport.focus}
                  </div>
                </section>
                <section className="mt-4 rounded-3xl border bg-white p-5">
                  <h3 className="font-bold">下一步建议</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{selectedReport.nextStep}</p>
                </section>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Drawer
        open={indexHelpOpen}
        onOpenChange={setIndexHelpOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[640px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(86dvh,760px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="pr-12 text-xl font-bold">什么是成长指数？</DrawerTitle>
            <DrawerDescription className="text-left">
              用一个 0—100 的数字，观察学习方式和能力是否持续向好。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭成长指数说明"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(22px,env(safe-area-inset-bottom))]">
            <section className="rounded-3xl bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <BarChart3 className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-blue-950">它关注的是“成长”，不只是分数</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    成长指数综合近 30 天的学习记录，比较的是学生当前状态与自己的过去表现，帮助学生和家长看到努力有没有形成有效进步。
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-4 rounded-3xl border bg-white p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-bold">当前指数怎么算</h3>
                  <p className="mt-1 text-xs text-muted-foreground">每个维度先换算为 0—100 分，再按权重相加</p>
                </div>
                <strong className="text-3xl text-blue-700 tabular-nums">86</strong>
              </div>
              <div className="mt-5 space-y-5">
                {indexDimensions.map((dimension) => (
                  <div key={dimension.label}>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{dimension.label}</span>
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">
                        权重 {dimension.weight}%
                      </span>
                      <span className="ml-auto font-bold tabular-nums">{dimension.score}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${dimension.color}`}
                        style={{ width: `${dimension.score}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{dimension.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-4 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-5">
              <h3 className="font-bold text-indigo-950">小满本期的计算过程</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                88 × 30% ＋ 90 × 25% ＋ 84 × 20% ＋ 82 × 15% ＋ 80 × 10%
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-indigo-100 pt-3">
                <span className="text-sm font-medium text-slate-600">加权结果</span>
                <span className="text-lg font-bold text-indigo-700 tabular-nums">86.0 → 86</span>
              </div>
            </section>

            <section className="mt-4 rounded-3xl border bg-white p-5">
              <h3 className="font-bold">指数如何更新</h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                <p>每天根据新增的对话、练习、错题复习和学习任务记录更新一次。</p>
                <p>采用近 30 天滚动数据，近期表现影响更大，单次失误不会让指数大幅波动。</p>
                <p>记录较少时会降低评价置信度，不会因为使用次数少就直接判断学习能力较弱。</p>
              </div>
            </section>

            <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
              成长指数用于观察学习趋势，不等同于考试成绩、年级排名或智力评价。重要学习判断应结合老师反馈、实际作业和阶段测评一起查看。
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function PointsView({
  points,
  transactions,
  onBack,
  onRecharge,
}: {
  points: number;
  transactions: PointTransaction[];
  onBack: () => void;
  onRecharge: () => void;
}) {
  return (
    <>
      <Header
        title="积分详情"
        subtitle="余额与使用记录"
        onBack={onBack}
        backLabel="返回聊天"
      />
      <div className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <div className="mx-auto w-full max-w-3xl">
          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 p-5 text-white shadow-lg shadow-amber-200/60 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/95 shadow-sm">
                  <PointsIcon className="size-9" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/80">剩余积分</p>
                  <p className="mt-0.5 truncate text-3xl font-black tabular-nums tracking-tight">
                    {points.toLocaleString()}
                  </p>
                </div>
              </div>
              <Button
                onClick={onRecharge}
                className="h-11 shrink-0 rounded-2xl bg-white px-5 font-bold text-amber-700 shadow-sm hover:bg-amber-50"
              >
                充值
              </Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/75">
              积分可用于模型对话、拍题解析和学习技能。
            </p>
          </section>

          <section className="mt-6">
            <div className="mb-3 flex items-end justify-between px-1">
              <div>
                <h2 className="text-lg font-bold">积分使用明细</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  充值与扣除记录统一展示
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                共 {transactions.length} 条
              </span>
            </div>
            <div className="overflow-hidden rounded-3xl border bg-white">
              {transactions.map((transaction, index) => {
                const isCredit = transaction.amount > 0;
                const TransactionIcon = isCredit
                  ? ArrowDownLeft
                  : ArrowUpRight;
                return (
                  <div
                    key={transaction.id}
                    className={`flex min-h-[78px] items-center gap-3 px-4 py-3 ${index ? 'border-t' : ''}`}
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-2xl ${isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                    >
                      <TransactionIcon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {transaction.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {transaction.time} · {transaction.detail}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-base font-bold tabular-nums ${isCredit ? 'text-emerald-600' : 'text-slate-900'}`}
                    >
                      {isCredit ? '+' : ''}
                      {transaction.amount.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function DemoExperience({
  stage,
  setStage,
  onBind,
  onStartTour,
  notify,
}: {
  stage: DemoStage;
  setStage: (stage: DemoStage) => void;
  onBind: (deviceCode: string, activationCode: string, deviceName: string) => void;
  onStartTour: () => void;
  notify: (message: string) => void;
}) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [deviceCode, setDeviceCode] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [deviceName, setDeviceName] = useState('我的 BingoMate');

  const startDemo = () => {
    setPhone('');
    setVerificationCode('');
    setLoginError('');
    setCodeSent(false);
    setDeviceCode('');
    setActivationCode('');
    setDeviceName('我的 BingoMate');
    setStage('login');
  };

  const sendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setLoginError('请输入正确的 11 位手机号');
      return;
    }
    setLoginError('');
    setCodeSent(true);
    setVerificationCode('888888');
    notify('验证码已发送并自动填入');
  };

  const login = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setLoginError('请输入正确的 11 位手机号');
      return;
    }
    if (!/^\d{4,6}$/.test(verificationCode)) {
      setLoginError('请输入收到的验证码');
      return;
    }
    setLoginError('');
    setStage('bind');
  };

  const bind = () => {
    if (!deviceCode.trim() || !activationCode.trim() || !deviceName.trim()) return;
    onBind(deviceCode.trim(), activationCode.trim(), deviceName.trim());
    onStartTour();
  };

  return (
    <>
      <Drawer
        open={stage === 'menu'}
        onOpenChange={(open) => setStage(open ? 'menu' : null)}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">演示中心</DrawerTitle>
            <DrawerDescription className="text-left">
              选择一个流程，快速了解 BingoMate 的主要功能。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭演示中心"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="px-4 pb-[max(20px,env(safe-area-inset-bottom))]">
            <button
              onClick={startDemo}
              className="flex min-h-[88px] w-full items-center gap-4 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-violet-50 p-4 text-left shadow-sm transition-[transform,box-shadow] active:scale-[.98]"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-200">
                <GraduationCap className="size-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-slate-900">新手引导演示</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                  登录、绑定设备并完成第一次对话
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-blue-500" />
            </button>
          </div>
        </DrawerContent>
      </Drawer>

      {stage === 'login' && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-login-title"
          className="fixed inset-0 z-[80] overflow-y-auto bg-gradient-to-b from-blue-50 via-white to-white px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]"
        >
          <div className="mx-auto flex min-h-full w-full max-w-md flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                第 1 步 · 登录
              </span>
              <button
                aria-label="退出新手引导"
                onClick={() => setStage(null)}
                className="grid size-11 place-items-center rounded-2xl bg-white text-slate-600 shadow-sm"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center py-8">
              <img
                src="/brand/bingomate-owl.png"
                alt="BingoMate 猫头鹰"
                width={88}
                height={88}
                className="mx-auto size-[88px] object-contain drop-shadow-[0_14px_24px_rgba(37,99,235,.18)]"
              />
              <h2
                id="demo-login-title"
                className="mt-5 text-center text-2xl font-black tracking-tight text-slate-950"
              >
                欢迎使用 BingoMate
              </h2>
              <p className="mt-2 text-center text-sm text-slate-500">
                验证码登录，未注册手机号将自动创建账号
              </p>

              <div className="mt-8 rounded-[28px] border bg-white p-4 shadow-[0_18px_50px_rgba(37,99,235,.08)]">
                <label htmlFor="demo-phone" className="block text-sm font-semibold text-slate-800">
                  手机号
                </label>
                <input
                  id="demo-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 11))}
                  placeholder="请输入手机号"
                  className="mt-2 h-12 w-full rounded-2xl border bg-slate-50 px-4 text-base outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

                <label htmlFor="demo-code" className="mt-4 block text-sm font-semibold text-slate-800">
                  验证码
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="demo-code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="请输入验证码"
                    className="h-12 min-w-0 flex-1 rounded-2xl border bg-slate-50 px-4 text-base outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={sendCode}
                    className="min-h-12 shrink-0 rounded-2xl bg-blue-50 px-4 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    {codeSent ? '重新获取' : '获取验证码'}
                  </button>
                </div>
                {loginError && (
                  <p role="alert" className="mt-2 text-sm font-medium text-rose-600">
                    {loginError}
                  </p>
                )}
                <Button
                  onClick={login}
                  className="mt-6 h-12 w-full rounded-2xl text-base font-bold"
                >
                  登录并继续
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Drawer
        open={stage === 'bind'}
        onOpenChange={(open) => {
          if (!open) setStage(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <span className="mb-2 w-fit rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
              第 2 步 · 绑定设备
            </span>
            <DrawerTitle className="text-xl font-bold">连接你的 BingoMate</DrawerTitle>
            <DrawerDescription className="text-left">
              当前账号还没有设备，完成绑定后即可开始使用。
            </DrawerDescription>
            <DrawerClose
              aria-label="退出设备绑定"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="space-y-4 px-5">
            <div>
              <label htmlFor="demo-device-code" className="block text-sm font-semibold">
                设备码
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="demo-device-code"
                  value={deviceCode}
                  onChange={(event) => setDeviceCode(event.target.value)}
                  placeholder="例如 BM-20260904"
                  className="h-12 min-w-0 flex-1 rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  aria-label="扫码录入演示设备码"
                  onClick={() => setDeviceCode('BM-20260904')}
                  className="flex min-h-12 shrink-0 items-center gap-1.5 rounded-2xl bg-blue-50 px-3 text-sm font-bold text-blue-700"
                >
                  <ScanLine className="size-5" />
                  扫码
                </button>
              </div>
            </div>
            <label htmlFor="demo-activation-code" className="block text-sm font-semibold">
              激活码
              <input
                id="demo-activation-code"
                value={activationCode}
                onChange={(event) => setActivationCode(event.target.value)}
                placeholder="请输入设备激活码"
                className="mt-2 h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label htmlFor="demo-device-name" className="block text-sm font-semibold">
              设备名称
              <input
                id="demo-device-name"
                value={deviceName}
                onChange={(event) => setDeviceName(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
          <DrawerFooter className="px-5 pb-[max(18px,env(safe-area-inset-bottom))] pt-5">
            <Button
              disabled={!deviceCode.trim() || !activationCode.trim() || !deviceName.trim()}
              onClick={bind}
              className="h-12 w-full rounded-2xl text-base font-bold"
            >
              绑定设备并进入首页
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ChatView({
  onMenu,
  onDemo,
  onCamera,
  onScheduleFromChat,
  installedSkills,
  photoConversation,
  demoTourStep,
  onDemoTourNext,
  onDemoTourFinish,
  notify,
}: {
  onMenu: () => void;
  onDemo: () => void;
  onCamera: (request: string) => void;
  onScheduleFromChat: (text: string) => void;
  installedSkills: Set<string>;
  photoConversation: PhotoConversation | null;
  demoTourStep: number | null;
  onDemoTourNext: () => void;
  onDemoTourFinish: () => void;
  notify: (message: string) => void;
}) {
  const hasPhotoRequest = Boolean(photoConversation?.request.trim());
  const [messages, setMessages] = useState<Message[]>(() =>
    photoConversation
      ? [
          {
            id: photoConversation.id,
            role: 'user',
            text: photoConversation.request.trim() || '已上传题目照片',
            attachment: 'captured-photo',
          },
          {
            id: photoConversation.id + 1,
            role: 'assistant',
            text: hasPhotoRequest
              ? '我已经看到题目和你的需求了。我会先梳理题目条件，再从关键一步开始陪你分析。'
              : '我已经看到你拍的题目了。你希望我怎么帮你？可以从下面选择一种辅导方式，也可以直接说出你的问题。',
          },
        ]
      : [],
  );
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [modelSheetOpen, setModelSheetOpen] = useState(false);
  const [skillSheetOpen, setSkillSheetOpen] = useState(false);
  const [attachmentSheetOpen, setAttachmentSheetOpen] = useState(false);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(models[0]);
  const [selectedChatSkill, setSelectedChatSkill] = useState<Skill | null>(null);
  const [chatMode, setChatMode] = useState<ChatModeId>(
    photoConversation ? 'photo' : 'default',
  );
  const [showPhotoGuidance, setShowPhotoGuidance] = useState(
    Boolean(photoConversation && !hasPhotoRequest),
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mode = chatModes[chatMode];
  const ModeIcon = mode.icon;
  const availableSkills = skills.filter((skill) => installedSkills.has(skill.id));
  const recommendedModes = (
    ['photo', 'homework', 'mistakes', 'practice'] as ChatModeId[]
  ).map((modeId) => chatModes[modeId]);
  const currentSkillName = selectedChatSkill?.name ?? mode.label;
  const currentSkillImage = selectedChatSkill?.image ?? mode.image;
  const demoTourContent = [
    {
      title: '选择适合的技能',
      description: '点击技能按钮，可以在 BingoMate 与已安装的学习技能之间切换。',
    },
    {
      title: '说出你的学习需求',
      description: '在输入框描述问题，也可以先拍题或添加学习资料。',
    },
    {
      title: '发送并开始辅导',
      description: '确认内容后点击右下角发送，BingoMate 就会开始回应。',
    },
  ];

  const advanceDemoTour = () => {
    if (demoTourStep === 1 && !input.trim()) {
      setInput('帮我制定一份今天的数学复习计划');
    }
    if (demoTourStep === 2) {
      onDemoTourFinish();
      return;
    }
    onDemoTourNext();
  };

  const selectMode = (nextMode: ChatModeId) => {
    setChatMode(nextMode);
    setSelectedChatSkill(null);
    setMessages([]);
    setInput('');
    setShowPhotoGuidance(false);
  };

  const selectInstalledSkill = (skill: Skill) => {
    setChatMode('default');
    setSelectedChatSkill(skill);
    setMessages([]);
    setInput('');
    setShowPhotoGuidance(false);
  };

  const applySuggestion = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const addAttachments = (
    files: FileList | null,
    kind: ChatAttachment['kind'],
  ) => {
    if (!files?.length) return;
    const availableSlots = Math.max(0, 5 - attachments.length);
    const nextAttachments = Array.from(files)
      .slice(0, availableSlots)
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        name: file.name,
        kind,
        size: formatFileSize(file.size),
      }));

    if (nextAttachments.length === 0) {
      notify('最多可以添加 5 个附件');
      return;
    }

    setAttachments((current) => [...current, ...nextAttachments]);
    setAttachmentSheetOpen(false);
    notify(
      `已添加 ${nextAttachments.length} 个${kind === 'image' ? '图片' : '文件'}`,
    );
  };

  const send = () => {
    const text = input.trim();
    if ((!text && attachments.length === 0) || sending) return;
    const isSchedulingRequest = /提醒|定时|每天|每周|每晚|每早/.test(text);
    if (isSchedulingRequest) onScheduleFromChat(text);
    const attachmentSummary = attachments.length
      ? `附件：${attachments.map((attachment) => attachment.name).join('、')}`
      : '';
    const messageText = [text, attachmentSummary].filter(Boolean).join('\n');
    setInput('');
    setAttachments([]);
    setShowPhotoGuidance(false);
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text: messageText },
    ]);
    setSending(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: isSchedulingRequest
            ? '好的，定时任务已经创建。你可以在侧边栏的“定时任务”中查看、暂停或调整安排。'
            : mode.reply,
        },
      ]);
      setSending(false);
    }, 650);
  };

  return (
    <>
      <Header
        title={mode.name}
        subtitle={mode.subtitle}
        onMenu={onMenu}
        brandMark={
          chatMode === 'default' ? (
            <img
              src="/brand/bingomate-owl.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="size-11 shrink-0 object-contain"
            />
          ) : (
            <img
              src={mode.image}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="size-11 shrink-0 object-contain drop-shadow-sm"
            />
          )
        }
        right={
          <div className="flex items-center gap-1.5">
            <button
              aria-label="打开演示中心"
              onClick={onDemo}
              className="flex min-h-10 items-center gap-1 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 px-2 text-[11px] font-bold text-orange-700 ring-1 ring-orange-100 transition-[transform,background-color] active:scale-95"
            >
              <GraduationCap className="size-4" />
              演示
            </button>
            <button
              aria-label={`选择模型，当前为${selectedModel.name}`}
              aria-haspopup="dialog"
              aria-expanded={modelSheetOpen}
              onClick={() => setModelSheetOpen(true)}
              className="flex min-h-10 max-w-24 items-center gap-1 rounded-xl bg-muted px-2.5 text-xs font-semibold transition-colors hover:bg-slate-200"
            >
              <span className="truncate">{selectedModel.name}</span>
              <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
            </button>
          </div>
        }
      />
      <div className="flex h-[calc(100dvh-72px)] flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-6">
          <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
            >
              {message.role === 'assistant' && (
                <img
                  src="/brand/bingomate-owl.png"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="size-9 shrink-0 object-contain"
                />
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[68%] ${message.role === 'user' ? 'rounded-tr-md border border-blue-100 bg-blue-50 text-slate-800 shadow-sm' : 'rounded-tl-md border bg-card'}`}
              >
                {message.attachment === 'captured-photo' && (
                  <span className="mb-2 flex min-h-[92px] w-[180px] max-w-full items-center justify-center overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-100 via-indigo-50 to-cyan-100 text-blue-700">
                    <span className="text-center">
                      <Camera className="mx-auto size-7 text-blue-600" />
                      <span className="mt-1 block text-[11px] font-medium text-blue-700">
                        题目照片
                      </span>
                    </span>
                  </span>
                )}
                {message.text}
              </div>
            </div>
          ))}
          {showPhotoGuidance && (
            <div className="ml-12 grid w-[min(82%,420px)] grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                '帮我分析这道题的解题思路',
                '先提示我下一步怎么做',
                '讲讲这道题考查的知识点',
                '检查一下我写的解题过程',
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => {
                    setInput(question);
                    setShowPhotoGuidance(false);
                    inputRef.current?.focus();
                  }}
                  className="flex min-h-12 items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-3 text-left text-xs font-semibold text-blue-800 transition-[background-color,transform] hover:bg-blue-100 active:scale-[.98]"
                >
                  <Sparkles className="size-4 shrink-0 text-blue-500" />
                  <span className="flex-1">{question}</span>
                  <ChevronRight className="size-3.5 shrink-0 text-blue-400" />
                </button>
              ))}
            </div>
          )}
          {sending && (
            <div className="flex items-center gap-3">
              <img
                src="/brand/bingomate-owl.png"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="size-9 object-contain"
              />
              <span className="rounded-2xl rounded-tl-md border bg-card px-4 py-3 text-sm text-muted-foreground">
                正在思考…
              </span>
            </div>
          )}
          {messages.length === 0 && (
            <div className="flex min-h-full flex-col items-center justify-center pb-2 text-center">
              {chatMode === 'default' ? (
                <span className="relative grid size-[76px] place-items-center">
                  <img
                    src="/brand/bingomate-owl.png"
                    alt=""
                    aria-hidden="true"
                    width={72}
                    height={72}
                    className="size-[72px] object-contain drop-shadow-[0_12px_20px_rgba(37,99,235,.2)]"
                  />
                  <span className="absolute -right-1 -top-1 size-5 rounded-full border-[3px] border-background bg-orange-500" />
                </span>
              ) : (
                <img
                  src={mode.image}
                  alt=""
                  aria-hidden="true"
                  width={88}
                  height={88}
                  className="size-[88px] object-contain drop-shadow-[0_12px_20px_rgba(37,99,235,.18)]"
                />
              )}
              <h2 className="mt-5 text-[28px] font-bold tracking-tight">
                {mode.headline}
              </h2>
              <p
                className={`mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm ${chatMode === 'default' ? 'whitespace-nowrap' : 'px-2'}`}
              >
                {mode.description}
              </p>
              {chatMode === 'default' && !selectedChatSkill && (
                <p className="mt-7 w-full max-w-[360px] text-left text-xs font-semibold text-muted-foreground md:max-w-2xl">
                  推荐技能
                </p>
              )}
              <div className={`grid w-full max-w-[360px] grid-cols-1 gap-2.5 md:max-w-2xl md:grid-cols-2 ${chatMode === 'default' && !selectedChatSkill ? 'mt-2' : 'mt-7'}`}>
                {chatMode === 'default'
                  ? [
                      {
                        label: '拍题辅导',
                        target: 'photo' as ChatModeId,
                        image: chatModes.photo.image,
                      },
                      {
                        label: '作业批阅',
                        target: 'homework' as ChatModeId,
                        image: chatModes.homework.image,
                      },
                      {
                        label: '错题复习',
                        target: 'mistakes' as ChatModeId,
                        image: chatModes.mistakes.image,
                      },
                      {
                        label: '智能练习',
                        target: 'practice' as ChatModeId,
                        image: chatModes.practice.image,
                      },
                    ].map(({ label, target, image }) => (
                      <button
                        key={target}
                        onClick={() => selectMode(target)}
                        className="flex min-h-[64px] items-center gap-3 rounded-2xl border bg-card px-4 text-left text-sm font-semibold shadow-sm transition-[border-color,background-color,transform] duration-200 hover:border-blue-200 hover:bg-blue-50/40 active:scale-[.98]"
                      >
                        <img
                          src={image}
                          alt=""
                          aria-hidden="true"
                          width={48}
                          height={48}
                          className="size-12 shrink-0 object-contain drop-shadow-sm"
                        />
                        {label}
                        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                      </button>
                    ))
                  : mode.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => applySuggestion(suggestion)}
                        className="flex min-h-[54px] items-center gap-3 rounded-2xl border bg-card px-5 text-left text-sm font-medium shadow-sm transition-[border-color,background-color,transform] duration-200 hover:border-blue-200 hover:bg-blue-50/40 active:scale-[.98]"
                      >
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-xl ${mode.iconStyle}`}
                        >
                          <ModeIcon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">{suggestion}</span>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                      </button>
                    ))}
              </div>
            </div>
          )}
          </div>
        </div>
        <div className="shrink-0 bg-background/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:px-8 md:pb-5">
          <div className={`mx-auto w-full max-w-4xl rounded-[26px] border bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,.1)] transition-[box-shadow,border-color] focus-within:border-blue-400 focus-within:shadow-[0_14px_42px_rgba(37,99,235,.12)] ${demoTourStep === 1 ? 'relative z-[70] border-orange-300 ring-4 ring-orange-200/80' : ''}`}>
            {attachments.length > 0 && (
              <div
                aria-label="已添加的附件"
                className="mb-2 flex gap-2 overflow-x-auto px-1 pb-1"
              >
                {attachments.map((attachment) => {
                  const AttachmentIcon =
                    attachment.kind === 'image' ? ImageIcon : FileText;
                  return (
                    <div
                      key={attachment.id}
                      className="flex min-w-[190px] max-w-[240px] items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-2"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <AttachmentIcon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-xs font-semibold text-slate-800">
                          {attachment.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-slate-500">
                          {attachment.size}
                        </span>
                      </span>
                      <button
                        aria-label={`移除附件${attachment.name}`}
                        onClick={() =>
                          setAttachments((current) =>
                            current.filter((item) => item.id !== attachment.id),
                          )
                        }
                        className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <textarea
              ref={inputRef}
              aria-label="输入学习问题"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              placeholder={mode.placeholder}
              rows={2}
              className="w-full resize-none bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground"
            />
            <div className="mt-2 flex items-center gap-1.5">
              <button
                aria-label="添加资料"
                aria-haspopup="dialog"
                aria-expanded={attachmentSheetOpen}
                onClick={() => setAttachmentSheetOpen(true)}
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-muted"
              >
                <Plus className="size-5" />
              </button>
              <button
                aria-label="拍题辅导"
                onClick={() => onCamera(input)}
                className="flex min-h-10 items-center gap-1.5 rounded-full bg-blue-50 px-3 text-xs font-medium text-blue-700"
              >
                <Camera className="size-4" />
                拍题
              </button>
              <button
                aria-label={`选择技能，当前为${currentSkillName}`}
                aria-haspopup="dialog"
                aria-expanded={skillSheetOpen}
                onClick={() => setSkillSheetOpen(true)}
                className={`flex min-h-10 max-w-36 items-center gap-1.5 rounded-full bg-slate-100 px-3 text-xs font-medium text-slate-700 transition-[background-color,box-shadow] hover:bg-slate-200 ${demoTourStep === 0 ? 'relative z-[70] ring-4 ring-orange-300 shadow-lg' : ''}`}
              >
                <img
                  src={currentSkillImage}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="size-5 shrink-0 rounded-md object-contain"
                />
                <span className="truncate">{currentSkillName}</span>
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
              </button>
              <span className="flex-1" />
              <button
                aria-label={input.trim() || attachments.length ? '发送' : '语音输入'}
                disabled={sending}
                onClick={() => {
                  if (input.trim() || attachments.length) {
                    send();
                    if (demoTourStep === 2) onDemoTourFinish();
                  } else {
                    notify('请开始说话');
                  }
                }}
                className={`grid size-11 place-items-center rounded-full transition-[background-color,box-shadow] disabled:opacity-40 ${input.trim() || attachments.length ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'} ${demoTourStep === 2 ? 'relative z-[70] ring-4 ring-orange-300 shadow-lg' : ''}`}
              >
                {input.trim() || attachments.length ? (
                  <Send className="size-5" />
                ) : (
                  <Mic className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {demoTourStep !== null && demoTourContent[demoTourStep] && (
        <div className="pointer-events-none fixed inset-0 z-[60]">
          <div aria-hidden="true" className="absolute inset-0 bg-slate-950/28" />
          <section
            aria-label={`新手引导第${demoTourStep + 1}步`}
            className="pointer-events-auto absolute inset-x-4 bottom-[154px] mx-auto max-w-sm rounded-[24px] border border-orange-100 bg-white p-4 shadow-2xl shadow-slate-900/20"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 font-black text-white shadow-sm">
                {demoTourStep + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-slate-950">
                  {demoTourContent[demoTourStep].title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {demoTourContent[demoTourStep].description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex flex-1 gap-1.5" aria-label={`共3步，当前第${demoTourStep + 1}步`}>
                {demoTourContent.map((item, index) => (
                  <span
                    key={item.title}
                    className={`h-1.5 rounded-full transition-all ${index === demoTourStep ? 'w-6 bg-orange-500' : 'w-1.5 bg-slate-200'}`}
                  />
                ))}
              </div>
              <button
                onClick={onDemoTourFinish}
                className="min-h-11 rounded-xl px-3 text-xs font-semibold text-slate-500"
              >
                跳过
              </button>
              <button
                onClick={advanceDemoTour}
                className="min-h-11 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white transition-transform active:scale-95"
              >
                {demoTourStep === 1
                  ? '填入示例'
                  : demoTourStep === 2
                    ? '完成'
                    : '下一步'}
              </button>
            </div>
          </section>
        </div>
      )}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        aria-label="选择本地图片"
        className="hidden"
        onChange={(event) => {
          addAttachments(event.target.files, 'image');
          event.target.value = '';
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
        multiple
        aria-label="选择本地文件"
        className="hidden"
        onChange={(event) => {
          addAttachments(event.target.files, 'file');
          event.target.value = '';
        }}
      />
      <Drawer
        open={attachmentSheetOpen}
        onOpenChange={setAttachmentSheetOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px] [--drawer-height:min(42dvh,360px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">添加资料</DrawerTitle>
            <DrawerDescription className="text-left">
              从本地选择图片或学习文件，最多可添加 5 个。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭附件选择"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-3 px-4 pb-[max(20px,env(safe-area-inset-bottom))]">
            <button
              onClick={() => imageInputRef.current?.click()}
              className="flex min-h-[132px] flex-col items-start justify-between rounded-[22px] border border-blue-100 bg-blue-50 p-4 text-left transition-[background-color,transform] hover:bg-blue-100 active:scale-[.98]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <ImageIcon className="size-6" />
              </span>
              <span>
                <span className="block text-base font-bold">选择图片</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                  支持 JPG、PNG、HEIC 等
                </span>
              </span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[132px] flex-col items-start justify-between rounded-[22px] border border-amber-100 bg-amber-50 p-4 text-left transition-[background-color,transform] hover:bg-amber-100 active:scale-[.98]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-amber-600 shadow-sm">
                <FileText className="size-6" />
              </span>
              <span>
                <span className="block text-base font-bold">选择文件</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                  支持 PDF、Word、PPT 等
                </span>
              </span>
            </button>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={modelSheetOpen}
        onOpenChange={setModelSheetOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px] [--drawer-height:min(58dvh,520px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">选择模型</DrawerTitle>
            <DrawerDescription className="text-left">
              根据任务复杂度选择，积分按每次回复计算。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭模型选择"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <div className="space-y-2">
              {models.map((model) => {
                const Icon = model.icon;
                const selected = model.id === selectedModel.id;
                return (
                  <button
                    key={model.id}
                    aria-label={`选择模型${model.name}，${model.multiplier}`}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedModel(model);
                      setModelSheetOpen(false);
                      notify(`已切换到 ${model.name}`);
                    }}
                    className={`flex min-h-[68px] w-full items-center gap-3 rounded-2xl border px-3 text-left transition-colors active:bg-blue-50 ${selected ? 'border-blue-200 bg-blue-50' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-2xl ${model.color}`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="truncate text-base font-bold">
                          {model.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {model.multiplier}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {model.description}
                      </span>
                    </span>
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full ${selected ? 'bg-primary text-white' : 'border bg-white text-transparent'}`}
                    >
                      <Check className="size-4" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={skillSheetOpen}
        onOpenChange={setSkillSheetOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px] [--drawer-height:min(64dvh,560px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">选择技能</DrawerTitle>
            <DrawerDescription className="text-left">
              切换推荐技能或已安装技能，当前对话将使用对应能力。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭技能选择"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <div className="space-y-2">
              <button
                aria-label="选择默认综合技能BingoMate"
                aria-pressed={!selectedChatSkill && chatMode === 'default'}
                onClick={() => {
                  selectMode('default');
                  setSkillSheetOpen(false);
                  notify('已切换到 BingoMate 综合技能');
                }}
                className={`flex min-h-[68px] w-full items-center gap-3 rounded-2xl border px-3 text-left transition-colors ${!selectedChatSkill && chatMode === 'default' ? 'border-blue-200 bg-blue-50' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
              >
                <img
                  src="/brand/bingomate-owl.png"
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  className="size-11 shrink-0 object-contain"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-bold">BingoMate</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    默认综合技能 · 适合日常学习问答
                  </span>
                </span>
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full ${!selectedChatSkill && chatMode === 'default' ? 'bg-primary text-white' : 'border bg-white text-transparent'}`}
                >
                  <Check className="size-4" />
                </span>
              </button>
              <p className="px-1 pb-1 pt-3 text-xs font-semibold text-muted-foreground">推荐技能</p>
              {recommendedModes.map((recommendedMode) => {
                const selected =
                  !selectedChatSkill && chatMode === recommendedMode.id;
                return (
                  <button
                    key={recommendedMode.id}
                    aria-label={`选择推荐技能${recommendedMode.label}`}
                    aria-pressed={selected}
                    onClick={() => {
                      selectMode(recommendedMode.id);
                      setSkillSheetOpen(false);
                      notify(`已切换到 ${recommendedMode.label}`);
                    }}
                    className={`flex min-h-[68px] w-full items-center gap-3 rounded-2xl border px-3 text-left transition-colors ${selected ? 'border-blue-200 bg-blue-50' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <img
                      src={recommendedMode.image}
                      alt=""
                      aria-hidden="true"
                      width={44}
                      height={44}
                      className="size-11 shrink-0 object-contain"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-bold">
                        {recommendedMode.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {recommendedMode.subtitle}
                      </span>
                    </span>
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full ${selected ? 'bg-primary text-white' : 'border bg-white text-transparent'}`}
                    >
                      <Check className="size-4" />
                    </span>
                  </button>
                );
              })}
              {availableSkills.length > 0 && (
                <p className="px-1 pb-1 pt-3 text-xs font-semibold text-muted-foreground">已安装技能</p>
              )}
              {availableSkills.map((skill) => {
                const selected = selectedChatSkill?.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    aria-label={`选择技能${skill.name}`}
                    aria-pressed={selected}
                    onClick={() => {
                      selectInstalledSkill(skill);
                      setSkillSheetOpen(false);
                      notify(`已选择技能：${skill.name}`);
                    }}
                    className={`flex min-h-[68px] w-full items-center gap-3 rounded-2xl border px-3 text-left transition-colors ${selected ? 'border-blue-200 bg-blue-50' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <img
                      src={skill.image}
                      alt={`${skill.name} Logo`}
                      width={44}
                      height={44}
                      className="size-11 shrink-0 rounded-2xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-bold">{skill.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {skill.category} · {skill.author}
                      </span>
                    </span>
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full ${selected ? 'bg-primary text-white' : 'border bg-white text-transparent'}`}
                    >
                      <Check className="size-4" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function PhotoFlow({
  step,
  setStep,
  onCapture,
  notify,
}: {
  step: Exclude<PhotoStep, null>;
  setStep: (step: PhotoStep) => void;
  onCapture: () => void;
  notify: (message: string) => void;
}) {
  const [answer, setAnswer] = useState('');
  const [captureMode, setCaptureMode] = useState<'single' | 'page'>('single');
  if (step === 'camera')
    return (
      <>
        <Header
          title="拍题辅导"
          subtitle="把题目放进框内"
          onBack={() => setStep(null)}
        />
        <div className="flex h-[calc(100dvh-72px)] flex-col overflow-hidden bg-slate-950">
          <div className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(circle_at_50%_28%,#334155_0%,#172033_48%,#080d18_100%)] text-white md:mx-auto md:my-4 md:w-[min(760px,calc(100%-32px))] md:rounded-[32px]">
            <div className="absolute -left-16 top-20 size-56 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -right-20 bottom-10 size-64 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="absolute inset-x-0 top-4 z-10 flex justify-center px-4">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
                <ScanLine className="size-4 text-blue-300" />
                {captureMode === 'single' ? '单题模式' : '整页模式'} · 请保持画面清晰
              </div>
            </div>

            <div
              className={`absolute inset-x-6 top-[15%] bottom-[9%] transition-[inset,border-radius] duration-300 md:inset-x-16 ${captureMode === 'single' ? 'rounded-[28px]' : 'inset-x-9 rounded-2xl md:inset-x-24'}`}
            >
              <div className="absolute inset-0 rounded-[inherit] border border-white/20 bg-white/[0.025]" />
              <span className="absolute left-0 top-0 size-9 rounded-tl-[inherit] border-l-[3px] border-t-[3px] border-blue-400" />
              <span className="absolute right-0 top-0 size-9 rounded-tr-[inherit] border-r-[3px] border-t-[3px] border-blue-400" />
              <span className="absolute bottom-0 left-0 size-9 rounded-bl-[inherit] border-b-[3px] border-l-[3px] border-blue-400" />
              <span className="absolute bottom-0 right-0 size-9 rounded-br-[inherit] border-b-[3px] border-r-[3px] border-blue-400" />
              <span className="absolute left-4 right-4 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent shadow-[0_0_16px_rgba(147,197,253,.7)]" />
            </div>

            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur-sm">
                {captureMode === 'single' ? (
                  <Camera className="size-8 text-blue-200" />
                ) : (
                  <FileImage className="size-8 text-violet-200" />
                )}
              </span>
              <p className="mt-4 text-base font-semibold text-white">
                {captureMode === 'single'
                  ? '将一道题完整放入取景框'
                  : '将整张试卷或作业放入取景框'}
              </p>
              <p className="mt-1 text-xs text-white/55">
                避免阴影、反光和边缘缺失
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <span className="rounded-full bg-black/25 px-3 py-1.5 text-[11px] text-white/65 backdrop-blur-sm">
                拍摄后直接进入辅导对话
              </span>
            </div>
          </div>

          <div className="shrink-0 rounded-t-[30px] bg-white px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,.16)] md:rounded-none">
            <div className="mx-auto grid w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center gap-4">
              <button
                aria-label="从相册选择题目图片"
                onClick={onCapture}
                className="flex min-h-[68px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-orange-50 to-rose-50 px-3 text-sm font-bold text-rose-700 ring-1 ring-rose-100 transition-transform active:scale-[.97]"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-sm shadow-rose-200">
                  <ImageIcon className="size-4.5" />
                </span>
                <span className="hidden min-[350px]:inline">相册</span>
              </button>

              <button
                aria-label={captureMode === 'single' ? '拍摄题目' : '拍摄整页'}
                onClick={onCapture}
                className="grid size-[76px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg shadow-blue-200 ring-4 ring-blue-50 transition-transform active:scale-95"
              >
                <span className="grid size-full place-items-center rounded-full border-2 border-white/90 bg-white/15">
                  <Camera className="size-7 text-white" />
                </span>
              </button>

              <button
                aria-label={captureMode === 'single' ? '切换到整页模式' : '切换到单题模式'}
                aria-pressed={captureMode === 'page'}
                onClick={() => {
                  const nextMode = captureMode === 'single' ? 'page' : 'single';
                  setCaptureMode(nextMode);
                  notify(nextMode === 'page' ? '已切换到整页模式' : '已切换到单题模式');
                }}
                className={`flex min-h-[68px] items-center justify-center gap-2 rounded-2xl px-3 text-sm font-bold ring-1 transition-[background-color,color,transform] active:scale-[.97] ${captureMode === 'page' ? 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white ring-violet-400' : 'bg-gradient-to-br from-violet-50 to-blue-50 text-indigo-700 ring-indigo-100'}`}
              >
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${captureMode === 'page' ? 'bg-white/15 text-white' : 'bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm shadow-indigo-200'}`}>
                  <FileImage className="size-4.5" />
                </span>
                <span className="hidden min-[350px]:inline">
                  {captureMode === 'page' ? '拍单题' : '拍整页'}
                </span>
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-500">
              点击中间按钮拍摄 · 支持手写题与印刷题
            </p>
          </div>
        </div>
      </>
    );
  if (step === 'ocr')
    return (
      <>
        <Header
          title="确认识别结果"
          subtitle="提交前可以修改"
          onBack={() => setStep('camera')}
        />
        <div className="space-y-4 px-5 py-5">
          <div className="rounded-3xl bg-slate-100 p-5">
            <div className="rounded-2xl bg-white p-5 font-serif text-lg leading-relaxed text-slate-800 shadow-sm">
              已知二次函数 y = x² − 4x + 3，求它的顶点坐标，并写出对称轴。
            </div>
          </div>
          <label htmlFor="ocr" className="block text-sm font-semibold">
            识别文字
          </label>
          <textarea
            id="ocr"
            defaultValue="已知二次函数 y = x² − 4x + 3，求它的顶点坐标，并写出对称轴。"
            className="min-h-28 w-full resize-none rounded-2xl border bg-card p-4 text-base outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={() => setStep('guide')}
            className="h-12 w-full rounded-2xl text-base"
          >
            识别正确，开始辅导
          </Button>
        </div>
      </>
    );
  if (step === 'guide')
    return (
      <>
        <Header
          title="分步辅导"
          subtitle="二次函数 · 配方法"
          onBack={() => setStep('ocr')}
        />
        <div className="space-y-4 px-5 py-5">
          <div className="flex items-start gap-3">
            <img
              src="/brand/bingomate-owl.png"
              alt=""
              aria-hidden="true"
              width={36}
              height={36}
              className="size-9 shrink-0 object-contain"
            />
            <div className="rounded-2xl rounded-tl-md bg-blue-50 p-4 text-sm leading-relaxed text-slate-800">
              <p className="font-semibold">先不急着看答案。</p>
              <p className="mt-1">
                试着把 x² − 4x 配成完全平方。(x − 2)² 展开后是什么？
              </p>
            </div>
          </div>
          <button
            onClick={() => notify('提示：先加 4，再减 4')}
            className="min-h-12 w-full rounded-2xl border bg-card text-sm"
          >
            <Sparkles className="mr-2 inline size-4 text-primary" />
            给我一个提示
          </button>
          <label htmlFor="answer" className="block text-sm font-semibold">
            写下你的答案
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="写下你的推导过程…"
            className="min-h-32 w-full rounded-2xl border bg-card p-4 text-base outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            disabled={!answer.trim()}
            onClick={() => setStep('feedback')}
            className="h-12 w-full rounded-2xl text-base"
          >
            提交检查
          </Button>
        </div>
      </>
    );
  return (
    <>
      <Header
        title="作答反馈"
        subtitle="AI 参考判断，不是正式成绩"
        onBack={() => setStep('guide')}
      />
      <div className="space-y-4 px-5 py-5">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-3">
            <IconBox icon={CircleAlert} />
            <div>
              <p className="font-bold">思路接近了，还差一步</p>
              <p className="text-xs text-muted-foreground">置信度较高</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-800">
            正确配方是 <strong>x² − 4x + 3 = (x − 2)² − 1</strong>，所以顶点是{' '}
            <strong>(2, −1)</strong>，对称轴是 <strong>x = 2</strong>。
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-4">
          <p className="text-xs font-semibold text-primary">已沉淀到错题本</p>
          <p className="mt-1 font-semibold">错因：常数项符号错误</p>
          <p className="mt-1 text-sm text-muted-foreground">掌握度 52% → 68%</p>
        </div>
        <Button
          onClick={() => setStep(null)}
          className="h-12 w-full rounded-2xl text-base"
        >
          <Check className="size-5" />
          回到聊天
        </Button>
      </div>
    </>
  );
}

export function BingoApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoStep, setPhotoStep] = useState<PhotoStep>(null);
  const [pendingPhotoRequest, setPendingPhotoRequest] = useState('');
  const [photoConversation, setPhotoConversation] =
    useState<PhotoConversation | null>(null);
  const [view, setView] = useState<AppView>('chat');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [installedSkills, setInstalledSkills] = useState<Set<string>>(
    () => new Set(['focus-timer']),
  );
  const [toast, setToast] = useState('');
  const [conversationKey, setConversationKey] = useState(0);
  const [points, setPoints] = useState(1280);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    nickname: '林小满',
    region: '',
    grade: '八年级',
    school: '',
    textbook: '',
    focusSubject: '数学',
    weakTopics: '',
    learningGoal: '',
    guidanceStyle: '先启发思考，再给完整解析',
  });
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [tutoringPreferences, setTutoringPreferences] =
    useState<TutoringPreferences>({
      guidanceMode: '启发式引导',
      detailLevel: '标准',
      difficulty: '跟随进度',
      hintPace: '一次一点',
      tone: '耐心鼓励',
      askBeforeAnswer: true,
      autoSaveMistakes: true,
      lessonSummary: true,
    });
  const [accountPhone, setAccountPhone] = useState('13812345206');
  const [passwordUpdatedAt, setPasswordUpdatedAt] = useState(
    '上次修改：2026年8月16日',
  );
  const [devices, setDevices] = useState<BingoDevice[]>([
    {
      id: 'my-bingoclaw',
      name: 'My BingoClaw',
      code: 'BM-20260830',
      online: true,
    },
    {
      id: 'study-room',
      name: '书房 BingoMate',
      code: 'BM-20260718',
      online: true,
    },
    {
      id: 'living-room',
      name: '客厅 BingoMate',
      code: 'BM-20260526',
      online: false,
    },
  ]);
  const [currentDeviceId, setCurrentDeviceId] = useState('my-bingoclaw');
  const [remoteChannels, setRemoteChannels] = useState<RemoteChannel[]>(
    initialRemoteChannels,
  );
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(
    initialScheduledTasks,
  );
  const [pointTransactions, setPointTransactions] = useState<
    PointTransaction[]
  >([
    {
      id: 'usage-1',
      title: '深度解析对话',
      detail: 'DeepSeek-V4-Pro',
      time: '今天 15:42',
      amount: -18,
    },
    {
      id: 'recharge-1',
      title: '积分充值',
      detail: '微信支付 ¥18',
      time: '今天 09:30',
      amount: 2000,
    },
    {
      id: 'usage-2',
      title: '拍题辅导',
      detail: '二次函数题目解析',
      time: '昨天 20:16',
      amount: -25,
    },
    {
      id: 'usage-3',
      title: '英语口语陪练',
      detail: '情景对话 12 分钟',
      time: '昨天 18:05',
      amount: -12,
    },
    {
      id: 'recharge-2',
      title: '新用户积分赠送',
      detail: '首次登录奖励',
      time: '8月30日 10:20',
      amount: 300,
    },
    {
      id: 'usage-4',
      title: '试卷生成助手',
      detail: '一次函数小测',
      time: '8月30日 09:48',
      amount: -30,
    },
  ]);
  const [rechargeOpen, setRechargeOpen] = useState(false);
  const [deviceSwitcherOpen, setDeviceSwitcherOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('popular');
  const [demoStage, setDemoStage] = useState<DemoStage>(null);
  const [demoTourStep, setDemoTourStep] = useState(0);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2300);
  };
  const chooseFeature = (label: string) => {
    setMenuOpen(false);
    if (label === '技能广场') {
      setPhotoStep(null);
      setSelectedSkill(null);
      setView('skills');
      return;
    }
    if (label === '定时任务') {
      setPhotoStep(null);
      setSelectedSkill(null);
      setView('tasks');
      return;
    }
    if (label === '成长报告') {
      setPhotoStep(null);
      setSelectedSkill(null);
      setView('growth');
      return;
    }
    notify(`已进入${label}`);
  };
  const chooseHistory = (title: string) => {
    setMenuOpen(false);
    setView('chat');
    setSelectedSkill(null);
    setPhotoStep(null);
    setPhotoConversation(null);
    setPendingPhotoRequest('');
    setConversationKey((key) => key + 1);
    notify(title === '新对话' ? '已开始新对话' : `已打开聊天记录：${title}`);
  };
  const chooseSettings = () => {
    setMenuOpen(false);
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('settings');
  };
  const chooseProfile = () => {
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('profile');
  };
  const choosePreferences = () => {
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('preferences');
  };
  const chooseSecurity = () => {
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('security');
  };
  const choosePoints = () => {
    setMenuOpen(false);
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('points');
  };
  const chooseDevices = () => {
    setMenuOpen(false);
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('devices');
  };
  const chooseChannels = () => {
    setMenuOpen(false);
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('channels');
  };
  const saveStudentProfile = (profile: StudentProfile) => {
    setStudentProfile(profile);
    if (!profileCompleted) {
      setProfileCompleted(true);
      setPoints((current) => current + 100);
      setPointTransactions((current) => [
        {
          id: `profile-reward-${Date.now()}`,
          title: '学生档案完善奖励',
          detail: '首次完善学生学习档案',
          time: '刚刚',
          amount: 100,
        },
        ...current,
      ]);
      notify('学生档案已完善，100 积分已到账');
    } else {
      notify('学生档案已更新');
    }
    setView('settings');
  };
  const saveTutoringPreferences = (preferences: TutoringPreferences) => {
    setTutoringPreferences(preferences);
    setStudentProfile((current) => ({
      ...current,
      guidanceStyle: preferences.guidanceMode,
    }));
    notify('辅导偏好已保存');
    setView('settings');
  };
  const changeAccountPhone = (phone: string) => {
    setAccountPhone(phone);
    notify('账号手机号已更新');
  };
  const changeAccountPassword = () => {
    setPasswordUpdatedAt('刚刚修改');
    notify('登录密码已修改');
  };
  const bindDevice = (
    deviceCode: string,
    _activationCode: string,
    deviceName: string,
  ) => {
    const deviceId = `device-${Date.now()}`;
    const normalizedCode = deviceCode.toUpperCase();
    setDevices((current) => [
      ...current,
      {
        id: deviceId,
        name: deviceName,
        code: normalizedCode,
        online: true,
      },
    ]);
    setCurrentDeviceId(deviceId);
    notify('设备绑定成功，已设为当前连接设备');
  };
  const renameDevice = (deviceId: string, name: string) => {
    setDevices((current) =>
      current.map((device) =>
        device.id === deviceId ? { ...device, name } : device,
      ),
    );
    notify('设备名称已更新');
  };
  const switchDevice = (device: BingoDevice) => {
    setCurrentDeviceId(device.id);
    setDevices((current) =>
      current.map((item) =>
        item.id === device.id ? { ...item, online: true } : item,
      ),
    );
    setDeviceSwitcherOpen(false);
    notify(`已切换至 ${device.name}`);
  };
  const connectChannel = (channel: RemoteChannel) => {
    setRemoteChannels((current) =>
      current.map((item) =>
        item.id === channel.id
          ? {
              ...item,
              connected: true,
              account: `${channel.name} BingoMate 助手`,
            }
          : item,
      ),
    );
    notify(`${channel.name}通道已连接`);
  };
  const disconnectChannel = (channel: RemoteChannel) => {
    setRemoteChannels((current) =>
      current.map((item) =>
        item.id === channel.id
          ? { ...item, connected: false, account: '暂未配置 Agent' }
          : item,
      ),
    );
    notify(`${channel.name}通道已断开`);
  };
  const createScheduledTask = (task: ScheduledTask) => {
    setScheduledTasks((current) => [task, ...current]);
    notify('定时任务已创建');
  };
  const toggleScheduledTask = (taskId: string) => {
    setScheduledTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, active: !task.active } : task,
      ),
    );
  };
  const createTaskFromChat = (text: string) => {
    const matchedTime = text.match(/([01]?\d|2[0-3])[:：](\d{2})/);
    const time = matchedTime
      ? `${matchedTime[1].padStart(2, '0')}:${matchedTime[2]}`
      : '20:00';
    const name = text.includes('作业')
      ? '作业完成提醒'
      : text.includes('单词') || text.includes('英语')
        ? '英语复习提醒'
        : text.includes('报告')
          ? '家长学习报告'
          : 'AI 学习提醒';
    const schedule = text.includes('每周')
      ? `每周日 ${time}`
      : text.includes('工作日')
        ? `工作日 ${time}`
        : `每天 ${time}`;
    setScheduledTasks((current) => [
      {
        id: `chat-task-${Date.now()}`,
        name,
        instruction: text,
        expert: text.includes('报告') ? '成长报告助手' : '学习规划助手',
        schedule,
        channel: 'My BingoClaw',
        active: true,
        source: 'chat',
      },
      ...current,
    ]);
  };
  const installSkill = (skill: Skill) => {
    if (installedSkills.has(skill.id)) return;
    setInstalledSkills((current) => new Set(current).add(skill.id));
    notify(`“${skill.name}”已安装，可在聊天中使用`);
  };

  const startDemoTour = () => {
    setMenuOpen(false);
    setView('chat');
    setSelectedSkill(null);
    setPhotoStep(null);
    setPhotoConversation(null);
    setPendingPhotoRequest('');
    setConversationKey((key) => key + 1);
    setDemoTourStep(0);
    setDemoStage('tour');
  };

  const finishDemoTour = () => {
    setDemoStage(null);
    setDemoTourStep(0);
    notify('新手引导已完成');
  };

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="relative flex h-dvh w-full overflow-hidden bg-background">
        <Sidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onFeature={chooseFeature}
          onHistory={chooseHistory}
          onSettings={chooseSettings}
          onPoints={choosePoints}
          currentDeviceName={
            devices.find((device) => device.id === currentDeviceId)?.name ??
            '未连接设备'
          }
          onSwitchDevice={() => setDeviceSwitcherOpen(true)}
          points={points}
          notify={notify}
        />
        <div className="min-w-0 flex-1">
          {selectedSkill ? (
            <SkillDetailView
              skill={selectedSkill}
              installed={installedSkills.has(selectedSkill.id)}
              onBack={() => setSelectedSkill(null)}
              onInstall={installSkill}
            />
          ) : view === 'skills' ? (
            <SkillsView
              onBack={() => setView('chat')}
              onSelect={setSelectedSkill}
              installedSkills={installedSkills}
            />
          ) : view === 'settings' ? (
            <SettingsView
              onBack={() => setView('chat')}
              onProfile={chooseProfile}
              onPreferences={choosePreferences}
              onSecurity={chooseSecurity}
              onDevices={chooseDevices}
              onChannels={chooseChannels}
              currentDeviceName={
                devices.find((device) => device.id === currentDeviceId)?.name ??
                '未连接设备'
              }
              profileCompleted={profileCompleted}
              preferences={tutoringPreferences}
              notify={notify}
            />
          ) : view === 'profile' ? (
            <StudentProfileView
              profile={studentProfile}
              completed={profileCompleted}
              onBack={() => setView('settings')}
              onSave={saveStudentProfile}
            />
          ) : view === 'preferences' ? (
            <TutoringPreferencesView
              preferences={tutoringPreferences}
              onBack={() => setView('settings')}
              onSave={saveTutoringPreferences}
            />
          ) : view === 'security' ? (
            <AccountSecurityView
              phone={accountPhone}
              passwordUpdatedAt={passwordUpdatedAt}
              onBack={() => setView('settings')}
              onPhoneChange={changeAccountPhone}
              onPasswordChange={changeAccountPassword}
            />
          ) : view === 'growth' ? (
            <GrowthReportView onBack={() => setView('chat')} />
          ) : view === 'points' ? (
            <PointsView
              points={points}
              transactions={pointTransactions}
              onBack={() => setView('chat')}
              onRecharge={() => setRechargeOpen(true)}
            />
          ) : view === 'devices' ? (
            <DevicesView
              devices={devices}
              currentDeviceId={currentDeviceId}
              onBack={() => setView('settings')}
              onBind={bindDevice}
              onRename={renameDevice}
            />
          ) : view === 'channels' ? (
            <ChannelsView
              channels={remoteChannels}
              onBack={() => setView('settings')}
              onConnect={connectChannel}
              onDisconnect={disconnectChannel}
            />
          ) : view === 'tasks' ? (
            <TasksView
              tasks={scheduledTasks}
              onBack={() => setView('chat')}
              onCreate={createScheduledTask}
              onToggle={toggleScheduledTask}
            />
          ) : photoStep ? (
            <PhotoFlow
              step={photoStep}
              setStep={setPhotoStep}
              onCapture={() => {
                setPhotoConversation({
                  id: Date.now(),
                  request: pendingPhotoRequest,
                });
                setPhotoStep(null);
                setConversationKey((key) => key + 1);
              }}
              notify={notify}
            />
          ) : (
            <ChatView
              key={conversationKey}
              onMenu={() => setMenuOpen(true)}
              onDemo={() => setDemoStage('menu')}
              onCamera={(request) => {
                setView('chat');
                setPendingPhotoRequest(request);
                setPhotoStep('camera');
              }}
              onScheduleFromChat={createTaskFromChat}
              installedSkills={installedSkills}
              photoConversation={photoConversation}
              demoTourStep={demoStage === 'tour' ? demoTourStep : null}
              onDemoTourNext={() =>
                setDemoTourStep((step) => Math.min(step + 1, 2))
              }
              onDemoTourFinish={finishDemoTour}
              notify={notify}
            />
          )}
        </div>
        {toast && (
          <output
            aria-live="polite"
            className="fixed left-1/2 top-5 z-[70] w-[min(360px,calc(100%-32px))] -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm text-white shadow-xl"
          >
            {toast}
          </output>
        )}
      </div>
      <DemoExperience
        stage={demoStage}
        setStage={setDemoStage}
        onBind={bindDevice}
        onStartTour={startDemoTour}
        notify={notify}
      />
      <Drawer
        open={rechargeOpen}
        onOpenChange={setRechargeOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
              <PointsIcon className="size-9" />
              充值积分
            </DrawerTitle>
            <DrawerDescription className="text-left">
              选择充值金额，支付完成后积分将自动到账。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭充值"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 overflow-y-auto overscroll-contain px-4">
            <div className="grid grid-cols-2 gap-3">
              {rechargePlans.map((plan) => {
                const selected = plan.id === selectedPlanId;
                return (
                  <button
                    key={plan.id}
                    aria-label={`充值${plan.price}元，获得${plan.points}积分`}
                    aria-pressed={selected}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative min-h-[116px] rounded-2xl border p-4 text-left transition-colors ${selected ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-100' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                  >
                    <span className="block text-2xl font-black text-slate-900">
                      ¥{plan.price}
                    </span>
                    <span className="mt-1 block font-semibold text-amber-700">
                      {plan.points.toLocaleString()} 积分
                    </span>
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {plan.label}
                    </span>
                    {selected && (
                      <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-amber-500 text-white">
                        <Check className="size-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <DrawerFooter className="px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-5">
            <Button
              className="h-12 w-full rounded-2xl bg-amber-500 text-base font-bold text-white hover:bg-amber-600"
              onClick={() => {
                const plan = rechargePlans.find(
                  (item) => item.id === selectedPlanId,
                );
                if (!plan) return;
                setPoints((current) => current + plan.points);
                setPointTransactions((current) => [
                  {
                    id: `recharge-${Date.now()}`,
                    title: '积分充值',
                    detail: `支付 ¥${plan.price}`,
                    time: '刚刚',
                    amount: plan.points,
                  },
                  ...current,
                ]);
                setRechargeOpen(false);
                notify(
                  `充值成功，已到账 ${plan.points.toLocaleString()} 积分`,
                );
              }}
            >
              确认充值
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={deviceSwitcherOpen}
        onOpenChange={setDeviceSwitcherOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(54dvh,460px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
              <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <ChevronsUpDown className="size-5" />
              </span>
              切换设备
            </DrawerTitle>
            <DrawerDescription className="text-left">
              选择要连接和使用的 BingoMate 设备。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭设备选择"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="overflow-hidden rounded-3xl border bg-white">
              {devices.map((device, index) => {
                const isCurrent = device.id === currentDeviceId;
                return (
                  <button
                    key={device.id}
                    aria-label={`切换到${device.name}`}
                    aria-pressed={isCurrent}
                    onClick={() => switchDevice(device)}
                    className={`flex min-h-[72px] w-full items-center gap-3 px-4 text-left transition-colors ${index ? 'border-t' : ''} ${isCurrent ? 'bg-blue-50/70' : 'hover:bg-muted'}`}
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-2xl ${isCurrent ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
                    >
                      <MonitorSmartphone className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {device.name}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className={`size-2 rounded-full ${device.online ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        />
                        {device.online ? '在线' : '离线'} · {device.code}
                      </span>
                    </span>
                    {isCurrent ? (
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                        <Check className="size-4" />
                      </span>
                    ) : (
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
