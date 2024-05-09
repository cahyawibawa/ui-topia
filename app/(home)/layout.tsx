import { Layout } from 'fumadocs-ui/layout'

interface HomeLayoutProps {
  children: React.ReactNode
}
export default function HomeLayout({ children }: HomeLayoutProps) {
  return <Layout nav={{ title: 'ui/topia' }}>{children}</Layout>
}
