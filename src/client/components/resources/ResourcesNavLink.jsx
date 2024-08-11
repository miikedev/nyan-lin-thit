import { Tab } from '@nextui-org/react'
import React from 'react'
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