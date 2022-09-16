import { Cluster } from 'cluster';
import { Lift } from './Program';

export interface ActiveProgramWorkout {
  day: number;
  week: number;
  block: number;
  dayName: string;
  exercises: (Lift | Cluster)[];
}
