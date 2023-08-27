'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Cities from "./dropdown"
import { useSearchContext } from "../lib/SearchContext";
export default function Search(){
    const {searchParams, setSearchParams, cities} = useSearchContext();

    const [showDepartureCityList, setShowDepart] = useState(false);
    const [showArrivalCityList, setShowArrival] = useState(false);



    const handleDepartureDropdown =()=>{

setShowDepart(true);
setShowArrival(false);
    }
    const handleArrivalDropdown =()=>{

      setShowDepart(false);
      setShowArrival(true);
          }
const handleDepartureCitySelect =(city:any)=>{
  setSearchParams((prevParams) => ({ ...prevParams, departureCity: city })); 
  setShowDepart(false);

}
const handleDepartureCityChange =(city:any)=>{
  setSearchParams((prevParams) => ({ ...prevParams, departureCity: city })); 
   
}
const handleArrivalCityChange =(city:any)=>{
  setSearchParams((prevParams) => ({ ...prevParams, arrivalCity: city })); 
   
}
const handleArrivalCitySelect =(city:any)=>{
   setSearchParams((prevParams) => ({ ...prevParams, arrivalCity: city }));
     setShowArrival(false);
}
const handleRoundTripToggle = () => {
  setSearchParams((prevParams) => ({ ...prevParams, isRoundTrip: !prevParams.isRoundTrip })); // Update the search parameters
};
const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedDate = new Date(e.target.value);
  setSearchParams((prevParams) => ({ ...prevParams, departureDate: selectedDate }));
};

const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedDate = new Date(e.target.value);
  setSearchParams((prevParams) => ({ ...prevParams, returnDate: selectedDate }));
};
    return(
        <div className=' w-11/12'>
          <div className='mb-4'>
            <label className=''><input className='mr-2' type='checkbox' checked={searchParams.isRoundTrip} onChange={()=>handleRoundTripToggle()}></input>Round trip</label>
            <label className='ml-4'><input className='mr-2' type='checkbox' checked={!searchParams.isRoundTrip} onChange={()=>handleRoundTripToggle()}></input>One way</label>
          </div>

          <div className=' text-black'>
              <div className='flex mb-8 w-full'>
                      <div className='w-1/2 pr-2'>
                        <input className='w-full px-4 py-2 rounded-lg bg-slate-100 
                        border border-gray-300 focus:border-blue-500  focus:outline-none' 
                        placeholder='Departure City'
                        value={searchParams.departureCity}
                        onChange={(e)=>handleDepartureCityChange(e.target.value)}
                        onClick={()=>handleDepartureDropdown()}
                        ></input>
                      <Cities 
                      cities={cities}
                      SearchedCity={searchParams.departureCity}
                      show={showDepartureCityList}
                      onSelect={(city:any)=>handleDepartureCitySelect(city)}
                      />
                      </div> 
                      <div className='w-1/2 pl-2'>
                        <input className='w-full py-2  px-2 rounded-lg bg-slate-100
                         border border-gray-300 focus:border-blue-500 focus:outline-none' 
                         placeholder='Arrival City'
                         value={searchParams.arrivalCity}
                         onChange={(e)=>handleArrivalCityChange(e.target.value)}
                         onClick={()=>handleArrivalDropdown()}
                         ></input>
                        <Cities 
                      cities={cities}
                      SearchedCity={searchParams.arrivalCity}
                      show={showArrivalCityList}
                      onSelect={(city:any)=>handleArrivalCitySelect(city)}

                      />
                      </div> 
              </div>
              <div className='flex  w-full  mb-8'>
                    <div className='w-1/2 pr-2'>
                      <input className='px-4 py-2 rounded-lg w-full 
                      border border-gray-300 focus:border-blue-500 focus:outline-none' type='date'
                      value={searchParams.departureDate ? searchParams.departureDate.toISOString().split('T')[0]: ''}
                      onChange={(e)=>handleDepartureDateChange(e)}
                      ></input>
                    </div>
                    <div className='w-1/2 pl-2'>
                      <input className='px-4 py-2 rounded-lg w-full
                      border border-gray-300 focus:border-blue-500 focus:outline-none' type='date' disabled={!searchParams.isRoundTrip}
                      value={searchParams.returnDate ? searchParams.returnDate.toISOString().split('T')[0]: ''}
                      onChange={(e)=>handleReturnDateChange(e)}
                      ></input>
                    </div>
              </div>
          </div>
         
          <Link 
            href='/flights'
        >
           <button className='w-full h-12 text-white bg-blue-600 rounded-lg'
         
         >Search flight</button>
           
        </Link>
          
      </div>
    )

}

