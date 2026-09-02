'use client';

import { useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Blocks,
  Box,
  Bot,
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
  FileImage,
  Flame,
  Gauge,
  History,
  Image as ImageIcon,
  Link2,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquarePlus,
  MessageCircle,
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
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Settings,
  Sparkles,
  Star,
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
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PhotoStep = null | 'camera' | 'ocr' | 'guide' | 'feedback';
type Message = { id: number; role: 'assistant' | 'user'; text: string };
type ChatModeId = 'default' | 'photo' | 'homework' | 'mistakes' | 'practice';
type AppView =
  | 'chat'
  | 'skills'
  | 'settings'
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
  icon: LucideIcon;
  color: string;
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
  name: string;
  subtitle: string;
  headline: string;
  description: string;
  placeholder: string;
  icon: LucideIcon;
  iconStyle: string;
  suggestions: string[];
  reply: string;
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
    name: '自动',
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
    name: 'BingoMate 学伴',
    subtitle: '在线 · 启发式辅导',
    headline: '今天想学点什么？',
    description: '问一道题、检查思路，或者把今天的复习交给我安排。',
    placeholder: '发消息或创建学习任务…',
    icon: Sparkles,
    iconStyle: 'bg-blue-50 text-blue-600',
    suggestions: [],
    reply: '可以。先告诉我你具体卡在哪一步？我会先给提示，不会直接把完整答案丢给你。',
  },
  photo: {
    id: 'photo',
    name: '拍题辅导专家',
    subtitle: '识别题目 · 分步启发',
    headline: '拍下题目，我陪你拆解思路',
    description: '先识别题目和你的解题过程，再从卡住的那一步开始提示。',
    placeholder: '描述题目、说说你的思路，或上传题目照片…',
    icon: Camera,
    iconStyle: 'bg-blue-50 text-blue-600',
    suggestions: ['拍照上传一道题', '我先说说自己的解题思路'],
    reply: '我先帮你识别题目条件，再从关键突破口开始提示。你也可以把已经做到的步骤一起发给我。',
  },
  homework: {
    id: 'homework',
    name: '作业批改与学情分析专家',
    subtitle: '智能批改 · 错因分析 · 薄弱点诊断',
    headline: 'Hi，我是作业批改与学情分析专家',
    description: '智能批改、错因分析和薄弱点诊断，帮助学生找到真正需要加强的环节。',
    placeholder: '描述批改任务，或上传学生作业…',
    icon: PenLine,
    iconStyle: 'bg-violet-50 text-violet-600',
    suggestions: ['请批改这份学生作业', '帮我分析这次作业的错题原因'],
    reply: '可以。我会先检查答案和过程，再归纳错因、薄弱知识点以及下一步练习建议。请上传作业或题目。',
  },
  mistakes: {
    id: 'mistakes',
    name: '错题复习专家',
    subtitle: '错因归纳 · 掌握度追踪',
    headline: '把错题真正变成会做的题',
    description: '按错因和掌握度安排复习，用相似题确认知识点是否已经掌握。',
    placeholder: '上传错题，或告诉我今天想复习的科目…',
    icon: RotateCcw,
    iconStyle: 'bg-orange-50 text-orange-600',
    suggestions: ['从错题本挑 5 道复习', '分析我最近反复出错的原因'],
    reply: '我会先判断错因和掌握度，再安排复习顺序，并用一道相似题确认你是否真正掌握。',
  },
  practice: {
    id: 'practice',
    name: '智能练习专家',
    subtitle: '按薄弱点出题 · 难度自适应',
    headline: '为你生成刚刚好的练习',
    description: '根据年级、章节和薄弱知识点生成练习，完成后自动调整下一组难度。',
    placeholder: '告诉我科目、章节、题量和难度…',
    icon: BrainCircuit,
    iconStyle: 'bg-emerald-50 text-emerald-600',
    suggestions: ['生成 10 道一次函数练习', '根据最近错题出一组巩固题'],
    reply: '好的。告诉我年级、章节、题量和期望难度，我会生成练习并在完成后给出解析。',
  },
};

const histories = [
  { group: '今天', items: ['二次函数顶点问题', '英语阅读理解怎么概括'] },
  {
    group: '过去 7 天',
    items: ['几何证明辅助线', 'Unit 3 错词复习', '数学周测错题讲解'],
  },
];

const initialRemoteChannels: RemoteChannel[] = [
  {
    id: 'wechat',
    name: '微信',
    description: '关联微信联系人，在微信中直接与 BingoMate 对话。',
    account: '林小满的微信',
    connected: true,
    recommended: true,
    icon: MessageCircle,
    color: 'bg-emerald-500 text-white',
  },
  {
    id: 'wecom',
    name: '企业微信',
    description: '接入企微群聊或私聊，适合班级与学习小组协作。',
    account: '暂未配置 Agent',
    connected: false,
    recommended: true,
    icon: Users,
    color: 'bg-blue-500 text-white',
  },
  {
    id: 'qq',
    name: 'QQ',
    description: '将 BingoMate 接入 QQ，随时在群聊或私聊中互动。',
    account: 'BingoMate 学习助手',
    connected: true,
    recommended: true,
    icon: MessageCircle,
    color: 'bg-sky-500 text-white',
  },
  {
    id: 'feishu',
    name: '飞书',
    description: '接入飞书机器人，在群聊或私聊中完成学习任务。',
    account: '暂未配置 Agent',
    connected: false,
    icon: Send,
    color: 'bg-indigo-500 text-white',
  },
  {
    id: 'dingtalk',
    name: '钉钉',
    description: '接入钉钉机器人，支持班级群和学习团队协作。',
    account: 'BingoMate 班级助手',
    connected: true,
    icon: Send,
    color: 'bg-cyan-500 text-white',
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
            <h2 className="text-lg font-bold">热门技能</h2>
            <p className="text-xs text-muted-foreground">
              全部免费 · 随时可以使用
            </p>
          </div>
          <Badge variant="secondary" className="h-7 px-3">
            {skills.length} 个技能
          </Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
          {skills.map((skill) => {
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
  onRecharge,
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
  onRecharge: () => void;
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
                {group.items.map((title) => (
                  <button
                    key={title}
                    onClick={() => onHistory(title)}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm hover:bg-muted"
                  >
                    <History className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{title}</span>
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
              onClick={onRecharge}
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
  onPoints,
  onDevices,
  onChannels,
  currentDeviceName,
  points,
  notify,
}: {
  onBack: () => void;
  onPoints: () => void;
  onDevices: () => void;
  onChannels: () => void;
  currentDeviceName: string;
  points: number;
  notify: (message: string) => void;
}) {
  const sections: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: LucideIcon;
      color: string;
    }[];
  }[] = [
    {
      title: '学习设置',
      items: [
        {
          label: '学生档案',
          description: '林小满 · 八年级 · 数学人教版',
          icon: UserRound,
          color: 'bg-blue-50 text-blue-600',
        },
        {
          label: '辅导偏好',
          description: '默认先启发，再给完整解析',
          icon: SlidersHorizontal,
          color: 'bg-violet-50 text-violet-600',
        },
      ],
    },
    {
      title: 'AI 与技能',
      items: [
        {
          label: '模型管理',
          description: '智能选择 · 按任务自动匹配',
          icon: Cpu,
          color: 'bg-cyan-50 text-cyan-700',
        },
        {
          label: '技能管理',
          description: '管理已安装技能与使用权限',
          icon: Blocks,
          color: 'bg-emerald-50 text-emerald-600',
        },
        {
          label: 'AI 积分与明细',
          description: `当前余额 ${points.toLocaleString()} · 查看消耗记录`,
          icon: Star,
          color: 'bg-amber-50 text-amber-700',
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
                        item.label === 'AI 积分与明细'
                          ? onPoints()
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
                        <span className="block text-sm font-semibold">
                          {item.label}
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
  const SetupIcon = setupChannel?.icon ?? MessageCircle;

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
              const Icon = channel.icon;
              return (
                <article
                  key={channel.id}
                  className="flex min-h-[210px] flex-col rounded-[24px] border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl shadow-sm ${channel.color}`}
                    >
                      <Icon className="size-6" />
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
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl shadow-sm ${setupChannel.color}`}
                >
                  <SetupIcon className="size-6" />
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

function ChatView({
  onMenu,
  onCamera,
  onScheduleFromChat,
  notify,
}: {
  onMenu: () => void;
  onCamera: () => void;
  onScheduleFromChat: (text: string) => void;
  notify: (message: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [modelSheetOpen, setModelSheetOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(models[0]);
  const [chatMode, setChatMode] = useState<ChatModeId>('default');
  const mode = chatModes[chatMode];
  const ModeIcon = mode.icon;

  const selectMode = (nextMode: ChatModeId) => {
    setChatMode(nextMode);
    setMessages([]);
    setInput('');
  };

  const send = (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || sending) return;
    const isSchedulingRequest = /提醒|定时|每天|每周|每晚|每早/.test(text);
    if (isSchedulingRequest) onScheduleFromChat(text);
    setInput('');
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', text },
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
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-2xl ${mode.iconStyle}`}
            >
              <ModeIcon className="size-5" />
            </span>
          )
        }
        right={
          <button
            aria-label={`选择模型，当前为${selectedModel.name}`}
            aria-haspopup="dialog"
            aria-expanded={modelSheetOpen}
            onClick={() => setModelSheetOpen(true)}
            className="flex min-h-11 max-w-32 items-center gap-1.5 rounded-xl bg-muted px-3 text-xs font-semibold transition-colors hover:bg-slate-200"
          >
            <span className="truncate">{selectedModel.name}</span>
            <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
          </button>
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
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ${chatMode === 'default' ? 'bg-primary text-white' : mode.iconStyle}`}
                >
                  {chatMode === 'default' ? (
                    <Bot className="size-5" />
                  ) : (
                    <ModeIcon className="size-5" />
                  )}
                </span>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[68%] ${message.role === 'user' ? 'rounded-tr-md bg-primary text-white' : 'rounded-tl-md border bg-card'}`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex items-center gap-3">
              <span
                className={`grid size-9 place-items-center rounded-xl ${chatMode === 'default' ? 'bg-primary text-white' : mode.iconStyle}`}
              >
                {chatMode === 'default' ? (
                  <Bot className="size-5" />
                ) : (
                  <ModeIcon className="size-5" />
                )}
              </span>
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
                <span
                  className={`grid size-[76px] place-items-center rounded-[26px] shadow-sm ${mode.iconStyle}`}
                >
                  <ModeIcon className="size-9" />
                </span>
              )}
              <h2 className="mt-5 text-[28px] font-bold tracking-tight">
                {mode.headline}
              </h2>
              <p
                className={`mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm ${chatMode === 'default' ? 'whitespace-nowrap' : 'px-2'}`}
              >
                {mode.description}
              </p>
              <div className="mt-7 grid w-full max-w-[360px] grid-cols-1 gap-2.5 md:max-w-2xl md:grid-cols-2">
                {chatMode === 'default'
                  ? [
                      {
                        label: '拍题辅导',
                        target: 'photo' as ChatModeId,
                        icon: Camera,
                        style: 'bg-blue-50 text-blue-600',
                      },
                      {
                        label: '作业批阅',
                        target: 'homework' as ChatModeId,
                        icon: PenLine,
                        style: 'bg-violet-50 text-violet-600',
                      },
                      {
                        label: '错题复习',
                        target: 'mistakes' as ChatModeId,
                        icon: RotateCcw,
                        style: 'bg-orange-50 text-orange-600',
                      },
                      {
                        label: '智能练习',
                        target: 'practice' as ChatModeId,
                        icon: BrainCircuit,
                        style: 'bg-emerald-50 text-emerald-600',
                      },
                    ].map(({ label, target, icon: Icon, style }) => (
                      <button
                        key={target}
                        onClick={() => selectMode(target)}
                        className="flex min-h-[54px] items-center gap-3 rounded-2xl border bg-card px-5 text-left text-sm font-medium shadow-sm transition-[border-color,background-color,transform] duration-200 hover:border-blue-200 hover:bg-blue-50/40 active:scale-[.98]"
                      >
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-xl ${style}`}
                        >
                          <Icon className="size-4" />
                        </span>
                        {label}
                        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                      </button>
                    ))
                  : mode.suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        onClick={() =>
                          chatMode === 'photo' && index === 0
                            ? onCamera()
                            : send(suggestion)
                        }
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
          <div className="mx-auto w-full max-w-4xl rounded-[26px] border bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,.1)] transition-shadow focus-within:border-blue-400 focus-within:shadow-[0_14px_42px_rgba(37,99,235,.12)]">
            <textarea
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
                onClick={() => notify('支持添加图片、PDF 和文档')}
                className="grid size-10 place-items-center rounded-full hover:bg-muted"
              >
                <Plus className="size-5" />
              </button>
              <button
                aria-label="拍题辅导"
                onClick={onCamera}
                className="flex min-h-10 items-center gap-1.5 rounded-full bg-blue-50 px-3 text-xs font-medium text-blue-700"
              >
                <Camera className="size-4" />
                拍题
              </button>
              <button
                aria-label={`当前专家：${mode.name}`}
                onClick={() =>
                  chatMode === 'default'
                    ? notify('当前使用通用智能辅导')
                    : selectMode('default')
                }
                className={`flex min-h-10 max-w-36 items-center gap-1.5 rounded-full px-3 text-xs font-medium ${chatMode === 'default' ? 'bg-slate-100 text-slate-700' : mode.iconStyle}`}
              >
                <ModeIcon className="size-4 shrink-0" />
                <span className="truncate">
                  {chatMode === 'default' ? '智能辅导' : mode.name}
                </span>
              </button>
              <span className="flex-1" />
              <button
                aria-label={input.trim() ? '发送' : '语音输入'}
                disabled={sending}
                onClick={() =>
                  input.trim() ? send() : notify('请开始说话')
                }
                className={`grid size-11 place-items-center rounded-full transition-colors disabled:opacity-40 ${input.trim() ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {input.trim() ? (
                  <Send className="size-5" />
                ) : (
                  <Mic className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}

function PhotoFlow({
  step,
  setStep,
  notify,
}: {
  step: Exclude<PhotoStep, null>;
  setStep: (step: PhotoStep) => void;
  notify: (message: string) => void;
}) {
  const [answer, setAnswer] = useState('');
  if (step === 'camera')
    return (
      <>
        <Header
          title="拍题辅导"
          subtitle="把题目放进框内"
          onBack={() => setStep(null)}
        />
        <div className="px-5 py-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-[#172033] text-white">
            <div className="absolute inset-10 rounded-2xl border-2 border-dashed border-white/70" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
              <Camera className="mx-auto size-12 text-white/70" />
              <p className="mt-3 text-sm text-white/80">将题目完整放入框内</p>
            </div>
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <button
                aria-label="拍照"
                onClick={() => setStep('ocr')}
                className="grid size-20 place-items-center rounded-full border-4 border-white bg-white/20"
              >
                <span className="size-14 rounded-full bg-white" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-8">
            <button
              onClick={() => notify('请选择清晰的题目图片')}
              className="flex min-h-11 items-center gap-2 text-sm"
            >
              <ImageIcon className="size-5" />
              相册
            </button>
            <button
              onClick={() => notify('已切换到整页模式')}
              className="flex min-h-11 items-center gap-2 text-sm"
            >
              <FileImage className="size-5" />
              拍整页
            </button>
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
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-white">
              <Bot className="size-5" />
            </span>
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
  const [view, setView] = useState<AppView>('chat');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [installedSkills, setInstalledSkills] = useState<Set<string>>(
    () => new Set(['focus-timer']),
  );
  const [toast, setToast] = useState('');
  const [conversationKey, setConversationKey] = useState(0);
  const [points, setPoints] = useState(1280);
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
    notify(`已进入${label}`);
  };
  const chooseHistory = (title: string) => {
    setMenuOpen(false);
    setView('chat');
    setSelectedSkill(null);
    setPhotoStep(null);
    setConversationKey((key) => key + 1);
    notify(title === '新对话' ? '已开始新对话' : `已打开聊天记录：${title}`);
  };
  const chooseSettings = () => {
    setMenuOpen(false);
    setSelectedSkill(null);
    setPhotoStep(null);
    setView('settings');
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
          onRecharge={() => setRechargeOpen(true)}
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
              onPoints={choosePoints}
              onDevices={chooseDevices}
              onChannels={chooseChannels}
              currentDeviceName={
                devices.find((device) => device.id === currentDeviceId)?.name ??
                '未连接设备'
              }
              points={points}
              notify={notify}
            />
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
              notify={notify}
            />
          ) : (
            <ChatView
              key={conversationKey}
              onMenu={() => setMenuOpen(true)}
              onCamera={() => {
                setView('chat');
                setPhotoStep('camera');
              }}
              onScheduleFromChat={createTaskFromChat}
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
      <Drawer
        open={rechargeOpen}
        onOpenChange={setRechargeOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] md:max-w-[680px] [--drawer-height:min(68dvh,610px)]">
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
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(18px,env(safe-area-inset-bottom))]">
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
            <Button
              className="mt-5 h-12 w-full rounded-2xl bg-amber-500 text-base font-bold text-white hover:bg-amber-600"
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
          </div>
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
