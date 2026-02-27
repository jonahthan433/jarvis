import { auth } from 'jarvis/auth';
import { NotificationsPage } from 'jarvis/chat';

export default async function NotificationsRoute() {
  const session = await auth();
  return <NotificationsPage session={session} />;
}
