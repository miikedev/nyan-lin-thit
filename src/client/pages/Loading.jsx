import React from 'react'
import { Paper, Box, Title } from '@mantine/core'
const Loading = ({height}) => {
  return (
    <Paper className='z-50'>
        <Box 
          style={{height: height}}
          className='mt-8 rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center z-50'>
            <Title order={1} className='text-primary text-opacity-40 font-bold'>- Loading... -</Title>
        </Box>
    </Paper>
  )
}

export default Loading