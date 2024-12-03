'use client'
import { formatDate } from "../flights/components/formatTimeDate";
import FilterFlights from "../lib/filterFlights";
import { useSearchContext } from "../lib/SearchContext";

export default function AvailableFlights(){
    const {flights, filteredWDate} = useSearchContext();
    const currentFlightIndex = 0; // Define the currentFlightIndex variable

    return(
        <div className="mb-8  rounded-lg p-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-center">Available Flights </h2>
          <div className="overflow-x-hidden flex slider">
            <ul className="animate-infinite-scroll flex gap-8  hover:pause h-36  items-center  ">
                {flights.map((flight, index) => (
                <li
                    key={flight.id}
                    className={` w-[300px] h-[100px] bg-white rounded-lg  p-4 text-black  hover:scale-110 hover:shadow-lg transition-all duration-300`}
                >
                    <p className="text-lg font-semibold">
                    {flight.departure_city} to {flight.arrival_city}
                    </p>
                    <p className="text-sm">
                    Date: {formatDate(flight.departure_time)}
                    </p>
                    <p className="text-sm">
                    Available Seats: {Math.floor(Math.random() * 10)+1}
                    </p>

                </li>
                ))}
            </ul>
          </div>
        </div>
    )
}