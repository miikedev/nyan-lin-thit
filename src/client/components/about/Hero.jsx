import { Box, Space, Text, Title } from '@mantine/core'
import React from 'react'
const Hero = () => {
  return (
    <Box className='px-[140px] flex gap-20'>
        <Box>
            <Text >
                Lorem ipsum dolor sit amet 
            </Text >
            <Space h={15} />
            <Title>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste accusantium laboriosam reiciendis vel.
            </Title>
        </Box>
        <Box className='flex items-center'>
            <Text c="dimmed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste accusantium laboriosam reiciendis vel corporis ipsam qui perferendis a fugit, ipsa deleniti nobis, fugiat omnis esse! Ratione eveniet rem dicta?
                Provident maiores atque eos repudiandae voluptates
            </Text>
        </Box>
    </Box>
  )
}

export default Hero