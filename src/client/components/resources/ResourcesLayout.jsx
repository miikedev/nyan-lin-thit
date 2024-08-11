import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Tab, Tabs } from '@nextui-org/react'
import { useAnimate } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { others } from '../../../utils/tags'
import { capitalizeFirstLetter } from '../../../utils/utils'
import { PaginationProvider } from '../../context/PaginationContext'
import { useResourceContext } from '../../context/ResourceContext'
import { useSearchContext } from '../../context/SearchContext'
import { ChevronDown } from '../../icons/ChevronDown'
import { SearchIcon } from '../../icons/SearchIcon'
const ResourcesLayout = ({weeklyHighlightsTags, publicationTags, statementTags, advocacyTags}) => {
    const [scope, animate] = useAnimate();
    const { pathname } = useLocation()
    const [tags, setTags] = useState([]);
    const [text, setText] = useState('')
    const { resource } = useResourceContext();

    const { searchingText, setSearchingText } = useSearchContext();
    const darkMode = true;
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
    };
    useEffect(() => {
        if (resource == 'weekly-highlights') setTags(weeklyHighlightsTags);
        if (resource == 'publications') setTags(publicationTags);
        if (resource == 'statements') setTags(statementTags);
        if (resource == 'advocacy') setTags(advocacyTags);
    }, [resource])

    return (
        <div className="sm:py-15vh py-[6vh] sm:px-10 px-4">
            <div className="pb-2 border-gray-300 flex sm:flex-row flex-col justify-between items-center">
            <nav className="flex flex-col justify-center sm:flex-row gap-2">
                <Tabs
                    // selectedKey={pathname}
                    aria-label="Options"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-primary",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-primary"
                    }}
                    className='text-primary'
                >
                    {tags.map(tag => (
                        <Tab
                            id={tag.to}
                            key={tag.to}
                            title={
                                <div className="flex items-center space-x-2">
                                    {tag.to === 'others' ? 
                                        <Dropdown 
                                            radius="none"
                                            classNames={{
                                                content: "p-0 border-small border-divider bg-primary p-1",
                                            }}
                                        >
                                            <DropdownTrigger>
                                            <Button
                                                // disableRipple
                                                className="p-0 font-semibold text-[16px] bg-transparent data-[hover=true]:bg-transparent"
                                                radius="sm"
                                                variant="light"
                                                endContent={icons.chevron}
                                            >
                                                Others  
                                            </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="resources weekly hightlights others"
                                                className="w-[190px] p-0 m-0"
                                                itemClasses={{
                                                base: "gap-4 rounded-none m-0",
                                                list: "bg-primary"
                                                }}
                                            >
                                                {
                                                    others.map((other) => {
                                                        return (
                                                            <DropdownItem key={other.name} className="bg-primary text-white">
                                                                <NavLink to={`${resource}/${other.to}?category=${other.category}`}>{capitalizeFirstLetter(other.name)}</NavLink>
                                                            </DropdownItem>
                                                        )
                                                    })
                                                }
                                            </DropdownMenu>
                                        </Dropdown>
                                    : 
                                        <NavLink to={`${resource}/${tag.to}`}>{tag.name}</NavLink>
                                    }
                                </div>
                            }
                        />
                    ))}
                </Tabs>
            </nav>
            {/* <NavLink
                to="search"
                state={{ prevPath: pathname }}
                className="hidden sm:block"
            >
                {({ isActive }) => ( */}
                <span 
                    ref={scope}
                    className='relative top-6 lg:top-0 xl:top-0 md:top-0'>
                    <Button 
                        className="absolute bottom-0 right-0 z-10 bg-none scale-85" 
                        isIconOnly 
                        aria-label='search' 
                        variant='none'
                        onClick={()=>setSearchingText(text)} 
                    >
                    <SearchIcon  />
                    </Button>
                    <Input
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                        type='text' 
                        size="md"
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter') {
                                setSearchingText(e.target.value)
                            }
                        }}
                    />
                </span>
                {/* )} */}
            {/* </NavLink> */}
            </div>
            <PaginationProvider>
                <Outlet />
            </PaginationProvider>
        </div>

  )
}

export default ResourcesLayout