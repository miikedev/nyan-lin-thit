import React, { useState, useEffect, useMemo } from 'react'
import {
    useNavigate,
    useSearchParams,
    useLocation
} from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
//components
import Resource from './Resource';
import ResourceSkeleton from './ResourceSkeleton';
import { Container, Skeleton, Paper, Title, Button, Box, Image } from '@mantine/core';
import { Card, usePagination } from '@nextui-org/react';
import { useResourcesData } from '../../apis/resourcesData';
import { useSearchContext } from '../../context/SearchContext';
import ResourcesPagination from './ResourcesPagination';
import { usePaginationContext } from '../../context/PaginationContext';

import { PaginationProvider } from '../../context/PaginationContext';
const ResourcesList = ({ type }) => {
    console.log('list type: ', type)
    const { pathname } = useLocation();
    const { searchingText, setSearchingText } = useSearchContext();
    const { page, setPage } = usePaginationContext();
    const [searchParams, setSearchParams] = useSearchParams("");
    const [filteredData, setFilteredData] = useState([]);
    const category = searchParams.get("category");
    console.log('page from context: ' + page)
    const { data, isLoading, isError, isSuccess, isPreviousData } = useResourcesData(type, page, category, searchingText);
    useEffect(() => {
        if(searchingText) {
            setFilteredData(data?.resources.filter((resource) => {
                console.log('fld', resource)
                return resource.title.toLowerCase().includes(searchingText.trim().toLowerCase())
            }))
        }else{
            setFilteredData(data)
        }
        window.scrollTo(0, 0);
    }, [searchingText,type,pathname,category]);
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
                                    <Skeleton className="rounded-lg">
                                    <div className="h-48 rounded-lg bg-secondary"></div>
                                    </Skeleton>
                                    <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-6 w-full rounded-lg bg-secondary"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-10 w-full rounded-lg bg-secondary-300"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">
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
    if (data === undefined || data?.resources?.length === 0 || filteredData?.length === 0) return <>
        <Paper>
            <Box className='mt-8 rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center'>
                <Title order={1} className='text-primary text-opacity-40 font-bold'>- No Content Found -</Title>
            </Box>
        </Paper>
    </>
    
    if(filteredData?.length > 0) {
        return (
            <div className="flex justify-center w-full">
                { isSuccess && (
                    <>
                        {filteredData?.map((resource) => (
                            <Resource isLoading={!isLoading} key={resource._id} resource={resource} />
                        ))}
                    </>
                )}
            </div>
        )
    }


    if (isError) {
        return <Error />
    }
    return (
        <Container size="fluid" className="py-10">
            <Box className="flex flex-wrap gap-8 justify-center">
            { isSuccess && (
                <>
                    {data?.resources?.map((resource) => (
                        <Resource isLoading={!isLoading} key={resource._id} resource={resource} />
                    ))}
                </>
            )}
        </Box>
        <Box className='flex justify-center my-10'>
            <ResourcesPagination pages={data.pages} isPreviousData={isPreviousData} data={data} />
        </Box>
        </Container>
    );
}

export default ResourcesList;