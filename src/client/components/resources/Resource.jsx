import React from 'react'
import { Card, Skeleton, Image, Link, Button } from '@nextui-org/react'
import { Grid, Space, Title, Box } from '@mantine/core'
const Resource = ({resource, isLoading}) => {
  return (
    <Card shadow='md' className="space-y-2 space-x-5 p-4 bg-opacity-10 bg-black/10 xl:w-[360px] xl:max-w-[360px] md:w-[330px] md:min-w-[330px] md:my-2" radius='md'>
        <div className='max-h-80 flex flex-col items-center w-full'>
          {
            'embed' in resource ? 
            <iframe
              width="350"
              height="250"
              src={resource.embed}
              title="YouTube video player"
              className='rounded-lg border-2 border-primary'
              frameborder="0"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
             : 
            <Image src={resource.image[0]} alt={resource.title} className='rounded-lg border-1 max-w-72 max-h-64 border-primary-600'/>
          }
        </div>
        <div className="text-center">
        <Title order={5} mt={10} className='text-primary-900'>{resource.title}</Title>
        {
          !('embed' in resource) && <div className='my-2 p-2 flex flex-col items-center'>
            <Box className='mb-2'>
                  <Button className='bg-primary-700'>
                    <Link href={resource.file[0]} download className='text-slate-100 text-sm text-opacity-80'>
                      Download English PDF File
                    </Link>
                  </Button>
            </Box>
            <Box>
              <Button className='bg-primary-700'>
                <Link href={resource.mmFile[0]} download className="text-slate-100 text-sm text-opacity-80">
                  မြန်မာစာတမ်း ဒေါင်းလုဒ်ဆွဲရန်
                </Link>
              </Button>
            </Box>
          </div>
        }
        
        </div>
    </Card>
  )
}

export default Resource