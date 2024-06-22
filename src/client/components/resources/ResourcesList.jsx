import React, { useState, useEffect } from 'react'
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
//components
import Resource from './Resource';
import { Container, Grid, Paper } from '@mantine/core';
import { Skeleton, Card } from '@nextui-org/react';
import { useResourcesData } from '../../apis/resourcesData';

const queryClient = new QueryClient()

const ResourcesList = ({type}) => {
    const [searchParams, setSearchParams] = useSearchParams("");
    const category = searchParams.get("category");
    console.log('category', category)
    console.log('type', type)
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { data, isLoading , error, isSuccess } = useResourcesData(type, page, category);
    console.log('data', data)
    console.log('error', error)
    if(isLoading) console.log('Loading');
    if(error) navigate('/error')

    useEffect(() => {
        return () => setPage(1);
    }, [type]);
    console.log(data)
    console.log(type);
    return (
                <Container size="fluid" className='flex justify-center flex-wrap w-full gap-3 py-10'>
                    {isLoading && (
                        <Card className="space-y-2 p-4" radius="lg">
                            <Grid>
                                <Grid.Col span={4}>
                                    <Skeleton className="rounded-lg border-1 border-primary-600">
                                        <div className="h-56 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </Grid.Col>
                                <Grid.Col span={8}>
                                    <div className="space-y-3 flex flex-col justify-between">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Grid>
                                        <Grid.Col span={"6"}>
                                        <Skeleton className="w-full rounded-lg">
                                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        </Grid.Col>
                                        <Grid.Col span={"6"}>
                                        <Skeleton className="w-full rounded-lg">
                                            <div className="h-10 w-3/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        </Grid.Col>
                                    </Grid>
                                    </div>
                                </Grid.Col>
                            </Grid>
                        </Card>
                    )}

                    {isSuccess && (
                        <>
                            {data.resources.map((resource) => (
                                <Resource key={resource.id} resource={resource} />
                            ))}
                        </>
                    )}
                </Container>
    )
}

export default ResourcesList