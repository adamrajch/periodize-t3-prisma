Prisma
npx prisma init

npx prisma migrate dev --name

invalidating queries
const utils = trpc.useContext();
const mutation = trpc.useMutation(['program.create-program'], {
onSuccess(input) {
utils.invalidateQueries(['program.getUserPrograms']);
},
});
