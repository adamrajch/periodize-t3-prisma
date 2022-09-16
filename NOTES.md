Prisma
npx prisma init

npx prisma migrate dev --name
restart npm run dev
restart typescript server
restart prisma studio

planetscale db env: DATABASE_URL=mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>?sslaccept=strict

invalidating queries
const utils = trpc.useContext();
const mutation = trpc.useMutation(['program.create-program'], {
onSuccess(input) {
utils.invalidateQueries(['program.getUserPrograms']);
},
});
