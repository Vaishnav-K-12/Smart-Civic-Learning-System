export enum UserRole {
  CITIZEN = 'citizen',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  mobile: string;
  location: string;
  role: UserRole;
  password?: string; // Omited on client
  points: number;
  level: number;
  xp: number;
  badges: string[]; // Badge IDs
  completedModules: string[]; // Module IDs
  completedQuizzes: string[]; // Quiz IDs
  completedChallenges: string[]; // Challenge IDs
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  infoGraphicTitle?: string;
  infoGraphicText?: string;
  videoUrl?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  titleTe: string; // Telugu translation
  description: string;
  descriptionTe: string; // Telugu translation
  category: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionTe: string;
  options: string[];
  optionsTe: string[];
  correctIndex: number;
  explanation: string;
  explanationTe: string;
}

export interface Quiz {
  id?: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id: string;
  userId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  timestamp: string;
  incorrectQuestions: string[]; // question ids
}

export interface CivicChallenge {
  id: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe?: string;
  points: number;
  category?: string;
  createdBy?: string; // userId if teacher-assigned
}

export interface ChallengeSubmission {
  id: string;
  userId: string;
  userName: string;
  challengeId: string;
  challengeTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  photoUrl?: string; // simulated data uri
  proofText: string;
  pointsAwarded: number;
  timestamp: string;
}

export interface Badge {
  id: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  iconName: string;
  category: string;
  pointsRequired?: number;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  moduleId: string;
  moduleTitle: string;
  rating: number;
  suggestion: string;
  timestamp: string;
}

export interface CommunityReport {
  id: string;
  userId: string;
  userName: string;
  type: 'littering' | 'broken_road' | 'damaged_property' | 'unsafe_crossing';
  location: string;
  description: string;
  photoUrl?: string; // base64 / mock data uri
  status: 'reported' | 'investigating' | 'resolved';
  adminNotes?: string;
  timestamp: string;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  completionDate: string;
  certificateNumber: string;
}

export interface RecommendationPath {
  userId: string;
  moduleId: string;
  recommendedLessons: string[]; // lesson titles
  recommendedChallenges: string[]; // challenge titles
  geminiAnalysis: string; // AI personal advice
  timestamp: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Module {
  id: string;
  title: string;
  titleTe: string;
  category: string;
  description: string;
  descriptionTe: string;
  content: string;
  contentTe: string;
  quiz: Quiz;
}

export type Challenge = CivicChallenge;

