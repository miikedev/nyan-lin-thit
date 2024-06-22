import React from 'react'
import { useLocation, NavLink, Outlet, Link } from 'react-router-dom'
import { SearchIcon } from '../../icons/SearchIcon'
import { Tabs, Tab, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button } from '@nextui-org/react'
import { ChevronDown } from '../../icons/ChevronDown'
import { capitalizeFirstLetter } from '../../../utils/utils'
import { others } from '../../../utils/tags'
const ResourcesLayout = ({tags}) => {
    const path = useLocation();
    const darkMode = true;
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        // scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        // lock: <Lock className="text-success" fill="currentColor" size={30} />,
        // activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        // flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        // server: <Server className="text-success" fill="currentColor" size={30} />,
        // user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };
  return (
            <div className="sm:py-15vh py-[6vh] sm:px-10 px-4">
            <div className="pb-2 border-gray-300 flex sm:flex-row flex-col justify-between items-center">
            <nav className="flex flex-col justify-center sm:flex-row gap-2">
                {/* <Tabs
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
                    {
                        tags.map(tag => {
                            if(tag.to ==='others') {
                                return (
                                    <h1>Others</h1>
                                )
                            } else{
                                return (
                                    <Tab
                                        key={tag.name}
                                        title={
                                            <div className="flex items-center space-x-2">
                                            <span>{tag.name}</span>
                                            </div>
                                        }
                                    />
                                )
                            }
                        })
                    }
                </Tabs> */}
                
                <Tabs
                    // selectedKey={path.pathname}
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
                            href={tag.to == 'others' ? '' : tag.to}
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
                                                disableRipple
                                                className="p-0 font-semibold text-[16px] bg-transparent data-[hover=true]:bg-transparent"
                                                radius="sm"
                                                variant="light"
                                                endContent={icons.chevron}
                                            >
                                                Others  
                                            </Button>
                                            </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="ACME features"
                                            className="w-[190px] p-0 m-0"
                                            itemClasses={{
                                            base: "gap-4 rounded-none m-0",
                                            list: "bg-primary"
                                            }}
                                        >
                                            {
                                                others.map((resource) => {
                                                    console.log('others url',resource);
                                                    const capitalize = capitalizeFirstLetter(resource.name);
                                                    return (
                                                        <DropdownItem key={resource.name} className="bg-primary text-white">
                                                            <Link to={resource.to}>{capitalizeFirstLetter(resource.name)}</Link>
                                                        </DropdownItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenu>
                                        </Dropdown>
                                    : tag.name}
                                </div>
                            }
                        />
                    ))}
                </Tabs>
            </nav>
            <NavLink
                to="search"
                state={{ prevPath: location.pathname }}
                className="hidden sm:block"
            >
                {({ isActive }) => (
                <p
                    className={`${
                    darkMode ? "bg-transparent border-white border" : "bg-gray-200"
                    } py-2 px-2 mt-2  rounded-full transition-transform ${
                    isActive ? "border " : " "
                    }`}
                >
                    <SearchIcon />
                </p>
                )}
            </NavLink>
            </div>
            <Outlet />
            </div>

  )
}

export default ResourcesLayout