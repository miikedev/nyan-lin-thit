import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
// import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./Icons.jsx";
import Logo from "../icons/Logo";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "../icons/ChevronDown";
import { resources } from "../../utils/tags";

const Header = () => {
    const path = useLocation();
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        // scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        // lock: <Lock className="text-success" fill="currentColor" size={30} />,
        // activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        // flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        // server: <Server className="text-success" fill="currentColor" size={30} />,
        // user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };
    console.log(resources);
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <Navbar maxWidth="full">
        <NavbarBrand>
            <Logo width={100}/>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 full" justify="end">
            <NavbarItem isActive={path.pathname === '/' ? true : false}>
            <NavLink to='/' aria-current="page">
                Home
            </NavLink>
            </NavbarItem>
            <NavbarItem isActive={path.pathname === '/dashboard' ? true : false}>

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
                            <DropdownItem key={resource.name} className="bg-primary text-white">
                                <Link to={resource.to}>{capitalizeFirstLetter(resource.name)}</Link>
                            </DropdownItem>
                        )
                    })
                }
            </DropdownMenu>
            </Dropdown>
            <NavbarItem isActive={path.pathname === '/about' ? true : false}>
            <Link color="foreground" to='/about'>
                About
            </Link>
            </NavbarItem>
        </NavbarContent>
        
        </Navbar>
    );
}
export default Header;