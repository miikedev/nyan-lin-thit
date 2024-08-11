import { Box } from '@mantine/core'
import React from 'react'

import './style.css'


const ImageSection = () => {
  return (
    <Box className='h-[400px]'>
        <div className="body">
          <section className="main">
            <div className="outer">
              {
                Array.from({ length: 8 }).map((e, index) => {
                  return (<div className="inner" key={index}>
                      <div className="slide">
                        <img src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg" alt=""/>
                      </div>
                  </div>)
                } )
              }
            </div>
          </section>
        </div>
    </Box>
  )
}

export default ImageSection