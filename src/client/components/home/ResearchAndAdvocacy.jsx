import { Box, Space } from '@mantine/core'
import { Image } from '@nextui-org/react'
import React from 'react'

const ResearchAndAdvocacy = () => {
  return (
    <>
        <Box className='flex px-[70px] py-[20px] justify-center'>
        <Box className='pe-[100px] flex flex-col justify-center items-start w-1/2 p-5'>
            <h1 className='font-semibold text-lg mb-4'>Research & Monitoring</h1>
            <ul className='text-black list-disc px-5 text-sm flex flex-col gap-y-2'>
                <li>Research Paper Series</li>
                <li>Special Report</li>
                <li>Weekly Highlights</li>
            </ul>
            <Space h={'lg'} />
            <h1 className='font-semibold text-lg mb-4'>Advocacy</h1>
            <ul className="list-disc px-5 text-sm flex flex-col gap-y-2">
                <li>Regional Advocacy</li>
                <li>International Advocacy</li>
                <li>Public Engagement</li>
            </ul>
            <Space h={'lg'} />
            <h1 className='font-semibold text-lg mb-4'>Traning</h1>
            <ul className="list-disc px-5 text-sm flex flex-col gap-y-2">
                <li>Youth Empowerment</li>
                <li>Civic Education</li>
                <li>Reading Materials</li>
            </ul>
        </Box>
        <Box justify="end">
            <Image width={640} radius='none' src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='research and advocacy home image' />
        </Box>
        </Box>
    </>
  )
}

export default ResearchAndAdvocacy