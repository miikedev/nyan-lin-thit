import { Avatar, Box, Space, Text, Title } from '@mantine/core'
import React from 'react'
// import { Avatar } from '@nextui-org/react'
const MissionVisionValues = ({motion}) => {
  return (
    <>
    <Box className='px-[140px]'>
        <Box w={'full'} className='flex justify-between flex-col items-center'>
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }} 
                className='text-center font-semibold text-3xl'
            >
                Lorem ispam lorem ispam
            </motion.h1>
            <Space h={30} />
            <Box className='flex w-full justify-between'>
                <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.3 }}
                    className='flex justify-center items-center flex-col gap-4 p-6'>
                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            <Title order={4} className='text-center'>Mission</Title>
                            <Text size="sm"  className='text-center' w={300}>
                                Nyan Lin Thit Analytica implements processes aimed to promote social cohesion and for the emergence of future leaders who will serve to build a free and just society.
                            </Text>
                </motion.div>
                <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.3 }}
                    className='flex justify-center items-center flex-col gap-4 p-6'>
                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            <Title order={4} className='text-center'>Mission</Title>
                            <Text size="sm"  className='text-center' w={300}>
                                Nyan Lin Thit Analytica implements processes aimed to promote social cohesion and for the emergence of future leaders who will serve to build a free and just society.
                            </Text>
                </motion.div>
                <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.3 }}
                    className='flex justify-center items-center flex-col gap-4 p-6'>
                            <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            <Title order={4} className='text-center'>Mission</Title>
                            <Text size="sm"  className='text-center' w={300}>
                                Nyan Lin Thit Analytica implements processes aimed to promote social cohesion and for the emergence of future leaders who will serve to build a free and just society.
                            </Text>
                </motion.div>
            </Box>
        </Box>
    </Box>
    </>
  )
}

export default MissionVisionValues