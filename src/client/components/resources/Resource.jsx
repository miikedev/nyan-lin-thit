import React from 'react'
import { Card, Skeleton, Image, Link, Button } from '@nextui-org/react'
import { Grid, Space, Title, Box } from '@mantine/core'
const Resource = ({resource}) => {
  console.log(resource)
  return (
    <Card className="space-y-2 p-4 min-w-96" radius='md'>

        {/* <Skeleton className="rounded-lg"> */}
        <div className='max-h-80 flex flex-col items-center w-full'>
          <Image src={resource.image[0]} alt={resource.title} className='rounded-lg border-1 max-w-72 max-h-64 border-primary-600'/>
        </div>
        {/* </Skeleton> */}
    
        <div className="text-center">
            <Title order={5} mt={4}>{resource.title}</Title>
        {/* <Space h="md" /> */}
        <div className='my-2 p-2 flex flex-col items-center'>
        
            {/* <Skeleton className="w-full rounded-lg"> */}
                <Box className='mb-2'>
                  <Button className='bg-primary-700'>
                    <Link href={resource.file[0]} download className='text-slate-100 text-sm text-opacity-80'>
                      Download English PDF File
                    </Link>
                  </Button>
                  </Box>
            {/* </Skeleton> */}
           
            {/* <Skeleton className="w-full rounded-lg"> */}
              <Box>
                <Button className='bg-primary-700'>
                  <Link href={resource.mmFile[0]} download className="text-slate-100 text-sm text-opacity-80">
                    မြန်မာစာတမ်း ဒေါင်းလုဒ်ဆွဲရန်
                  </Link>
                </Button>
              </Box>
                </div>
            {/* </Skeleton> */}
        </div>
    </Card>
  )
}

export default Resource