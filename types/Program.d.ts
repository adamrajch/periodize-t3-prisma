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

export interface Week {
  name: string;
  summary?: string;
  days: Array;
}
export interface Block {
  name: string;
  summary?: string;
  weeks: Week[];
}
export interface ProgramSchema {
  blocks: Block[];
}
