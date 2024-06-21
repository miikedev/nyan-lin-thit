import React from 'react'
import { Space, Box } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import WeeklyHighlights from '../components/home/WeeklyHighlights'
import ResearchAndAdvocacy from '../components/home/ResearchAndAdvocacy'
import Statements from '../components/home/Statements'
import Blog from '../components/home/Blog'
const Home = () => {
  return (
    <>
      <Hero />
      <Space h="xl" />
      <Box className="">
        <Space h="md" />
        <Space h="xl" />
        <MissionVisionValues />
        <Space h="md" />
        <Space h="xl" />
        <WeeklyHighlights />
        <Space h="md" />
        <Space h="xl" />
        <ResearchAndAdvocacy />
        <Space h="md" />
        <Space h="xl" />
        <Statements />
        <Space h="md" />
        <Blog />
      </Box>
    </>
  )
}

export default Home