'use clients'

import { Element, scroller } from 'react-scroll';

import { useEffect, useState } from "react"
import {Link as LinkScroll} from 'react-scroll' 

const menuItems =[
    {
        id: 'home',
        label : 'Home'
    },
    {
        id: 'about',
        label : 'About'
    },
    {
        id: 'experience',
        label : 'Experience'
    },
    {
        id: 'experience',
        label : 'Education'
    },
    {
        id: 'project',
        label : 'Projects'
    }
];

function CreateMenus({activeLink,setActiveLink,getMenuItems}){
    return getMenuItems.map(item => 
    <LinkScroll 
    activeClass="active"
    to={item.id}
    spy = {true}
    smooth={true}
    duration={1000}
    onSetActive={()=> setActiveLink(item.id)}
    className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative
        ${activeLink === item.id ? "text-green-main animation-active shadow-green-main" : "text-[#000] font-bold hover:text-green-main"}`
    }
    onClick={() => setActiveLink(item.id)}
    >
    {item.label}
    </LinkScroll>);
}
export default function NavBar() {

    const [activeLink, setActiveLink] = useState('home');
    const [scrollActive, setScrollActive] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            setScrollActive(window.screenY > 20);
        })
    })

    return <div>
        <header className={`fixed top-0 w-full z-30 bg-white-500 transition-all ${scrollActive ? "shadow-sm pt-0" : "pt-4"}`}>
            <nav className="max-w-screen-xl px-6 sm:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
                <div className="col-start-1 col-end-2 flex items-center justify-evenly">
                    <div className="cursor-pointer flex gap-2 font-bold items-center text-[20px] text-green-500">
                        <div className="w-[40px] h-[40px] flex justify-center items-center p-3 rounded-[8px] border-green-main bg-green-main">
                            <span className="text-[#fff] text-[25px] font-bold">P</span>
                        </div>
                        ortfolio
                    </div>
                    <ul className="hidden lg:flex col-start-4 col-end-8 text-[#000] items-center">
                        <CreateMenus 
                        setActiveLink={setActiveLink}
                        activeLink={activeLink}
                        getMenuItems={menuItems}
                        />
                    </ul>
                    <div className="col-start-10 col-end-12 font-medium flex justify-center items-center">
                        <button onClick={()=>{
                            setActiveLink(false)
                            scroller.scrollTo('Contact', {
                                duration: 1500,
                                delay: 100,
                                smooth: true
                                 // Scrolls to element + 50 pixels down the page
                                // ... other options
                              });
                        }}className="py-3 px-6 border-[2px] bg-[#fff] border-green-main text-[#000] font-semibold rounded-lg text-xl tracking-widest hover:shadow-green-main transition-all outline-none">
                            Contact Me
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        <nav className="overflow-x-auto fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t">
            <div className="bg-white-300 sm:px-3">
                <ul className="flex w-full justify-between items-center text-[#000]">
                <CreateMenus 
                    setActiveLink={setActiveLink}
                    activeLink={activeLink}
                    getMenuItems={menuItems}
                />
                </ul>
            </div>
        </nav>
    </div>
}