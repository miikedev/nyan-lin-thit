import React from 'react'
import { Image, Spacer } from '@nextui-org/react'
import { Title, Box, Text } from '@mantine/core'
import homeHeroImage from '../../../assets/home-hero.jpg'
const Hero = () => {
  return (
    <Box>
    <section className="w-full flex hero">
      <Spacer x={12} />
      <Box className="relative top-[100px]">
        <Title className='text-[60px]'>Nyan Lin Thit</Title>
        <button className="absolute right-[-100px] z-50 py-[10px] px-[40px] bg-primary text-white rounded-[10px] text-[55px]">Analytica</button>
        <Box className='relative top-[100px]'>
          <Text className='mt-10 mb-3 w-5/6'>It's a non-Textrofit organization that tends to political research, advocacy, and youth development.</Text>
          <button className='mt-[20px] px-[25px] py-[10px] rounded-full bg-primary text-white'>See more</button>
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