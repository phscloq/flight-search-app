'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Cities from "./dropdown"
import { useSearchContext } from "../lib/SearchContext";

/* import { handleDropdown } from "../lib/handleDropdown";
 */import Error from "./error";
import {  useRouter } from "next/navigation";
import CityInputs from "./city-inputs";
import FlightDateInputs from "./flight-date-inputs";

type InputsErrors ={
  departureCity: boolean,
  arrivalCity: boolean,
  departureDate: boolean,
  arrivalDate: boolean
}

export default function Search(){
    const {searchParams, setSearchParams, cities, showArrivalCityList, showDepartureCityList} = useSearchContext();
    const [error, setError] = useState('');
    const [canNavigate, setCanNavigate] = useState(false);
    const [inputErrors, setInputErrors] = useState({
      departureCity: false,
      arrivalCity: false,
      departureDate: false,
      arrivalDate: false
    });
    const router = useRouter();
   /*  useEffect(() => {
      const validateSearchParams = () => {
        let hasErrors = false;
      
        if (!searchParams.departureCity || !searchParams.arrivalCity) {
          setInputErrors({
            departureCity: !searchParams.departureCity,
            arrivalCity: !searchParams.arrivalCity,
            departureDate: false,
            arrivalDate: false
          });
          hasErrors = true;
        } else {
          setInputErrors({
            departureCity: false,
            arrivalCity: false,
            departureDate: false,
            arrivalDate: false
          });
        }
      
        if (searchParams.isRoundTrip && !searchParams.returnDate) {
          setInputErrors({
            departureCity: false,
            arrivalCity: false,
            departureDate: false,
            arrivalDate: true
          });
          hasErrors = true;
        }
      
        if (!searchParams.departureDate && !searchParams.isRoundTrip) {
          setInputErrors({
            departureCity: false,
            arrivalCity: false,
            departureDate: true,
            arrivalDate: false
          });
          hasErrors = true;
        }
      
        if (!hasErrors) {
          setCanNavigate(true);
          setError("");
        } else {
          setCanNavigate(false);
          setError("Please fill out the required fields.");
        }
      };
      
  
      validateSearchParams();
    }, [searchParams]); */

    


const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

  if (!searchParams.departureCity || !searchParams.arrivalCity) {
    setInputErrors({
      departureCity: !searchParams.departureCity,
      arrivalCity: !searchParams.arrivalCity,
      departureDate: false,
      arrivalDate: false
    });
    setError("Please fill out the required fields.");
    return;
  } else {
    setInputErrors({
      departureCity: false,
      arrivalCity: false,
      departureDate: false,
      arrivalDate: false
    });
    router.push("/flights");
  }
}

    return(
        <div className='p-6  w-full'>
          <Error error={error} />
          <TicketType />
          <form onSubmit={handleSubmit} className="w-full ">
              <CityInputs inputErrors={inputErrors} />
              <FlightDateInputs inputErrors={inputErrors} />  
              <button className='w-full py-2 text-sm  text-white bg-blue-600 rounded-md font-semibold tracking-wide '
              type="submit">
                Search flights
              </button>
          </form>
      </div>
    )

}



function TicketType(){
  const {searchParams, setSearchParams} = useSearchContext();

  const handleRoundTripToggle = () => {
    setSearchParams((prevParams) => ({ ...prevParams, isRoundTrip: !prevParams.isRoundTrip })); // Update the search parameters
  };
  return(
    <div className='mb-4'>
      <label className=' dark:text-white '>
        <input className='mr-2' type='checkbox' checked={searchParams.isRoundTrip} onChange={()=>handleRoundTripToggle()} />
        Round trip
      </label>
      <label className=' dark:text-white ml-4'>
        <input className='mr-2' type='checkbox' checked={!searchParams.isRoundTrip} onChange={()=>handleRoundTripToggle()} />
        One way
      </label>
    </div>
  )
}





