import { Box, Space, Text, Title } from '@mantine/core'
import { Button, Image } from '@nextui-org/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Hero from '../components/about/Hero'
import ImageSection from '../components/about/ImageSection'

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollTo(0,0)
  }, [pathname])
  return (
    <>
      <Space h={120} />
      <Hero />
      <Space h={160} />

      <ImageSection />
      <Space h={140} />
      <Box className='flex justify-center'>
        <Box className='text-center' w={600}>
          <Title>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Title>
          <Text my={18} c='dimmed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, odio. Numquam, quod dolores aut voluptatibus nostrum, nemo voluptates sequi in ad, ut perferendis totam dolore omnis possimus placeat voluptatum ipsum.</Text>
          <Button className='mt-[20px] px-[20px] py-[8px] rounded-full bg-primary text-white'>See more</Button>
        </Box>
      </Box>
      <Space h={60} />
      <Box className='px-[140px] flex  justify-between p-20'>
        <Box className='text-start ' w={600}>
          <Title>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Title>
          <Text my={18} c='dimmed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, odio. Numquam, quod dolores aut voluptatibus nostrum, nemo voluptates sequi in ad, ut perferendis totam dolore omnis possimus placeat voluptatum ipsum.</Text>
          <Button className='mt-[20px] px-[20px] py-[8px] rounded-full bg-primary text-white'>See more</Button>
        </Box>
        <Box className='flex gap-2 bg-slate-200 h-[300px] scale-150 -translate-x-24'>
            <Image 
              src='https://nextui.org/images/card-example-2.jpeg'
              className='w-[150px] h-full object-cover' 
              radius='none' 

            />
          <Box className='flex flex-col gap-2 bg-slate-200 h-[300px]'>
            <Image 
              src='https://nextui.org/images/card-example-2.jpeg'
              className='w-[150px] h-[146px] object-cover' 
              radius='none' 
            />
            <Image 
              src='https://nextui.org/images/card-example-2.jpeg'
              className='w-[150px] h-[146px]' 
              radius='none' 
            />
          </Box>
        </Box>
      </Box>
      <Space h={60} />

    </>
  )
}

export default About