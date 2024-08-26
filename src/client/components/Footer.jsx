import { Box, Text, Title } from '@mantine/core'
import { Button, Input, Link } from '@nextui-org/react'
import { useForm } from '@tanstack/react-form'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useSubscribe } from '../apis/subscribe'
import Logo from '../icons/Logo'
import SocialIcons from '../icons/socials/socialIcons'

const Footer = () => {
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const {pathname} = useLocation();
  const {mutate,isSuccess,isError,isIdle,isLoading,data,error} = useSubscribe();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async({ value }) => {
      setLoading(true)
      if(value.email.length > 0 && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.email)) {
        mutate(value,{
          onSuccess: () => {
            setLoading(false)
            setComplete(true)
            form.reset({email: ''})
          }
        });
      }
    },
  })
  return (
    <footer className={pathname === '/admin/login' ? 'hidden' : 'text-[#212121] py-[16px] sm:flex sm:flex-col sm:text-[16px] px-[20px]'}>
        <div className='flex flex-col gap-y-[24px] w-full items-center'>
            <Logo width={120}/>
            <Box className='lg:w-1/3 relative bottom-4'>
            {/* <form.Provider> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className={complete ? 'hidden' : 'flex w-full'}
              >
              <form.Field
                name="email"
                validators={{ onChange: ({value}) => { 
                  if(value.length == 0) { 
                    return 'Please enter a valid email address to subscribe'; 
                  } else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value)) { 
                    return 'Please enter a valid email address'; 
                  } else { 
                    return undefined; 
                  } 
                } }}
              >
                {(field) => (
                  <Box className='flex flex-col justify-start'>
                    <Input 
                      classNames={{
                        base: "border-1 border-primary-700 ",
                        input: "bg-transparent max-h-8 min-h-10 text-[12px] lg:text-[14px] text-[#21212180]"
                      }} 
                      name={field.name}
                      value={field.state.value}
                      onSubmit={field.onSubmit}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="email" 
                      radius='none' 
                      size='lg'
                      bordered 
                      placeholder='Enter your email now' 
                      className='lg:text-[13px] md:text-[13px] text-[10px] min-w-50 lg:min-w-96 md:min-w-80' 
                    />
                    {field.state.meta.errors ? (
                      <small role="alert" className='text-red-600 font-semibold'>{field.state.meta.errors.join(', ')}</small>
                    ) : null}
                  </Box>
                )}
              </form.Field>
              <Button isLoading={loading} type='submit' radius='none' className='text-[13px] min-w-24 md:min-w-36 bg-primary text-white' size='lg'>Subscribe Now</Button>
              </form>
              {/* </form.Provider> */}
              {/* <Box className={ ? 'flex lg:justify-center w-full justify-center' : 'hidden'}> */}
                <Text className={complete ? 'text-center w-full': 'hidden'} c={'blue'}>Thanks for subscribing!<br/>Please check your email for weekly communication.</Text>
              {/* </Box> */}
            </Box>
            <Title className='text-center'>Contact Us</Title>
            <Text size='xl' className='text-center'>loremispam@gmail.com</Text>
            <div className='px-[20px]' id='social'>
                {/* <p className='font-semibold text-center text-[14px] mb-3'>Follow Up</p> */}
                <div className='flex justify-center gap-[16px] font-light'>
                <Link href="https://www.facebook.com/quokkastudiomm" underline="always" className='text-sm text-[#343434]'>
                  <SocialIcons.FacebookIcon />
                </Link>
                <Link href="https://www.facebook.com/quokkastudiomm" underline="always" className='text-sm text-[#343434]'>
                  <SocialIcons.XIcon />
                </Link>
                <Link href="#" underline="always" className='text-sm text-[#343434]'>
                  <SocialIcons.InstagramIcon />
                </Link>
                <Link href="#" underline="always" className='text-sm text-[#343434]'>
                  <SocialIcons.TelegramIcon />
                </Link>
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