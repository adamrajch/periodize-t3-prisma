export interface ProgramType {
  id: string;
  title: string;
  description?: string | null;
  isPublic: boolean;
  tags: any;
  schema: any;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Record {
  sets: number;
  reps: number;
  rpe?: number;
  percentage?: number;
}
export interface Lift {
  type: 'lift';
  name: string;
  distance?: {
    unit: string;
    length: number;
  };
  weight: {
    unit?: string;
    load?: number;
  };
  records: Record[];
}

export interface Cluster {
  type: 'cluster';
  name: string;
  lifts: Lift[];
  rest?: number;
  restUnit: string;
  summary?: string;
  sets: number;
  reps: number;
}

export interface Day {
  name: string;
  summary: string;
  exercises: (Lift | Cluster)[];
}
export interface Week {
  name: string;
  summary?: string;
  days: any;
}

export interface Block {
  name: string;
  summary?: string;
  weeks: Week[];
  phase: string;
}
export interface ProgramSchema {
  blocks: Block[];
}
