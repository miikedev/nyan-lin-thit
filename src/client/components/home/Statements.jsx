import { Box, Grid, Image, Skeleton, Space, Text, Title } from '@mantine/core'
import { Button, Card, CardFooter } from '@nextui-org/react'
import { useResourcesData } from '../../apis/resourcesData'
import { useResourceContext } from '../../context/ResourceContext'
const Statements = ({navigate}) => {
    const { data, isLoading, error, isSuccess } = useResourcesData('statements');

    const { setResource } = useResourceContext();

    const code =(<Box>
                    <h1 className='leading-4 font-semibold text-[16px]'>Lorem ispam Lorem ispam Lorem ispam Lorem ispam</h1>
                    <Space h={2} />
                    <Text size='xs' c='dimmed'>Lorem ispam</Text>
                </Box>)
                
    return (  
            <>
                <Box className='px-[140px] w-full'>
                    <Grid>
                        <Grid.Col span={12} className='flex justify-between relative'>
                            <Box>
                                <Text size='sm'c='dimmed'>Best Statement of our history</Text>
                                <Title>Our Statement</Title>
                            </Box>
                            <Button onClick={()=>{
                                navigate('resources/statements/statements')
                                setResource('statements')
                                }} className='bg-primary text-white float-right mt-3 rounded-full'>View all Statement</Button>
                        </Grid.Col>
                        <Space h={100} />
                        {
                            isLoading && (
                            <>
                                {
                                    new Array(4).fill(0).map((e,i) => (
                                        <Grid.Col span={3} key={i}>
                                            <Card className="space-y-2 p-4 min-w-64" radius="lg">
                                            <Skeleton isloaded={!isLoading.toString()} className="rounded-lg">
                                                <div className="h-48 rounded-lg bg-secondary"></div>
                                            </Skeleton>
                                            <div className="space-y-3">
                                            <Skeleton isloaded={!isLoading.toString()} className="w-3/5 rounded-lg">
                                                <div className="h-6 w-full rounded-lg bg-secondary"></div>
                                            </Skeleton>
                                            <Skeleton isloaded={!isLoading.toString()} className="w-4/5 rounded-lg">
                                                <div className="h-10 w-full rounded-lg bg-secondary-300"></div>
                                            </Skeleton>
                                            <Skeleton isloaded={!isLoading.toString()} className="w-2/5 rounded-lg">
                                                <div className="h-10 w-full rounded-lg bg-secondary-200"></div>
                                            </Skeleton>
                                            </div>
                                            </Card>
                                        </Grid.Col>
                                    ))
                                }
                            </>
                            )
                        }
                        {
                            isSuccess && data?.resources.slice(0,4).map((statement,i) =>( 
                                <Grid.Col span={3} key={i}>
                                    <Card className='min-w-64 bg-opacity-20 bg-primary-600'>
                                        <Image
                                            alt="Card background"
                                            className="z-0 w-full h-full object-cover p-2"
                                            radius="lg"
                                            src={statement.image[0]}
                                        />
                                        <CardFooter className="text-small justify-between">
                                            <p className="text-default-500">
                                                {statement.title}
                                            </p>
                                        </CardFooter>
                                    </Card>
                                </Grid.Col>
                            ))
                        }
                    </Grid>
                    <Space h={100} />
                </Box>
            </>
    )

    
}

export default Statements