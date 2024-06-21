import { Box, Image, Title, Grid, Text, Space } from '@mantine/core'
import { Button, Card, CardFooter } from '@nextui-org/react'
const Blog = () => {
  return (
    <div className='bg-primary-400 bg-opacity-20'>
        <Box className='w-full p-16'>
                <Grid>
                    <Grid.Col span={8}>
                            <Box className='flex items-center'>
                                    <Image 
                                        alt="Album cover"
                                        className="object-cover"
                                        w={400}
                                        h={400}
                                        shadow="md"
                                        src="https://nextui.org/images/album-cover.png"
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
                        {
                            Array.from({ length: 4 }).map((e,i) => (
                                    <Box className='flex gap-4 mb-3 items-center'>
                                        <Image 
                                            alt="Album cover"
                                            className="object-cover"
                                            w={75}
                                            h={75}
                                            shadow="md"
                                            src="https://nextui.org/images/album-cover.png"
                                        />
                                        <Box>
                                            <h1 className='leading-4 font-semibold text-[16px]'>Lorem ispam Lorem ispam Lorem ispam Lorem ispam</h1>
                                            <Space h={2} />
                                            <Text size='xs' c='dimmed'>Lorem ispam</Text>
                                        </Box>
                                    </Box>
                            ))
                        }
                    </Grid.Col>
                </Grid>
        </Box>
    </div>
  )
}

export default Blog