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
