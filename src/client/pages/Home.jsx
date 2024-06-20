import React from 'react'
import { Space } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import WeeklyHighlights from '../components/home/WeeklyHighlights'

const Home = () => {
  return (
    <>
      <Hero />
      <Space h="xl" />
      <MissionVisionValues />
      <Space h="xl" />
      <WeeklyHighlights />
    </>
  )
}

export default Home