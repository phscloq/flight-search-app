'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchContext } from '../lib/SearchContext';
import { Flight } from '../data/types'; 
import Link from 'next/link';
function FlightPage() {
  const { searchParams, flights, isLoading, setIsLoading, detailsVisible, setDetailsVisible } = useSearchContext();
  const [showAllFlights, setShowAllFlights] = useState<boolean>(false); 
  const [matchingFlights, setMatchingFlights] = useState<Flight[]>([]);
  const [sortType, setSortType] = useState<keyof Flight>('departure_time');


    console.log(flights)
    useEffect(() => {
      if (flights) {
            const filteredFlights = flights.filter((flight: Flight) =>
              flight.departure_city === searchParams.departureCity &&
              flight.arrival_city === searchParams.arrivalCity
            );
            console.log(filteredFlights)
            const sortArray = (flightsToSort: Flight[], sortBy: keyof Flight) => {
                const sorted = [...flightsToSort].sort((a, b) => {
                  if (sortBy === 'departure_time' || sortBy === 'arrival_time') {
                    return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
                  } else {
                    return Number(a[sortBy]) - Number(b[sortBy]);
                  }
                });
                return sorted;
              };
          
        
              try {
                const sortedFlights = sortArray(filteredFlights, sortType);
                console.log(sortedFlights);
                setMatchingFlights(sortedFlights);
                setDetailsVisible(new Array(sortedFlights.length).fill(false));
              } catch (error) {
                console.error('Error sorting flights:', error);
              }
          
            }
      }, [searchParams, flights, sortType]);
  



const formatTime = (isoTimestamp: any) => {
    const timestamp = new Date(isoTimestamp).getTime();
    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12:false
    });
    return formattedTime;
  };
  const formatDate = (isoTimestamp: any) => {
    const timestamp = new Date(isoTimestamp).getTime();
    const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formattedDate;
  };


if(isLoading){
    return(
        
         <main className="flex min-h-screen flex-col items-center justify-center ">
         <h1>Loading...</h1>
         </main>
      
    )
}
const handleToggleFlights = () => {
    setShowAllFlights(!showAllFlights);
  };
  return (
    <main className="flex min-h-screen flex-column justify-center ">    
    <div className='w-full pt-10 sm:max-w-2xl'>
        <h1 className='text-center mb-12 font-bold text-2xl'>Available Flights</h1>
        <Link className='font-bold hover:underline' href='/'>{'<- Go back'}</Link>
        <div className='flex items-center justify-between mb-4 px-4'>
        <h3 className=' font-medium'>Sort by:</h3>
        
        </div>
      
        <div className='flex justify-evenly mb-4'>
          <button className='px-4 py-2 rounded bg-blue-600 text-white  shadow hover:bg-blue-700' onClick={() => setSortType('departure_time')}>Departure T.</button>
          <button className='px-4 py-2  bg-blue-600 text-white  shadow hover:bg-blue-700 rounded'onClick={() => setSortType('arrival_time')}>Arrival T.</button>
          <button className=' px-4 py-2 rounded bg-blue-600 text-white  shadow hover:bg-blue-700 'onClick={() => setSortType('duration')}>Duration</button>
          <button className=' px-4 py-2 rounded bg-blue-600 text-white  shadow hover:bg-blue-700'onClick={() => setSortType('price')}>$$$</button>
        </div>
        <ul className=' px-4'>
       
          {matchingFlights && matchingFlights.map((flight, index) => (
            <li key={index} className='w-full border bg-white p-4 mb-4 rounded shadow'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-bold text-lg'>{formatTime(flight.departure_time)} - {formatTime(flight.arrival_time)}</p>
                  <p>{flight.departure_city} - {flight.arrival_city}</p>
                  <p>Duration: {flight.duration} minutes</p>
                </div>
                <div className='text-end'>
                  <p className='text-red-500 text-xl font-bold'>${flight.price}</p>
                  <p>{flight.airline}</p>
                </div>
              </div>
              <button
      className='text-blue-500 hover:underline mt-2'
      onClick={() => {
        const newDetailsVisible = [...detailsVisible];
        newDetailsVisible[index] = !detailsVisible[index];
        setDetailsVisible(newDetailsVisible);
      }}
    >
      {detailsVisible[index] ? 'Hide Details' : 'Show Details'}
    </button>
    {detailsVisible[index] && (
      <div className='mt-4 p-2 bg-gray-100 rounded'>
        {/* Additional flight details */}
        <p>Flight ID: {flight.id}</p>
        <p>Departure Date: {formatDate(flight.departure_time)}</p>
        {/* Add more flight details here */}
      </div>
    )}
            </li>
          ))}
    
        </ul>
      </div>
    </main>
  );
}

export default FlightPage;
