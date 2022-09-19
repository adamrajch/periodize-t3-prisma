import { createFormContext } from '@mantine/form';
import { ProgramSchema } from 'types/Program';

// You can give context variables any name
export const [ProgramFormProvider, useProgramFormContext, useProgramForm] =
  createFormContext<ProgramSchema>();
