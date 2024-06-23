import React from 'react'
import { Space, Box } from '@mantine/core'
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
    <Box>
        <Hero />
        <Space h="xl" />

        <Space h="md" />
        <Space h="xl" />
        <MissionVisionValues />
         <Space h="md" />
        <Space h="xl" />
        <WeeklyHighlights navigate={navigate} />
        <Space h="md" />
        <Space h="xl" />
        <ResearchAndAdvocacy />
        <Space h="md" />
        <Space h="xl" />
        <Statements navigate={navigate}/>
        <Space h="md" />
        <Blog />

    </Box>
  )
}

export default Home