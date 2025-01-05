'use client'
import { formatDate } from "../flights/components/formatTimeDate";
import { useSearchContext } from "../lib/SearchContext";

export default function AvailableFlights(){
    const {flights, filteredWDate} = useSearchContext();
   /*  const generateFlights = (count: number) => {
        const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore', 'Berlin', 'Moscow', 'Los Angeles']
        return Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          departure_city: cities[Math.floor(Math.random() * cities.length)],
          arrival_city: cities[Math.floor(Math.random() * cities.length)],
          departure_time: `2023-07-${String(i % 30 + 1).padStart(2, '0')}`,
          seats: Math.floor(Math.random() * 10) + 1
        }))
      }
      
      const flightsArr = generateFlights(1) */
    return(
        <div className=" mb-8 mx-auto max-w-4xl w-full  flex relative slider ">
         
              <ul className=" animate-infinite-scroll flex gap-8  hover:pause h-36  items-center"
              >
                  {[...flights, ...flights].map((flight, index) => (
                  <li
                      key={index}
                      className={`flex-shrink-0 w-48  cursor-default  sm:w-[300px] h-[100px] bg-white rounded-lg  p-2 sm:p-4 text-black  hover:scale-110 hover:shadow-lg transition-all duration-300`}>
                      <p className=" font-medium sm:text-lg sm:font-semibold">
                      {flight.departure_city} to {flight.arrival_city}
                      </p>
                      <p className="text-sm">
                      Date: {formatDate(flight.departure_time)}
                      </p>
                      <p className="text-sm">
                      Available Seats: {Math.floor(Math.random() * 10)+1}
                      </p>
                      {/* <p>
                          {index}
                      </p> */}


                  </li>
                  ))}
              </ul>
          </div>
    )
}


