import { ProgramType } from 'types/Program';

interface FormProps {
  data: ProgramType;
  yolo: ProgramType;
}
export default function EditProgramForm({ data, yolo }: FormProps) {
  return (
    <div>
      <pre>{JSON.stringify(data.schema)}</pre>
    </div>
  );
}
