"use client";

import React, { useMemo, useState, useEffect} from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { CldImage} from "next-cloudinary";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const skillItemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function ClientAboutView({ data }) {
  //console.log(data, "aboutdata");
  const [publicIds, setPublicIds] = useState([]);

  useEffect(() => {
    const fetchPublicIds = async () => {
      try {
        const response = await fetch("/api/image/get");
        const result = await response.json();
        if (result.success) {
          setPublicIds(result.data); // Set the publicIds state
        }
      } catch (error) {
        console.error("Error fetching public IDs:", error);
      }
    };

    fetchPublicIds();
  }, []);

  const setVariants = useMemo(() => variants(), []);

  const aboutDataInfo = [
    {
      label: "Client",
      value: data?.Clients || "0",
    },
    {
      label: "Projects",
      value: data?.Projects || "0",
    },
    {
      label: "Experience",
      value: data?.Experience || "0",
    },
  ];

  const headingText = "Why Hire Me For Your Next Project ?";

  return (
    <div
      className="max-w-screen-xl mt-24 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="about"
    >
      <div className="w-full flex">
        <AnimationWrapper className="rounded-lg w-full grid-flow-row grid grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-green-main bg-white-500 z-10">
          {aboutDataInfo.map((infoItem, index) => (
            <motion.div
              className={`flex items-center justify-start
                ${
                  index === 0
                    ? "sm:justify-start"
                    : index === 1
                    ? "sm:justify-center"
                    : "sm:justify-end"
                } py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0
                `}
              key={index}
              custom={{ duration: 2 + index }}
              variants={setVariants}
            >
              <div className="flex m-0 w-40 sm:w-auto">
                <div className="flex flex-col">
                  <p className="text-[50px] text-yellow-main font-bold">
                    {infoItem.value}+
                  </p>
                  <p className="text-[25px] font-bold text-[#000000]">
                    {infoItem.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimationWrapper>
      </div>
      <AnimationWrapper className={"pt-6"}>
        <div className="flex flex-col justify-center items-center row-start-2 sm:row-start-1">
          <h1 className="leading-[70px] mb-4 text-3xl lg:text-4xl xl:text-5xl font-medium">
            {headingText.split(" ").map((item, index) => (
              <span
                className={`${
                  index === 6 ? "text-yellow-main" : "text-[#000]"
                }`}
              >
                {item}{" "}
              </span>
            ))}
          </h1>
          <p className="text-[#000] mt-4 mb-8 font-bold">{data?.AboutMe}</p>
        </div>
      </AnimationWrapper>
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8">
        <AnimationWrapper className="flex w-full">
          <motion.div variants={setVariants} className="h-full w-full p-4">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                { publicIds.map((id, index) => (
                <CarouselItem key={index}>
                  {" "}
                  <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                    <CldImage
                      src={id}
                      alt="First slide"
                      fill
                      quality={100}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>
        </AnimationWrapper>
        <AnimationWrapper className={"flex items-center w-full p-4"}>
          <motion.div
            variants={setVariants}
            className="grid gap-4 grid-cols-3 h-full max-h-[200px] w-full "
          >
            {data?.Skills ? (
              data.Skills.split(",").map((skill) => (
                <motion.div
                  key={skill}
                  className="w-full flex justify-center items-center"
                  variants={skillItemVariant}
                >
                  <button className="skill-buttons whitespace-nowrap text-ellipsis overflow-hidden py-3 w-[160px] px-6 border-[2px] border-yellow-main bg-[#fff] text-[#000] font-semibold rounded-lg text-xl tracking-widest hover:shadow-yellow-main transition-all outline-none">
                    {skill}
                  </button>
                </motion.div>
              ))
            ) : (
              <p>No skills available.</p>
            )}
          </motion.div>
        </AnimationWrapper>
      </div>
    </div>
  );
}
