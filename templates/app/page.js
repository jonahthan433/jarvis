import { auth } from 'jarvis/auth';
import { ChatPage } from 'jarvis/chat';

export default async function Home() {
  const session = await auth();
  return <ChatPage session={session} needsSetup={false} />;
}
