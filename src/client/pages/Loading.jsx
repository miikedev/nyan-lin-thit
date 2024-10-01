import { Box, Paper, Title } from '@mantine/core'

const Loading = ({height,width}) => {
  const widthStyle = width ?? 'auto';
  const heightStyle = height?? 'auto';
  return (
    <Paper>
        <Box className={`w-[${width}] h-[${height}] rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center`}>
            <Title order={1} className='text-primary text-opacity-40 font-bold'>- Loading... -</Title>
        </Box>
    </Paper>
  )
}

export default Loading