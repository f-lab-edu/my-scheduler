export interface PriorityColors {
  high?: string;
  medium?: string;
  low?: string;
}

export interface MyTailwindConfig {
  theme?: {
    colors?: {
      [key: string]: unknown;
      priority?: PriorityColors;
    };
  };
}
