'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Cities from "./dropdown"
import { useSearchContext } from "../lib/SearchContext";

/* import { handleDropdown } from "../lib/handleDropdown";
 */import Error from "./error";

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


//today's date:
const today= new Date();
const year= today.getFullYear();
const month = String(today.getMonth()+1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;



    return(
        <div className='  '>
          <Error error={error} />
          
          <TicketType />
          <form>
            <CityInputs inputErrors={inputErrors} />
            <FlightDateInputs inputErrors={inputErrors} />  
          
            <Link href='/flights'>
              <button className='w-full py-2 text-sm  text-white bg-blue-600 rounded-md font-semibold tracking-wide '
              disabled={!canNavigate}>
                Search flights
              </button>
            </Link>
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


function FlightDateInputs({inputErrors}:{inputErrors: InputsErrors}){
  const {searchParams, setSearchParams} = useSearchContext();
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, departure:boolean) => {
    const selectedDate = new Date(e.target.value);
    if(departure){
      setSearchParams((prevParams) => ({ ...prevParams, departureDate: selectedDate }));
    }else{
      setSearchParams((prevParams) => ({ ...prevParams, returnDate: selectedDate }));
    }
  
  
  };


  return(
    <div className='flex  w-full  mb-8'>
      <div className='w-1/2 pr-2'>
      <label className=' dark:text-white  text-sm font-medium leading-none' htmlFor="departureDate">Departure Date</label>
        <input className='w-full py-2  px-2 rounded-lg bg-slate-100
        border  focus:border-blue-500 focus:outline-none' type='text'
        value={searchParams.departureDate ? searchParams.departureDate.toISOString().split('T')[0]: ''}
        onChange={(e)=>handleDateChange(e, true)}
        placeholder="Departure Date"
        onFocus={(e)=>e.target.type='date'}
        //default value olarak bugünün tarihi veririz bölyece garip bir şey gözükmez ve focusa girdiği gibi calendar açılsın
        ></input>
      </div>
      <div className='w-1/2 pl-2'>
      <label className=' dark:text-white  text-sm font-medium leading-none' htmlFor="returnDate">Return Date</label>
        <input className={`${inputErrors.arrivalDate ? 'border-red-600' : 'border-gray-300' } w-full py-2  px-2 rounded-lg bg-slate-100
          border  focus:border-blue-500 focus:outline-none`} type='date' disabled={!searchParams.isRoundTrip}
        value={searchParams.returnDate ? searchParams.returnDate.toISOString().split('T')[0]: ''}
        onChange={(e)=>handleDateChange(e, false)}
        min={searchParams.departureDate?.toISOString().split('T')[0]}
        ></input>
      </div>
    </div>
    
  )
}


function CityInputs({inputErrors}:{inputErrors: InputsErrors}){

  const {searchParams, setSearchParams, cities, showDepartureCityList, showArrivalCityList, setShowArrival, setShowDepart} = useSearchContext();

  const handleDropdown = (departure: boolean) => {
    if (departure) {
      setShowDepart(true);
      setShowArrival(false);
    } else {
      setShowDepart(false);
      setShowArrival(true);
    }
  };

  const handleCityChange = (city: string, departure: boolean) => {
    if(departure){
      setSearchParams((prevParams) => ({ ...prevParams, departureCity: city }));
    }else{
      setSearchParams((prevParams) => ({ ...prevParams, arrivalCity: city }));
      
    }
  }

  const handleCitySelect = (city: string, departure: boolean) => {
    if(departure){
      setSearchParams((prevParams) => ({ ...prevParams, departureCity: city }));
      setShowDepart(false);
    }else{
      setSearchParams((prevParams) => ({ ...prevParams, arrivalCity: city }));
        setShowArrival(false);
    }
  }

  return (
    <div className='flex mb-8 w-full gap-6'>
      <div className='w-1/2'>
        <label className=' dark:text-white  text-sm font-medium leading-none' htmlFor="departureCity">Departure City</label>
        <input className={`${inputErrors.departureCity ? 'border-red-600' : 'border-gray-300' } w-full py-2  px-2 rounded-lg bg-slate-100
        border  focus:border-blue-500 focus:outline-none`}
        placeholder='Enter departure city'
        value={searchParams.departureCity}
        onChange={(e)=>handleCityChange(e.target.value, true)}
        onClick={()=>handleDropdown(true)}
        id="departureCity"
        name="departureCity"
        type="text"
        required
        ></input>
      <Cities 
      cities={cities}
      SearchedCity={searchParams.departureCity}
      show={showDepartureCityList}
      onSelect={(city:any)=>handleCitySelect(city, true)}
      />
      </div> 
      <div className='w-1/2'>
        <label className=' dark:text-white text-sm font-medium leading-none mb-4' htmlFor="arrivalCity">Arrival City</label>
        <input className={`${inputErrors.arrivalCity ? 'border-red-600' : 'border-gray-300' } w-full py-2  px-2 rounded-lg bg-slate-100
        border  focus:border-blue-500 focus:outline-none`}
        placeholder='Enter arrival city'
        value={searchParams.arrivalCity}
        onChange={(e)=>handleCityChange(e.target.value, false)}
        onClick={()=>handleDropdown(false)}
        id="arrivalCity"
        name="arrivalCity"
        type="text"
        required
        ></input>
        <Cities 
      cities={cities}
      SearchedCity={searchParams.arrivalCity}
      show={showArrivalCityList}
      onSelect={(city:any)=>handleCitySelect(city, false)}

      />
      </div> 
</div>
  )
}
