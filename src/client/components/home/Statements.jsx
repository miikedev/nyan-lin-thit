import React from 'react'
import { Box, Image, Title, Grid, Text, } from '@mantine/core'
import { Button, Card, CardFooter } from '@nextui-org/react'
const Statements = () => {
  return (  
    <>
        <Box className='px-[140px] w-full'>
            <Grid>
                <Grid.Col span={12} className='flex justify-between relative'>
                    <Box>
                        <Text size='sm'c='dimmed'>Best Statement of our history</Text>
                        <Title>Our Statement</Title>
                    </Box>
                    <Button className='bg-primary text-white float-right mt-3'>View all Statement</Button>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Card>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover p-2"
                        radius="lg"
                        src="https://nextui.org/images/card-example-4.jpeg"
                    />
                    <CardFooter className="text-small justify-between">
                        <p className="text-default-500">
                            “Lorem Ipsum is simply dummy text of the printing ”
                        </p>
                    </CardFooter>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                <Card>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover p-2"
                        radius="lg"
                        src="https://nextui.org/images/card-example-4.jpeg"
                    />
                    <CardFooter className="text-small justify-between">
                        <p className="text-default-500">
                            “Lorem Ipsum is simply dummy text of the printing ”
                        </p>
                    </CardFooter>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                <Card>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover p-2"
                        radius="lg"
                        src="https://nextui.org/images/card-example-4.jpeg"
                    />
                    <CardFooter className="text-small justify-between">
                        <p className="text-default-500">
                            “Lorem Ipsum is simply dummy text of the printing ”
                        </p>
                    </CardFooter>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                <Card>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover p-2"
                        radius="lg"
                        src="https://nextui.org/images/card-example-4.jpeg"
                    />
                    <CardFooter className="text-small justify-between">
                        <p className="text-default-500">
                            “Lorem Ipsum is simply dummy text of the printing ”
                        </p>
                    </CardFooter>
                    </Card>
                </Grid.Col>
            </Grid>
        </Box>
    </>
  )
}

export default Statements