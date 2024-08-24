import { Box, Paper, Title } from '@mantine/core'
import React from 'react'

const Loading = ({height,width}) => {
  return (
    <Paper className='z-50 rounded' style={{height: "100%", width: width}}>
        <Box 
          className='mt-8 rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center z-50'>
            <Title order={1} className='text-primary text-opacity-40 font-bold'>- Loading... -</Title>
        </Box>
    </Paper>
  )
}

export default Loading