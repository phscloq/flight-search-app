'use client'
import { SearchProvider } from "../lib/SearchContext";
interface StructureProps {
    children: React.ReactNode;
  }

export default function Structure({children}:StructureProps){


    return (
<SearchProvider>
 
     {children}

     </SearchProvider>
    )
}