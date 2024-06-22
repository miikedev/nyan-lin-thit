import React from 'react'
import { Card, Skeleton, Image, Link, Button } from '@nextui-org/react'
import { Grid, Space, Title, Box } from '@mantine/core'
const Resource = ({resource, isLoading}) => {
  return (
    <Card className="space-y-2 p-4 min-w-96 w-96" radius='md'>
        <div className='max-h-80 flex flex-col items-center w-full'>
          <Skeleton isLoaded={isLoading} className='rounded-lg'>
            <Image src={resource.image[0]} alt={resource.title} className='rounded-lg border-1 max-w-72 max-h-64 border-primary-600'/>
          </Skeleton>
        </div>
    
        <div className="text-center">
            <Skeleton isLoaded={isLoading} className='rounded-lg w-3/5 h-4 mx-auto'>
              <Title order={5} mt={4}>{resource.title}</Title>
            </Skeleton>
        {/* <Space h="md" /> */}
        <div className='my-2 p-2 flex flex-col items-center'>
        
            <Box className='mb-2'>
          <Skeleton isLoaded={isLoading} className=" rounded-lg">
                  <Button className='bg-primary-700'>
                    <Link href={resource.file[0]} download className='text-slate-100 text-sm text-opacity-80'>
                      Download English PDF File
                    </Link>
                  </Button>
          </Skeleton>
            </Box>
           
            <Box>
          <Skeleton isLoaded={isLoading} className="rounded-lg">
              <Button className='bg-primary-700'>
                <Link href={resource.mmFile[0]} download className="text-slate-100 text-sm text-opacity-80">
                  မြန်မာစာတမ်း ဒေါင်းလုဒ်ဆွဲရန်
                </Link>
              </Button>
          </Skeleton>
            </Box>
          </div>
        </div>
    </Card>
  )
}

export default Resource