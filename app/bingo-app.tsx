'use client';

import { useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Blocks,
  BookOpenCheck,
  Box,
  Bot,
  BrainCircuit,
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Clock3,
  Coins,
  Cpu,
  FileImage,
  FileText,
  Flame,
  Gauge,
  History,
  Image as ImageIcon,
  Languages,
  Link2,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquarePlus,
  Mic,
  MonitorSmartphone,
  Newspaper,
  PenLine,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Settings2,
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
type AppView = 'chat' | 'skills' | 'settings';
type Skill = {
  id: string;
  name: string;
  author: string;
  description: string;
  category: string;
  users: string;
  version: string;
  icon: LucideIcon;
  color: string;
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
    label: '拍题辅导',
    hint: '拍照后分步讲解',
    icon: Camera,
    iconColor: 'bg-blue-50 text-blue-600',
  },
  {
    label: '作业批阅',
    hint: '识别整页与错因',
    icon: PenLine,
    iconColor: 'bg-orange-50 text-orange-600',
  },
  {
    label: '错题本',
    hint: '今天 6 道待复习',
    icon: RotateCcw,
    iconColor: 'bg-rose-50 text-rose-600',
  },
  {
    label: '智能练习',
    hint: '针对薄弱点出题',
    icon: BrainCircuit,
    iconColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: '成长报告',
    hint: '本周正确率 +12%',
    icon: BarChart3,
    iconColor: 'bg-indigo-50 text-indigo-600',
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
    icon: BrainCircuit,
    color: 'bg-blue-50 text-blue-600',
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
    icon: Languages,
    color: 'bg-violet-50 text-violet-600',
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
    icon: Clock3,
    color: 'bg-orange-50 text-orange-600',
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
    icon: BookOpenCheck,
    color: 'bg-emerald-50 text-emerald-600',
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
    icon: FileText,
    color: 'bg-cyan-50 text-cyan-700',
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
    icon: Newspaper,
    color: 'bg-rose-50 text-rose-600',
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

const histories = [
  { group: '今天', items: ['二次函数顶点问题', '英语阅读理解怎么概括'] },
  {
    group: '过去 7 天',
    items: ['几何证明辅助线', 'Unit 3 错词复习', '数学周测错题讲解'],
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

function Header({
  title,
  subtitle,
  onBack,
  onMenu,
  backLabel = '返回聊天',
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onMenu?: () => void;
  backLabel?: string;
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
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold">{title}</h1>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
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
        <section className="rounded-[28px] border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white shadow-sm shadow-blue-200">
              <Sparkles className="size-6" />
            </span>
            <div>
              <p className="font-bold">让学伴更懂你的学习方式</p>
              <p className="mt-1 text-sm text-slate-600">
                安装后，可直接在聊天中调用技能。
              </p>
            </div>
          </div>
        </section>

        <div className="mb-3 mt-6 flex items-center justify-between">
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
            const Icon = skill.icon;
            const installed = installedSkills.has(skill.id);
            return (
              <button
                key={skill.id}
                aria-label={`查看技能：${skill.name}`}
                onClick={() => onSelect(skill)}
                className="w-full rounded-[24px] border bg-white p-4 text-left shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/30 active:bg-blue-50"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl ${skill.color}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-bold">{skill.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {skill.author} · {skill.category}
                        </p>
                      </div>
                      {installed ? (
                        <Badge className="shrink-0 gap-1 bg-emerald-50 text-emerald-700">
                          <Check className="size-3" />
                          已安装
                        </Badge>
                      ) : (
                        <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
                      )}
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {skill.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        免费
                      </span>
                      <span className="flex items-center gap-1 tabular-nums">
                        <Flame className="size-3.5" />
                        {skill.users} 人使用
                      </span>
                    </div>
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
  const Icon = skill.icon;
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
              <span
                className={`grid size-16 shrink-0 place-items-center rounded-[22px] bg-white shadow-sm ${skill.color.split(' ')[1]}`}
              >
                <Icon className="size-8" />
              </span>
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
                  Demo
                  中不会上传真实学习资料。正式安装前会再次说明需要访问的内容。
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
  points,
  onRecharge,
  notify,
}: {
  open: boolean;
  onClose: () => void;
  onFeature: (label: string) => void;
  onHistory: (title: string) => void;
  onSettings: () => void;
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
            <span className="relative grid size-10 place-items-center rounded-2xl bg-primary text-white shadow-sm shadow-blue-200">
              <Bot className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-orange-500" />
            </span>
            <div>
              <p className="font-bold">BingoMate</p>
              <p className="text-xs text-muted-foreground">林小满 · 学生</p>
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
                onClick={() => notify('聊天记录搜索将在下一轮完善')}
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
              onClick={() => notify(`当前剩余 ${points.toLocaleString()} 积分`)}
              className="flex min-h-16 min-w-0 flex-1 items-center gap-3 px-3 text-left"
            >
              <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm shadow-orange-200 ring-2 ring-white">
                <Star className="size-5 fill-current" />
              </span>
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
            className="flex min-h-16 min-w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span className="grid size-11 place-items-center rounded-full border bg-white text-slate-600 shadow-sm">
              <Settings2 className="size-5" />
            </span>
            <span>设置</span>
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
  points,
  notify,
}: {
  onBack: () => void;
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
          description: 'BM-20260830 · 在线',
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
          description: '微信、QQ、飞书与钉钉',
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
                      onClick={() => notify(`${item.label}为 Demo 设置入口`)}
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

function ChatView({
  onMenu,
  onCamera,
  notify,
}: {
  onMenu: () => void;
  onCamera: () => void;
  notify: (message: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [modelSheetOpen, setModelSheetOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(models[0]);

  const send = (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || sending) return;
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
          text: '可以。先告诉我你具体卡在哪一步？我会先给提示，不会直接把完整答案丢给你。',
        },
      ]);
      setSending(false);
    }, 650);
  };

  return (
    <>
      <Header
        title="BingoMate 学伴"
        subtitle="在线 · 启发式辅导"
        onMenu={onMenu}
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
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-white">
                  <Bot className="size-5" />
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
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-white">
                <Bot className="size-5" />
              </span>
              <span className="rounded-2xl rounded-tl-md border bg-card px-4 py-3 text-sm text-muted-foreground">
                正在思考…
              </span>
            </div>
          )}
          {messages.length === 0 && (
            <div className="flex min-h-full flex-col items-center justify-center pb-2 text-center">
              <span className="relative grid size-[72px] place-items-center rounded-[24px] bg-primary text-white shadow-[0_16px_40px_rgba(37,99,235,.18)]">
                <Bot className="size-8" />
                <span className="absolute -right-1 -top-1 size-5 rounded-full border-[3px] border-background bg-orange-500" />
              </span>
              <h2 className="mt-5 text-[28px] font-bold tracking-tight">
                今天想学点什么？
              </h2>
              <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
                问一道题、检查思路，或者把今天的复习交给我安排。
              </p>
              <div className="mt-7 grid w-full max-w-[300px] grid-cols-1 gap-2.5 md:max-w-xl md:grid-cols-2">
                {[
                  {
                    label: '拍题问思路',
                    icon: Camera,
                    iconStyle: 'bg-blue-50 text-blue-600',
                    hoverStyle: 'hover:border-blue-200 hover:bg-blue-50/60',
                  },
                  {
                    label: '检查作业',
                    icon: PenLine,
                    iconStyle: 'bg-violet-50 text-violet-600',
                    hoverStyle:
                      'hover:border-violet-200 hover:bg-violet-50/60',
                  },
                  {
                    label: '复习错题',
                    icon: RotateCcw,
                    iconStyle: 'bg-orange-50 text-orange-600',
                    hoverStyle:
                      'hover:border-orange-200 hover:bg-orange-50/60',
                  },
                  {
                    label: '生成练习',
                    icon: Sparkles,
                    iconStyle: 'bg-emerald-50 text-emerald-600',
                    hoverStyle:
                      'hover:border-emerald-200 hover:bg-emerald-50/60',
                  },
                ].map(({ label, icon: Icon, iconStyle, hoverStyle }) => (
                  <button
                    key={label}
                    onClick={() =>
                      label === '拍题问思路' ? onCamera() : send(label)
                    }
                    className={`flex min-h-[52px] items-center gap-3 rounded-2xl border bg-card px-4 text-left text-sm font-medium shadow-sm transition-[border-color,background-color,transform] duration-200 active:scale-[.98] ${hoverStyle}`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-xl ${iconStyle}`}
                    >
                      <Icon className="size-4" />
                    </span>
                    {label}
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
              placeholder="发消息或创建学习任务…"
              rows={2}
              className="w-full resize-none bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground"
            />
            <div className="mt-2 flex items-center gap-1.5">
              <button
                aria-label="添加资料"
                onClick={() => notify('添加图片或文件将在下一轮接通')}
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
                aria-label="智能辅导模式"
                onClick={() => notify('当前使用启发式智能辅导')}
                className="flex min-h-10 items-center gap-1.5 rounded-full bg-slate-100 px-3 text-xs font-medium text-slate-700"
              >
                <Sparkles className="size-4 text-primary" />
                智能辅导
              </button>
              <span className="flex-1" />
              <button
                aria-label={input.trim() ? '发送' : '语音输入'}
                disabled={sending}
                onClick={() =>
                  input.trim() ? send() : notify('语音输入为 Demo 占位')
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
        <DrawerContent className="mx-auto max-w-[430px] rounded-t-[30px] sm:max-w-[560px] [--drawer-height:min(58dvh,520px)]">
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
              <p className="mt-3 text-sm text-white/80">模拟相机预览</p>
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
              onClick={() => notify('相册选择为 Demo 占位')}
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
  const [rechargeOpen, setRechargeOpen] = useState(false);
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
    if (label === '拍题辅导') {
      setView('chat');
      setPhotoStep('camera');
      return;
    }
    notify(`${label}已放入左侧功能区，详细交互后续再完善`);
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
              points={points}
              notify={notify}
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
        <DrawerContent className="mx-auto max-w-[430px] rounded-t-[30px] sm:max-w-[560px] [--drawer-height:min(68dvh,610px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
              <span className="grid size-9 place-items-center rounded-full bg-amber-100 text-amber-700">
                <Coins className="size-5" />
              </span>
              充值积分
            </DrawerTitle>
            <DrawerDescription className="text-left">
              选择充值档位，本页面仅用于演示交互，不会产生真实扣款。
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
                setRechargeOpen(false);
                notify(
                  `模拟充值成功，已到账 ${plan.points.toLocaleString()} 积分`,
                );
              }}
            >
              模拟支付并充值
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
