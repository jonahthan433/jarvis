import { auth } from 'jarvis/auth';
import { ChatsPage } from 'jarvis/chat';

export default async function ChatsRoute() {
  const session = await auth();
  return <ChatsPage session={session} />;
}
