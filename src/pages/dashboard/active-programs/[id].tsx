import DashboardShell from '@/components/Dashboard';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { trpc } from 'src/utils/trpc';

export default function ActiveProgramPage() {
  const id = useRouter().query.id as string;
  const { data, status, error } = trpc.useQuery(['activeProgram.getById', { id }]);

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (status !== 'success') {
    return <>Loading...</>;
  }

  if (!data) {
    return null;
  }
  return <DashboardShell>hey {data.title}</DashboardShell>;
}
