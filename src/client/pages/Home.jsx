import React from 'react'
import { Space, Box, Card, Skeleton, Paper, Title } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import WeeklyHighlights from '../components/home/WeeklyHighlights'
import ResearchAndAdvocacy from '../components/home/ResearchAndAdvocacy'
import Statements from '../components/home/Statements'
import Blog from '../components/home/Blog'
import { useNavigate } from 'react-router-dom'
import { useResourcesData } from '../apis/resourcesData'
const Home = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, isSuccess } = useResourcesData('statements');

  return (
    <Box className='flex flex-col gap-[100px]'>
        <Hero navigate={navigate} />

        <MissionVisionValues />

        <WeeklyHighlights navigate={navigate} />

        <ResearchAndAdvocacy />

        {
          isSuccess && 
          <Statements navigate={navigate} data={data} isLoading={isLoading} isSuccess={isSuccess}/>
        }

        <Blog />

    </Box>
  )
}

export default Home