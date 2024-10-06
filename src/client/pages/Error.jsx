import { Box, Paper, Title } from '@mantine/core'
import React from 'react'

const Error = ({width,height}) => {
  const widthStyle = width ?? 'auto';
  const heightStyle = height?? 'auto';
  return (
    <Paper>
        <Box className={`w-[${width}] h-[${height}] rounded-lg min-h-[1000px] bg-default-100 flex items-center justify-center`}>
            <Title order={1} className='text-primary text-opacity-40 font-bold'>- Something Went Wrong -</Title>
        </Box>
    </Paper>
  )
}

export default Error