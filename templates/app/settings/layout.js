import { auth } from 'jarvis/auth';
import { SettingsLayout } from 'jarvis/chat';

export default async function Layout({ children }) {
  const session = await auth();
  return <SettingsLayout session={session}>{children}</SettingsLayout>;
}
