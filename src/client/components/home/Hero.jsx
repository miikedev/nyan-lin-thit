import React from 'react'
import { Image, Spacer, Button } from '@nextui-org/react'
import { Title, Box, Text } from '@mantine/core'
import homeHeroImage from '../../../assets/home-hero.jpg'
const Hero = () => {
  return (
    <Box>
    <section className="w-full flex hero">
      <Spacer x={12} />
      <Box className="relative top-[100px]">
        <h1 className='text-[60px]'>Nyan Lin Thit</h1>
        <Button className="absolute right-[-60px] z-50 px-4 py-8 bg-primary text-white w-48 text-3xl" radius='sm'>Analytica</Button>
        <Box className='relative top-[100px]'>
          <Text className='mt-10 mb-3 w-5/6'>It's a non-Textrofit organization that tends to political research, advocacy, and youth development.</Text>
          <button className='mt-[20px] px-[20px] py-[8px] rounded-full bg-primary text-white'>See more</button>
        </Box>
      </Box>
      <Box className="">
        <Image src={homeHeroImage} className="w-full" radius='none'/>
      </Box>
		</section>
    </Box>
  )
}

export default Hero