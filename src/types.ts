/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageView = 'home' | 'signin' | 'dashboard' | 'privacy' | 'terms' | 'refund' | 'notfound' | 'title-generator' | 'pricing';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MockProject {
  id: string;
  title: string;
  topic: string;
  date: string;
  scriptSnippet: string;
  keywords: string[];
  description: string;
  category: string;
}

export interface ScriptPreset {
  id: string;
  topic: string;
  titles: string[];
  description: string;
  keywords: string[];
  script: string;
}
