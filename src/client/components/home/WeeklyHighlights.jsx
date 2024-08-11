import { Box, Space, Text, Title } from '@mantine/core'
import { Button, Image } from '@nextui-org/react'
import { useResourceContext } from '../../context/ResourceContext'
const WeeklyHighlights = ({navigate}) => {
  const { setResource } = useResourceContext()
  return (
    <>
    <Box className='py-[20px] px-[140px] flex'>
      <Box>
          <Image width={640} radius='none' src="https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='weeklyhights homep image' />
      </Box>
      <Box className='px-[100px]'>
          <Space h={130} />
          <Title>Weekly Highlights</Title>
          <Space h={30} />
          <Text size='sm' w={460}>
              Explore our Weekly Highlights! We provide comprehensive reports 
              from four critical monitoring sessions: Armed Clash Monitor, SAC Monitor, NUG CRPH Monitor, and others.
          </Text>
          <Space h={30} />
          <Button 
            className='px-[20px] py-[8px] rounded-full bg-primary text-white' 
            onClick={()=>{
              navigate('resources/weekly-highlights/acm')
              setResource('weekly-highlights')
            }}>See more</Button>
      </Box>
    </Box>
    </>
  )
}

export default WeeklyHighlights