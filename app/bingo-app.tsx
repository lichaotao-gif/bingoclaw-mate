'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bookmark,
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
  Database,
  Download,
  Eye,
  EyeOff,
  FileImage,
  FileText,
  Film,
  Flame,
  Gauge,
  Gamepad2,
  Gift,
  GraduationCap,
  History,
  Image as ImageIcon,
  Link2,
  LibraryBig,
  KeyRound,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageSquarePlus,
  Mic,
  MonitorSmartphone,
  MoreHorizontal,
  MousePointerClick,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  PenLine,
  Plus,
  Presentation,
  RotateCcw,
  ScanLine,
  Search,
  Send,
  School,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Settings,
  Sparkles,
  Star,
  Smartphone,
  Target,
  Upload,
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
type DemoStage =
  | null
  | 'menu'
  | 'login'
  | 'bind'
  | 'bind-success'
  | 'profile'
  | 'tour';
type ExportFormat = 'PDF' | 'PPT' | 'Word';
type ExportKind = 'lesson' | 'courseware' | 'practice';
type GeneratedFile = {
  format: ExportFormat;
  name: string;
  size: string;
  title: string;
  sections: { heading: string; content: string }[];
};
type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  attachment?: 'captured-photo';
  modeId?: ChatModeId;
  followUps?: string[];
  exportOptions?: ExportFormat[];
  exportKind?: ExportKind;
  generatedFile?: GeneratedFile;
};
type SavedConversation = {
  modeId: ChatModeId;
  messages: Message[];
  updatedAt: string;
};
type KnowledgeShareChannel = 'wechat' | 'qq' | 'download';

function WeChatBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="#07C160"
    >
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}

function QqBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="#1EBAFC"
    >
      <path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673" />
    </svg>
  );
}
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
type UserProfile = {
  nickname: string;
  region: string;
  grade: string;
  semester: string;
  school: string;
  textbook: string;
  focusSubject: string;
  weakTopics: string;
  learningGoal: string;
  guidanceStyle: string;
  dailyStudyTime: string;
  encouragementStyle: string;
  reportFrequency: string;
  teachingExperience: string;
  classLevel: string;
  isHeadTeacher: string;
  coursewareStyle: string;
};
type ProfileCopy = {
  sectionTitle: string;
  entryLabel: string;
  entryDoneDescription: string;
  entryTodoDescription: string;
  entryIcon: LucideIcon;
  entryColor: string;
  title: string;
  subtitle: string;
  heroIcon: LucideIcon;
  heroGradient: string;
  heroDone: string;
  heroTodo: string;
  basicTitle: string;
  basicDescription: string;
  nicknameLabel: string;
  nicknamePlaceholder: string;
  gradeLabel: string;
  gradePlaceholder: string;
  schoolLabel: string;
  schoolPlaceholder: string;
  schoolHint: string;
  courseTitle: string;
  courseDescription: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  weakTopicsLabel: string;
  weakTopicsPlaceholder: string;
  goalLabel: string;
  goalPlaceholder: string;
  guidanceLabel: string;
  guidanceOptions: string[];
  footerHint: string;
  rewardTitle: string;
  rewardDetail: string;
  rewardMessage: string;
  savedMessage: string;
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
type ChatModeId =
  | 'default'
  | 'photo'
  | 'homework'
  | 'mistakes'
  | 'practice'
  | 'lesson'
  | 'courseware'
  | 'exam'
  | 'notice';
type EditionId = 'family' | 'teacher';
type Edition = {
  id: EditionId;
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  price: number;
  billing: string;
  billingNote: string;
  highlights: string[];
  icon: LucideIcon;
  accent: string;
  homeSubtitle: string;
  homeHeadline: string;
  homeDescription: string;
  homePlaceholder: string;
  recommendedModes: ChatModeId[];
};
type AppView =
  | 'chat'
  | 'skills'
  | 'resources'
  | 'knowledge'
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
type SharedResource = {
  id: string;
  title: string;
  summary: string;
  category: string;
  edition: EditionId;
  author: string;
  authorRole: string;
  avatarStyle: string;
  cover: string;
  views: string;
  favorites: number;
  tags: string[];
  sections: { heading: string; content: string }[];
  remixPrompt: string;
};
type KnowledgeItem = {
  id: string;
  title: string;
  summary: string;
  source: 'generated' | 'upload';
  kind: string;
  meta: string;
  createdAt: string;
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
  edition: 'all' | EditionId;
  price?: number;
  image?: string;
  icon?: LucideIcon;
  accent?: string;
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
  image?: string;
  iconStyle: string;
  suggestions: string[];
  followUps: string[];
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

const DEVICE_CODE_EXAMPLE = 'BC-76E3-7LIDD';
const DEVICE_CODE_PATTERN = /^BC-[A-Z0-9]{4}-[A-Z0-9]{5}$/;

function normalizeDeviceCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 13);
}

const features: {
  label: string;
  hint: string;
  icon: LucideIcon;
  iconColor: string;
  status?: string;
  preview?: boolean;
}[] = [
  {
    label: '技能广场',
    hint: '发现并安装学习技能',
    icon: Blocks,
    iconColor: 'bg-violet-50 text-violet-600',
  },
  {
    label: '资源广场',
    hint: '发现与分享优质学习资源',
    icon: LibraryBig,
    iconColor: 'bg-cyan-50 text-cyan-700',
  },
  {
    label: '我的知识库',
    hint: '生成、收藏与上传内容',
    icon: Database,
    iconColor: 'bg-blue-50 text-blue-700',
  },
  {
    label: '成长报告',
    hint: '预览学习表现与成长趋势',
    icon: BarChart3,
    iconColor: 'bg-indigo-50 text-indigo-600',
    status: '暂不做',
    preview: true,
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

const editions: Record<EditionId, Edition> = {
  family: {
    id: 'family',
    name: '缤果学伴（家庭版）',
    shortName: '家庭版',
    role: '家长',
    tagline: '陪孩子完成日常作业与复习',
    price: 0,
    billing: '随设备赠送',
    billingNote: '绑定设备后自动可用',
    highlights: [
      '拍题辅导、错题复习、智能练习全部免费',
      '成长报告与学习提醒',
      '技能广场内家庭版技能不额外收费',
    ],
    icon: UserRound,
    accent: 'bg-blue-50 text-blue-700 ring-blue-100',
    homeSubtitle: '在线 · 启发式辅导',
    homeHeadline: '今天想学点什么？',
    homeDescription: '问一道题、检查思路，或者把今天的复习交给我安排。',
    homePlaceholder: '发消息或创建学习任务…',
    recommendedModes: ['photo', 'homework', 'mistakes', 'practice'],
  },
  teacher: {
    id: 'teacher',
    name: '缤果学伴（教师版）',
    shortName: '教师版',
    role: '教师',
    tagline: '备课、组卷与班级事务一站式完成',
    price: 199,
    billing: '¥199 一次性买断',
    billingNote: '一次性买断 · 永久可用，不按年续费',
    highlights: [
      '教案、课件、PPT 一站式生成',
      '智能组卷与通知文书',
      '教师工作流串联批量事务',
      '一次性买断，后续不再收年费',
      '教师版专属技能按需单独购买',
    ],
    icon: School,
    accent: 'bg-violet-50 text-violet-700 ring-violet-100',
    homeSubtitle: '在线 · 备课与班级助手',
    homeHeadline: '今天想先准备什么？',
    homeDescription: '写教案、做课件、组一份卷子，或者交给我起草班级通知。',
    homePlaceholder: '发消息或创建备课任务…',
    recommendedModes: ['lesson', 'courseware', 'exam', 'notice'],
  },
};

const profileCopy: Record<EditionId, ProfileCopy> = {
  family: {
    sectionTitle: '学习设置',
    entryLabel: '学生档案',
    entryDoneDescription: '资料已完善 · AI 将结合学情提供辅导',
    entryTodoDescription: '待补充学期、学校和教材信息',
    entryIcon: UserRound,
    entryColor: 'bg-blue-50 text-blue-600',
    title: '学生档案',
    subtitle: '让 AI 更懂你的学习情况',
    heroIcon: GraduationCap,
    heroGradient: 'from-blue-600 to-indigo-600 shadow-blue-100',
    heroDone: '档案已完善，后续修改会自动更新 AI 的辅导参考。',
    heroTodo: '补全关键学习信息，AI 的讲解和练习会更贴合你。',
    basicTitle: '基本学习信息',
    basicDescription: '帮助 AI 判断当前学期、所在地区、年级难度和学校进度。',
    nicknameLabel: '学生昵称',
    nicknamePlaceholder: '例如：林小满',
    gradeLabel: '当前年级',
    gradePlaceholder: '请选择年级',
    schoolLabel: '学校',
    schoolPlaceholder: '可填写学校简称',
    schoolHint: '仅用于匹配本地教学进度',
    courseTitle: '课程与学习目标',
    courseDescription: '学习科目、教材、薄弱点和目标会用于生成更合适的例题与复习计划。',
    subjectLabel: '学习科目',
    subjectPlaceholder: '请选择一个或多个科目',
    weakTopicsLabel: '当前薄弱点',
    weakTopicsPlaceholder: '例如：二次函数、几何证明容易丢分',
    goalLabel: '阶段目标',
    goalPlaceholder: '例如：期末数学稳定在 90 分以上',
    guidanceLabel: 'AI 辅导方式',
    guidanceOptions: [
      '先启发思考，再给完整解析',
      '先讲知识点，再带我做题',
      '直接指出错误，并给出改进建议',
    ],
    footerHint: '这些资料只用于个性化学习辅助，可随时回来修改。',
    rewardTitle: '学生档案完善奖励',
    rewardDetail: '首次完善学生学习档案',
    rewardMessage: '学生档案已完善，100 积分已到账',
    savedMessage: '学生档案已更新',
  },
  teacher: {
    sectionTitle: '教学设置',
    entryLabel: '教师档案',
    entryDoneDescription: '资料已完善 · AI 将结合任教情况备课',
    entryTodoDescription: '待补充学校、任教年级和教材信息',
    entryIcon: School,
    entryColor: 'bg-indigo-50 text-indigo-600',
    title: '教师档案',
    subtitle: '让 AI 更懂你的教学情况',
    heroIcon: School,
    heroGradient: 'from-violet-600 to-indigo-600 shadow-violet-100',
    heroDone: '档案已完善，后续修改会自动更新 AI 的备课参考。',
    heroTodo: '补全任教信息，生成的教案和试卷会更贴合你的课堂。',
    basicTitle: '基本任教信息',
    basicDescription: '帮助 AI 判断课标范围、学段难度和学校教学进度。',
    nicknameLabel: '教师称呼',
    nicknamePlaceholder: '例如：林老师',
    gradeLabel: '任教年级',
    gradePlaceholder: '请选择任教年级',
    schoolLabel: '任教学校',
    schoolPlaceholder: '可填写学校简称',
    schoolHint: '仅用于匹配本地教学进度与课标版本',
    courseTitle: '任教科目与教学目标',
    courseDescription: '科目、教材和班级学情会用于生成教案、课件与试卷。',
    subjectLabel: '任教科目',
    subjectPlaceholder: '请选择任教科目',
    weakTopicsLabel: '班级学情与薄弱章节',
    weakTopicsPlaceholder: '例如：一次函数图像理解不牢，几何证明书写不规范',
    goalLabel: '本学期教学目标',
    goalPlaceholder: '例如：期中前讲完一次函数单元，班级均分提升 5 分',
    guidanceLabel: 'AI 备课方式',
    guidanceOptions: [
      '先给教学目标，再展开分环节流程',
      '先列教案提纲，我确认后再展开',
      '直接给出完整教案初稿',
    ],
    footerHint: '这些资料只用于个性化备课辅助，可随时回来修改。',
    rewardTitle: '教师档案完善奖励',
    rewardDetail: '首次完善教师任教档案',
    rewardMessage: '教师档案已完善，100 积分已到账',
    savedMessage: '教师档案已更新',
  },
};

const studentGoalOptions = [
  '巩固基础知识',
  '集中攻克薄弱点',
  '提高作业正确率',
  '提升考试成绩',
  '养成稳定学习习惯',
  '增强自主学习能力',
];

const regionOptions = [
  '北京市',
  '天津市',
  '河北省',
  '山西省',
  '内蒙古自治区',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '上海市',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '广西壮族自治区',
  '海南省',
  '重庆市',
  '四川省',
  '贵州省',
  '云南省',
  '西藏自治区',
  '陕西省',
  '甘肃省',
  '青海省',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
  '台湾省',
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
    edition: 'family',
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
    edition: 'family',
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
    edition: 'family',
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
    edition: 'family',
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
    edition: 'family',
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
    edition: 'family',
    image: '/skills/daily-brief.png',
    capabilities: ['每日知识点精选', '关键词快速解释', '收藏后生成小测'],
    example: '给我一份今天的科技知识简报。',
  },
  {
    id: 'lesson-plan',
    name: '教案制作',
    author: 'BingoLab',
    description: '按课标和教材章节生成完整教案，含教学目标与流程设计。',
    category: '教学备课',
    users: '2.1k',
    version: '1.0.2',
    edition: 'teacher',
    price: 29,
    image: '/skills/lesson-plan.png',
    icon: BookOpen,
    accent: 'bg-violet-50 text-violet-600',
    capabilities: ['按课标拆解教学目标', '生成分环节教学流程', '配套作业与板书建议'],
    example: '帮我生成一份课堂教案。',
  },
  {
    id: 'courseware',
    name: '课件制作',
    author: 'BingoLab',
    description: '把教案要点整理成可直接讲的课件结构与配图建议。',
    category: '教学备课',
    users: '1.8k',
    version: '1.0.0',
    edition: 'teacher',
    price: 39,
    image: '/skills/courseware.png',
    icon: FileImage,
    accent: 'bg-indigo-50 text-indigo-600',
    capabilities: ['自动拆分课件章节', '生成讲解要点与提问', '给出配图与动画建议'],
    example: '把这份教案整理成课件大纲。',
  },
  {
    id: 'ppt-maker',
    name: 'PPT 生成',
    author: 'BingoLab',
    description: '一句话生成整套演示文稿，可按学科风格套用模板。',
    category: '教学备课',
    users: '3.4k',
    version: '1.1.0',
    edition: 'teacher',
    price: 39,
    image: '/skills/ppt-maker.png',
    icon: Presentation,
    accent: 'bg-orange-50 text-orange-600',
    capabilities: ['一句话生成整套 PPT', '按学科套用模板配色', '导出可继续编辑的文件'],
    example: '帮我生成一套课堂演示 PPT。',
  },
  {
    id: 'exam-builder',
    name: '智能组卷',
    author: 'BingoLab',
    description: '按知识点、题型和难度比例组卷，自动附答案与解析。',
    category: '考试评测',
    users: '2.7k',
    version: '1.2.1',
    edition: 'teacher',
    price: 35,
    image: '/skills/exam-builder.png',
    icon: FileText,
    accent: 'bg-emerald-50 text-emerald-600',
    capabilities: ['按难度比例自动组卷', '生成答案与评分标准', '导出试卷和答题卡'],
    example: '帮我生成一份课堂检测卷。',
  },
  {
    id: 'notice-writer',
    name: '通知文书',
    author: 'BingoLab',
    description: '快速起草家长通知、活动方案和班级总结等常用文书。',
    category: '行政文书',
    users: '1.5k',
    version: '1.0.1',
    edition: 'teacher',
    price: 19,
    image: '/skills/notice-writer.png',
    icon: Bell,
    accent: 'bg-amber-50 text-amber-600',
    capabilities: ['常用文书模板一键套用', '按场景调整语气', '批量替换班级信息'],
    example: '帮我写一份家长会通知。',
  },
  {
    id: 'teaching-game',
    name: '教学游戏',
    author: 'BingoLab',
    description: '把知识点转化为课堂小游戏，快速生成玩法、题目与互动流程。',
    category: '课堂互动',
    users: '1.3k',
    version: '1.0.0',
    edition: 'teacher',
    price: 29,
    image: '/skills/teaching-game-icon.png',
    icon: Gamepad2,
    accent: 'bg-blue-50 text-blue-600',
    capabilities: ['生成课堂游戏玩法', '自动配置题目与计分规则', '适配个人或小组互动'],
    example: '把这个知识点设计成一个课堂小游戏。',
  },
  {
    id: 'teaching-animation',
    name: '教学动画',
    author: 'BingoLab',
    description: '将抽象知识转成简洁动画脚本，帮助学生看懂变化过程。',
    category: '课堂互动',
    users: '1.1k',
    version: '1.0.0',
    edition: 'teacher',
    price: 39,
    image: '/skills/teaching-animation-icon.png',
    icon: Film,
    accent: 'bg-violet-50 text-violet-600',
    capabilities: ['拆分动画讲解步骤', '生成画面与旁白脚本', '突出关键变化过程'],
    example: '把这个概念设计成一段教学动画。',
  },
  {
    id: 'interactive-courseware',
    name: '互动课件',
    author: 'BingoLab',
    description: '生成可点击、可问答的课堂课件，让讲解与练习自然衔接。',
    category: '课堂互动',
    users: '1.6k',
    version: '1.0.0',
    edition: 'teacher',
    price: 39,
    image: '/skills/interactive-courseware-icon.png',
    icon: MousePointerClick,
    accent: 'bg-cyan-50 text-cyan-600',
    capabilities: ['设计点击与问答互动', '生成课堂练习环节', '串联讲解、演示与反馈'],
    example: '把这节课设计成一份互动课件。',
  },
  {
    id: 'teacher-workflow',
    name: '教师工作流',
    author: 'BingoLab',
    description: '把备课、组卷、批改和通知串成一条可复用的自动流程。',
    category: '效率工具',
    users: '1.2k',
    version: '0.9.8',
    edition: 'teacher',
    price: 59,
    image: '/skills/teacher-workflow.png',
    icon: Blocks,
    accent: 'bg-cyan-50 text-cyan-600',
    capabilities: ['多个技能串联执行', '保存为可复用流程', '按课表定时触发'],
    example: '帮我创建一个可重复使用的教学工作流。',
  },
];

const initialSharedResources: SharedResource[] = [
  {
    id: 'math-mistake-cards',
    title: '函数图像错题精讲卡',
    summary: '把常见易错点整理成可复习、可继续追问的图文学习卡。',
    category: '学习资料',
    edition: 'family',
    author: '林小满',
    authorRole: '学生创作者',
    avatarStyle: 'from-blue-500 to-cyan-500',
    cover: '/resources/math-review.png',
    views: '3.8k',
    favorites: 426,
    tags: ['错题复习', '函数图像', '学习卡'],
    sections: [
      { heading: '资源内容', content: '包含典型错因、关键思路、图像观察方法和三组递进练习。' },
      { heading: '使用建议', content: '先独立判断图像变化，再展开提示；完成后可让 BingoMate 生成同类练习。' },
    ],
    remixPrompt: '请基于这份函数图像错题精讲卡，保留讲解结构，帮我改成适合当前薄弱点的复习资料。',
  },
  {
    id: 'english-speaking-pack',
    title: '英语情境口语任务包',
    summary: '用生活化情境练习表达，包含角色任务、追问和复盘清单。',
    category: '学习资料',
    edition: 'family',
    author: '小雨同学',
    authorRole: '学生创作者',
    avatarStyle: 'from-violet-500 to-fuchsia-500',
    cover: '/resources/english-speaking.png',
    views: '2.6k',
    favorites: 318,
    tags: ['英语口语', '情境对话', '表达练习'],
    sections: [
      { heading: '资源内容', content: '包含四类生活情境、角色卡、常用表达和对话后的自查问题。' },
      { heading: '使用建议', content: '选择一个情境与 BingoMate 开始角色扮演，完成后再查看表达建议。' },
    ],
    remixPrompt: '请基于这份英语情境口语任务包，换一个生活场景，并继续用角色扮演的方式陪我练习。',
  },
  {
    id: 'classroom-game-pack',
    title: '课堂破冰互动游戏包',
    summary: '五分钟即可开展的课堂小游戏，包含规则、题卡和计分方式。',
    category: '教学资源',
    edition: 'teacher',
    author: '周老师',
    authorRole: '一线教师',
    avatarStyle: 'from-orange-500 to-amber-400',
    cover: '/resources/classroom-game.png',
    views: '5.1k',
    favorites: 672,
    tags: ['课堂互动', '教学游戏', '小组活动'],
    sections: [
      { heading: '资源内容', content: '提供热身、抢答、协作和复盘四类玩法，可替换为任意知识点。' },
      { heading: '使用建议', content: '先告诉 BingoMate 本节课的知识主题和课堂人数，再生成对应题卡。' },
    ],
    remixPrompt: '请参考这份课堂破冰互动游戏包，根据我的教学主题重新设计游戏规则、题卡和计分方式。',
  },
  {
    id: 'interactive-lesson-template',
    title: '探究式互动课件模板',
    summary: '从情境导入到课堂反馈的完整互动课件结构，可直接二次编辑。',
    category: '教学资源',
    edition: 'teacher',
    author: '陈老师',
    authorRole: '教研组长',
    avatarStyle: 'from-cyan-500 to-blue-600',
    cover: '/resources/interactive-lesson.png',
    views: '4.4k',
    favorites: 589,
    tags: ['互动课件', '探究学习', '课堂反馈'],
    sections: [
      { heading: '资源内容', content: '包含问题情境、探究任务、分组讨论、即时检测和课堂总结页面。' },
      { heading: '使用建议', content: '在对话编辑中补充教学主题和课堂目标，即可生成专属课件内容。' },
    ],
    remixPrompt: '请基于这份探究式互动课件模板，按照我的教学主题补全每一页内容和互动问题。',
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
    suggestions: [
      '找出我最需要解决的问题',
      '今天只有 30 分钟，帮我安排学习',
      '生成本周薄弱项汇总',
      '我明天要考试了，有点紧张',
    ],
    followUps: ['先从最重要的一项开始', '把计划安排得轻松一点', '鼓励我开始第一步', '整理成行动清单'],
    reply: '我已经根据你的需求整理了一份初步结果。你可以继续补充目标或限制，我会在当前结果上继续完善。',
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
      '这道题用清晰的思路给我讲',
      '先别给答案，给我一个提示',
      '这道题我完全不会做',
      '结合故事讲这道题',
    ],
    followUps: ['解释这一步为什么', '再给我一个提示', '换一种解题方法', '出一道同类题'],
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
      '这是今天的作业，请帮我分析',
      '这是一份单元测验，帮我整卷分析',
      '找出我最需要解决的问题',
      '本周薄弱项有哪些',
    ],
    followUps: ['汇总主要错因', '生成讲评建议', '按知识点分类', '给出改进练习'],
    reply: '已完成初步批阅：答题思路基本清晰，主要问题集中在关键步骤不完整和检查不充分。建议先订正典型错题，再用同类题确认是否掌握。',
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
      '开始今天的薄弱项消除',
      '开始数学系统复习',
      '分析我最近反复出错的原因',
      '生成本周薄弱项汇总',
    ],
    followUps: ['安排复习顺序', '生成同类练习', '解释高频错因', '更新掌握情况'],
    reply: '已经按错因和掌握度完成初步整理。建议先复习概念理解类错题，再练习步骤不完整的题目，最后用一道同类题进行自测。',
  },
  practice: {
    id: 'practice',
    label: '智能练习',
    name: '智能练习专家',
    subtitle: '按薄弱点出题 · 难度自适应',
    headline: '为你生成刚刚好的练习',
    description: '根据学习目标和薄弱知识点生成练习，完成后自动调整下一组难度。',
    placeholder: '告诉我科目、学习目标、题量和难度…',
    icon: BrainCircuit,
    image: '/features/smart-practice-3d.png',
    iconStyle: 'bg-emerald-50 text-emerald-600',
    suggestions: [
      '今天只有 30 分钟，优先安排数学',
      '我明天要考试了，帮我安排复习',
      '根据最近错题出一组巩固题',
      '给我一组难度适中的练习',
    ],
    followUps: ['查看答案解析', '调整练习难度', '再生成一组', '只练薄弱知识点'],
    reply: '已根据当前需求生成一组练习，题目由基础理解逐步过渡到综合应用。完成后可以继续查看解析，或按作答情况调整难度。',
  },
  lesson: {
    id: 'lesson',
    label: '教案制作',
    name: '教案制作专家',
    subtitle: '课标对齐 · 分环节设计',
    headline: '把这节课的教案写清楚',
    description: '按课标拆解教学目标，生成分环节流程、作业与板书建议。',
    placeholder: '告诉我学段、教材章节和课时…',
    icon: BookOpen,
    image: '/skills/lesson-plan-icon.png',
    iconStyle: 'bg-violet-50 text-violet-600',
    suggestions: [
      '上传教材或讲义，帮我备这份内容',
      '先生成教案大纲，我确认后再展开',
      '根据班级薄弱点调整教学重点',
      '设计一个 5 分钟课堂导入',
    ],
    followUps: ['细化教学流程', '补充课堂提问', '生成板书设计', '调整课堂节奏'],
    reply: '已生成教案初稿：\n\n【教学目标】帮助学生理解核心概念，并能在典型情境中进行应用。\n【教学重点】核心概念、关键方法与实际迁移。\n【教学流程】情境导入 → 问题探究 → 合作练习 → 归纳小结。\n【课后任务】完成基础巩固，并尝试一项拓展应用。\n\n你希望将这份教案导出为什么格式？',
  },
  courseware: {
    id: 'courseware',
    label: '课件制作',
    name: '课件制作专家',
    subtitle: '结构梳理 · 配图建议',
    headline: '把教案变成能直接讲的课件',
    description: '整理成页面结构和讲解要点，并给出每页的配图建议。',
    placeholder: '粘贴教案要点，或说明课件主题…',
    icon: FileImage,
    image: '/skills/courseware-icon.png',
    iconStyle: 'bg-indigo-50 text-indigo-600',
    suggestions: [
      '把刚才的教案转成 PPT',
      '生成与教案配套的课件',
      '课件换成简约学术风格',
      '增加几个小组互动环节',
    ],
    followUps: ['补充每页讲稿', '推荐配图方案', '调整页面结构', '生成课堂互动'],
    reply: '已生成课件大纲：\n\n01 封面：课程主题与学习目标\n02 导入：用一个真实情境引出核心问题\n03 讲解：分步呈现概念、方法和典型示例\n04 互动：设置思考题与课堂练习\n05 小结：回顾重点并布置课后任务\n\n你希望将这份课件导出为什么格式？',
  },
  exam: {
    id: 'exam',
    label: '智能组卷',
    name: '智能组卷专家',
    subtitle: '按知识点 · 难度可控',
    headline: '按知识点组一份卷子',
    description: '指定知识点、题型和难度比例组卷，自动附答案与解析。',
    placeholder: '说明学段、知识点、题型和难度比例…',
    icon: FileText,
    image: '/skills/exam-builder-icon.png',
    iconStyle: 'bg-emerald-50 text-emerald-600',
    suggestions: [
      '生成一套本周练习题',
      '生成一份阶段测验并附答案解析',
      '按基础、提高、突破分层出题',
      '生成一份双向细目表',
    ],
    followUps: ['调整题目难度', '补充评分标准', '生成答题卡', '替换其中一道题'],
    reply: '已生成一份试卷初稿，包含基础题、理解题和综合应用题，并配有参考答案与解析。你可以继续调整难度、题量或考查范围。',
  },
  notice: {
    id: 'notice',
    label: '通知文书',
    name: '通知文书专家',
    subtitle: '措辞得体 · 一次成稿',
    headline: '起草一份班级通知',
    description: '家长通知、活动方案和班级总结，按场景给出得体措辞。',
    placeholder: '说明通知场景、对象和要交代的事项…',
    icon: Bell,
    image: '/skills/notice-writer-icon.png',
    iconStyle: 'bg-amber-50 text-amber-600',
    suggestions: [
      '生成一份家长通知',
      '帮我写一份家长会方案',
      '给进步学生写一段评语',
      '帮我整理一份班级工作总结',
    ],
    followUps: ['改得更简短', '调整表达语气', '补充时间地点', '生成家长回复模板'],
    reply: '已完成通知初稿：\n\n各位家长您好，班级近期将开展相关教学活动，请提前做好准备并留意后续安排。感谢您的理解与配合。\n\n你可以继续补充通知对象、时间地点，或调整表达语气。',
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

const skillCategoryGroups: Record<
  EditionId,
  { label: string; categories: string[] }[]
> = {
  family: [
    { label: '全部', categories: [] },
    { label: '学科辅导', categories: ['数学辅导', '英语学习'] },
    { label: '复习练习', categories: ['复习规划', '智能练习'] },
    { label: '学习效率', categories: ['学习效率'] },
    { label: '知识拓展', categories: ['知识拓展'] },
  ],
  teacher: [
    { label: '全部', categories: [] },
    { label: '教学备课', categories: ['教学备课'] },
    { label: '课堂互动', categories: ['课堂互动'] },
    { label: '考试评测', categories: ['考试评测'] },
    { label: '行政文书', categories: ['行政文书'] },
    { label: '效率工具', categories: ['效率工具'] },
  ],
};

function SkillArt({
  skill,
  className,
  iconClassName,
}: {
  skill: Skill;
  className: string;
  iconClassName: string;
}) {
  if (skill.image) {
    return (
      <img
        src={skill.image}
        alt={`${skill.name}卡通插画`}
        width={512}
        height={512}
        loading="lazy"
        className={`object-cover ${className}`}
      />
    );
  }
  const Icon = skill.icon ?? Sparkles;
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center ${skill.accent ?? 'bg-slate-100 text-slate-600'} ${className}`}
    >
      <Icon className={iconClassName} />
    </span>
  );
}

function ModeArt({
  mode,
  className,
  iconClassName,
}: {
  mode: ChatMode;
  className: string;
  iconClassName: string;
}) {
  if (mode.image) {
    return (
      <img
        src={mode.image}
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        className={`object-contain ${className}`}
      />
    );
  }
  const Icon = mode.icon;
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center rounded-2xl ${mode.iconStyle} ${className}`}
    >
      <Icon className={iconClassName} />
    </span>
  );
}

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
          className={`size-11 shrink-0 place-items-center rounded-2xl border bg-card transition-colors hover:bg-muted ${onMenu ? 'grid lg:hidden' : 'grid'}`}
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
  edition,
  onBack,
  onSelect,
  installedSkills,
}: {
  edition: Edition;
  onBack: () => void;
  onSelect: (skill: Skill) => void;
  installedSkills: Set<string>;
}) {
  const categoryGroups = skillCategoryGroups[edition.id];
  const [activeCategory, setActiveCategory] = useState('全部');
  const selectedCategory = categoryGroups.find(
    (group) => group.label === activeCategory,
  );
  const editionSkills = skills.filter(
    (skill) => skill.edition === 'all' || skill.edition === edition.id,
  );
  const filteredSkills =
    activeCategory === '全部'
      ? editionSkills
      : editionSkills.filter((skill) =>
          selectedCategory?.categories.includes(skill.category),
        );

  return (
    <>
      <Header
        title="技能广场"
        subtitle={`${edition.shortName} · 为 BingoMate 添加新能力`}
        onBack={onBack}
        backLabel="返回聊天"
      />
      <div className="mx-auto h-[calc(100dvh-72px)] w-full max-w-6xl overflow-y-auto overscroll-contain px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
        <nav
          aria-label="技能分类"
          className="-mx-4 mb-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
        >
          <div className="flex w-max gap-2 md:w-full md:flex-wrap">
            {categoryGroups.map((group) => {
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
                  <SkillArt
                    skill={skill}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                    iconClassName="size-12"
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
                    ) : skill.price ? (
                      <span className="shrink-0 text-sm font-bold text-amber-700">
                        ¥{skill.price}
                      </span>
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
                <SkillArt
                  skill={skill}
                  className="h-full w-full"
                  iconClassName="size-10"
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
                  <Badge
                    variant="outline"
                    className={
                      skill.edition === 'teacher'
                        ? 'border-violet-200 bg-violet-50 text-violet-700'
                        : 'border-slate-200 bg-white'
                    }
                  >
                    {skill.edition === 'all'
                      ? '通用'
                      : `${editions[skill.edition].shortName}专属`}
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
                    ['费用', skill.price ? `¥${skill.price}` : '免费'],
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
              <p className="font-bold">
                {skill.price ? `¥${skill.price}` : '免费'}
              </p>
              <p className="text-xs text-muted-foreground">
                {skill.price ? '购买后即可在聊天中使用' : '安装后立即可用'}
              </p>
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
              ) : skill.price ? (
                <>¥{skill.price} 购买并安装</>
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

function resourceMatches(resource: SharedResource, query: string) {
  const needle = query.trim().toLowerCase().replace(/\s+/g, '');
  if (!needle) return true;
  const haystack = [
    resource.title,
    resource.summary,
    resource.category,
    resource.author,
    ...resource.tags,
  ]
    .join('')
    .toLowerCase()
    .replace(/\s+/g, '');
  if (haystack.includes(needle)) return true;
  let matched = 0;
  for (const character of haystack) {
    if (character === needle[matched]) matched += 1;
    if (matched === needle.length) return true;
  }
  return false;
}

function ResourcesView({
  edition,
  resources,
  favoriteResources,
  onBack,
  onSelect,
  onToggleFavorite,
  onPublish,
  notify,
}: {
  edition: Edition;
  resources: SharedResource[];
  favoriteResources: Set<string>;
  onBack: () => void;
  onSelect: (resource: SharedResource) => void;
  onToggleFavorite: (resource: SharedResource) => void;
  onPublish: (resource: SharedResource) => void;
  notify: (message: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishTitle, setPublishTitle] = useState('');
  const [publishSummary, setPublishSummary] = useState('');
  const filters = ['全部', '学习资料', '教学资源', '我的收藏'];
  const visibleResources = resources
    .filter((resource) => {
      if (activeFilter === '我的收藏') {
        return favoriteResources.has(resource.id);
      }
      return activeFilter === '全部' || resource.category === activeFilter;
    })
    .filter((resource) => resourceMatches(resource, query))
    .sort(
      (left, right) =>
        Number(right.edition === edition.id) -
        Number(left.edition === edition.id),
    );

  const publishResource = () => {
    const title = publishTitle.trim();
    const summary = publishSummary.trim();
    if (!title || !summary) return;
    const teacher = edition.id === 'teacher';
    onPublish({
      id: `shared-resource-${Date.now()}`,
      title,
      summary,
      category: teacher ? '教学资源' : '学习资料',
      edition: edition.id,
      author: teacher ? '林老师' : '林小满',
      authorRole: teacher ? '教师创作者' : '学生创作者',
      avatarStyle: teacher
        ? 'from-violet-500 to-blue-600'
        : 'from-blue-500 to-cyan-500',
      cover: teacher
        ? '/resources/interactive-lesson.png'
        : '/resources/math-review.png',
      views: '刚刚发布',
      favorites: 0,
      tags: teacher ? ['教学资源', '可编辑'] : ['学习资料', '可编辑'],
      sections: [
        { heading: '资源简介', content: summary },
        {
          heading: '二次创作',
          content: '点击“对话编辑”，可以继续补充要求、调整结构或生成新的版本。',
        },
      ],
      remixPrompt: `请基于《${title}》继续编辑。先保留核心结构，再询问我希望调整的内容。`,
    });
    setPublishTitle('');
    setPublishSummary('');
    setPublishOpen(false);
    notify('资源已发布到资源广场');
  };

  return (
    <div className="flex h-dvh flex-col bg-slate-50/70">
      <Header
        title="资源广场"
        subtitle={`${edition.shortName} · 发现和分享优质资源`}
        onBack={onBack}
        right={
          <button
            onClick={() => setPublishOpen(true)}
            className="flex min-h-11 items-center gap-1.5 rounded-xl bg-primary px-3 text-sm font-bold text-white transition-[background-color,transform] hover:bg-blue-700 active:scale-[.97]"
          >
            <Plus aria-hidden="true" className="size-4" />
            发布
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4 md:px-8">
          <label className="relative block">
            <span className="sr-only">搜索资源</span>
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题、作者、分类或关键词"
              className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <div
            aria-label="资源分类"
            className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-bold transition-colors ${activeFilter === filter ? 'bg-primary text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          {visibleResources.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {visibleResources.map((resource) => {
                const favorited = favoriteResources.has(resource.id);
                return (
                  <article
                    key={resource.id}
                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <button
                      aria-label={`查看资源：${resource.title}`}
                      onClick={() => onSelect(resource)}
                      className="block w-full text-left"
                    >
                      <img
                        src={resource.cover}
                        alt={`${resource.title}封面`}
                        width={640}
                        height={640}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <span className="block p-3">
                        <span className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-950">
                          {resource.title}
                        </span>
                        <span className="mt-1 line-clamp-2 min-h-8 text-[11px] leading-4 text-slate-500">
                          {resource.summary}
                        </span>
                        <span className="mt-3 flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className={`grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${resource.avatarStyle}`}
                          >
                            {resource.author.slice(0, 1)}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-slate-700">
                            {resource.author}
                          </span>
                          <span className="shrink-0 text-[10px] text-slate-400">
                            {resource.views}
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      aria-label={`${favorited ? '取消收藏' : '收藏'}${resource.title}`}
                      aria-pressed={favorited}
                      onClick={() => onToggleFavorite(resource)}
                      className={`absolute right-2 top-2 grid size-10 place-items-center rounded-full border border-white/80 bg-white/90 shadow-sm backdrop-blur transition-[color,transform] active:scale-95 ${favorited ? 'text-amber-500' : 'text-slate-600'}`}
                    >
                      <Bookmark
                        aria-hidden="true"
                        className={`size-5 ${favorited ? 'fill-current' : ''}`}
                      />
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed bg-white px-6 py-12 text-center">
              <Search aria-hidden="true" className="mx-auto size-8 text-slate-300" />
              <p className="mt-3 font-bold text-slate-800">没有找到匹配的资源</p>
              <p className="mt-1 text-sm text-slate-500">
                试试缩短关键词，或搜索“课件”“口语”“错题”。
              </p>
            </div>
          )}
        </div>
      </div>
      <Drawer open={publishOpen} onOpenChange={setPublishOpen} showSwipeHandle>
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[620px] rounded-t-[30px] sm:w-[calc(100%-32px)]">
          <DrawerHeader className="relative px-5 pb-3 pt-2 text-left">
            <DrawerTitle className="text-xl font-bold">发布到资源广场</DrawerTitle>
            <DrawerDescription className="text-left">
              分享生成后的优质内容，其他用户可以收藏并继续编辑。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭发布资源"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="space-y-4 px-5">
            <label className="block text-sm font-semibold">
              资源标题
              <input
                value={publishTitle}
                onChange={(event) => setPublishTitle(event.target.value)}
                placeholder="给资源起一个清楚的名字"
                className="mt-2 min-h-12 w-full rounded-2xl border px-4 text-base font-normal outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="block text-sm font-semibold">
              资源简介
              <textarea
                value={publishSummary}
                onChange={(event) => setPublishSummary(event.target.value)}
                placeholder="简单说明资源内容和适用场景"
                className="mt-2 min-h-28 w-full resize-none rounded-2xl border p-4 text-base font-normal outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          </div>
          <DrawerFooter className="px-5 pb-[max(18px,env(safe-area-inset-bottom))] pt-5">
            <Button
              disabled={!publishTitle.trim() || !publishSummary.trim()}
              onClick={publishResource}
              className="h-12 rounded-2xl text-base font-bold"
            >
              发布资源
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function ResourceDetailView({
  resource,
  favorited,
  backLabel = '返回资源广场',
  onBack,
  onToggleFavorite,
  onEdit,
}: {
  resource: SharedResource;
  favorited: boolean;
  backLabel?: string;
  onBack: () => void;
  onToggleFavorite: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="flex h-dvh flex-col bg-slate-50/70">
      <Header
        title="资源详情"
        subtitle={resource.category}
        onBack={onBack}
        backLabel={backLabel}
        right={
          <button
            aria-label={`${favorited ? '取消收藏' : '收藏'}${resource.title}`}
            aria-pressed={favorited}
            onClick={onToggleFavorite}
            className={`grid size-11 place-items-center rounded-2xl border bg-white transition-colors ${favorited ? 'border-amber-200 text-amber-500' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Bookmark
              aria-hidden="true"
              className={`size-5 ${favorited ? 'fill-current' : ''}`}
            />
          </button>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <article className="mx-auto w-full max-w-4xl px-4 pb-28 pt-4 md:px-8">
          <img
            src={resource.cover}
            alt={`${resource.title}封面`}
            width={640}
            height={640}
            className="aspect-[16/9] w-full rounded-[28px] object-cover shadow-sm"
          />
          <div className="mt-5 flex items-center gap-3">
            <span
              aria-hidden="true"
              className={`grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${resource.avatarStyle}`}
            >
              {resource.author.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-900">{resource.author}</p>
              <p className="text-xs text-slate-500">{resource.authorRole}</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {resource.edition === 'teacher' ? '教师版资源' : '家庭版资源'}
            </span>
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
            {resource.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{resource.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {resource.sections.map((section) => (
              <section key={section.heading} className="rounded-3xl border bg-white p-5">
                <h3 className="font-bold text-slate-900">{section.heading}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section.content}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
      <div className="shrink-0 border-t bg-white/95 px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-4xl gap-3">
          <button
            onClick={onToggleFavorite}
            className={`grid size-12 shrink-0 place-items-center rounded-2xl border transition-colors ${favorited ? 'border-amber-200 bg-amber-50 text-amber-500' : 'bg-white text-slate-600'}`}
            aria-label={`${favorited ? '取消收藏' : '收藏'}${resource.title}`}
            aria-pressed={favorited}
          >
            <Bookmark
              aria-hidden="true"
              className={`size-5 ${favorited ? 'fill-current' : ''}`}
            />
          </button>
          <Button onClick={onEdit} className="h-12 flex-1 rounded-2xl text-base font-bold">
            <PenLine className="size-5" />
            对话编辑
          </Button>
        </div>
      </div>
    </div>
  );
}

function KnowledgeBaseView({
  generatedItems,
  favoriteItems,
  uploadedItems,
  onBack,
  onUpload,
  onShare,
  onOpenFavorite,
  notify,
}: {
  generatedItems: KnowledgeItem[];
  favoriteItems: SharedResource[];
  uploadedItems: KnowledgeItem[];
  onBack: () => void;
  onUpload: (items: KnowledgeItem[]) => void;
  onShare: (title: string, channel: KnowledgeShareChannel) => void;
  onOpenFavorite: (resource: SharedResource) => void;
  notify: (message: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'generated' | 'favorite' | 'upload'>(
    'generated',
  );
  const [shareTargetTitle, setShareTargetTitle] = useState<string | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const tabs = [
    { id: 'generated' as const, label: '我的生成', count: generatedItems.length },
    { id: 'favorite' as const, label: '我的收藏', count: favoriteItems.length },
    { id: 'upload' as const, label: '我的上传', count: uploadedItems.length },
  ];
  const activeItems = activeTab === 'generated' ? generatedItems : uploadedItems;

  const uploadFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const nextItems = Array.from(files).map((file) => ({
      id: `upload-${file.name}-${file.lastModified}`,
      title: file.name,
      summary: '用户上传的知识库内容，可用于后续查阅、分享和 AI 对话引用。',
      source: 'upload' as const,
      kind: file.name.split('.').pop()?.toUpperCase() || '文件',
      meta:
        file.size < 1024 * 1024
          ? `${Math.max(1, Math.round(file.size / 1024))} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      createdAt: '刚刚上传',
    }));
    onUpload(nextItems);
    setActiveTab('upload');
    notify(`已上传 ${nextItems.length} 个内容到知识库`);
  };

  return (
    <div className="flex h-dvh flex-col bg-slate-50/70">
      <Header
        title="我的知识库"
        subtitle="管理生成、收藏与上传内容"
        onBack={onBack}
        right={
          <button
            onClick={() => uploadInputRef.current?.click()}
            className="flex min-h-11 items-center gap-1.5 rounded-xl bg-primary px-3 text-sm font-bold text-white transition-[background-color,transform] hover:bg-blue-700 active:scale-[.97]"
          >
            <Upload aria-hidden="true" className="size-4" />
            上传
          </button>
        }
      />
      <input
        ref={uploadInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.png,.jpg,.jpeg"
        onChange={(event) => {
          uploadFiles(event.target.files);
          event.target.value = '';
        }}
        className="sr-only"
      />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-4 md:px-8">
          <div role="tablist" aria-label="知识库分类" className="grid grid-cols-3 rounded-2xl bg-slate-100 p-1">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                role="tab"
                aria-selected={activeTab === tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`min-h-11 rounded-xl px-2 text-xs font-bold transition-[background-color,color,box-shadow] sm:text-sm ${activeTab === tabItem.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}
              >
                {tabItem.label}
                <span className="ml-1 text-[10px] opacity-70">{tabItem.count}</span>
              </button>
            ))}
          </div>

          {activeTab === 'favorite' ? (
            favoriteItems.length > 0 ? (
              <div className="mt-4 space-y-3">
                {favoriteItems.map((resource) => (
                  <article key={resource.id} className="flex items-center gap-3 rounded-3xl border bg-white p-3 shadow-sm">
                    <button
                      aria-label={`查看收藏资源${resource.title}`}
                      onClick={() => onOpenFavorite(resource)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <img
                        src={resource.cover}
                        alt=""
                        aria-hidden="true"
                        width={80}
                        height={80}
                        loading="lazy"
                        className="size-20 shrink-0 rounded-2xl object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-slate-900">{resource.title}</span>
                        <span className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{resource.summary}</span>
                        <span className="mt-1.5 block text-[11px] font-semibold text-blue-600">{resource.author} · 资源广场</span>
                      </span>
                    </button>
                    <button
                      aria-label={`分享${resource.title}`}
                      onClick={() => setShareTargetTitle(resource.title)}
                      className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      <Share2 aria-hidden="true" className="size-5" />
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <KnowledgeEmpty title="还没有收藏资源" description="在资源广场收藏的内容会自动出现在这里。" />
            )
          ) : activeItems.length > 0 ? (
            <div className="mt-4 space-y-3">
              {activeItems.map((item) => (
                <article key={item.id} className="flex items-center gap-3 rounded-3xl border bg-white p-4 shadow-sm">
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${item.source === 'generated' ? 'bg-violet-50 text-violet-600' : 'bg-cyan-50 text-cyan-700'}`}>
                    {item.source === 'generated' ? (
                      <Sparkles aria-hidden="true" className="size-5" />
                    ) : (
                      <FileText aria-hidden="true" className="size-5" />
                    )}
                  </span>
                  <button
                    onClick={() => notify(`已打开：${item.title}`)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="block truncate font-bold text-slate-900">{item.title}</span>
                    <span className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.summary}</span>
                    <span className="mt-1.5 block text-[11px] text-slate-400">{item.kind} · {item.meta} · {item.createdAt}</span>
                  </button>
                  <button
                    aria-label={`分享${item.title}`}
                    onClick={() => setShareTargetTitle(item.title)}
                    className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    <Share2 aria-hidden="true" className="size-5" />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <KnowledgeEmpty
              title={activeTab === 'generated' ? '还没有保存生成文件' : '还没有上传内容'}
              description={activeTab === 'generated' ? 'AI 生成文件后，可在文件卡片中点击“存入知识库”。' : '点击右上角“上传”，添加自己的文件和资料。'}
            />
          )}
        </div>
      </div>
      <Drawer
        open={Boolean(shareTargetTitle)}
        onOpenChange={(open) => {
          if (!open) setShareTargetTitle(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-24px)] max-w-[680px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(38dvh,320px)]">
          <DrawerHeader className="relative px-4 pb-3 pt-2 text-left sm:px-5">
            <DrawerTitle className="pr-12 text-xl font-bold">分享</DrawerTitle>
            <DrawerDescription className="mt-3 rounded-2xl bg-slate-100 px-3.5 py-3 text-left">
              <span className="block text-xs font-normal text-slate-500">
                分享内容
              </span>
              <span className="mt-1 block truncate text-sm font-bold text-slate-900">
                {shareTargetTitle}
              </span>
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭分享"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
            >
              <X aria-hidden="true" className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="grid grid-cols-3 gap-2 px-4 py-4 sm:gap-3 sm:px-5">
            {[
              {
                id: 'wechat' as const,
                label: '微信',
                icon: WeChatBrandIcon,
                style: 'bg-emerald-50',
              },
              {
                id: 'qq' as const,
                label: 'QQ',
                icon: QqBrandIcon,
                style: 'bg-sky-50',
              },
              {
                id: 'download' as const,
                label: '下载到本地',
                icon: Download,
                style: 'bg-violet-50 text-violet-600',
              },
            ].map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    if (!shareTargetTitle) return;
                    onShare(shareTargetTitle, action.id);
                    setShareTargetTitle(null);
                  }}
                  className="flex min-h-24 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border bg-white px-1.5 text-sm font-normal text-slate-700 transition-[border-color,background-color,transform] hover:border-blue-200 hover:bg-slate-50 active:scale-[.97] sm:px-2"
                >
                  <span className={`grid size-11 place-items-center rounded-2xl ${action.style}`}>
                    <ActionIcon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="max-w-full truncate whitespace-nowrap">{action.label}</span>
                </button>
              );
            })}
          </div>
          <DrawerFooter className="px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-1 sm:px-5">
            <DrawerClose asChild>
              <button
                type="button"
                className="min-h-11 w-full rounded-xl bg-slate-100 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
              >
                取消
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function KnowledgeEmpty({ title, description }: { title: string; description: string }) {
  return (
    <div className="mt-10 rounded-3xl border border-dashed bg-white px-6 py-12 text-center">
      <Database aria-hidden="true" className="mx-auto size-9 text-slate-300" />
      <p className="mt-3 font-bold text-slate-800">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function Sidebar({
  open,
  onClose,
  onFeature,
  onHistory,
  onSettings,
  onPoints,
  edition,
  onSwitchEdition,
  showEditionUpgradeHint,
  points,
  notify,
}: {
  open: boolean;
  onClose: () => void;
  onFeature: (label: string) => void;
  onHistory: (title: string) => void;
  onSettings: () => void;
  onPoints: () => void;
  edition: Edition;
  onSwitchEdition: () => void;
  showEditionUpgradeHint: boolean;
  points: number;
  notify: (message: string) => void;
}) {
  const EditionIcon = edition.icon;
  return (
    <div
      className={`${open ? 'flex' : 'hidden'} fixed inset-0 z-50 justify-start bg-slate-950/55 backdrop-blur-[2px] lg:static lg:z-auto lg:flex lg:h-dvh lg:w-[300px] lg:shrink-0 lg:bg-transparent lg:backdrop-blur-none xl:w-[320px]`}
    >
      <aside
        aria-label="功能与聊天记录"
        className="flex h-dvh w-[min(340px,88vw)] flex-col border-r bg-white shadow-2xl lg:w-full lg:shadow-none"
      >
        <div className="flex items-center justify-between border-b px-4 pb-4 pt-[max(20px,env(safe-area-inset-top))]">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-200 ring-2 ring-blue-50"
            >
              <UserRound className="size-6" />
            </span>
            <div className="relative min-w-0">
              <p className="truncate font-bold">林小满</p>
              <button
                aria-label={`切换版本，当前为${edition.name}`}
                onClick={onSwitchEdition}
                aria-describedby={
                  showEditionUpgradeHint ? 'edition-upgrade-hint' : undefined
                }
                className={`mt-1 flex min-h-8 max-w-[190px] items-center gap-1.5 rounded-lg px-2 py-1 text-left text-xs font-semibold ring-1 transition-[opacity,box-shadow] hover:opacity-80 ${edition.accent} ${showEditionUpgradeHint ? 'relative z-10 shadow-[0_0_0_4px_rgba(139,92,246,.18)] ring-2 ring-violet-400' : ''}`}
              >
                <EditionIcon className="size-3.5 shrink-0" />
                <span className="truncate">
                  {edition.shortName} · {edition.role}
                </span>
                <ChevronsUpDown className="size-3.5 shrink-0" />
              </button>
              {showEditionUpgradeHint && (
                <div
                  id="edition-upgrade-hint"
                  role="status"
                  className="absolute left-0 top-[calc(100%+10px)] z-20 w-[218px] rounded-2xl bg-violet-600 px-3.5 py-3 text-left text-xs leading-5 text-white shadow-[0_12px_30px_rgba(76,29,149,.3)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 left-6 size-3 rotate-45 bg-violet-600"
                  />
                  <span className="relative block font-bold">
                    想解锁更多教学能力？
                  </span>
                  <span className="relative mt-0.5 block text-violet-100">
                    点击这里升级教师版，使用教案、课件和智能组卷。
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            aria-label="关闭菜单"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-xl bg-muted lg:hidden"
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
              {features.map(({ label, hint, icon, iconColor, status, preview }) => (
                <button
                  key={label}
                  aria-disabled={Boolean(status && !preview)}
                  onClick={() => onFeature(label)}
                  className={`flex min-h-[62px] w-full items-center gap-3 rounded-2xl px-2 text-left transition-colors hover:bg-muted ${status ? 'text-slate-500' : ''}`}
                >
                  <IconBox icon={icon} color={iconColor} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <span>{label}</span>
                      {status && (
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                          {status}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {hint}
                    </p>
                  </div>
                  {(!status || preview) && (
                    <ChevronRight className="size-4 text-muted-foreground" />
                  )}
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
        className="h-full flex-1 lg:hidden"
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
  copy,
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
  copy: ProfileCopy;
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
      title: copy.sectionTitle,
      items: [
        {
          label: copy.entryLabel,
          description: profileCompleted
            ? copy.entryDoneDescription
            : copy.entryTodoDescription,
          icon: copy.entryIcon,
          color: copy.entryColor,
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
                        item.label === copy.entryLabel
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

function ProfileView({
  edition,
  profile,
  completed,
  copy,
  onBack,
  onSave,
}: {
  edition: EditionId;
  profile: UserProfile;
  completed: boolean;
  copy: ProfileCopy;
  onBack: () => void;
  onSave: (profile: UserProfile) => void;
}) {
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState('');
  const [usingCustomGoal, setUsingCustomGoal] = useState(
    () =>
      edition === 'family' &&
      Boolean(
        profile.learningGoal &&
          !studentGoalOptions.includes(profile.learningGoal),
      ),
  );
  const requiredFields: (keyof UserProfile)[] = [
    'nickname',
    'region',
    'grade',
    ...(edition === 'family' ? (['semester'] as const) : []),
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

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const selectedStudentSubjects = draft.focusSubject
    .split('、')
    .filter(Boolean);
  const toggleStudentSubject = (subject: string) => {
    const nextSubjects = selectedStudentSubjects.includes(subject)
      ? selectedStudentSubjects.filter((item) => item !== subject)
      : [...selectedStudentSubjects, subject];
    updateProfile('focusSubject', nextSubjects.join('、'));
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
  const isTeacher = edition === 'teacher';

  const HeroIcon = copy.heroIcon;
  const EntryIcon = copy.entryIcon;

  return (
    <>
      <Header
        title={copy.title}
        subtitle={copy.subtitle}
        onBack={onBack}
        backLabel="返回设置"
      />
      <div className="flex h-[calc(100dvh-72px)] flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <section
              className={`overflow-hidden rounded-[28px] bg-gradient-to-br p-5 text-white shadow-lg ${copy.heroGradient}`}
            >
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <HeroIcon className="size-7" />
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
                  <p className="mt-3 text-sm leading-relaxed text-white/85">
                    {completed ? copy.heroDone : copy.heroTodo}
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
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${copy.entryColor}`}
                >
                  <EntryIcon className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold">{copy.basicTitle}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {copy.basicDescription}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label htmlFor="profile-nickname" className="text-sm font-semibold">
                  {copy.nicknameLabel} <span className="text-rose-500">必填</span>
                  <input
                    id="profile-nickname"
                    value={draft.nickname}
                    onChange={(event) =>
                      updateProfile('nickname', event.target.value)
                    }
                    placeholder={copy.nicknamePlaceholder}
                    className={inputClassName}
                  />
                </label>
                <label htmlFor="profile-grade" className="text-sm font-semibold">
                  {copy.gradeLabel} <span className="text-rose-500">必填</span>
                  <select
                    id="profile-grade"
                    value={draft.grade}
                    onChange={(event) =>
                      updateProfile('grade', event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">{copy.gradePlaceholder}</option>
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
                {!isTeacher && (
                  <label htmlFor="profile-semester" className="text-sm font-semibold">
                    当前学期 <span className="text-rose-500">必填</span>
                    <select
                      id="profile-semester"
                      value={draft.semester}
                      onChange={(event) =>
                        updateProfile('semester', event.target.value)
                      }
                      className={inputClassName}
                    >
                      <option value="">请选择当前学期</option>
                      {['上学期', '下学期', '寒假', '暑假'].map((semester) => (
                        <option key={semester}>{semester}</option>
                      ))}
                    </select>
                  </label>
                )}
                {isTeacher ? (
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
                ) : (
                  <label htmlFor="profile-region" className="text-sm font-semibold">
                    所在省份/地区 <span className="text-rose-500">必填</span>
                    <select
                      id="profile-region"
                      value={draft.region}
                      onChange={(event) =>
                        updateProfile('region', event.target.value)
                      }
                      className={inputClassName}
                    >
                      <option value="">请选择所在省份或地区</option>
                      {regionOptions.map((region) => (
                        <option key={region}>{region}</option>
                      ))}
                    </select>
                  </label>
                )}
                <label htmlFor="profile-school" className="text-sm font-semibold">
                  {copy.schoolLabel} <span className="text-rose-500">必填</span>
                  <div className="relative">
                    <School className="pointer-events-none absolute left-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="profile-school"
                      value={draft.school}
                      onChange={(event) =>
                        updateProfile('school', event.target.value)
                      }
                      placeholder={copy.schoolPlaceholder}
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                  <span className="mt-1.5 block text-xs font-normal text-muted-foreground">
                    {copy.schoolHint}
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
                  <h2 className="font-bold">{copy.courseTitle}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {copy.courseDescription}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {isTeacher ? (
                  <label htmlFor="profile-subject" className="text-sm font-semibold">
                    {copy.subjectLabel} <span className="text-rose-500">必填</span>
                    <select
                      id="profile-subject"
                      value={draft.focusSubject}
                      onChange={(event) =>
                        updateProfile('focusSubject', event.target.value)
                      }
                      className={inputClassName}
                    >
                      <option value="">{copy.subjectPlaceholder}</option>
                      {['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'].map(
                        (subject) => (
                          <option key={subject}>{subject}</option>
                        ),
                      )}
                    </select>
                  </label>
                ) : (
                  <fieldset className="md:col-span-2">
                    <legend className="text-sm font-semibold">
                      {copy.subjectLabel} <span className="text-rose-500">必填</span>
                    </legend>
                    <p className="mt-1 text-xs text-muted-foreground">
                      可多选，选择后 AI 会同时支持这些科目的学习。
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'].map(
                        (subject) => {
                          const selected = selectedStudentSubjects.includes(subject);
                          return (
                            <button
                              key={subject}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleStudentSubject(subject)}
                              className={`min-h-11 rounded-xl border px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${
                                selected
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                              }`}
                            >
                              {subject}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </fieldset>
                )}
                <label htmlFor="profile-textbook" className="text-sm font-semibold">
                  {isTeacher ? '教材版本' : '主要教材版本'} <span className="text-rose-500">必填</span>
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
                {copy.weakTopicsLabel} <span className="font-normal text-muted-foreground">选填</span>
                <textarea
                  id="profile-weak-topics"
                  value={draft.weakTopics}
                  onChange={(event) =>
                    updateProfile('weakTopics', event.target.value)
                  }
                  placeholder={copy.weakTopicsPlaceholder}
                  rows={3}
                  className={`${inputClassName} resize-none py-3 leading-relaxed`}
                />
              </label>
              {isTeacher ? (
                <label htmlFor="profile-goal" className="mt-4 block text-sm font-semibold">
                  {copy.goalLabel} <span className="text-rose-500">必填</span>
                  <div className="relative">
                    <Target className="pointer-events-none absolute left-4 top-6 size-4 text-slate-400" />
                    <textarea
                      id="profile-goal"
                      value={draft.learningGoal}
                      onChange={(event) =>
                        updateProfile('learningGoal', event.target.value)
                      }
                      placeholder={copy.goalPlaceholder}
                      rows={3}
                      className={`${inputClassName} resize-none py-3 pl-11 leading-relaxed`}
                    />
                  </div>
                </label>
              ) : (
                <div className="mt-4">
                  <label htmlFor="profile-goal-select" className="block text-sm font-semibold">
                    {copy.goalLabel} <span className="text-rose-500">必填</span>
                    <select
                      id="profile-goal-select"
                      value={usingCustomGoal ? '__custom__' : draft.learningGoal}
                      onChange={(event) => {
                        const value = event.target.value;
                        const isCustom = value === '__custom__';
                        setUsingCustomGoal(isCustom);
                        updateProfile('learningGoal', isCustom ? '' : value);
                      }}
                      className={inputClassName}
                    >
                      <option value="">请选择阶段目标</option>
                      {studentGoalOptions.map((goal) => (
                        <option key={goal}>{goal}</option>
                      ))}
                      <option value="__custom__">自定义目标</option>
                    </select>
                  </label>
                  {usingCustomGoal && (
                    <label htmlFor="profile-goal" className="mt-3 block text-sm font-semibold">
                      补充目标内容
                      <div className="relative">
                        <Target className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          id="profile-goal"
                          value={draft.learningGoal}
                          onChange={(event) =>
                            updateProfile('learningGoal', event.target.value)
                          }
                          placeholder={copy.goalPlaceholder}
                          className={`${inputClassName} pl-11`}
                        />
                      </div>
                    </label>
                  )}
                </div>
              )}
            </section>

            {isTeacher && (
              <section className="rounded-3xl border bg-white p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700">
                    <SlidersHorizontal aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-bold">教学偏好</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      选择常用选项即可，班级学情和具体目标可以在上方补充。
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    {
                      id: 'profile-teaching-experience',
                      label: '教龄',
                      field: 'teachingExperience' as const,
                      placeholder: '请选择教龄范围',
                      options: ['1—3 年', '4—7 年', '8—15 年', '16 年以上'],
                    },
                    {
                      id: 'profile-class-level',
                      label: '班级层次',
                      field: 'classLevel' as const,
                      placeholder: '请选择班级层次',
                      options: ['普通班', '实验班', '分层教学班', '其他'],
                    },
                    {
                      id: 'profile-head-teacher',
                      label: '是否兼任班主任',
                      field: 'isHeadTeacher' as const,
                      placeholder: '请选择',
                      options: ['是', '否'],
                    },
                    {
                      id: 'profile-courseware-style',
                      label: '课件风格',
                      field: 'coursewareStyle' as const,
                      placeholder: '请选择常用风格',
                      options: ['简约清晰', '学术严谨', '活泼互动', '图文故事化'],
                    },
                  ].map((field) => (
                    <label key={field.id} htmlFor={field.id} className="text-sm font-semibold">
                      {field.label}{' '}
                      <span className="font-normal text-muted-foreground">选填</span>
                      <select
                        id={field.id}
                        value={draft[field.field]}
                        onChange={(event) => updateProfile(field.field, event.target.value)}
                        className={inputClassName}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {!isTeacher && (
              <section className="rounded-3xl border bg-white p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <SlidersHorizontal aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-bold">学习习惯</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      选填常用偏好，帮助 AI 安排更合适的节奏和反馈。
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    {
                      id: 'profile-daily-study-time',
                      label: '每天可用学习时间',
                      field: 'dailyStudyTime' as const,
                      placeholder: '请选择大致时长',
                      options: ['15 分钟以内', '约 30 分钟', '约 45 分钟', '60 分钟以上'],
                    },
                    {
                      id: 'profile-encouragement-style',
                      label: '更适合的鼓励方式',
                      field: 'encouragementStyle' as const,
                      placeholder: '请选择鼓励方式',
                      options: ['温柔鼓励', '活泼陪伴', '直接明确', '严格督促'],
                    },
                    {
                      id: 'profile-report-frequency',
                      label: '学习报告频率',
                      field: 'reportFrequency' as const,
                      placeholder: '请选择报告频率',
                      options: ['每天简报', '每周一次', '每月总结', '仅需要时生成'],
                    },
                  ].map((field) => (
                    <label key={field.id} htmlFor={field.id} className="text-sm font-semibold">
                      {field.label}{' '}
                      <span className="font-normal text-muted-foreground">选填</span>
                      <select
                        id={field.id}
                        value={draft[field.field]}
                        onChange={(event) => updateProfile(field.field, event.target.value)}
                        className={inputClassName}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-3xl border bg-white p-4 md:p-5">
              <label htmlFor="profile-guidance" className="text-sm font-semibold">
                {copy.guidanceLabel}
                <select
                  id="profile-guidance"
                  value={draft.guidanceStyle}
                  onChange={(event) =>
                    updateProfile('guidanceStyle', event.target.value)
                  }
                  className={inputClassName}
                >
                  {copy.guidanceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {copy.footerHint}
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

function AddDeviceDrawer({
  open,
  onOpenChange,
  onBind,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBind: (deviceCode: string, activationCode: string, name: string) => void;
}) {
  const [deviceCode, setDeviceCode] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [deviceName, setDeviceName] = useState('我的 BingoMate');
  const normalizedDeviceCode = deviceCode.trim().toUpperCase();
  const deviceCodeIsValid = DEVICE_CODE_PATTERN.test(normalizedDeviceCode);
  const canBind =
    deviceCodeIsValid &&
    activationCode.trim().length > 0 &&
    deviceName.trim().length > 0;

  const bindDevice = () => {
    if (!canBind) return;
    onBind(normalizedDeviceCode, activationCode.trim(), deviceName.trim());
    setDeviceCode('');
    setActivationCode('');
    setDeviceName('我的 BingoMate');
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
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
                  aria-describedby="add-device-code-hint"
                  aria-invalid={deviceCode.length > 0 && !deviceCodeIsValid}
                  value={deviceCode}
                  onChange={(event) => setDeviceCode(normalizeDeviceCode(event.target.value))}
                  placeholder={`例如 ${DEVICE_CODE_EXAMPLE}`}
                  maxLength={13}
                  autoComplete="off"
                  className="h-12 min-w-0 flex-1 rounded-2xl border bg-white px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  aria-label="扫码录入设备码"
                  onClick={() => setDeviceCode(DEVICE_CODE_EXAMPLE)}
                  className="flex h-12 shrink-0 items-center gap-1.5 rounded-2xl border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <ScanLine className="size-5" />
                  扫码
                </button>
              </div>
              <p
                id="add-device-code-hint"
                className={`mt-1.5 text-xs ${deviceCode.length > 0 && !deviceCodeIsValid ? 'text-red-600' : 'text-slate-500'}`}
              >
                {deviceCode.length > 0 && !deviceCodeIsValid
                  ? '设备码格式应为 BC-XXXX-XXXXX'
                  : '格式：BC-XXXX-XXXXX'}
              </p>
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
  );
}

function DevicesView({
  devices,
  currentDeviceId,
  onBack,
  onBind,
  onRename,
  onSwitch,
}: {
  devices: BingoDevice[];
  currentDeviceId: string;
  onBack: () => void;
  onBind: (deviceCode: string, activationCode: string, name: string) => void;
  onRename: (deviceId: string, name: string) => void;
  onSwitch: (device: BingoDevice) => void;
}) {
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [renameDevice, setRenameDevice] = useState<BingoDevice | null>(null);
  const [renameName, setRenameName] = useState('');

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
                  className={`flex min-h-[82px] items-center gap-1 px-2 py-3 ${index ? 'border-t' : ''}`}
                >
                  <button
                    type="button"
                    disabled={isCurrent}
                    aria-label={
                      isCurrent
                        ? `${device.name}已是当前设备`
                        : `切换到${device.name}`
                    }
                    onClick={() => onSwitch(device)}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-2 py-1 text-left transition-colors enabled:hover:bg-muted"
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl ${isCurrent ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
                    >
                      <MonitorSmartphone className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold">
                          {device.name}
                        </span>
                        {isCurrent ? (
                          <Badge className="shrink-0 bg-blue-50 text-blue-700">
                            当前设备
                          </Badge>
                        ) : (
                          <span className="shrink-0 text-xs font-semibold text-blue-600">
                            设为当前
                          </span>
                        )}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex shrink-0 items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className={`size-2 rounded-full ${device.online ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          />
                          {device.online ? '在线' : '离线'}
                        </span>
                        <span className="truncate">设备码 {device.code}</span>
                      </span>
                    </span>
                  </button>
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

      <AddDeviceDrawer
        open={addDeviceOpen}
        onOpenChange={setAddDeviceOpen}
        onBind={onBind}
      />

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
  const [selectedChannelId, setSelectedChannelId] = useState(
    channels.find((channel) => channel.connected)?.id ?? channels[0]?.id ?? '',
  );
  const [channelListCollapsed, setChannelListCollapsed] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('小满学习助手');
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const canConnect = Boolean(
    setupChannel && selectedAgent && appId.trim() && appSecret.trim(),
  );
  const selectedChannel =
    channels.find((channel) => channel.id === selectedChannelId) ?? channels[0];
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
        <div className="mx-auto w-full max-w-6xl">
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

          <div className="grid gap-3 md:hidden">
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

          <div className="hidden min-h-[560px] items-stretch gap-4 md:flex">
            <aside
              aria-label="通道列表"
              className={`flex shrink-0 flex-col overflow-hidden rounded-[24px] border bg-white shadow-sm ${channelListCollapsed ? 'w-[76px]' : 'w-[280px]'}`}
            >
              <div className={`flex min-h-16 items-center border-b px-3 ${channelListCollapsed ? 'justify-center' : 'justify-between gap-3'}`}>
                {!channelListCollapsed && (
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">通道列表</p>
                    <p className="mt-0.5 text-xs text-slate-500">选择平台查看详情</p>
                  </div>
                )}
                <button
                  type="button"
                  aria-label={channelListCollapsed ? '展开通道列表' : '收起通道列表'}
                  aria-expanded={!channelListCollapsed}
                  aria-controls="desktop-channel-list"
                  onClick={() => setChannelListCollapsed((collapsed) => !collapsed)}
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {channelListCollapsed ? (
                    <PanelLeftOpen aria-hidden="true" className="size-5" />
                  ) : (
                    <PanelLeftClose aria-hidden="true" className="size-5" />
                  )}
                </button>
              </div>
              <nav id="desktop-channel-list" className="min-h-0 flex-1 space-y-1.5 overflow-y-auto p-2.5">
                {channels.map((channel) => {
                  const isSelected = channel.id === selectedChannel?.id;
                  return (
                    <button
                      key={channel.id}
                      type="button"
                      aria-label={`${channel.name}，${channel.connected ? '已连接' : '未连接'}`}
                      aria-current={isSelected ? 'page' : undefined}
                      title={channelListCollapsed ? channel.name : undefined}
                      onClick={() => setSelectedChannelId(channel.id)}
                      className={`flex min-h-14 w-full items-center rounded-2xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${channelListCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} ${isSelected ? 'bg-blue-50 text-blue-950 ring-1 ring-blue-100' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <span className="relative grid size-10 shrink-0 place-items-center rounded-xl border bg-white p-2 shadow-sm">
                        <img
                          src={channel.logo}
                          alt=""
                          aria-hidden="true"
                          width={28}
                          height={28}
                          className="size-7 object-contain"
                        />
                        <span
                          aria-hidden="true"
                          className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white ${channel.connected ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        />
                      </span>
                      {!channelListCollapsed && (
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold">{channel.name}</span>
                            {channel.recommended && (
                              <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">推荐</span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-slate-500">
                            {channel.connected ? channel.account : '暂未连接'}
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {selectedChannel && (
              <section className="min-w-0 flex-1 rounded-[28px] border bg-white p-5 shadow-sm lg:p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-16 shrink-0 place-items-center rounded-[20px] border bg-white p-3 shadow-sm">
                    <img
                      src={selectedChannel.logo}
                      alt={`${selectedChannel.name} Logo`}
                      width={44}
                      height={44}
                      className="size-11 object-contain"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-950">{selectedChannel.name}</h2>
                      {selectedChannel.recommended && (
                        <Badge className="bg-emerald-50 text-emerald-700">推荐</Badge>
                      )}
                      <Badge variant="outline" className={selectedChannel.connected ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'}>
                        {selectedChannel.connected ? '已连接' : '未连接'}
                      </Badge>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                      {selectedChannel.description}
                    </p>
                  </div>
                  {selectedChannel.connected ? (
                    <button
                      type="button"
                      aria-label={`${selectedChannel.name}更多操作`}
                      onClick={() => setActionChannel(selectedChannel)}
                      className="grid size-11 shrink-0 place-items-center rounded-xl border text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <MoreHorizontal aria-hidden="true" className="size-5" />
                    </button>
                  ) : (
                    <Button onClick={() => openSetup(selectedChannel)} className="h-11 shrink-0 rounded-xl px-5">
                      添加通道
                    </Button>
                  )}
                </div>

                <div className="mt-6 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-2xl border bg-slate-50/70 p-4">
                    <p className="text-xs font-semibold text-slate-500">当前绑定</p>
                    <p className="mt-2 truncate text-base font-bold text-slate-900">{selectedChannel.account}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {selectedChannel.connected ? '通道运行正常，可以通过该平台唤醒 BingoMate。' : '完成开放平台配置后即可开始使用。'}
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-blue-50/70 p-4">
                    <p className="text-xs font-semibold text-blue-600">使用方式</p>
                    <p className="mt-2 text-base font-bold text-slate-900">发送消息即可调用</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">支持学习咨询、任务提醒和生成结果通知。</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">连接信息</h3>
                      <p className="mt-1 text-xs text-slate-500">管理当前平台与 BingoMate 的连接状态。</p>
                    </div>
                    {selectedChannel.connected && (
                      <Button
                        variant="outline"
                        onClick={() => setConfigChannel(selectedChannel)}
                        className="h-10 rounded-xl px-4"
                      >
                        查看配置
                      </Button>
                    )}
                  </div>
                  <dl className="mt-4 overflow-hidden rounded-2xl bg-slate-50 text-sm">
                    <div className="flex min-h-12 items-center gap-4 px-4">
                      <dt className="text-slate-500">平台</dt>
                      <dd className="ml-auto font-semibold text-slate-900">{selectedChannel.name}</dd>
                    </div>
                    <div className="flex min-h-12 items-center gap-4 border-t px-4">
                      <dt className="text-slate-500">连接状态</dt>
                      <dd className="ml-auto font-semibold text-slate-900">{selectedChannel.connected ? '已连接' : '未连接'}</dd>
                    </div>
                    <div className="flex min-h-12 items-center gap-4 border-t px-4">
                      <dt className="text-slate-500">绑定账号</dt>
                      <dd className="ml-auto max-w-[65%] truncate text-right font-semibold text-slate-900">{selectedChannel.account}</dd>
                    </div>
                  </dl>
                </div>
              </section>
            )}
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
  const learningReport = {
    daily: {
      completed: 6,
      pending: 2,
      mastery: 67,
      weakPoints: ['二次函数顶点', '阅读概括'],
      highlights: ['今天完成 6 道练习', '做对 4 道题，并主动订正 1 道'],
    },
    weekly: {
      completed: 20,
      pending: 8,
      mastery: 60,
      weakPoints: ['压力与浮力', '单位换算', '公式建模', '结尾作用', '选择性记忆'],
      highlights: ['本周完成 20 道练习', '做对 12 道题，继续保持', '连续学习 5 天，节奏稳定'],
    },
    monthly: {
      completed: 86,
      pending: 13,
      mastery: 79,
      weakPoints: ['函数综合应用', '几何辅助线', '阅读信息提取'],
      highlights: ['本月完成 86 道练习', '已掌握 12 个重点知识点', '主动复盘比例达到 76%'],
    },
  }[period];
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

          <section className="mt-4 rounded-3xl border bg-white p-4 shadow-sm md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <BookOpen aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900">学习报告</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">练习结果与知识掌握情况</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                预览
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                [`${learningReport.completed}道`, '本期做题'],
                [`${learningReport.pending}道`, '本期错题'],
                [`${learningReport.mastery}%`, '掌握率'],
              ].map(([value, label]) => (
                <div key={label} className="min-w-0 rounded-2xl bg-slate-50 px-2 py-3 text-center sm:px-3">
                  <strong className="block truncate text-lg font-bold text-slate-900 tabular-nums">{value}</strong>
                  <span className="mt-0.5 block truncate text-[11px] text-slate-500 sm:text-xs">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Target aria-hidden="true" className="size-4 text-orange-500" />
                  本期薄弱知识点
                </div>
                <div className="mt-2 space-y-1.5">
                  {learningReport.weakPoints.map((point) => (
                    <div key={point} className="flex min-h-9 items-center gap-2 rounded-xl bg-slate-50 px-3 text-sm">
                      <span className="min-w-0 flex-1 truncate text-slate-700">{point}</span>
                      <span className="shrink-0 text-xs font-medium text-orange-600">待突破</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Sparkles aria-hidden="true" className="size-4 text-emerald-600" />
                  学习亮点
                </div>
                <div className="mt-2 space-y-1.5">
                  {learningReport.highlights.map((highlight) => (
                    <div key={highlight} className="flex min-h-9 items-center gap-2 rounded-xl bg-emerald-50 px-3 text-sm text-emerald-800">
                      <Check aria-hidden="true" className="size-4 shrink-0" />
                      <span className="min-w-0 flex-1">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

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
  onCompleteProfile,
  onStartTour,
  moduleHomeEnabled,
  onOpenModuleHome,
  onUseConversationHome,
  notify,
}: {
  stage: DemoStage;
  setStage: (stage: DemoStage) => void;
  onBind: (
    deviceCode: string,
    activationCode: string,
    deviceName: string,
    editionId: EditionId,
  ) => void;
  onCompleteProfile: (
    editionId: EditionId,
    profile: {
      nickname: string;
      grade: string;
      context: string;
      region?: string;
      semester?: string;
      focusSubject?: string;
      textbook?: string;
    },
  ) => void;
  onStartTour: () => void;
  moduleHomeEnabled: boolean;
  onOpenModuleHome: () => void;
  onUseConversationHome: () => void;
  notify: (message: string) => void;
}) {
  const [phone, setPhone] = useState('13800138000');
  const [verificationCode, setVerificationCode] = useState('888888');
  const [loginError, setLoginError] = useState('');
  const [codeSent, setCodeSent] = useState(true);
  const [legalDocument, setLegalDocument] = useState<
    null | 'terms' | 'privacy'
  >(null);
  const [deviceCode, setDeviceCode] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [deviceName, setDeviceName] = useState('我的 BingoMate');
  const [activatedEdition, setActivatedEdition] =
    useState<EditionId>('family');
  const [profileNickname, setProfileNickname] = useState('');
  const [profileGrade, setProfileGrade] = useState('');
  const [profileSemester, setProfileSemester] = useState('');
  const [profileContext, setProfileContext] = useState('');
  const [profileRegion, setProfileRegion] = useState('');
  const [profileSubject, setProfileSubject] = useState('');
  const [profileTextbook, setProfileTextbook] = useState('');
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedActivationCode = activationCode.trim();
  const normalizedDeviceCode = deviceCode.trim().toUpperCase();
  const deviceCodeIsValid = DEVICE_CODE_PATTERN.test(normalizedDeviceCode);
  const detectedEdition: EditionId | null =
    normalizedActivationCode.length >= 6
      ? /teacher|teach|tch|教师/i.test(normalizedActivationCode)
        ? 'teacher'
        : 'family'
      : null;
  const DetectedEditionIcon = detectedEdition
    ? editions[detectedEdition].icon
    : null;
  const activatedCopy = profileCopy[activatedEdition];
  const ActivatedProfileIcon = activatedCopy.heroIcon;
  const selectedProfileSubjects = profileSubject.split('、').filter(Boolean);
  const toggleProfileSubject = (subject: string) => {
    setProfileSubject((current) => {
      const selected = current.split('、').filter(Boolean);
      return selected.includes(subject)
        ? selected.filter((item) => item !== subject).join('、')
        : [...selected, subject].join('、');
    });
  };

  const startDemo = () => {
    onUseConversationHome();
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    setPhone('13800138000');
    setVerificationCode('888888');
    setLoginError('');
    setCodeSent(true);
    setLegalDocument(null);
    setDeviceCode('');
    setActivationCode('');
    setDeviceName('我的 BingoMate');
    setActivatedEdition('family');
    setProfileNickname('');
    setProfileGrade('');
    setProfileSemester('');
    setProfileContext('');
    setProfileRegion('');
    setProfileSubject('');
    setProfileTextbook('');
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
    if (!deviceCodeIsValid || !detectedEdition || !deviceName.trim()) return;
    const resolvedEdition = detectedEdition;
    setActivatedEdition(resolvedEdition);
    onBind(
      normalizedDeviceCode,
      activationCode.trim(),
      deviceName.trim(),
      resolvedEdition,
    );
    setStage('bind-success');
    successTimerRef.current = setTimeout(() => {
      successTimerRef.current = null;
      setStage('profile');
    }, 1400);
  };

  const completeProfile = () => {
    if (
      !profileNickname.trim() ||
      !profileGrade.trim() ||
      !profileContext.trim() ||
      (activatedEdition === 'family' &&
        (!profileRegion.trim() ||
          !profileSemester ||
          !profileSubject ||
          !profileTextbook)) ||
      (activatedEdition === 'teacher' &&
        (!profileSubject || !profileTextbook))
    )
      return;
    onCompleteProfile(activatedEdition, {
      nickname: profileNickname.trim(),
      grade: profileGrade,
      context: profileContext.trim(),
      ...(activatedEdition === 'family'
        ? {
            region: profileRegion.trim(),
            semester: profileSemester,
            focusSubject: profileSubject,
            textbook: profileTextbook,
          }
        : activatedEdition === 'teacher'
        ? {
            focusSubject: profileSubject,
            textbook: profileTextbook,
          }
        : {}),
    });
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
          <div className="space-y-3 px-4 pb-[max(20px,env(safe-area-inset-bottom))]">
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
                  登录、激活、建档并完成第一次对话
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-blue-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenModuleHome();
                setStage(null);
              }}
              className="flex min-h-[88px] w-full items-center gap-4 rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 p-4 text-left shadow-sm transition-[transform,box-shadow] active:scale-[.98]"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-200">
                <Blocks aria-hidden="true" className="size-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-bold text-slate-900">
                  模块首页演示
                  {moduleHomeEnabled && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] text-white">
                      使用中
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                  像传统 App 一样，从功能模块直接开始
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-blue-500" />
            </button>
            {moduleHomeEnabled && (
              <button
                type="button"
                onClick={() => {
                  onUseConversationHome();
                  setStage(null);
                }}
                className="min-h-11 w-full rounded-2xl text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                返回现有对话首页
              </button>
            )}
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
            <div className="flex justify-end">
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
                <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                  登录或注册即表示您已阅读并同意
                  <button
                    type="button"
                    onClick={() => setLegalDocument('terms')}
                    className="mx-0.5 rounded text-blue-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  >
                    《用户服务协议》
                  </button>
                  和
                  <button
                    type="button"
                    onClick={() => setLegalDocument('privacy')}
                    className="mx-0.5 rounded text-blue-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  >
                    《隐私政策》
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {legalDocument && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <button
            type="button"
            aria-label="关闭协议详情"
            onClick={() => setLegalDocument(null)}
            className="absolute inset-0 bg-slate-950/45"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-legal-title"
            className="relative z-10 flex max-h-[72dvh] w-[calc(100%-16px)] max-w-[560px] flex-col rounded-t-[30px] bg-white shadow-2xl sm:w-[calc(100%-32px)]"
          >
            <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-slate-200" />
            <header className="flex items-center justify-between gap-3 border-b px-5 py-3">
              <h3 id="demo-legal-title" className="text-lg font-bold text-slate-950">
                {legalDocument === 'terms' ? '用户服务协议' : '隐私政策'}
              </h3>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setLegalDocument(null)}
                className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-600"
              >
                <X className="size-5" />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm leading-7 text-slate-600">
              {legalDocument === 'terms' ? (
                <>
                  <p className="font-semibold text-slate-900">一、账号与服务</p>
                  <p className="mt-1">
                    用户可通过手机号验证码登录，未注册的手机号将自动创建 BingoMate
                    账号。请妥善保管账号及绑定设备信息，不得将服务用于违法或侵害他人权益的活动。
                  </p>
                  <p className="mt-4 font-semibold text-slate-900">二、学习辅助说明</p>
                  <p className="mt-1">
                    BingoMate 提供学习规划、答疑和练习辅助。用户应结合教材、教师指导及实际学习情况判断和使用生成内容。
                  </p>
                  <p className="mt-4 font-semibold text-slate-900">三、账号管理</p>
                  <p className="mt-1">
                    用户可以在账号与安全中修改手机号、密码及管理设备连接；停止使用服务时，可按产品提供的方式申请注销账号。
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-slate-900">一、信息收集</p>
                  <p className="mt-1">
                    为完成登录、设备绑定和个性化服务，我们会处理手机号、设备码、学习记录及用户主动填写的学生或教师档案。
                  </p>
                  <p className="mt-4 font-semibold text-slate-900">二、信息使用</p>
                  <p className="mt-1">
                    相关信息仅用于提供账号服务、同步学习进度、生成成长报告和改善辅导体验，不会用于与这些目的无关的用途。
                  </p>
                  <p className="mt-4 font-semibold text-slate-900">三、用户权利</p>
                  <p className="mt-1">
                    用户可以在设置中查看和修改个人资料、管理绑定设备，并依法申请访问、更正或删除个人信息。
                  </p>
                </>
              )}
            </div>
            <div className="border-t px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
              <Button
                type="button"
                onClick={() => setLegalDocument(null)}
                className="h-12 w-full rounded-2xl font-bold"
              >
                我知道了
              </Button>
            </div>
          </section>
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
                  aria-describedby="demo-device-code-hint"
                  aria-invalid={deviceCode.length > 0 && !deviceCodeIsValid}
                  value={deviceCode}
                  onChange={(event) => setDeviceCode(normalizeDeviceCode(event.target.value))}
                  placeholder={`例如 ${DEVICE_CODE_EXAMPLE}`}
                  maxLength={13}
                  className="h-12 min-w-0 flex-1 rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  aria-label="扫码录入演示设备码"
                  onClick={() => setDeviceCode(DEVICE_CODE_EXAMPLE)}
                  className="flex min-h-12 shrink-0 items-center gap-1.5 rounded-2xl bg-blue-50 px-3 text-sm font-bold text-blue-700"
                >
                  <ScanLine className="size-5" />
                  扫码
                </button>
              </div>
              <p
                id="demo-device-code-hint"
                className={`mt-1.5 text-xs ${deviceCode.length > 0 && !deviceCodeIsValid ? 'text-red-600' : 'text-slate-500'}`}
              >
                {deviceCode.length > 0 && !deviceCodeIsValid
                  ? '设备码格式应为 BC-XXXX-XXXXX'
                  : '格式：BC-XXXX-XXXXX'}
              </p>
            </div>
            <label htmlFor="demo-activation-code" className="block text-sm font-semibold">
              激活码
              <input
                id="demo-activation-code"
                aria-describedby="demo-activation-result"
                value={activationCode}
                onChange={(event) => setActivationCode(event.target.value)}
                placeholder="请输入设备激活码"
                className="mt-2 h-12 w-full rounded-2xl border bg-white px-4 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <div id="demo-activation-result" aria-live="polite">
              {detectedEdition && DetectedEditionIcon ? (
                <div
                  className={`flex min-h-12 items-center gap-3 rounded-2xl border px-3 ${detectedEdition === 'teacher' ? 'border-violet-200 bg-violet-50 text-violet-800' : 'border-blue-200 bg-blue-50 text-blue-800'}`}
                >
                  <DetectedEditionIcon
                    aria-hidden="true"
                    className="size-5 shrink-0"
                  />
                  <span className="min-w-0 text-sm">
                    已识别为
                    <strong className="ml-1">
                      {editions[detectedEdition].name}
                    </strong>
                  </span>
                  <Check className="ml-auto size-5 shrink-0" />
                </div>
              ) : (
                <p className="-mt-2 text-xs text-muted-foreground">
                  输入完整激活码后，将自动识别对应版本
                </p>
              )}
            </div>
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
              disabled={!deviceCodeIsValid || !detectedEdition || !deviceName.trim()}
              onClick={bind}
              className="h-12 w-full rounded-2xl text-base font-bold"
            >
              {detectedEdition
                ? `绑定设备并激活${editions[detectedEdition].shortName}`
                : '绑定设备并激活版本'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {stage === 'bind-success' && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/25 p-5 backdrop-blur-[2px]">
          <div
            role="status"
            aria-live="polite"
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 w-full max-w-sm rounded-[30px] bg-white p-6 text-center shadow-2xl duration-300"
          >
            <div className="relative mx-auto grid size-16 place-items-center rounded-[22px] bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200">
              <span className="absolute inset-1.5 rounded-[17px] border border-white/35" />
              <Check className="relative size-8 stroke-[3] text-white" />
            </div>
            <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950">
              {editions[activatedEdition].shortName}激活成功
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {deviceName}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              设备已连接，正在准备{activatedCopy.title}
            </p>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 flex w-fit gap-1.5 motion-safe:animate-pulse"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span className="size-1.5 rounded-full bg-emerald-300" />
            </div>
          </div>
        </div>
      )}

      <Drawer
        open={stage === 'profile'}
        onOpenChange={(open) => {
          if (!open) setStage(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(64dvh,620px)]">
          <DrawerHeader className="relative px-5 pb-3 pt-2 text-left">
            <div className="flex items-center gap-3 pr-12">
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${activatedEdition === 'teacher' ? 'from-violet-500 to-indigo-600 shadow-violet-200' : 'from-blue-500 to-indigo-600 shadow-blue-200'}`}
              >
                <ActivatedProfileIcon className="size-5" />
              </span>
              <div className="min-w-0">
                <DrawerTitle
                  id="demo-profile-title"
                  className="text-lg font-bold"
                >
                  {activatedEdition === 'teacher'
                    ? '建立教师档案'
                    : '建立学生档案'}
                </DrawerTitle>
                <DrawerDescription className="mt-0.5 text-left text-xs">
                  {activatedEdition === 'teacher'
                    ? '让 AI 更懂你的教学情况'
                    : '让 AI 更懂孩子的学习情况'}
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose
              aria-label="退出新手引导"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted text-slate-600"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-3">
            <p className="text-sm leading-relaxed text-slate-500">
              只需填写基础信息，后续生成内容会更贴合实际情况。
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm font-bold text-amber-800">
              <Gift aria-hidden="true" className="size-5 shrink-0 text-amber-600" />
              完成基础建档，立即赠送 100 积分
            </div>

            <div className="mt-3 space-y-3 rounded-[24px] border bg-white p-4">
              <label htmlFor="demo-profile-nickname" className="block text-sm font-semibold text-slate-800">
                {activatedCopy.nicknameLabel}
                <input
                  id="demo-profile-nickname"
                  value={profileNickname}
                  onChange={(event) => setProfileNickname(event.target.value)}
                  placeholder={activatedCopy.nicknamePlaceholder}
                  className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label htmlFor="demo-profile-grade" className="block text-sm font-semibold text-slate-800">
                {activatedCopy.gradeLabel}
                <select
                  id="demo-profile-grade"
                  value={profileGrade}
                  onChange={(event) => setProfileGrade(event.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">{activatedCopy.gradePlaceholder}</option>
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
              {activatedEdition === 'family' && (
                <label htmlFor="demo-profile-semester" className="block text-sm font-semibold text-slate-800">
                  当前学期
                  <select
                    id="demo-profile-semester"
                    value={profileSemester}
                    onChange={(event) => setProfileSemester(event.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">请选择当前学期</option>
                    {['上学期', '下学期', '寒假', '暑假'].map((semester) => (
                      <option key={semester}>{semester}</option>
                    ))}
                  </select>
                </label>
              )}
              {activatedEdition === 'teacher' ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label htmlFor="demo-profile-subject" className="block text-sm font-semibold text-slate-800">
                    任教科目
                    <select
                      id="demo-profile-subject"
                      value={profileSubject}
                      onChange={(event) => setProfileSubject(event.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">请选择任教科目</option>
                      {['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治', '多学科'].map((subject) => (
                        <option key={subject}>{subject}</option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="demo-profile-textbook" className="block text-sm font-semibold text-slate-800">
                    教材版本
                    <select
                      id="demo-profile-textbook"
                      value={profileTextbook}
                      onChange={(event) => setProfileTextbook(event.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">请选择教材版本</option>
                      {['人教版', '北师大版', '苏教版', '沪教版', '浙教版', '鲁教版', '其他版本'].map((textbook) => (
                        <option key={textbook}>{textbook}</option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : (
                <>
                  <fieldset>
                    <legend className="text-sm font-semibold text-slate-800">学习科目</legend>
                    <p className="mt-1 text-xs font-normal text-slate-500">可多选</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'].map(
                        (subject) => {
                          const selected = selectedProfileSubjects.includes(subject);
                          return (
                            <button
                              key={subject}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleProfileSubject(subject)}
                              className={`min-h-11 rounded-xl border px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${
                                selected
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-slate-200 bg-slate-50 text-slate-700'
                              }`}
                            >
                              {subject}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </fieldset>
                  <label htmlFor="demo-profile-textbook" className="block text-sm font-semibold text-slate-800">
                    主要教材版本
                    <select
                      id="demo-profile-textbook"
                      value={profileTextbook}
                      onChange={(event) => setProfileTextbook(event.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">请选择主要教材版本</option>
                      {['人教版', '北师大版', '苏教版', '沪教版', '浙教版', '鲁教版', '其他版本'].map((textbook) => (
                        <option key={textbook}>{textbook}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              {activatedEdition === 'family' && (
                <label htmlFor="demo-profile-region" className="block text-sm font-semibold text-slate-800">
                  所在省份/地区
                  <select
                    id="demo-profile-region"
                    value={profileRegion}
                    onChange={(event) => setProfileRegion(event.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">请选择所在省份或地区</option>
                    {regionOptions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </label>
              )}
              <label htmlFor="demo-profile-context" className="block text-sm font-semibold text-slate-800">
                {activatedEdition === 'teacher' ? '任教学校' : '学校'}
                <input
                  id="demo-profile-context"
                  value={profileContext}
                  onChange={(event) => setProfileContext(event.target.value)}
                  placeholder={
                    activatedEdition === 'teacher'
                      ? '例如：实验中学'
                      : '可填写学校简称'
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border bg-slate-50 px-3 text-base outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
          </div>

          <DrawerFooter className="border-t bg-white px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3">
            <Button
              type="button"
              disabled={
                !profileNickname.trim() ||
                !profileGrade ||
                !profileContext.trim() ||
                (activatedEdition === 'family' &&
                  (!profileRegion.trim() ||
                    !profileSemester ||
                    !profileSubject ||
                    !profileTextbook)) ||
                (activatedEdition === 'teacher' &&
                  (!profileSubject || !profileTextbook))
              }
              onClick={completeProfile}
              className="h-12 w-full rounded-2xl text-base font-bold"
            >
              <Gift className="size-5" />
              完成建档并领取 100 积分
            </Button>
            <button
              type="button"
              onClick={onStartTour}
              className="min-h-10 w-full rounded-xl text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              暂时跳过，直接体验
            </button>
            <p className="text-center text-xs text-slate-400">
              稍后可在“设置”中继续完善档案
            </p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function ModuleLauncherHome({
  edition,
  onSelectMode,
  onOpenView,
}: {
  edition: Edition;
  onSelectMode: (modeId: ChatModeId) => void;
  onOpenView: (view: 'skills' | 'resources' | 'knowledge' | 'growth' | 'tasks') => void;
}) {
  const utilityModules =
    edition.id === 'family'
      ? [
          { label: '成长报告', hint: '查看学习变化', icon: BarChart3, view: 'growth' as const, style: 'bg-orange-50 text-orange-600' },
          { label: '我的知识库', hint: '生成与收藏', icon: LibraryBig, view: 'knowledge' as const, style: 'bg-violet-50 text-violet-600' },
          { label: '资源广场', hint: '发现优质资料', icon: Search, view: 'resources' as const, style: 'bg-cyan-50 text-cyan-600' },
          { label: '定时任务', hint: '复习和提醒', icon: CalendarClock, view: 'tasks' as const, style: 'bg-emerald-50 text-emerald-600' },
        ]
      : [
          { label: '技能广场', hint: '扩展教学能力', icon: Blocks, view: 'skills' as const, style: 'bg-violet-50 text-violet-600' },
          { label: '资源广场', hint: '共享教学资源', icon: Search, view: 'resources' as const, style: 'bg-cyan-50 text-cyan-600' },
          { label: '我的知识库', hint: '管理生成文件', icon: LibraryBig, view: 'knowledge' as const, style: 'bg-blue-50 text-blue-600' },
          { label: '定时任务', hint: '安排教学事务', icon: CalendarClock, view: 'tasks' as const, style: 'bg-amber-50 text-amber-600' },
        ];
  const primaryModes = edition.recommendedModes.map((modeId) => chatModes[modeId]);
  const moduleCardStyles: Record<ChatModeId, { surface: string; glow: string; arrow: string }> = {
    default: {
      surface: 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50',
      glow: 'bg-blue-300/30',
      arrow: 'text-blue-500',
    },
    photo: {
      surface: 'border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-cyan-100/80',
      glow: 'bg-cyan-300/35',
      arrow: 'text-blue-500',
    },
    homework: {
      surface: 'border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-100/70',
      glow: 'bg-fuchsia-300/30',
      arrow: 'text-violet-500',
    },
    mistakes: {
      surface: 'border-orange-200/80 bg-gradient-to-br from-orange-50 via-white to-amber-100/80',
      glow: 'bg-amber-300/35',
      arrow: 'text-orange-500',
    },
    practice: {
      surface: 'border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-100/80',
      glow: 'bg-teal-300/30',
      arrow: 'text-emerald-500',
    },
    lesson: {
      surface: 'border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-indigo-100/75',
      glow: 'bg-violet-300/35',
      arrow: 'text-violet-500',
    },
    courseware: {
      surface: 'border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-sky-100/80',
      glow: 'bg-sky-300/35',
      arrow: 'text-blue-500',
    },
    exam: {
      surface: 'border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-cyan-100/75',
      glow: 'bg-emerald-300/30',
      arrow: 'text-emerald-500',
    },
    notice: {
      surface: 'border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-orange-100/80',
      glow: 'bg-orange-300/30',
      arrow: 'text-amber-600',
    },
  };

  return (
    <main className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-100 px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-4 md:px-8 md:pt-6">
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <section className={`relative overflow-hidden rounded-[28px] p-5 text-white shadow-lg ${edition.id === 'teacher' ? 'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 shadow-violet-200' : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-200'}`}>
          <div aria-hidden="true" className="absolute -right-10 -top-14 size-36 rounded-full bg-white/10" />
          <div aria-hidden="true" className="absolute -bottom-16 right-16 size-28 rounded-full bg-white/10" />
          <div className="relative flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-[22px] bg-white/15 ring-1 ring-white/20">
              <img
                src="/brand/bingomate-owl.png"
                alt=""
                aria-hidden="true"
                width={56}
                height={56}
                className="size-14 object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-white/80">{edition.name}</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                {edition.id === 'teacher' ? '今天想完成什么教学任务？' : '今天想从哪里开始？'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                选择一个功能，直接进入对应的专属助手。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-slate-950">
            {edition.id === 'teacher' ? '教学工作台' : '学习工具'}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {primaryModes.map((module) => {
              const cardStyle = moduleCardStyles[module.id];
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => onSelectMode(module.id)}
                  className={`group relative min-h-[148px] overflow-hidden rounded-[24px] border p-4 text-left shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${cardStyle.surface}`}
                >
                  <span aria-hidden="true" className={`absolute -bottom-9 -right-8 size-24 rounded-full blur-2xl ${cardStyle.glow}`} />
                  <span className="relative block">
                    <ModeArt mode={module} className="size-12 drop-shadow-sm" iconClassName="size-6" />
                    <span className="mt-4 block text-base font-bold text-slate-950">{module.label}</span>
                    <span className="mt-1.5 block text-xs font-normal leading-relaxed text-slate-600">
                      {module.subtitle.split(' · ')[0]}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className={`absolute right-3 top-4 size-4 transition-transform group-hover:translate-x-0.5 ${cardStyle.arrow}`} />
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-slate-950">更多服务</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {utilityModules.map((module) => {
              const UtilityIcon = module.icon;
              return (
                <button
                  key={module.label}
                  type="button"
                  onClick={() => onOpenView(module.view)}
                  className="flex min-h-[88px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-[border-color,background-color,transform] hover:border-blue-200 hover:bg-blue-50/30 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${module.style}`}>
                    <UtilityIcon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900">{module.label}</span>
                    <span className="mt-1 block text-xs leading-snug text-slate-500">{module.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function ChatView({
  edition,
  onMenu,
  onDemo,
  moduleHomeDemo,
  onOpenModuleView,
  onCamera,
  onScheduleFromChat,
  onSaveGeneratedContent,
  installedSkills,
  photoConversation,
  resourceConversation,
  demoTourStep,
  onDemoTourNext,
  onDemoTourFinish,
  notify,
}: {
  edition: Edition;
  onMenu: () => void;
  onDemo: () => void;
  moduleHomeDemo: boolean;
  onOpenModuleView: (view: 'skills' | 'resources' | 'knowledge' | 'growth' | 'tasks') => void;
  onCamera: (request: string) => void;
  onScheduleFromChat: (text: string) => void;
  onSaveGeneratedContent: (item: KnowledgeItem) => void;
  installedSkills: Set<string>;
  photoConversation: PhotoConversation | null;
  resourceConversation: SharedResource | null;
  demoTourStep: number | null;
  onDemoTourNext: () => void;
  onDemoTourFinish: () => void;
  notify: (message: string) => void;
}) {
  const hasPhotoRequest = Boolean(photoConversation?.request.trim());
  const [messages, setMessages] = useState<Message[]>(() =>
    resourceConversation
      ? [
          {
            id: Date.now(),
            role: 'assistant',
            text: `已载入资源《${resourceConversation.title}》。${resourceConversation.summary}\n\n你希望怎样二次编辑？可以直接说要保留的部分和想修改的方向。`,
            followUps: [
              '保留结构，换一个主题',
              '把内容精简一些',
              '增加互动和练习环节',
              '根据我的需求重新生成',
            ],
          },
        ]
      : photoConversation
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
  const [previewFile, setPreviewFile] = useState<GeneratedFile | null>(null);
  const [quickSkillMode, setQuickSkillMode] = useState<ChatModeId | null>(null);
  const [quickPopoverLeft, setQuickPopoverLeft] = useState(0);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(models[0]);
  const [selectedChatSkill, setSelectedChatSkill] = useState<Skill | null>(null);
  const [moduleHomeOpen, setModuleHomeOpen] = useState(moduleHomeDemo);
  const [lastConversation, setLastConversation] =
    useState<SavedConversation | null>(null);
  const [savedKnowledgeMessages, setSavedKnowledgeMessages] = useState<
    Set<number>
  >(() => new Set());
  const [chatMode, setChatMode] = useState<ChatModeId>(
    photoConversation ? 'photo' : 'default',
  );
  const [showPhotoGuidance, setShowPhotoGuidance] = useState(
    Boolean(photoConversation && !hasPhotoRequest),
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quickSkillRailRef = useRef<HTMLDivElement>(null);
  const quickModeButtonRefs = useRef<
    Partial<Record<ChatModeId, HTMLButtonElement | null>>
  >({});
  const mode = chatModes[chatMode];
  const ModeIcon = mode.icon;
  const availableSkills = skills.filter(
    (skill) =>
      installedSkills.has(skill.id) &&
      (skill.edition === 'all' || skill.edition === edition.id),
  );
  const recommendedModes = edition.recommendedModes.map(
    (modeId) => chatModes[modeId],
  );
  const quickModes = [chatModes.default, ...recommendedModes];
  const currentSkillName = selectedChatSkill?.name ?? mode.label;
  const hasReferencedSkill = Boolean(selectedChatSkill) || chatMode !== 'default';
  const quickSuggestionMode = quickSkillMode
    ? chatModes[quickSkillMode]
    : null;
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

  useEffect(() => {
    setLastConversation(null);
    try {
      const saved = window.localStorage.getItem(
        `bingomate-last-conversation-${edition.id}`,
      );
      if (!saved) return;
      const parsed = JSON.parse(saved) as SavedConversation;
      if (parsed?.modeId && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        setLastConversation(parsed);
      }
    } catch {
      // Ignore incomplete demo data and keep the home page usable.
    }
  }, [edition.id]);

  useEffect(() => {
    if (messages.length === 0) return;
    const nextConversation: SavedConversation = {
      modeId: chatMode,
      messages,
      updatedAt: '刚刚',
    };
    window.localStorage.setItem(
      `bingomate-last-conversation-${edition.id}`,
      JSON.stringify(nextConversation),
    );
    setLastConversation(nextConversation);
  }, [chatMode, edition.id, messages]);

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
    setModuleHomeOpen(false);
    setChatMode(nextMode);
    setSelectedChatSkill(null);
    setQuickSkillMode(null);
    setShowPhotoGuidance(false);
  };

  const selectInstalledSkill = (skill: Skill) => {
    setChatMode('default');
    setSelectedChatSkill(skill);
    setQuickSkillMode(null);
    setShowPhotoGuidance(false);
  };

  const clearReferencedSkill = () => {
    const removedSkillName = currentSkillName;
    setChatMode('default');
    setSelectedChatSkill(null);
    setQuickSkillMode(null);
    setShowPhotoGuidance(false);
    inputRef.current?.focus();
    notify(`已移除技能：${removedSkillName}`);
  };

  const positionQuickSkillPopover = (
    nextMode: ChatModeId,
    trigger?: HTMLButtonElement | null,
  ) => {
    const rail = quickSkillRailRef.current;
    const anchor = trigger ?? quickModeButtonRefs.current[nextMode];
    if (!rail || !anchor) return;

    const railRect = rail.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const popoverWidth = Math.min(280, railRect.width);
    const centeredLeft =
      anchorRect.left -
      railRect.left +
      anchorRect.width / 2 -
      popoverWidth / 2;
    setQuickPopoverLeft(
      Math.max(0, Math.min(centeredLeft, railRect.width - popoverWidth)),
    );
  };

  const activateQuickMode = (
    nextMode: ChatModeId,
    trigger?: HTMLButtonElement | null,
  ) => {
    const shouldClose = nextMode === 'default' || quickSkillMode === nextMode;
    setChatMode(nextMode);
    setSelectedChatSkill(null);
    setShowPhotoGuidance(false);
    if (shouldClose) {
      setQuickSkillMode(null);
      return;
    }
    positionQuickSkillPopover(nextMode, trigger);
    setQuickSkillMode(nextMode);
  };

  const applySuggestion = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const resumeLastConversation = () => {
    if (!lastConversation) return;
    setModuleHomeOpen(false);
    setChatMode(lastConversation.modeId);
    setSelectedChatSkill(null);
    setQuickSkillMode(null);
    setMessages(lastConversation.messages);
    notify('已继续上次聊天');
  };

  const buildGeneratedFile = (
    format: ExportFormat,
    exportKind: ExportKind,
  ): GeneratedFile => {
    const courseware = exportKind === 'courseware';
    const practice = exportKind === 'practice';
    const extension = format === 'PDF' ? 'pdf' : format === 'PPT' ? 'pptx' : 'docx';
    return {
      format,
      name: `${practice ? '智能练习' : courseware ? '课件大纲' : '教案初稿'}.${extension}`,
      size: format === 'PPT' ? '2.4 MB' : format === 'PDF' ? '860 KB' : '1.1 MB',
      title: practice ? '智能练习' : courseware ? '课件大纲' : '课堂教案',
      sections: practice
        ? [
            { heading: '基础理解', content: '用自己的话说明核心知识点，并完成一道直接应用题。' },
            { heading: '方法练习', content: '按照关键步骤完成两道练习，并写出必要过程。' },
            { heading: '综合应用', content: '将所学方法迁移到一个新情境中解决问题。' },
            { heading: '答案提示', content: '先独立作答，再根据分步提示检查思路和结果。' },
          ]
        : courseware
        ? [
            { heading: '01 课程导入', content: '从真实情境出发，提出本课的核心问题。' },
            { heading: '02 核心讲解', content: '分步展示概念、方法和典型案例。' },
            { heading: '03 课堂互动', content: '通过思考题、合作任务和即时练习巩固理解。' },
            { heading: '04 总结迁移', content: '回顾重点，引导学生将方法迁移到新情境。' },
          ]
        : [
            { heading: '教学目标', content: '理解核心概念，掌握关键方法，并能进行初步迁移应用。' },
            { heading: '教学重点', content: '核心概念的建立、关键步骤的表达与常见问题的辨析。' },
            { heading: '教学流程', content: '情境导入 → 问题探究 → 合作练习 → 归纳小结。' },
            { heading: '课后任务', content: '完成基础巩固任务，并尝试一项拓展应用。' },
          ],
    };
  };

  const selectExportFormat = (
    messageId: number,
    format: ExportFormat,
    exportKind: ExportKind,
  ) => {
    const file = buildGeneratedFile(format, exportKind);
    const sourceMode = chatModes[exportKind];
    const userMessageId = messageId + 1;
    setMessages((current) => [
      ...current.map((message) =>
        message.id === messageId
          ? { ...message, exportOptions: undefined }
          : message,
      ),
      { id: userMessageId, role: 'user', text: `导出为 ${format}` },
    ]);
    setSending(true);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: userMessageId + 1,
          role: 'assistant',
          text: `已生成 ${format} 格式的演示文件，可以先预览内容，再下载到本地。`,
          modeId: exportKind,
          generatedFile: file,
          followUps: sourceMode.followUps,
        },
      ]);
      setSending(false);
    }, 650);
  };

  const downloadGeneratedFile = (file: GeneratedFile) => {
    const content = [
      file.title,
      '',
      ...file.sections.flatMap((section) => [section.heading, section.content, '']),
    ].join('\n');
    const blob = new Blob(['\ufeff', content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    notify(`${file.name} 已开始下载`);
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

  const createSimulatedReply = (
    modeId: ChatModeId,
    request: string,
    skill: Skill | null,
  ) => {
    const requestTitle = request.split('\n')[0].slice(0, 36) || '当前任务';

    if (skill?.id === 'focus-timer') {
      return `已根据“${requestTitle}”生成专注计划：\n\n【任务拆分】5 分钟整理材料，25 分钟集中完成核心任务，5 分钟检查，10 分钟订正与总结。\n【专注规则】计时期间只保留当前材料，遇到卡点先做标记，不立即切换任务。\n【完成标准】核心任务已完成，遗留问题已记录，并用一句话写下今日收获。`;
    }

    if (skill) {
      return `已调用“${skill.name}”处理“${requestTitle}”：\n\n【结果摘要】已完成初步分析并生成可继续编辑的内容框架。\n【已完成】${skill.capabilities.slice(0, 3).join('；')}。\n【下一步】可以补充使用场景、目标或限制条件，我会继续完善结果。`;
    }

    switch (modeId) {
      case 'photo':
        return `已针对“${requestTitle}”完成题目分析（演示）：\n\n【题目信息】需要从已知条件中找到关键数量关系，再确定所求目标。\n【关键突破】先把题目条件转换成可计算或可推理的表达式。\n【解题路径】整理条件 → 选择方法 → 分步求解 → 回代检查。\n【下一步提示】试着先写出第一个能由已知条件直接得到的关系式。`;
      case 'homework':
        return `已针对“${requestTitle}”完成初步批阅（演示）：\n\n【批阅摘要】整体思路基本正确，核心知识已初步掌握，但部分步骤表达不够完整。\n【典型问题】忽略限定条件；中间步骤跳跃；完成后没有回代检查。\n【错因判断】主要属于解题流程不稳定，而不是核心概念完全不理解。\n【改进建议】订正时用“条件—方法—结果—检查”四步法重写一遍。`;
      case 'mistakes':
        return `已针对“${requestTitle}”生成错题复习结果（演示）：\n\n【错题归因】概念边界不清、关键条件遗漏、计算或表达步骤不完整。\n【当前掌握】能够识别题型，但还不能稳定独立完成，建议掌握度暂记为 68%。\n【复习安排】今天重做原题，明天完成一道变式题，三天后无提示自测。\n【达标标准】能说明原错因，并连续独立做对两道同类题。`;
      case 'practice': {
        const english = /英语|语法|单词|English/i.test(request);
        return english
          ? `已针对“${requestTitle}”生成一组练习（演示）：\n\n1. Choose the correct form: She ___ to school every day. (go / goes)\n2. Complete the sentence: We have lived here ___ three years.\n3. Rewrite the sentence using the requested grammar structure.\n4. Read a short paragraph and identify its main idea.\n\n【答案提示】先完成作答，再点击下方“查看答案解析”。`
          : `已针对“${requestTitle}”生成一组练习（演示）：\n\n1. 用自己的话说明这个知识点的核心含义。\n2. 完成一道直接应用基本方法的题目。\n3. 比较两种解法，并说明哪种更简洁。\n4. 将知识点迁移到一个新情境中完成综合应用。\n\n【作答建议】先独立完成，再查看答案和解析。`;
      }
      case 'lesson':
        return `已围绕“${requestTitle}”生成教案初稿：\n\n【教学目标】帮助学生理解核心概念，并能在典型情境中进行应用。\n【教学重点】核心概念、关键方法与实际迁移。\n【教学流程】情境导入 → 问题探究 → 合作练习 → 归纳小结。\n【课堂提问】你观察到了什么？关键条件是什么？还有其他方法吗？\n【课后任务】完成基础巩固，并尝试一项拓展应用。\n\n你希望将这份教案导出为什么格式？`;
      case 'courseware':
        return `已围绕“${requestTitle}”生成课件大纲：\n\n01 封面：课程主题与学习目标\n02 情境导入：用图片或问题引出本课主题\n03 核心讲解：分步呈现概念、方法和典型示例\n04 对比辨析：呈现常见问题与改正方法\n05 课堂互动：设置思考题、小组任务和即时练习\n06 小结与任务：回顾重点并布置课后任务\n\n你希望将这份课件导出为什么格式？`;
      case 'exam':
        return `已围绕“${requestTitle}”生成试卷初稿（演示）：\n\n一、基础题\n1. 请写出本单元核心概念的完整表述。\n2. 判断下列说法是否正确，并说明理由。\n\n二、理解与应用\n3. 根据给定条件完成分步推理，写出关键过程。\n4. 在新情境中选择合适方法解决问题。\n\n【参考答案】基础题考查概念准确性；应用题按关键步骤分层给分。`;
      case 'notice':
        return `已围绕“${requestTitle}”完成通知初稿：\n\n【班级通知】\n各位家长您好：\n\n班级近期将开展相关教学活动，请您提前做好准备，并留意班级后续发布的时间、地点及携带材料。如有特殊情况，请及时与老师联系。\n\n感谢您的理解与配合！\n班级教师\n\n【待补充】具体时间、地点、参与对象和准备材料。`;
      default:
        return edition.id === 'teacher'
          ? `已围绕“${requestTitle}”整理了一份教学任务方案：\n\n【任务目标】明确本次要产出的教学内容和实际使用场景。\n【处理步骤】梳理需求 → 生成初稿 → 核对教学条件 → 完善并导出。\n【当前结果】已形成可继续编辑的内容框架，可以转到教案、课件、组卷或通知技能继续处理。`
          : `已围绕“${requestTitle}”整理了一份学习方案：\n\n【学习目标】先理解核心概念，再通过练习确认是否真正掌握。\n【建议步骤】回顾已知 → 找出卡点 → 分步练习 → 独立复述。\n【今日任务】完成一次无提示作答，记录一个错因，再做一道同类题。`;
    }
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
    const simulatedReply = createSimulatedReply(
      chatMode,
      messageText,
      selectedChatSkill,
    );
    const exportKind: ExportKind | undefined =
      chatMode === 'lesson' ||
      chatMode === 'courseware' ||
      chatMode === 'practice'
        ? chatMode
        : undefined;
    const exportOptions: ExportFormat[] | undefined =
      exportKind === 'practice'
        ? ['PDF', 'Word']
        : exportKind
          ? ['PDF', 'PPT', 'Word']
          : undefined;
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
            : simulatedReply,
          modeId: chatMode,
          exportOptions,
          exportKind,
          followUps: exportKind ? undefined : mode.followUps,
        },
      ]);
      setSending(false);
    }, 650);
  };

  if (moduleHomeOpen) {
    return (
      <>
        <Header
          title="缤果学伴"
          subtitle={edition.shortName}
          onMenu={onMenu}
          brandMark={
            <img
              src="/brand/bingomate-owl.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="size-11 shrink-0 object-contain"
            />
          }
          right={
            <button
              aria-label="打开演示中心"
              onClick={onDemo}
              className="flex min-h-10 items-center gap-1 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 px-2 text-[11px] font-bold text-orange-700 ring-1 ring-orange-100 transition-[transform,background-color] active:scale-95"
            >
              <GraduationCap aria-hidden="true" className="size-4" />
              演示
            </button>
          }
        />
        <ModuleLauncherHome
          edition={edition}
          onSelectMode={selectMode}
          onOpenView={onOpenModuleView}
        />
      </>
    );
  }

  return (
    <>
      <Header
        title={mode.name}
        subtitle={
          chatMode === 'default'
            ? edition.shortName
            : mode.subtitle
        }
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
            <ModeArt
              mode={mode}
              className="size-11 shrink-0 drop-shadow-sm"
              iconClassName="size-5"
            />
          )
        }
        right={
          <div className="flex items-center gap-1.5">
            {moduleHomeDemo && (
              <button
                aria-label="返回模块首页"
                onClick={() => setModuleHomeOpen(true)}
                className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-[transform,background-color] hover:bg-blue-100 active:scale-95"
              >
                <Blocks aria-hidden="true" className="size-4.5" />
              </button>
            )}
            {chatMode === 'default' && (
              <button
                aria-label="打开演示中心"
                onClick={onDemo}
                className="flex min-h-10 items-center gap-1 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 px-2 text-[11px] font-bold text-orange-700 ring-1 ring-orange-100 transition-[transform,background-color] active:scale-95"
              >
                <GraduationCap aria-hidden="true" className="size-4" />
                演示
              </button>
            )}
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
                <p className="whitespace-pre-line">{message.text}</p>
                {message.exportOptions && (
                  <div className="mt-3 border-t pt-3">
                    <p className="mb-2 text-xs font-semibold text-slate-600">
                      选择输出格式
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {message.exportOptions.map((format) => {
                        const FormatIcon =
                          format === 'PPT' ? Presentation : FileText;
                        return (
                          <button
                            key={format}
                            onClick={() =>
                              message.exportKind &&
                              selectExportFormat(
                                message.id,
                                format,
                                message.exportKind,
                              )
                            }
                            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border border-blue-100 bg-blue-50 px-2 font-bold text-blue-700 transition-[background-color,transform] hover:bg-blue-100 active:scale-[.97]"
                          >
                            <FormatIcon className="size-4" />
                            <span className="text-xs">{format}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {message.generatedFile && (
                  <section className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
                        {message.generatedFile.format === 'PPT' ? (
                          <Presentation className="size-5" />
                        ) : (
                          <FileText className="size-5" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-slate-900">
                          {message.generatedFile.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {message.generatedFile.format} · {message.generatedFile.size} · 演示文件
                        </span>
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPreviewFile(message.generatedFile ?? null)}
                        className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border bg-white px-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <Eye className="size-4" />
                        预览
                      </button>
                      <button
                        onClick={() =>
                          message.generatedFile &&
                          downloadGeneratedFile(message.generatedFile)
                        }
                        className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-bold text-white transition-[background-color,transform] hover:bg-blue-700 active:scale-[.97]"
                      >
                        <Download className="size-4" />
                        下载
                      </button>
                    </div>
                    <div className="mt-2 border-t border-slate-200 pt-2">
                      <button
                        disabled={savedKnowledgeMessages.has(message.id)}
                        onClick={() => {
                          const generatedFile = message.generatedFile;
                          if (!generatedFile) return;
                          onSaveGeneratedContent({
                            id: `chat-generated-${message.id}`,
                            title: generatedFile.name,
                            summary: generatedFile.sections
                              .map((section) => section.heading)
                              .join('、'),
                            source: 'generated',
                            kind: generatedFile.format,
                            meta: edition.shortName,
                            createdAt: '刚刚保存',
                          });
                          setSavedKnowledgeMessages((current) =>
                            new Set(current).add(message.id),
                          );
                        }}
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 text-xs font-bold text-blue-700 transition-colors hover:bg-blue-100 disabled:border-emerald-100 disabled:bg-emerald-50 disabled:text-emerald-700"
                      >
                        {savedKnowledgeMessages.has(message.id) ? (
                          <Check aria-hidden="true" className="size-4" />
                        ) : (
                          <Database aria-hidden="true" className="size-4" />
                        )}
                        {savedKnowledgeMessages.has(message.id)
                          ? '已存入知识库'
                          : '存入知识库'}
                      </button>
                    </div>
                  </section>
                )}
                {message.followUps && message.followUps.length > 0 && (
                  <div className="mt-3 border-t pt-3">
                    <p className="mb-2 text-xs font-semibold text-slate-500">
                      你还可以继续问
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.followUps.map((question) => (
                        <button
                          key={question}
                          onClick={() => {
                            if (message.modeId) {
                              setChatMode(message.modeId);
                              setSelectedChatSkill(null);
                            }
                            applySuggestion(question);
                          }}
                          className="min-h-10 rounded-xl border border-blue-100 bg-blue-50/70 px-3 text-left text-xs font-normal text-blue-700 transition-[background-color,transform] hover:bg-blue-100 active:scale-[.98]"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                  className="flex min-h-12 items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-3 text-left text-xs font-normal text-blue-800 transition-[background-color,transform] hover:bg-blue-100 active:scale-[.98]"
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
                  <span
                    className={`absolute -right-10 -top-2 whitespace-nowrap rounded-2xl px-2.5 py-1 text-[10px] font-bold leading-4 text-white shadow-sm ${edition.id === 'teacher' ? 'bg-violet-600 shadow-violet-200' : 'bg-blue-600 shadow-blue-200'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-3 size-2 rotate-45 ${edition.id === 'teacher' ? 'bg-violet-600' : 'bg-blue-600'}`}
                    />
                    <span className="relative">{edition.shortName}</span>
                  </span>
                </span>
              ) : (
                <ModeArt
                  mode={mode}
                  className="size-[88px] drop-shadow-[0_12px_20px_rgba(37,99,235,.18)]"
                  iconClassName="size-10"
                />
              )}
              <h2 className="mt-5 text-[28px] font-bold tracking-tight">
                {chatMode === 'default' ? edition.homeHeadline : mode.headline}
              </h2>
              <p
                className={`mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm ${chatMode === 'default' ? 'px-2 sm:whitespace-nowrap' : 'px-2'}`}
              >
                {chatMode === 'default'
                  ? edition.homeDescription
                  : mode.description}
              </p>
              {chatMode === 'default' && !selectedChatSkill && (
                <p className="mt-7 w-full max-w-[360px] text-left text-xs font-semibold text-muted-foreground md:max-w-2xl">
                  推荐技能
                </p>
              )}
              <div
                className={`grid w-full max-w-[360px] gap-2.5 md:max-w-2xl md:grid-cols-2 ${edition.id === 'teacher' && chatMode === 'default' ? 'grid-cols-2' : 'grid-cols-1'} ${chatMode === 'default' && !selectedChatSkill ? 'mt-2' : 'mt-7'}`}
              >
                {chatMode === 'default'
                  ? recommendedModes.map((recommendedMode) => (
                      <button
                        key={recommendedMode.id}
                        onClick={() => selectMode(recommendedMode.id)}
                        className={`flex items-center rounded-2xl border bg-card text-left text-sm font-semibold transition-[border-color,background-color,transform] duration-200 hover:border-blue-200 hover:bg-blue-50/40 active:scale-[.98] ${edition.id === 'teacher' ? 'min-h-[58px] gap-2.5 px-3 shadow-none' : 'min-h-[64px] gap-3 px-4 shadow-sm'}`}
                      >
                        <ModeArt
                          mode={recommendedMode}
                          className={`${edition.id === 'teacher' ? 'size-10 rounded-xl' : 'size-12 drop-shadow-sm'} shrink-0`}
                          iconClassName="size-6"
                        />
                        <span className="min-w-0 leading-tight">
                          {recommendedMode.label}
                        </span>
                        {edition.id !== 'teacher' && (
                          <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                        )}
                      </button>
                    ))
                  : mode.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => applySuggestion(suggestion)}
                        className="flex min-h-[54px] items-center gap-3 rounded-2xl border bg-card px-5 text-left text-sm font-normal shadow-sm transition-[border-color,background-color,transform] duration-200 hover:border-blue-200 hover:bg-blue-50/40 active:scale-[.98]"
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
              {chatMode === 'default' &&
                !selectedChatSkill &&
                lastConversation && (
                  <div className="mt-4 w-full max-w-[360px] text-left md:max-w-2xl">
                    <p className="mb-2 text-xs font-semibold text-muted-foreground">
                      继续上次聊天
                    </p>
                    <button
                      type="button"
                      onClick={resumeLastConversation}
                      className="flex min-h-[62px] w-full items-center gap-3 rounded-2xl border border-blue-100 bg-white px-3.5 text-left shadow-sm transition-[border-color,background-color,transform] hover:border-blue-200 hover:bg-blue-50/40 active:scale-[.98]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                        <History aria-hidden="true" className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-900">
                          {lastConversation.messages
                            .filter((message) => message.role === 'user')
                            .slice(-1)[0]?.text ?? '继续最近的对话'}
                        </span>
                        <span className="mt-1 block text-xs font-normal text-slate-500">
                          {chatModes[lastConversation.modeId].label} · {lastConversation.updatedAt}
                        </span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-slate-400"
                      />
                    </button>
                  </div>
                )}
            </div>
          )}
          </div>
        </div>
        <div className="shrink-0 bg-background/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:px-8 md:pb-5">
          {messages.length > 0 && (
            <div className="mx-auto mb-2 w-full max-w-4xl">
              <div className="relative">
                <div
                  ref={quickSkillRailRef}
                  aria-label="对话中快捷技能"
                  className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {quickModes.map((quickMode) => {
                    const active =
                      !selectedChatSkill && chatMode === quickMode.id;
                    return (
                      <button
                        key={quickMode.id}
                        ref={(node) => {
                          quickModeButtonRefs.current[quickMode.id] = node;
                        }}
                        aria-pressed={active}
                        aria-expanded={quickSkillMode === quickMode.id}
                        onClick={(event) =>
                          activateQuickMode(quickMode.id, event.currentTarget)
                        }
                        className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-[border-color,background-color,transform] active:scale-[.97] ${active ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                      >
                        <ModeArt
                          mode={quickMode}
                          className="size-6 shrink-0 rounded-lg"
                          iconClassName="size-3.5"
                        />
                        {quickMode.label}
                      </button>
                    );
                  })}
                </div>
                {quickSuggestionMode &&
                  quickSuggestionMode.suggestions.length > 0 && (
                    <section
                      role="menu"
                      aria-label={`${quickSuggestionMode.label}快捷提示`}
                      style={{ left: quickPopoverLeft }}
                      className="absolute bottom-[calc(100%+8px)] z-30 w-[min(280px,100%)] rounded-2xl border border-blue-100 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,.16)]"
                    >
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <ModeArt
                          mode={quickSuggestionMode}
                          className="size-7 shrink-0 rounded-lg"
                          iconClassName="size-3.5"
                        />
                        <div className="min-w-0 text-left">
                          <p className="truncate text-xs font-bold text-slate-900">
                            {quickSuggestionMode.label}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            选择一条提示词
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 space-y-1">
                        {quickSuggestionMode.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            role="menuitem"
                            onClick={() => {
                              applySuggestion(suggestion);
                              setQuickSkillMode(null);
                            }}
                            className="flex min-h-11 w-full items-center rounded-xl px-3 py-2 text-left text-xs font-normal leading-relaxed text-slate-700 transition-[background-color,transform] hover:bg-blue-50 hover:text-blue-700 active:scale-[.98]"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
              </div>
            </div>
          )}
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
            <div className="flex min-w-0 items-start gap-1.5 px-1">
              {hasReferencedSkill && (
                <span
                  className="mt-0.5 max-w-[46%] shrink-0 rounded-[11px] bg-gradient-to-r from-blue-500 via-violet-400 to-emerald-400 p-px"
                  title={currentSkillName}
                >
                  <span className="flex min-h-8 items-center rounded-[10px] bg-white pl-2 text-sm font-normal leading-5 text-slate-900">
                    <Sparkles
                      aria-hidden="true"
                      className="mr-1 size-3.5 shrink-0 text-blue-600"
                    />
                    <span className="min-w-0 truncate whitespace-nowrap">
                      {currentSkillName}
                    </span>
                    <button
                      type="button"
                      aria-label={`移除技能${currentSkillName}`}
                      onClick={clearReferencedSkill}
                      className="relative grid size-8 shrink-0 place-items-center rounded-[9px] text-slate-600 transition-colors after:absolute after:-inset-1.5 after:content-[''] hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                    >
                      <X aria-hidden="true" className="size-4" />
                    </button>
                  </span>
                </span>
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
                placeholder={
                  chatMode === 'default'
                    ? edition.homePlaceholder
                    : mode.placeholder
                }
                rows={1}
                className="min-h-10 min-w-0 flex-1 resize-none bg-transparent py-2 text-sm leading-5 text-slate-950 outline-none placeholder:text-slate-500"
              />
            </div>
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
                title="拍题"
                onClick={() => onCamera(input)}
                className="grid h-11 w-14 shrink-0 touch-manipulation place-items-center rounded-full bg-slate-100 text-blue-700 transition-[transform,background-color] duration-200 ease-out hover:bg-slate-200 active:scale-[.97] motion-reduce:transform-none"
              >
                <Camera className="size-5 stroke-[2.2]" />
              </button>
              <button
                aria-label={`选择技能，当前为${currentSkillName}`}
                aria-haspopup="dialog"
                aria-expanded={skillSheetOpen}
                onClick={() => setSkillSheetOpen(true)}
                className={`flex min-h-11 max-w-36 items-center gap-1.5 rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-950 transition-[background-color,box-shadow] hover:bg-slate-200 ${demoTourStep === 0 ? 'relative z-[70] ring-4 ring-orange-300 shadow-lg' : ''}`}
              >
                {selectedChatSkill ? (
                  <SkillArt
                    skill={selectedChatSkill}
                    className="size-5 shrink-0 rounded-md"
                    iconClassName="size-3.5"
                  />
                ) : (
                  <ModeArt
                    mode={mode}
                    className="size-5 shrink-0 rounded-md"
                    iconClassName="size-3.5"
                  />
                )}
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
                    <ModeArt
                      mode={recommendedMode}
                      className="size-11 shrink-0"
                      iconClassName="size-5"
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
                    <SkillArt
                      skill={skill}
                      className="size-11 shrink-0 rounded-2xl"
                      iconClassName="size-5"
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
      <Drawer
        open={Boolean(previewFile)}
        onOpenChange={(open) => {
          if (!open) setPreviewFile(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[680px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(88dvh,760px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="pr-12 text-xl font-bold">
              文件预览
            </DrawerTitle>
            <DrawerDescription className="text-left">
              {previewFile?.name ?? '生成的教学文件'}
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭文件预览"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          {previewFile && (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-slate-100 px-4 py-4 sm:px-6">
                <article className="mx-auto min-h-full max-w-xl rounded-2xl bg-white px-6 py-7 shadow-sm sm:px-10 sm:py-9">
                  <div className="border-b pb-5 text-center">
                    <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
                      BINGOMATE 教学助手
                    </p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                      {previewFile.title}
                    </h2>
                    <p className="mt-2 text-xs text-slate-500">
                      AI 生成初稿 · 请根据实际教学情况调整
                    </p>
                  </div>
                  <div className="mt-6 space-y-6">
                    {previewFile.sections.map((section, index) => (
                      <section key={section.heading}>
                        <div className="flex items-center gap-3">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-blue-700">
                            {index + 1}
                          </span>
                          <h3 className="font-bold text-slate-900">
                            {section.heading}
                          </h3>
                        </div>
                        <p className="mt-2 pl-10 text-sm leading-7 text-slate-600">
                          {section.content}
                        </p>
                      </section>
                    ))}
                  </div>
                </article>
              </div>
              <DrawerFooter className="border-t bg-white px-5 pb-[max(18px,env(safe-area-inset-bottom))] pt-3">
                <Button
                  onClick={() => downloadGeneratedFile(previewFile)}
                  className="h-12 w-full rounded-2xl text-base font-bold"
                >
                  <Download className="size-5" />
                  下载 {previewFile.format} 文件
                </Button>
              </DrawerFooter>
            </>
          )}
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
            <IconBox icon={CircleAlert} color="bg-amber-100 text-amber-700" />
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
  const [sharedResources, setSharedResources] = useState<SharedResource[]>(
    initialSharedResources,
  );
  const [selectedResource, setSelectedResource] =
    useState<SharedResource | null>(null);
  const [resourceReturnView, setResourceReturnView] = useState<
    'resources' | 'knowledge'
  >('resources');
  const [favoriteResources, setFavoriteResources] = useState<Set<string>>(
    () => new Set(['interactive-lesson-template']),
  );
  const [resourceConversation, setResourceConversation] =
    useState<SharedResource | null>(null);
  const [generatedKnowledgeItems, setGeneratedKnowledgeItems] = useState<
    KnowledgeItem[]
  >([
    {
      id: 'generated-study-plan',
      title: '一次函数复习方案.pdf',
      summary: '复习目标、任务拆分、错题巩固安排',
      source: 'generated',
      kind: 'PDF',
      meta: '家庭版',
      createdAt: '今天 10:20',
    },
  ]);
  const [uploadedKnowledgeItems, setUploadedKnowledgeItems] = useState<
    KnowledgeItem[]
  >([]);
  const [installedSkills, setInstalledSkills] = useState<Set<string>>(
    () => new Set(['focus-timer']),
  );
  const [toast, setToast] = useState('');
  const [conversationKey, setConversationKey] = useState(0);
  const [points, setPoints] = useState(1280);
  const [profiles, setProfiles] = useState<Record<EditionId, UserProfile>>({
    family: {
      nickname: '林小满',
      region: '',
      grade: '八年级',
      semester: '',
      school: '',
      textbook: '',
      focusSubject: '数学',
      weakTopics: '',
      learningGoal: '',
      guidanceStyle: '先启发思考，再给完整解析',
      dailyStudyTime: '',
      encouragementStyle: '',
      reportFrequency: '',
      teachingExperience: '',
      classLevel: '',
      isHeadTeacher: '',
      coursewareStyle: '',
    },
    teacher: {
      nickname: '林老师',
      region: '',
      grade: '八年级',
      semester: '',
      school: '',
      textbook: '',
      focusSubject: '数学',
      weakTopics: '',
      learningGoal: '',
      guidanceStyle: '先给教学目标，再展开分环节流程',
      dailyStudyTime: '',
      encouragementStyle: '',
      reportFrequency: '',
      teachingExperience: '8—15 年',
      classLevel: '普通班',
      isHeadTeacher: '否',
      coursewareStyle: '简约清晰',
    },
  });
  const [profilesCompleted, setProfilesCompleted] = useState<
    Record<EditionId, boolean>
  >({ family: false, teacher: false });
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
      code: 'BC-92A1-4KM8Q',
      online: true,
    },
    {
      id: 'study-room',
      name: '书房 BingoMate',
      code: 'BC-51F7-9PXT2',
      online: true,
    },
    {
      id: 'living-room',
      name: '客厅 BingoMate',
      code: 'BC-30D6-6WRN5',
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
  const [currentEdition, setCurrentEdition] = useState<EditionId>('family');
  const [ownedEditions, setOwnedEditions] = useState<Set<EditionId>>(
    () => new Set<EditionId>(['family']),
  );
  const [editionSwitcherOpen, setEditionSwitcherOpen] = useState(false);
  const [upgradeTarget, setUpgradeTarget] = useState<EditionId | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState('popular');
  const [demoStage, setDemoStage] = useState<DemoStage>(null);
  const [demoTourStep, setDemoTourStep] = useState(0);
  const [moduleHomeDemo, setModuleHomeDemo] = useState(false);
  const [showEditionUpgradeHint, setShowEditionUpgradeHint] = useState(false);
  const [hasShownEditionUpgradeHint, setHasShownEditionUpgradeHint] =
    useState(false);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2300);
  };
  const chooseFeature = (label: string) => {
    if (label === '成长报告') {
      setMenuOpen(false);
      setPhotoStep(null);
      setSelectedSkill(null);
      setSelectedResource(null);
      setView('growth');
      return;
    }
    setMenuOpen(false);
    if (label === '技能广场') {
      setPhotoStep(null);
      setSelectedSkill(null);
      setSelectedResource(null);
      setView('skills');
      return;
    }
    if (label === '资源广场') {
      setPhotoStep(null);
      setSelectedSkill(null);
      setSelectedResource(null);
      setView('resources');
      return;
    }
    if (label === '我的知识库') {
      setPhotoStep(null);
      setSelectedSkill(null);
      setSelectedResource(null);
      setView('knowledge');
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
    setSelectedResource(null);
    setPhotoStep(null);
    setPhotoConversation(null);
    setResourceConversation(null);
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
  const saveProfile = (profile: UserProfile) => {
    const copy = profileCopy[currentEdition];
    setProfiles((current) => ({ ...current, [currentEdition]: profile }));
    if (!profilesCompleted[currentEdition]) {
      setProfilesCompleted((current) => ({
        ...current,
        [currentEdition]: true,
      }));
      setPoints((current) => current + 100);
      setPointTransactions((current) => [
        {
          id: `profile-reward-${Date.now()}`,
          title: copy.rewardTitle,
          detail: copy.rewardDetail,
          time: '刚刚',
          amount: 100,
        },
        ...current,
      ]);
      notify(copy.rewardMessage);
    } else {
      notify(copy.savedMessage);
    }
    setView('settings');
  };
  const saveTutoringPreferences = (preferences: TutoringPreferences) => {
    setTutoringPreferences(preferences);
    setProfiles((current) => ({
      ...current,
      family: { ...current.family, guidanceStyle: preferences.guidanceMode },
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
    activatedEdition?: EditionId,
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
    if (activatedEdition) {
      setOwnedEditions((current) =>
        new Set(current).add(activatedEdition),
      );
      setCurrentEdition(activatedEdition);
    }
    notify(
      activatedEdition
        ? `${editions[activatedEdition].shortName}激活成功，设备已连接`
        : '设备绑定成功，已设为当前连接设备',
    );
  };

  const completeOnboardingProfile = (
    editionId: EditionId,
    profile: {
      nickname: string;
      grade: string;
      context: string;
      region?: string;
      semester?: string;
      focusSubject?: string;
      textbook?: string;
    },
  ) => {
    const firstCompletion = !profilesCompleted[editionId];
    setProfiles((current) => ({
      ...current,
      [editionId]: {
        ...current[editionId],
        nickname: profile.nickname,
        grade: profile.grade,
        ...(profile.semester ? { semester: profile.semester } : {}),
        ...(profile.focusSubject
          ? { focusSubject: profile.focusSubject }
          : {}),
        ...(profile.textbook ? { textbook: profile.textbook } : {}),
        ...(editionId === 'teacher'
          ? { school: profile.context }
          : {
              region: profile.region ?? current[editionId].region,
              school: profile.context,
            }),
      },
    }));
    setProfilesCompleted((current) => ({
      ...current,
      [editionId]: true,
    }));
    if (firstCompletion) {
      setPoints((current) => current + 100);
      setPointTransactions((current) => [
        {
          id: `onboarding-profile-${Date.now()}`,
          title: profileCopy[editionId].rewardTitle,
          detail: profileCopy[editionId].rewardDetail,
          time: '刚刚',
          amount: 100,
        },
        ...current,
      ]);
    }
    notify(
      firstCompletion
        ? `${profileCopy[editionId].title}已建立，100 积分已到账`
        : `${profileCopy[editionId].title}已更新`,
    );
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
    notify(
      skill.price
        ? `“${skill.name}”已购买并安装，可在聊天中使用`
        : `“${skill.name}”已安装，可在聊天中使用`,
    );
  };

  const toggleFavoriteResource = (resource: SharedResource) => {
    const currentlyFavorited = favoriteResources.has(resource.id);
    setFavoriteResources((current) => {
      const next = new Set(current);
      if (next.has(resource.id)) next.delete(resource.id);
      else next.add(resource.id);
      return next;
    });
    notify(currentlyFavorited ? '已取消收藏' : '资源已收藏');
  };

  const publishResource = (resource: SharedResource) => {
    setSharedResources((current) => [resource, ...current]);
  };

  const editResourceInChat = (resource: SharedResource) => {
    setResourceConversation(resource);
    setSelectedResource(null);
    setSelectedSkill(null);
    setPhotoConversation(null);
    setPhotoStep(null);
    setView('chat');
    setConversationKey((key) => key + 1);
    notify(`已载入《${resource.title}》，可以继续编辑`);
  };

  const saveGeneratedKnowledge = (item: KnowledgeItem) => {
    if (generatedKnowledgeItems.some((current) => current.id === item.id)) {
      notify('该文件已在知识库中');
      return;
    }
    setGeneratedKnowledgeItems((current) => [item, ...current]);
    notify('生成文件已存入“我的知识库”');
  };

  const uploadKnowledgeItems = (items: KnowledgeItem[]) => {
    setUploadedKnowledgeItems((current) => [
      ...items.filter(
        (item) => !current.some((existing) => existing.id === item.id),
      ),
      ...current,
    ]);
  };

  const shareKnowledgeItem = async (
    title: string,
    channel: KnowledgeShareChannel,
  ) => {
    if (channel === 'download') {
      const content = `${title}\n\n来自 BingoMate 我的知识库\n该文件为演示下载副本。`;
      const blob = new Blob(['\ufeff', content], {
        type: 'text/plain;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\.[^.]+$/, '')}-知识库副本.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      notify('知识库内容已下载到本地');
      return;
    }
    const shareUrl = `${window.location.origin}/knowledge/${encodeURIComponent(title)}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      notify(`已准备分享到${channel === 'wechat' ? '微信' : 'QQ'}，分享链接已复制`);
    } catch {
      notify(`已生成${channel === 'wechat' ? '微信' : 'QQ'}分享链接`);
    }
  };

  const switchEdition = (editionId: EditionId) => {
    if (!ownedEditions.has(editionId)) {
      setEditionSwitcherOpen(false);
      setUpgradeTarget(editionId);
      return;
    }
    setEditionSwitcherOpen(false);
    if (editionId === currentEdition) return;
    setCurrentEdition(editionId);
    setSelectedSkill(null);
    setPhotoStep(null);
    setPhotoConversation(null);
    setPendingPhotoRequest('');
    setConversationKey((key) => key + 1);
    setView('chat');
    notify(`已切换至${editions[editionId].name}`);
  };

  const purchaseEdition = (editionId: EditionId) => {
    setOwnedEditions((current) => new Set(current).add(editionId));
    setCurrentEdition(editionId);
    setUpgradeTarget(null);
    setEditionSwitcherOpen(false);
    setSelectedSkill(null);
    setPhotoStep(null);
    setPhotoConversation(null);
    setPendingPhotoRequest('');
    setConversationKey((key) => key + 1);
    setView('chat');
    notify(`升级成功，已切换至${editions[editionId].name}`);
  };

  const startDemoTour = () => {
    const shouldShowEditionHint =
      !ownedEditions.has('teacher') && !hasShownEditionUpgradeHint;
    setMenuOpen(shouldShowEditionHint);
    setShowEditionUpgradeHint(shouldShowEditionHint);
    if (shouldShowEditionHint) setHasShownEditionUpgradeHint(true);
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
    setShowEditionUpgradeHint(false);
    setDemoStage(null);
    setDemoTourStep(0);
    notify('新手引导已完成');
  };

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="relative flex h-dvh w-full overflow-hidden bg-background">
        <Sidebar
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
            setShowEditionUpgradeHint(false);
          }}
          onFeature={chooseFeature}
          onHistory={chooseHistory}
          onSettings={chooseSettings}
          onPoints={choosePoints}
          edition={editions[currentEdition]}
          onSwitchEdition={() => {
            setShowEditionUpgradeHint(false);
            setEditionSwitcherOpen(true);
          }}
          showEditionUpgradeHint={showEditionUpgradeHint}
          points={points}
          notify={notify}
        />
        <div className="min-w-0 flex-1">
          {selectedResource ? (
            <ResourceDetailView
              resource={selectedResource}
              favorited={favoriteResources.has(selectedResource.id)}
              backLabel={
                resourceReturnView === 'knowledge'
                  ? '返回知识库'
                  : '返回资源广场'
              }
              onBack={() => setSelectedResource(null)}
              onToggleFavorite={() =>
                toggleFavoriteResource(selectedResource)
              }
              onEdit={() => editResourceInChat(selectedResource)}
            />
          ) : selectedSkill ? (
            <SkillDetailView
              skill={selectedSkill}
              installed={installedSkills.has(selectedSkill.id)}
              onBack={() => setSelectedSkill(null)}
              onInstall={installSkill}
            />
          ) : view === 'skills' ? (
            <SkillsView
              edition={editions[currentEdition]}
              onBack={() => setView('chat')}
              onSelect={setSelectedSkill}
              installedSkills={installedSkills}
            />
          ) : view === 'resources' ? (
            <ResourcesView
              edition={editions[currentEdition]}
              resources={sharedResources}
              favoriteResources={favoriteResources}
              onBack={() => setView('chat')}
              onSelect={(resource) => {
                setResourceReturnView('resources');
                setSelectedResource(resource);
              }}
              onToggleFavorite={toggleFavoriteResource}
              onPublish={publishResource}
              notify={notify}
            />
          ) : view === 'knowledge' ? (
            <KnowledgeBaseView
              generatedItems={generatedKnowledgeItems}
              favoriteItems={sharedResources.filter((resource) =>
                favoriteResources.has(resource.id),
              )}
              uploadedItems={uploadedKnowledgeItems}
              onBack={() => setView('chat')}
              onUpload={uploadKnowledgeItems}
              onShare={shareKnowledgeItem}
              onOpenFavorite={(resource) => {
                setResourceReturnView('knowledge');
                setSelectedResource(resource);
              }}
              notify={notify}
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
              profileCompleted={profilesCompleted[currentEdition]}
              preferences={tutoringPreferences}
              copy={profileCopy[currentEdition]}
              notify={notify}
            />
          ) : view === 'profile' ? (
            <ProfileView
              edition={currentEdition}
              profile={profiles[currentEdition]}
              completed={profilesCompleted[currentEdition]}
              copy={profileCopy[currentEdition]}
              onBack={() => setView('settings')}
              onSave={saveProfile}
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
              onSwitch={switchDevice}
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
              edition={editions[currentEdition]}
              onMenu={() => setMenuOpen(true)}
              onDemo={() => setDemoStage('menu')}
              moduleHomeDemo={moduleHomeDemo}
              onOpenModuleView={(nextView) => {
                setSelectedSkill(null);
                setSelectedResource(null);
                setPhotoStep(null);
                setView(nextView);
              }}
              onCamera={(request) => {
                setView('chat');
                setPendingPhotoRequest(request);
                setPhotoStep('camera');
              }}
              onScheduleFromChat={createTaskFromChat}
              onSaveGeneratedContent={saveGeneratedKnowledge}
              installedSkills={installedSkills}
              photoConversation={photoConversation}
              resourceConversation={resourceConversation}
              demoTourStep={
                demoStage === 'tour' &&
                !showEditionUpgradeHint &&
                !editionSwitcherOpen &&
                !upgradeTarget
                  ? demoTourStep
                  : null
              }
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
        onCompleteProfile={completeOnboardingProfile}
        onStartTour={startDemoTour}
        moduleHomeEnabled={moduleHomeDemo}
        onOpenModuleHome={() => {
          setModuleHomeDemo(true);
          setView('chat');
          setPhotoStep(null);
          setSelectedSkill(null);
          setSelectedResource(null);
          setConversationKey((key) => key + 1);
          notify('已进入模块首页演示');
        }}
        onUseConversationHome={() => {
          if (!moduleHomeDemo) return;
          setModuleHomeDemo(false);
          setView('chat');
          setConversationKey((key) => key + 1);
          notify('已返回现有对话首页');
        }}
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
        open={editionSwitcherOpen}
        onOpenChange={setEditionSwitcherOpen}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(58dvh,500px)]">
          <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
            <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
              <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <ChevronsUpDown className="size-5" />
              </span>
              切换版本
            </DrawerTitle>
            <DrawerDescription className="text-left">
              不同版本对应不同的技能和辅导方式。
            </DrawerDescription>
            <DrawerClose
              aria-label="关闭版本选择"
              className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
            >
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(18px,env(safe-area-inset-bottom))]">
            <div className="space-y-3">
              {Object.values(editions).map((item) => {
                const isCurrent = item.id === currentEdition;
                const owned = ownedEditions.has(item.id);
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    aria-label={
                      owned ? `切换到${item.name}` : `升级解锁${item.name}`
                    }
                    aria-pressed={isCurrent}
                    onClick={() => switchEdition(item.id)}
                    className={`flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition-colors ${isCurrent ? 'border-blue-200 bg-blue-50/70' : 'border-slate-200 bg-white hover:bg-muted'}`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl ring-1 ${item.accent}`}
                    >
                      <ItemIcon className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-base font-bold">
                          {item.name}
                        </span>
                        {!owned && (
                          <Badge className="shrink-0 bg-amber-50 text-amber-700">
                            需升级
                          </Badge>
                        )}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {item.tagline}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-slate-700">
                        {item.billing}
                      </span>
                    </span>
                    {isCurrent ? (
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                        <Check className="size-4" />
                      </span>
                    ) : owned ? (
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <span className="shrink-0 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white">
                        升级解锁
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={Boolean(upgradeTarget)}
        onOpenChange={(open) => {
          if (!open) setUpgradeTarget(null);
        }}
        showSwipeHandle
      >
        <DrawerContent className="mx-auto w-[calc(100%-16px)] max-w-[560px] rounded-t-[30px] sm:w-[calc(100%-32px)] [--drawer-height:min(62dvh,540px)]">
          {upgradeTarget && (
            <>
              <DrawerHeader className="relative px-5 pb-4 pt-2 text-left">
                <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
                  <span
                    className={`grid size-10 place-items-center rounded-2xl ring-1 ${editions[upgradeTarget].accent}`}
                  >
                    <Sparkles className="size-5" />
                  </span>
                  升级{editions[upgradeTarget].shortName}
                </DrawerTitle>
                <DrawerDescription className="text-left">
                  {editions[upgradeTarget].tagline}
                </DrawerDescription>
                <DrawerClose
                  aria-label="关闭版本升级"
                  className="absolute right-4 top-1 grid size-11 place-items-center rounded-2xl bg-muted"
                >
                  <X className="size-5" />
                </DrawerClose>
              </DrawerHeader>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4">
                <div className="rounded-3xl border bg-white p-5">
                  <p className="text-sm font-bold">
                    {editions[upgradeTarget].name}
                  </p>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-2xl font-black text-slate-900">
                      ¥{editions[upgradeTarget].price}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {editions[upgradeTarget].billingNote}
                    </span>
                  </p>
                  <div className="mt-4 space-y-3">
                    {editions[upgradeTarget].highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                          <Check className="size-3.5" />
                        </span>
                        <p className="text-sm leading-relaxed text-slate-700">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
                  买断后可在侧边栏随时切换版本，已购买的技能不会失效。
                </p>
              </div>
              <DrawerFooter className="px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-4">
                <Button
                  className="h-12 w-full rounded-2xl bg-amber-500 text-base font-bold text-white hover:bg-amber-600"
                  onClick={() => purchaseEdition(upgradeTarget)}
                >
                  支付 ¥{editions[upgradeTarget].price} 一次性买断
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </main>
  );
}
