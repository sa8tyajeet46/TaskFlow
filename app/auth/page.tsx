"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { GoogleSignIn } from './action';
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import hero from "@/public/images/hero.png";

function page() {
  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await GoogleSignIn();
    } catch (error: any) {
      throw new Error(error?.message || "Internal server Error");
    }
  };
  return (
    <div className="w-full h-full flex justify-between items-center ">
      {/* <div className="w-full h-full absolute flex md:hidden bg-[linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5))] "></div> */}
      <div className="w-full flex h-full inset-0 items-center md:px-16 px-8 md:w-1/2 md:bg-none bg-[url('/images/hero.png')] bg-cover bg-no-repeat bg-opacity-50">
        <div className="absolute inset-0 bg-white opacity-30"></div>

        <div className="flex flex-col sm:space-y-8 space-y-4 z-10">
          <div className="flex flex-row items-center text-4xl space-x-5 font-bold">
            <Image src={logo} width={75} height={75} alt="logo" />
            <div>Taskflow</div>
          </div>
          <p className=" font-medium sm:text-[18px] text-[16px]">
            Effortlessly organize, track, and complete projects with TaskFlow -
            the all-in-one project management solution designed for teams of any
            size. Our intuitive interface transforms complex workflows into
            clear, actionable steps while powerful collaboration tools keep
            everyone aligned toward shared goals. Experience the perfect balance
            of simplicity and functionality that adapts to your unique workflow,
            not the other way around.
          </p>
          <Button
            variant="taskFlow"
            onClick={handleGoogleSignIn}
            className="w-60 text-xl font-medium medium border border-black !py-8 !rounded-full hover:border-transparent"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="w-1/2  h-full items-center hidden md:flex">
        <div className="w-full h-full relative">
          <Image src={hero} fill alt="hero" />
        </div>
      </div>
    </div>
  );
}

export default page