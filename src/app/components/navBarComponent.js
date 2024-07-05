import React from "react";
import Link from "next/link";

export default function NavBarComponent() {
  return (
    <>
      <div className="text-7xl text-white grid place-items-center mt-5 md:grid-cols-3 md:text-8xl">
        <Link href={"/"}>
          <h1 className="font-bold text-shadow">POSTS</h1>
        </Link>
        <Link href={"/trends"}>
          <h1 className="font-bold text-shadow">TRENDS</h1>
        </Link>
        <Link href={"/guida"}>
          <h1 className="font-bold text-shadow">WHAT</h1>
        </Link>
      </div>
    </>
  );
}