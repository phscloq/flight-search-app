import { useSearchContext } from "@/app/lib/SearchContext";
import { formatTime, formatDate } from "./formatTimeDate";
import { Flight } from "@/app/data/types";
export default function FlightsList({matchedFlights}:{matchedFlights:Flight[]}){
    const { detailsVisible, handleDetailsVisible } = useSearchContext();
return(
    <ul className=' px-4'>
       
          {matchedFlights && matchedFlights.map((flight, index) => (
            <li key={flight.id} className='w-full border bg-white p-4 mb-4 rounded shadow'>
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
      onClick={() => handleDetailsVisible(flight.id)}
    >
      {detailsVisible === flight.id ? 'Hide Details' : 'Show Details'}
    </button>
    <div className={`transition-all  duration-300 overflow-hidden ${detailsVisible === flight.id ? 'h-24' : 'h-0'}`} >
      <div className={`mt-4 p-2 bg-gray-100 rounded     h-24 `}>
        {/* Additional flight details */}
        <p>Flight ID: {flight.id}</p>
        <p>Departure Date: {formatDate(flight.departure_time)}</p>
        {/* Add more flight details here */}
      </div>
    </div>
            </li>
          ))}       
        </ul>
)

}