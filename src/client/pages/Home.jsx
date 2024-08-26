import { Box } from '@mantine/core'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Blog from '../components/home/Blog'
import Hero from '../components/home/Hero'
import MissionVisionValues from '../components/home/MissionVisionValues'
import ResearchAndAdvocacy from '../components/home/ResearchAndAdvocacy'
import Statements from '../components/home/Statements'
import WeeklyHighlights from '../components/home/WeeklyHighlights'

const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    scrollTo(0,0)
  }, [pathname])
  return (
    <Box className='flex flex-col gap-[100px]'>
        <Hero navigate={navigate} motion={motion}/>

        <MissionVisionValues motion={motion}/>

        <WeeklyHighlights navigate={navigate} />

        <ResearchAndAdvocacy />

        <Statements navigate={navigate}/>

        <Blog />

    </Box>
  )
}

export default Home