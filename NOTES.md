Prisma
npx prisma init

npx prisma migrate dev --name
restart npm run dev

invalidating queries
const utils = trpc.useContext();
const mutation = trpc.useMutation(['program.create-program'], {
onSuccess(input) {
utils.invalidateQueries(['program.getUserPrograms']);
},
});
