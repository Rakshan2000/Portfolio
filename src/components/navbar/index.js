"use clients";

import { Element, scroller } from "react-scroll";

import { useEffect, useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import { FaBars } from "react-icons/fa";
import './index.css';

const menuItems = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "education",
    label: "Education",
  },
  {
    id: "project",
    label: "Projects",
  },
];

function CreateMenus({ activeLink, setActiveLink, getMenuItems, closeMenu, isMobile }) {
  return getMenuItems.map((item) => (

    <LinkScroll
      key={item.id}
      activeClass="active"
      to={item.id}
      spy={true}
      smooth={true}
      duration={1000}
      onSetActive={() => setActiveLink(item.id)}
      className={`
        ${activeLink === item.id
          ? "text-yellow-main font-bold animation-active shadow-yellow-300"
          : "text-[#000] font-bold hover:text-yellow-main"
        }
        ${isMobile ? "nav-links" : "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative"}
      `}
      onClick={() => {
        setActiveLink(item.id);
        closeMenu();
        }}
    >
      {item.label}
    </LinkScroll>
  ));
}

export default function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);
  const [button, setButton] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 960);
    }
  };

  useEffect(() => {
    showButton();

    const handleResize = () => showButton();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div>
      <header
        className={`fixed top-0 w-full z-30 bg-yellow-Nav transition-all ${scrollActive ? "shadow-sm pt-0" : ""}`}
      >
        <nav className="max-w-screen-xl px-6 sm:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center justify-evenly">
            <div className="menu-icon hidden" onClick={handleClick}>
              <FaBars />
            </div>
            <div className="cursor-pointer flex gap-2 font-bold items-center text-[20px] text-yellow-main">
              <div className="w-[40px] h-[40px] flex justify-center items-center p-3 rounded-[8px] border-yellow-main bg-yellow-main">
                <span className="text-[#fff] text-[25px] font-bold">P</span>
              </div>
              ortfolio
            </div>

            <div className={click ? "nav-menu active" : "hidden lg:flex col-start-4 col-end-8 text-[#000] items-center"}>
              <ul>
                <CreateMenus
                  setActiveLink={setActiveLink}
                  activeLink={activeLink}
                  getMenuItems={menuItems}
                  closeMenu={closeMobileMenu}
                  isMobile={isMobile}
                />
              </ul>
              <div className="col-start-10 col-end-12 font-medium flex justify-center items-center">
                <button
                  onClick={() => {
                    setActiveLink("Contact");
                    setClick(false);
                    scroller.scrollTo("Contact", {
                      duration: 1500,
                      delay: 100,
                      smooth: true,
                    });
                  }}
                  className="py-3 px-6 border-[2px] bg-[#fff] border-yellow-main text-[#000] font-semibold rounded-lg text-xl tracking-widest hover:shadow-yellow-main transition-all outline-none"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
