import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage()  {
  const authToken = (await cookies()).get('auth_token');

  if (authToken?.value) {
    redirect('/dashboard');
  } else {
    redirect('/auth/login');
  }
}
