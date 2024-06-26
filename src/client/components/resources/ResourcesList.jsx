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
import ResourceSkeleton from './ResourceSkeleton';
import { Container, Skeleton, Paper, Title, Button, Box, Image } from '@mantine/core';
import { Card } from '@nextui-org/react';
import { useResourcesData } from '../../apis/resourcesData';
import { useSearchContext } from '../../context/SearchContext';
const queryClient = new QueryClient()

const ResourcesList = ({ type }) => {
    const { searchingText, setSearchingText } = useSearchContext();
    const [searchParams, setSearchParams] = useSearchParams("");
    const [filteredData, setFilteredData] = useState([]);
    const category = searchParams.get("category");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { data, isLoading, isError, isSuccess } = useResourcesData(type, page, category);
    useEffect(() => {
        if(searchingText) {
            setFilteredData(data?.resources.filter((resource) => {
                console.log('fld', resource)
                return resource.title.toLowerCase().includes(searchingText.trim().toLowerCase())
            }))
        }else{
            setFilteredData(data)
        }
    }, [page,searchingText,isSuccess,data,type]);
    useEffect(()=>setSearchingText(''),[type])
    console.log('filter data',filteredData)
    // console.log('filter data length', filteredData.length)
    console.log('data',data)
    if (isLoading) {
        return (
            <div className='flex justify-start flex-wrap w-full gap-3 py-10'>
                {
                    new Array(4).fill(0).map((a,i) => {
                        return (
                            <Card radius="lg" key={i}>
                                <Skeleton isLoaded={isLoading} className="rounded-lg">
                                <div className="h-48 rounded-lg bg-secondary"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                <Skeleton isLoaded={isLoading} className="w-3/5 rounded-lg">
                                    <div className="h-6 w-full rounded-lg bg-secondary"></div>
                                </Skeleton>
                                <Skeleton isLoaded={isLoading} className="w-4/5 rounded-lg">
                                    <div className="h-10 w-full rounded-lg bg-secondary-300"></div>
                                </Skeleton>
                                <Skeleton isLoaded={isLoading} className="w-2/5 rounded-lg">
                                    <div className="h-10 w-full rounded-lg bg-secondary-200"></div>
                                </Skeleton>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        );
    }
    if (data === undefined || data?.resources.length === 0 || filteredData?.length === 0) return <>
        <Paper>
            <Box className='mt-8 rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center'>
                <Title order={1} className='text-primary text-opacity-40 font-bold'>- No Content Found -</Title>
            </Box>
        </Paper>
    </>
    
    if(filteredData?.length > 0) {
        return (
            <Container size="fluid" className="flex justify-start flex-wrap w-full gap-3 py-10">
                { isSuccess && (
                    <>
                        {filteredData?.map((resource) => (
                            <Resource isLoading={!isLoading} key={resource._id} resource={resource} />
                        ))}
                    </>
                )}
            </Container>
        )
    }


    if (isError) {
        return <Error />
    }
    return (
        <Container size="fluid" className="flex justify-start flex-wrap w-full gap-3 py-10">
            { isSuccess && (
                <>
                    {data?.resources?.map((resource) => (
                        <Resource isLoading={!isLoading} key={resource._id} resource={resource} />
                    ))}
                </>
            )}
        </Container>
    );
}

export default ResourcesList;