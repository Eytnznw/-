
export enum AppSection {
  Dashboard = 'dashboard',
  AIChat = 'chat',
  Quiz = 'quiz',
  Glossary = 'glossary',
  Resources = 'resources',
  NarcissismTypes = 'types',
  Stories = 'stories',
  Contact = 'contact',
  Pricing = 'pricing'
}

export type ChatMode = 'support' | 'simulator';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  example?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
}

export interface Story {
  id: string;
  author: string;
  content: string;
  date: string;
}
