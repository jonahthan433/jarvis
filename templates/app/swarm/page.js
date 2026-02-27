import { auth } from 'jarvis/auth';
import { SwarmPage } from 'jarvis/chat';

export default async function SwarmRoute() {
  const session = await auth();
  return <SwarmPage session={session} />;
}
