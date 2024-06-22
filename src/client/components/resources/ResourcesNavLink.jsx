import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Space } from '@mantine/core'
import { Tabs, Tab } from '@nextui-org/react'
const ResourcesNavlink = ({tag}) => {
  return (
    <>
                    <Tab
                        key={tag.name}
                        title={
                            <div className="flex items-center space-x-2">
                            <span>{tag.name}</span>
                            </div>
                        }
                    />

            
    </>
  )
}

export default ResourcesNavlink