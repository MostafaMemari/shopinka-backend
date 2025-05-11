import { Card, Typography } from '@mui/material'
import { PermMedia } from '@mui/icons-material'

interface NoCategoryMessageProps {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  children?: React.ReactNode
}

const NoCategoryMessage = ({
  title = 'هیچ دسته بندی یافت نشد',
  subtitle = 'به نظر می‌رسه هیچ دسته بندی در این بخش وجود نداره. می‌تونید دسته بندی های جدید ثبت کنید!',
  icon = <PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />,
  children
}: NoCategoryMessageProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '300px',
        borderColor: 'divider',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out',
        p: 4
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {icon}
      <Typography variant='h6' color='text.secondary' sx={{ fontWeight: 500, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ maxWidth: '400px', mb: 3 }}>
        {subtitle}
      </Typography>
      {children}
    </Card>
  )
}

export default NoCategoryMessage
