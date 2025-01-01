"use client";

import './index.css';
import { useMemo, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import { CldImage} from "next-cloudinary";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub
} from "react-icons/fa";
//import Image from "next/image";
//import aiImage from "../assests/CKR.png"; // Correctly import the image

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

const socialIcons = [
  {
    id: "facebook",
    icon: (
      <a href="https://www.facebook.com/rakshanck/" target="_blank" rel="nonopener noreferrer">
      <FaFacebookF
        color="rgba(253, 216, 53, 1)"
        className="w-[40px] h-[40px] "
      />
      </a>
    ),
  },
  {
    id: "github",
    icon: (
      <a href="https://github.com/Rakshan2000" target="_blank" rel="noopener noreferrer" > 
      <FaGithub color="rgba(253, 216, 53, 1)" className="w-[40px] h-[40px] " />
      </a>
    ),
  },
  {
    id: "linkedin",
    icon: (
      <a href="https://www.linkedin.com/in/rakshanck2000/" target="_blank" rel="noopener noreferrer" >
      <FaLinkedinIn
        color="rgba(253, 216, 53, 1)"
        className="w-[40px] h-[40px]"
      />
      </a>
    ),
  },
  {
    id: "instagram",
    icon: (
      <a href="https://www.instagram.com/rakshan_chillana/" target="_blank" rel="noopener noreferrer">
        <FaInstagram
          color="rgba(253, 216, 53, 1)"
          className="w-[40px] h-[40px] "
        />
      </a>
    ),
  },
];

export default function ClientHomeView({ data }) {
  //console.log(data, "ClientHomeView");

  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="home">
      <AnimationWrapper>
        <motion.div
          className={
            " div-container grid grid-flow-row sm:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 "
          }
          variants={setVariants}
        >
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="mb-4 text-3xl lg:text-4xl xl:text-6xl font-medium leading-normal">
              {data && data.length
                ? data[0]?.heading
                    .split(" ")
                    .map((item, index) => (
                      <span
                      key={item._id}
                        className={`${
                          index === 2 || index === 3
                            ? "text-yellow-300"
                            : "text-[#000]"
                        }`}
                      >
                        {item}{" "}
                      </span>
                    ))
                : null}
            </h1>
            <p className="text-[#000] mt-4 mb-8 font-bold">
              {data && data.length ? data[0]?.summary : null}
            </p>
            <motion.div className="flex gap-3 cursor-pointer">
              {socialIcons.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    duration: 4,
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.8, rotate: -360, borderRadius: "100%" }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div ref={containerRef} className=" profile-div flex w-full justify-end">
            <div
              drag
              dragConstraints={containerRef}
              className="bg-modification"
            >
              {/*<div className="w-[400px] h-[400px] top-[40px] left-[-30px] rounded-lg border-[6px] border-[#000000] absolute"></div>*/}
              {/* <Image
                src={aiImage}
                alt="Profile Picture"
                layout="responsive"
                quality={100}
                height={300}
                width={300}
                className="absolute top-[-15px]"
              /> */}
              <CldImage width="400" height="300" quality={100}  src="h0naxuf2gdpbi6xrjlxa" className="absolute top-[-15px]"/>
            </div>
          </motion.div>
        </motion.div>
      </AnimationWrapper>
    </div>
  );
}