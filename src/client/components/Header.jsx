import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { resources } from "../../utils/tags";
import { useResourceContext } from "../context/ResourceContext";
import { ChevronDown } from "../icons/ChevronDown";
import Logo from "../icons/Logo";

const Header = () => {
    const navItems = [
        { to: '/', name: 'Home'},
        { to: '/dashboard', name: 'Dashboard'},
        { name: 'resources'},
        { to: '/about', name: 'About'}
    ]
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {pathname} = useLocation();
    const { resource, setResource } = useResourceContext();

    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        // scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        // lock: <Lock className="text-success" fill="currentColor" size={30} />,
        // activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        // flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        // server: <Server className="text-success" fill="currentColor" size={30} />,
        // user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };
    useEffect(()=>setIsMenuOpen(false),[pathname]);
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
    
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
      
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
             <Link to="/">
                 <Logo width={100}/>
             </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4 full py-[20px]" justify="end">
            <NavbarItem isActive={pathname === '/' ? true : false}>
            <NavLink to='/' aria-current="page">
                Home
            </NavLink>
            </NavbarItem>
            <NavbarItem isActive={pathname === '/dashboard' ? true : false}>

            <NavLink color="foreground" to='/dashboard'>
                Dashboard
            </NavLink>
            </NavbarItem>
            <Dropdown 
                radius="none"
                classNames={{
                    content: "p-0 border-small border-divider bg-primary p-1",
                }}
                >
                <NavbarItem>
                    <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 font-semibold text-[16px] bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                        variant="light"
                        endContent={icons.chevron}
                    >
                        Resources
                    </Button>
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                    aria-label="ACME features"
                    className="w-[190px] p-0 m-0"
                    itemClasses={{
                    base: "gap-4 rounded-none m-0",
                    list: "bg-primary"
                    }}
                >
                    {
                        resources.map((resource) => {
                            const capitalize = capitalizeFirstLetter(resource.name);
                            return (
                                <DropdownItem key={resource.name} onClick={()=>setResource(resource.name)} className="bg-primary text-white">
                                    <Link to={resource.to}>{capitalizeFirstLetter(resource.name)}</Link>
                                </DropdownItem>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
            <NavbarItem isActive={pathname === '/about' ? true : false}>
            <Link color="foreground" to='/about'>
                About
            </Link>
            </NavbarItem>
        </NavbarContent>
      
      <NavbarMenu>
        {
            navItems.map((item, index) => {
                if(item.name === 'resources') return (
                    <Dropdown 
                        key={index}
                        radius="none"
                        classNames={{
                            content: "p-0 border-small border-divider bg-primary p-1",
                        }}
                        >
                        <NavbarItem>
                            <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 font-semibold text-[16px] bg-transparent data-[hover=true]:bg-transparent"
                                radius="sm"
                                variant="light"
                                endContent={icons.chevron}
                            >
                                Resources
                            </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
                            className="w-[190px] p-0 m-0"
                            itemClasses={{
                            base: "gap-4 rounded-none m-0",
                            list: "bg-primary"
                            }}
                        >
                            {
                                resources.map((resource) => {
                                    const capitalize = capitalizeFirstLetter(resource.name);
                                    return (
                                        <DropdownItem key={resource.name} onClick={()=>setResource(resource.name)} className="bg-primary text-white">
                                            <Link to={resource.to}>{capitalizeFirstLetter(resource.name)}</Link>
                                        </DropdownItem>
                                    )
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
                )
                
                return  <NavbarMenuItem key={`${item}-${index}`}>
                            <NavLink
                                className="w-full"
                                to={item.to}
                                size="lg"
                            >
                            {item.name}
                            </NavLink>
                        </NavbarMenuItem>
          }
        )}
      </NavbarMenu>
    </Navbar>
    );
}
export default Header;