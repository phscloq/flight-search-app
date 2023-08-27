'use client'
import { GetData } from "./data/data";
import Search from "./components/search"
import { useState, useEffect } from "react";
export default  function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <h1 className=' text-5xl mb-12 font-bold'>Best Flight</h1>
      <Search
    
      />
     
     
      
    </main>
  )
}
