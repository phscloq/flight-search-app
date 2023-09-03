'use client'
import React, { useState} from 'react';
import { useSearchContext } from '../lib/SearchContext';
import Link from 'next/link';
import FlightsList from './components/flightsList';
import SortButtons from './components/sortButtons';
import FilterFlights from '../lib/filterFlights';
function FlightPage() {
  const { isLoading, handleToggleFlights, filteredWDate, filteredWRoute, showAllFlights, returnFlights, searchParams } = useSearchContext();

  FilterFlights();
if(isLoading){
    return(
        
         <main className="flex min-h-screen flex-col items-center justify-center ">
         <h1>Loading...</h1>
         </main>
      
    )
}

  return (
    <main className="flex min-h-screen flex-column justify-center ">    
    <div className='w-full pt-10 sm:max-w-2xl'>
        <h1 className='text-center mb-12 font-bold text-2xl'>Available Flights</h1>
        <Link className='font-bold hover:underline' href='/'>{'<- Go back'}</Link>
        <div className='flex items-center justify-between mb-4 px-4'>
        <h3 className=' font-medium'>Sort by:</h3>
        
        </div>
      
       <SortButtons />
        <FlightsList 
        matchedFlights={filteredWDate}
        />
           <div className=' px-4 mb-4 '> 
                  <div className='p-4 bg-white  text-center w-full rounded shadow'>
                   {filteredWDate.length <=0 ?   <><p>There is no flights based on your search.</p></>: <><p>There is no additional flights matching the date you are searching.</p>
                      <p>Click the More button to see more flights on the same route </p></>                   
                     }
                     
                  
                    </div>
            </div>
          <div className={`flex justify-center ${filteredWDate.length ===0 ? 'hidden': ''} mb-2`}>
              <button className='px-4 py-2 rounded bg-blue-600 text-white 
              shadow hover:bg-blue-700' onClick={()=>handleToggleFlights()}>{showAllFlights ? 'Close': 'More'} </button>
          </div>

        {showAllFlights ? <FlightsList matchedFlights={filteredWRoute} /> : null}
        {returnFlights && searchParams.isRoundTrip ? <div className='px-4'>
        <h1 className=' mb-2 font-bold text-xl'> Return Flights:</h1>

        </div> : null}
        
        {returnFlights && searchParams.isRoundTrip ? <FlightsList matchedFlights={returnFlights}/> : null}
      </div>
    </main>
  );
}

export default FlightPage;
