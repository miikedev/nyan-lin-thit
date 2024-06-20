import React from 'react'
import { Space } from '@mantine/core'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'

const Home = () => {
  return (
    <>
      <Hero />
      <Space h="xl" />
      <MissionVisionValues />
    </>
  )
}

export default Home