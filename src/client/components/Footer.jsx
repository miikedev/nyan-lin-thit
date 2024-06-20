import React, { useState } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Title, Text, Box } from '@mantine/core'
import { Link, Button, Input } from '@nextui-org/react'
import Logo from '../icons/Logo'

const Footer = () => {
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const {pathname} = useLocation();
  return (
    // <footer className='bg-slate-800'>
    //   <Container size="100rem" className='bg-white'>
    //     <div id='logo'>
    //       <Logo />
    //     </div>
    //     <div id='newsletter'></div>
    //     <div id='social'></div>
    //     <div id="copyright"></div>
    //   </Container>
    // </footer>
    <footer className={pathname === '/admin/login' ? 'hidden' : 'text-[#212121] bg-none py-[16px] sm:flex sm:flex-col sm:text-[16px] px-[20px]'}>
        <div className='flex flex-col gap-y-[24px] w-full items-center'>
            <Logo width={150}/>
            <Box className='lg:w-3/6 bg-none flex'>
                <Input classNames={{
                    base: "bg-primary text-[5px] border-1 border-primary",
                    label: "text-[#dfdfdf] font-bold"
                }} type="email" radius='none' size='lg' bordered placeholder='Enter your email now' />
                <Button radius='none' className='py-3 text-[13px] bg-primary text-secondary' size='lg'>Subscribe Now</Button>
            </Box>
            <Title className='text-center'>Contact Us</Title>
            <Text size='xl' className='text-center'>loremispam@gmail.com</Text>
            <div className='px-[20px]' id='social'>
                {/* <p className='font-semibold text-center text-[14px] mb-3'>Follow Up</p> */}
                <div className='flex justify-center gap-[16px] font-light'>
                <Link href="https://www.facebook.com/quokkastudiomm" underline="always" className='text-sm text-[#343434]'>Facebook</Link>
                <Link href="https://www.facebook.com/quokkastudiomm" underline="always" className='text-sm text-[#343434]'>X</Link>
                <Link href="#" underline="always" className='text-sm text-[#343434]'>Telegram</Link>
                <Link href="#" underline="always" className='text-sm text-[#343434]'>Youtube</Link>
                </div>
            </div>
            <div className='copyright flex justify-between text-[10px] sm:text-[12px] w-full  font-light'>
                <span>2024 Nyan Lin Thit Analytica | All rights reserved.</span>
                <span>Developed by Quokka Studio</span>
            </div>
        </div>

      {/* <ToastContainer limit={1} pauseOnFocusLoss={false}/> */}
    </footer>
  )
}

export default Footer