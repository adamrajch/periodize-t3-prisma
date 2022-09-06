export interface ProgramType {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  tags: any;
  schema: Block[];
  meta?:any;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Record {
  sets: number;
  reps: number;
  rpe?: number;
  percentage?: number;
  distance?: {
    unit: string;
    length: number;
  };
  weight?: {
    unit: string;
    load: number;
  };
  time?: number;
}
export interface Lift {
  id: string;
  name: string;
  load: boolean;
  time: boolean;
  distance: boolean;
  records: Record[];
}

export interface Cluster {
  type: 'cluster';
  name: string;
  lifts: Lift[];
  rest?: number;
  summary?: string;
  sets: number;
}

export interface Day {
  name: string;
  summary: string;
  exercises: (Lift | Cluster)[];
}
export interface Week {
  name: string;
  summary?: string;
  days: Day[];
}

export interface Block {
  name: string;
  summary?: string;
  weeks: Week[];
  phase?: string;
}
export interface ProgramSchema {
  blocks: Block[];
}
