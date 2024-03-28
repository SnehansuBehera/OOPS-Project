"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps {
    children: React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname == '/',
            href: '/'

        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname == '/search',
            href: '/search'

        },
        {
            icon: FaUserDoctor,
            label: 'Doctor',
            active: pathname == '/doctor',
            href: '/doctor'

        },


    ], [pathname]);
    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-4 h-full w-[150px] p-2 mt-4">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />

                        ))}
                        <UserButton />
                    </div>
                </Box>

            </div>
            <main className="h-full flex flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>);
}

export default Sidebar;