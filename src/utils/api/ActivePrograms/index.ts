import { trpc } from 'src/utils/trpc';

const utils = trpc.useContext();
const createActiveProgramMutation = trpc.useMutation(['activeProgram.createActiveProgram'], {
  onSuccess() {
    utils.invalidateQueries(['auth.getUser']);
    utils.invalidateQueries(['activeProgram.getAll']);
  },
});

const deleteActiveMutation = trpc.useMutation(['activeProgram.deleteActiveProgram'], {
  onSuccess() {
    utils.invalidateQueries(['auth.getUser']);
    utils.invalidateQueries(['activeProgram.getAll']);
  },
});

export async function createActiveProgram(id: string) {
  try {
    createActiveProgramMutation.mutate({
      programId: id,
    });
  } catch (err) {
    alert(err);
  }
}

export async function deleteActiveProgram(id: string) {
  try {
    deleteActiveMutation.mutate({
      programId: id,
    });
  } catch (err) {
    alert(err);
  }
}
