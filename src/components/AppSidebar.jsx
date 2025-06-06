import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '@/assets/images/LogB.png'
import { IoCaretBackCircleOutline, IoHomeOutline, IoLogoFacebook, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";

const AppSidebar = () => {
    const [loader ,setLoader] = useState(true)
    const user = useSelector(state => state.user)
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })
   useEffect(()=>{
    setTimeout(()=>{
        setLoader(false)
    },5000)
   },[])
   if (loader) return <div className="bg-[gray] animate-pulse transition-all"></div>
    return (

        <Sidebar className='select-none'>
            <SidebarHeader className="bg-[white] text-gray-200 relative md:w-[full] md:h-[70px]">

            {/* <img src={logo} className='md:w-[148px] md:h-[83px] w-6' /> */}
            </SidebarHeader>
            <SidebarContent className="bg-[white] text-[gray]">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link to={RouteIndex}>
                            <SidebarMenuButton>
                                <IoHomeOutline />
                                <Link to={RouteIndex}>Home</Link>
                            </SidebarMenuButton>
                            </Link>
                           
                        </SidebarMenuItem>

                        {user && user.isLoggedIn
                            ? <>
                                <SidebarMenuItem>
                                <Link to={RouteBlog}>
                                <SidebarMenuButton>
                                        <GrBlog />
                                        <Link to={RouteBlog}>Blogs</Link>
                                    </SidebarMenuButton>
                                
                                </Link>
                                  
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                <Link to={RouteCommentDetails}>
                                <SidebarMenuButton>
                                        <FaRegComments />
                                        <Link to={RouteCommentDetails}>Comments</Link>
                                    </SidebarMenuButton>
                                </Link>
                                    
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
                        {user && user.isLoggedIn && user.user.role === 'admin'
                            ? <>
                                <SidebarMenuItem >
                                    <SidebarMenuButton >
                                        <IoCaretBackCircleOutline/>
                                        <BiCategoryAlt />
                                        <Link to={RouteCategoryDetails}
                                       >
                                            Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <LuUsers />
                                        <Link to={RouteUser}>Users</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }

                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup >
                    <SidebarGroupLabel  className='text-[#a5a5a5]'>
                        
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0
                            && categoryData.category.map(category => <SidebarMenuItem key={category._id}>
                                <SidebarMenuButton>
                                    <GoDot />
                                    <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>)
                        }

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <hr className="border-0 shadow-lg"/>
          
            <div className='text-[12px] text-center bg-[#23272E] text-white py-4'>
            © 2025 | Qspace powered by <a href='https://quorvexinstitute.vercel.app' className='font-bold text-[#707070]'>Quorvex</a>
        </div>
        </Sidebar>
    )
}

export default AppSidebar
