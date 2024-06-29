"use client"
import React from "react";
import Link from "next/link";

export default function Idea() {
  return (
    <>
      <div className="text-white font-bold text-6xl bg-gradient-to-r from-purple-400 to-green-200 h-screen mt">
        <div className="grid grid-rows-2 place-items-center md:place-items-start md:max-w-[10em] md:ml-20">
          <h1 className="mt-20 md:mt-20">Do you have an idea?</h1>
          <div>
          <p className="text-4xl md:mt-5">Start from here</p>
          </div>
          <Link href="/post" className="bg-purple-400 text-white rounded-lg p-6 border-2 hover:animate-bounce hover:bg-white hover:text-purple-400 hover:border-purple-400 duration-500">
            +
          </Link>
          <img className="w-[5em] h-[5em] opacity-0 image-width-normal image-height-normal md:absolute md:opacity-100 your-image-class-normalMonitor your-image-class-bigMonitor" src="/persone.png"></img>
        </div>
      </div>
    </>
  );
}
