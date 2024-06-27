import React from 'react'
import { Image, Spacer, Button } from '@nextui-org/react'
import { Box, Text } from '@mantine/core'
import homeHeroImage from '../../../assets/home-hero.jpg'
const Hero = ({motion, navigate}) => {
  return (
    <>
      <Box className="w-full flex hero fix h-[640px] relative">
      <Spacer x={36} />
      <Box className="relative top-[100px] w-[840px]">
        <motion.h1 initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ duration: 0.2 }}  className='font-bold text-[70px]'>Nyan Lin Thit</motion.h1>
        <Button disableRipple={true} className="hover:bg-primary hover:bg-opacity-none absolute right-[-60px] z-20 px-4 py-8 bg-primary text-white w-48 text-3xl" radius='sm'>Analytica</Button>
        <Box className='relative top-[100px]'>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} 
            className='mt-10 mb-3 w-5/6'>It's a non-Textrofit organization that tends to political research, advocacy, and youth development.</motion.p>
          <Button onClick={()=>navigate('about')} className='mt-[20px] px-[20px] py-[8px] rounded-full bg-primary text-white'>See more</Button>
        </Box>
      </Box>
        <Image 
          src={homeHeroImage}
          radius='none'
        />
		  </Box>
    </>
  )
}

export default Hero