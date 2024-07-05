"use client";
import React from "react";
import Container from "./components/container";
import Idea from "./components/idea";
import NavBarComponent from "./components/navBarComponent";
import Header from "./components/header";

export default function Home() {
  return (
    <>
        <Header />
        <Idea />
        <NavBarComponent />
        <Container />
    </>
  );
}

