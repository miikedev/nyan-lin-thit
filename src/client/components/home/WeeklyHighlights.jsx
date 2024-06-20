import { Box, Text, Grid, Title, Space } from '@mantine/core'
import { Image, Button } from '@nextui-org/react'
import React from 'react'

const WeeklyHighlights = () => {
  return (
    <Box className='py-[20px] px-[140px] flex'>

                <Box>
                    <Image width={720} radius='none' src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='weeklyhights homep image' />
                </Box>

            {/* <Box className='flex flex-col bg-red-300'> */}
            <Box className='px-[100px]'>
                <Space h={130} />
                <Title>Weekly Highlights</Title>
                <Space h={30} />
                <Text size='sm' w={460}>
                    Explore our Weekly Highlights! We provide comprehensive reports 
                    from four critical monitoring sessions: Armed Clash Monitor, SAC Monitor, NUG CRPH Monitor, and others.
                </Text>
                <Space h={30} />
                <Button className=' px-[20px] py-[8px] rounded-full bg-primary text-white'>See more</Button>
            </Box>
    </Box>
  )
}

export default WeeklyHighlights