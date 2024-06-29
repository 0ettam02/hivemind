"use client";
import React, { useState } from "react";
import Link from "next/link";
import Idea from "./idea";
import { toggle } from "@nextui-org/react";

export default function Header() {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="grid grid-cols-2 place-items-center gap-10 text-white bg-gradient-to-r from-purple-400 to-green-200 md:gap-0">
        <Link
          className="font-bold text-4xl md:ml-5 md:justify-self-start"
          href="/"
        >
          HiveMind
        </Link>

        {visible ? (
          <Link onClick={toggleVisible} href={"/login"} className=" justify-self-end mr-5 font-bold bg-purple-400 rounded-lg border-2 border-white p-1">
            Login
          </Link>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <Link className="" href={"/guida"}>
                What is hivemind
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
