import { Box, Image, Title, Grid, Text, Space } from '@mantine/core'
import { Button, Card, CardFooter } from '@nextui-org/react'
const Blog = () => {
  return (
    <Box className='bg-primary-600 bg-opacity-10 px-[140px] py-[120px] relative bottom-[100px]'>
        <Grid>
                    <Grid.Col span={8}>
                            <Box className='flex items-center'>
                                    <Image 
                                        alt="Album cover"
                                        className="object-cover"
                                        w={400}
                                        h={400}
                                        shadow="md"
                                        src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    />
                                    <Box className='px-[40px]'>
                                        <Space h={30} />
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
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Box className='flex flex-col justify-center h-full'>
                        {
                            Array.from({ length: 4 }).map((e,i) => (
                                    <Box key={i} className='flex gap-4 mb-3 items-center'>
                                        <Image 
                                            alt="Album cover"
                                            className="object-cover"
                                            w={75}
                                            h={75}
                                            shadow="md"
                                            src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        />
                                        <Box>
                                            <h1 className='leading-4 font-semibold text-[16px]'>Lorem ispam Lorem ispam Lorem ispam Lorem ispam</h1>
                                            <Space h={2} />
                                            <Text size='xs' c='dimmed'>Lorem ispam</Text>
                                        </Box>
                                    </Box>
                            ))
                        }
                        </Box>
                    </Grid.Col>
        </Grid>
    </Box>
  )
}

export default Blog