import React from 'react'
import { Title, Grid, Box, Text, Avatar, Space } from '@mantine/core'
// import { Avatar } from '@nextui-org/react'
const MissionVisionValues = () => {
  return (
    <>
    <Box className='px-[140px]'>
        <Box w={'full'} className='flex justify-between flex-col items-center'>
            <Title className='text-center font-semibold text-3xl'>Lorem ispam lorem ispam</Title>
                            <Space h={30} />
            <Box className='flex w-full justify-between'>
                <Box className='flex justify-center items-center flex-col gap-4 p-6'>
                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            <Title order={4} className='text-center'>Mission</Title>
                            <Text size="sm"  className='text-center' w={300}>
                                Nyan Lin Thit Analytica implements processes aimed to promote social cohesion and for the emergence of future leaders who will serve to build a free and just society.
                            </Text>
                </Box>
                <Box className='flex justify-center items-center flex-col gap-4 p-6'>
                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            <Title order={4} className='text-center'>Mission</Title>
                            <Text size="sm"  className='text-center' w={300}>
                                Nyan Lin Thit Analytica implements processes aimed to promote social cohesion and for the emergence of future leaders who will serve to build a free and just society.
                            </Text>
                </Box>
                <Box className='flex justify-center items-center flex-col gap-4 p-6'>
                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            <Title order={4} className='text-center'>Mission</Title>
                            <Text size="sm"  className='text-center' w={300}>
                                Nyan Lin Thit Analytica implements processes aimed to promote social cohesion and for the emergence of future leaders who will serve to build a free and just society.
                            </Text>
                </Box>
            </Box>
        </Box>
    </Box>
    </>
  )
}

export default MissionVisionValues