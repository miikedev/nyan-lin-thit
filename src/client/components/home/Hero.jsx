import React from 'react'
import { Image, Spacer, Button } from '@nextui-org/react'
import { Title, Box, Text } from '@mantine/core'
import { motion,  AnimatePresence } from 'framer-motion'
import homeHeroImage from '../../../assets/home-hero.jpg'
const Hero = ({navigate}) => {

  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }
  return (
    <>
    <AnimatePresence>
      <Box className="w-full flex hero">
        <Spacer x={36} />
        <Box className="relative top-[130px]">
          <motion.h1 
            className='text-[60px]' 
            initial={{ opacity: 0 }}
            animate={{ scale:1, opacity: 1 }}>
            Nyan Lin Thit
          </motion.h1>
          <Button className="absolute right-[-60px] z-20 px-4 py-8 bg-primary text-white w-48 text-3xl" radius='sm'>Analytica</Button>
          <Box className='relative top-[100px]'>
            <motion.p 
              className='mt-5 mb-3 w-5/6 block' 
              initial={{ opacity: 0 }}
              animate={{ scale:1, opacity: 1 }}
            >It's a non-Textrofit organization that tends to political research, advocacy, and youth development.</motion.p>
            <Button onClick={()=>navigate('about')} className='mt-[20px] px-[20px] py-[8px] rounded-full bg-primary text-white'>See more</Button>
          </Box>
        </Box>
        <Box className="">
          <Image src={homeHeroImage} className="w-full" radius='none'/>
        </Box>
      </Box>
    </AnimatePresence>
    </>
  )
}

export default Hero