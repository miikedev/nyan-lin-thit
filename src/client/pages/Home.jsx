import React from 'react'
import { Space, Box, Card, Skeleton, Paper, Title } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import WeeklyHighlights from '../components/home/WeeklyHighlights'
import ResearchAndAdvocacy from '../components/home/ResearchAndAdvocacy'
import Statements from '../components/home/Statements'
import Blog from '../components/home/Blog'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Box className='flex flex-col gap-[100px]'>
        <Hero navigate={navigate} />

        <MissionVisionValues />

        <WeeklyHighlights navigate={navigate} />

        <ResearchAndAdvocacy />

        <Statements navigate={navigate}/>

        <Blog />

    </Box>
  )
}

export default Home