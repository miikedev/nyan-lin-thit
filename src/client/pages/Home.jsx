import React from 'react'
import { Space, Box } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import WeeklyHighlights from '../components/home/WeeklyHighlights'
import ResearchAndAdvocacy from '../components/home/ResearchAndAdvocacy'
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
      </Box>
    </>
  )
}

export default Home