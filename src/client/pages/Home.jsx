import React from 'react'
import { Space, Box } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import WeeklyHighlights from '../components/home/WeeklyHighlights'
import ResearchAndAdvocacy from '../components/home/ResearchAndAdvocacy'
import Statements from '../components/home/Statements'
const Home = () => {
  return (
    <>
      <Hero />
      <Space h="xl" />
      <Box className="">
        <MissionVisionValues />
        <Space h="xl" />
        <WeeklyHighlights />
        <Space h="xl" />
        <ResearchAndAdvocacy />
        <Space h="xl" />
        <Statements />
      </Box>
    </>
  )
}

export default Home