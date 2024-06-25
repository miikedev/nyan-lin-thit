// import React, { useState, useEffect } from 'react'
// import {
//     useNavigate,
//     useSearchParams,
// } from "react-router-dom";
// import {
//     QueryClient,
//     QueryClientProvider,
//   } from '@tanstack/react-query'
// //components
// import Resource from './Resource';
// import { Container, Grid, Paper, Box } from '@mantine/core';
// import { Card, Skeleton, Button } from '@nextui-org/react';
// import { useResourcesData } from '../../apis/resourcesData';
// import ResourceSkeleton from './ResourceSkeleton';

// const queryClient = new QueryClient()

// const ResourcesList = ({type}) => {
//     const [searchParams, setSearchParams] = useSearchParams("");
//     const [loading, setLoading] = useState(true)
//     const category = searchParams.get("category");
//     console.log('category', category)
//     console.log('type', type)
//     const [page, setPage] = useState(1);
//     const navigate = useNavigate();
//     const { data, isLoading , error, isSuccess } = useResourcesData(type, page, category);

//     if(isLoading) console.log('Loading');
//     if(error) navigate('/error')

//     useEffect(() => {
//         return () => setPage(1);
//     }, [type]);

//     return (
//                 <Container size="fluid" className='flex justify-start flex-wrap w-full gap-3 py-10'>
//                     {isLoading && (
//                         <>
//                             {/* <Card className="space-y-2 p-4 min-w-96 w-96" radius='md'>
//                                 <div className='max-h-80 flex flex-col items-center w-full'>
//                                   <Skeleton isLoaded={isLoading} className='rounded-lg '>
//                                     <div className="min-w-72 min-h-44 bg-default-200 rounded-lg"></div>
//                                   </Skeleton>
//                                 </div>
//                                 <Skeleton isLoaded={isLoading} className='rounded-lg w-2/3 h-[20px] mt-2 mx-auto'>
//                                 </Skeleton>
//                                 <div className='my-2 p-2 flex flex-col items-center'>
//                                     <Skeleton isLoaded={isLoading} className="rounded-lg mb-2">
//                                         <Button size='sm' className='w-[200px]' radius='large'></Button>
//                                     </Skeleton>
//                                     <Skeleton isLoaded={isLoading} className="rounded-lg">
//                                         <Button size='sm' className='w-[200px]' radius='large'></Button>
//                                     </Skeleton>
//                                 </div>
//                             </Card> */}
//                             <Card className="space-y-2 p-4 min-w-96 w-96" radius='md'>
//                                 <div className='max-h-80 flex flex-col items-center w-full'>
//                                 <Skeleton isLoaded={isLoading} className='rounded-lg'>
//                                     <Image src={resource.image[0]} alt={resource.title} className='rounded-lg border-1 max-w-72 max-h-64 border-primary-600'/>
//                                 </Skeleton>
//                                 </div>
                            
//                                 <div className="text-center">
//                                     <Skeleton isLoaded={isLoading} className='rounded-lg w-3/5 h-4 mx-auto'>
//                                     <Title order={5} mt={4}>{resource.title}</Title>
//                                     </Skeleton>
//                                 <div className='my-2 p-2 flex flex-col items-center'>
                                
//                                     <Box className='mb-2'>
//                                 <Skeleton isLoaded={isLoading} className=" rounded-lg">
//                                         <Button className='bg-primary-700'>
//                                             <Link href={resource.file[0]} download className='text-slate-100 text-sm text-opacity-80'>
//                                             Download English PDF File
//                                             </Link>
//                                         </Button>
//                                 </Skeleton>
//                                     </Box>
                                
//                                     <Box>
//                                 <Skeleton isLoaded={isLoading} className="rounded-lg">
//                                     <Button className='bg-primary-700'>
//                                         <Link href={resource.mmFile[0]} download className="text-slate-100 text-sm text-opacity-80">
//                                         မြန်မာစာတမ်း ဒေါင်းလုဒ်ဆွဲရန်
//                                         </Link>
//                                     </Button>
//                                 </Skeleton>
//                                     </Box>
//                                 </div>
//                                 </div>
//                             </Card>
//                         </>
//                     )}
//                     {data && (
//                         <>
//                             {data.resources.map((resource) => (
//                                 <Resource isLoading={!isLoading} key={resource.id} resource={resource} />
//                             ))}
//                         </>
//                     )}
//                 </Container>
//     )
// }

// export default ResourcesList


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

const queryClient = new QueryClient()

const ResourcesList = ({ type }) => {
    const [searchParams, setSearchParams] = useSearchParams("");
    const [loading, setLoading] = useState(true);
    const category = searchParams.get("category");
    console.log('category', category);
    console.log('type', type);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { data, isLoading, error, isSuccess } = useResourcesData(type, page, category);
    console.log(data);
    useEffect(() => {
        return () => setPage(1);
    }, [type]);
    if (data?.resources?.length == 0) return <>
        <Paper>
            <Box className='mt-8 rounded-lg min-h-[400px] bg-default-100 flex items-center justify-center'>
                <Title order={1} className='text-primary text-opacity-40 font-bold'>- No Content Found -</Title>
            </Box>
        </Paper>
    </>
    if (isLoading) {
        return (
            <div className='flex justify-start flex-wrap w-full gap-3 py-10'>
                {
                    new Array(4).fill(0).map((a) => {
                        return (
                            <Card radius="lg">
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

    if (error) {
        navigate('/error');
    }

    return (
        <Container size="fluid" className="flex justify-start flex-wrap w-full gap-3 py-10">
            {data && (
                <>
                    {data.resources.map((resource) => (
                        <Resource isLoading={!isLoading} key={resource.id} resource={resource} />
                    ))}
                </>
            )}
        </Container>
    );
}

export default ResourcesList;