import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MemoElle',
  description: 'Fashion • Beauty • Home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
