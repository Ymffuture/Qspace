import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/Topbar';
import AppSidebar from '@/components/AppSidebar';
import Footer from '@/components/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        {/* Topbar */}
        <Topbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:block md:w-[260px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
            <AppSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full h-full overflow-y-auto">
            <section className="w-full px-4 sm:px-6 lg:px-8 py-24">
              <Outlet />
            </section>

            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;

