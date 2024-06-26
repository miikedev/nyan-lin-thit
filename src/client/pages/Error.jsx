import React from 'react'
import { Paper, Box, Title } from '@mantine/core'
const Error = () => {
  return (
    <Paper>
        <Box className='mt-8 rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center'>
            <Title order={1} className='text-primary text-opacity-40 font-bold'>- Something Went Wrong -</Title>
        </Box>
    </Paper>
  )
}

export default Error