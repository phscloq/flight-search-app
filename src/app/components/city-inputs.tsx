'use client'
import { useSearchContext } from "../lib/SearchContext";
import Cities from "./dropdown";

type InputsErrors ={
    departureCity: boolean,
    arrivalCity: boolean,
    departureDate: boolean,
    arrivalDate: boolean
  }
  
export default function CityInputs({inputErrors}:{inputErrors: InputsErrors}){

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
      <div className='flex flex-col mobile-m:flex-row   w-full mb-8 gap-4'>
        <div className='flex-1'>
                <label className=' dark:text-white  text-sm font-medium leading-none' htmlFor="departureCity">Departure City</label>
                <input className={`text-black ${inputErrors.departureCity ? 'border-red-600' : 'border-gray-300'} 
                py-2  px-2 rounded-lg w-full
                border focus:ring-2 ring-blue-600 ring-offset-2 focus:outline-none mt-2 text-sm `}
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

        <div className='flex-1'>
        
          <label className=' dark:text-white text-sm font-medium leading-none mb-4' htmlFor="arrivalCity">Arrival City</label>
          <input className={`text-black ${inputErrors.arrivalCity ? 'border-red-600' : 'border-gray-300' } 
          w-full py-2  px-2 rounded-lg 
          border focus:ring-2 ring-blue-600 ring-offset-2 focus:outline-none mt-2 text-sm `}
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
  