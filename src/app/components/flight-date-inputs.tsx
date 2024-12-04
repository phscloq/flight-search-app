'use client'

import { useSearchContext } from "../lib/SearchContext";

type InputsErrors ={
    departureCity: boolean,
    arrivalCity: boolean,
    departureDate: boolean,
    arrivalDate: boolean
  }
export default function FlightDateInputs({inputErrors}:{inputErrors: InputsErrors}){
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
      <div className='flex flex-col mobile-m:flex-row  sm:justify-between gap-4 w-full  mb-8'>
        <div className='flex-1'>
        <label className=' dark:text-white   text-sm font-medium leading-none' htmlFor="departureDate">Departure Date</label>
          <input className='text-black w-full py-2  px-2 rounded-lg 
          border    focus:ring-2 ring-blue-600 ring-offset-2 focus:outline-none mt-2 text-sm' 
          type='date'
          value={searchParams.departureDate ? searchParams.departureDate.toISOString().split('T')[0]: ''}
          onChange={(e)=>handleDateChange(e, true)}
          placeholder="Departure Date"
          required
          //default value olarak bugünün tarihi veririz bölyece garip bir şey gözükmez ve focusa girdiği gibi calendar açılsın
          ></input>
        </div>
        <div className='flex-1'>
        <label className=' dark:text-white  text-sm font-medium leading-none' htmlFor="returnDate">Return Date</label>
          <input className={`text-black ${inputErrors.arrivalDate ? 'border-red-600' : 'border-gray-300' } w-full py-2  px-2 rounded-lg 
            border focus:ring-2 ring-blue-600 ring-offset-2 focus:outline-none  text-sm mt-2`} 
          type='date' disabled={!searchParams.isRoundTrip}
          value={searchParams.returnDate ? searchParams.returnDate.toISOString().split('T')[0]: ''}
          onChange={(e)=>handleDateChange(e, false)}
          min={searchParams.departureDate?.toISOString().split('T')[0]}
          required
          ></input>
        </div>
      </div>
      
    )
  }