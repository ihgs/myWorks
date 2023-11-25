import { AppBar, Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const handleDay = (e: any) => {
    e.preventDefault()
    router.push('/')
  }

  const handleMonth = (e: any) => {
    e.preventDefault()
    router.push('/month')
  }

  return (
    <AppBar position='static'>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button onClick={handleDay} sx={{ my: 2, color: 'white', display: 'block' }}>
          Home
        </Button>
        <Button onClick={handleMonth} sx={{ my: 2, color: 'white', display: 'block' }}>
          Month
        </Button>
      </Box>
    </AppBar>
  )
}
