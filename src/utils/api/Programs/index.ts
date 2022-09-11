import { trpc } from 'src/utils/trpc';

const utils = trpc.useContext();

const deleteMutation = trpc.useMutation(['program.deleteProgram'], {
  onSuccess() {
    utils.invalidateQueries(['auth.getUser']);
  },
});

export async function deleteProgram(id: string) {
  try {
    await deleteMutation.mutate({ id });
  } catch (err) {
    alert(err);
  }
}
