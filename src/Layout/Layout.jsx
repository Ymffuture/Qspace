import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (

        <SidebarProvider>
            <Topbar />
            <AppSidebar />
          
            <main className='w-[100%] border border-[#ffffff] shadow-md'>
                <div className='w-[100%] min-h-[calc(100vh-80px)] py-28 px-2'>
                    <Outlet />
                </div>
                <Footer />
            </main>
        </SidebarProvider>
    )
}

export default Layout