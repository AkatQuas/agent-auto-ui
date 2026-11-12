import { useEffect } from 'react'
import { Playground } from '@/playground/Playground'
import { registerShowcase } from '@/showcase/register'
import { ThemeProvider } from '@/theme/ThemeProvider'

export default function App() {
  useEffect(() => {
    registerShowcase()
  }, [])

  return (
    <ThemeProvider>
      <Playground />
    </ThemeProvider>
  )
}
