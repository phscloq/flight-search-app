import { useSearchContext } from "./SearchContext";
import { useEffect, useState } from "react";
import { Flight } from "../data/types";

export default function FilterFlights(){
    const { searchParams, flights, handleFilteredWDate, handleFilteredWRoute, sortType, handleReturnFlights } = useSearchContext();
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [filteredFlights2, setFilteredFlights2] = useState<Flight[]>([]);
    const [filteredFlights3, setFilteredFlights3] = useState<Flight[]>([]);

    useEffect(() => {
        if (flights) {
         
              const filteredFlightsData = flights.filter((flight: Flight) =>
                flight.departure_city === searchParams.departureCity &&
                flight.arrival_city === searchParams.arrivalCity &&
                new Date(flight.departure_time).toDateString() === searchParams.departureDate?.toDateString()
              );
              const filteredFlightsData2 = flights.filter((flight: Flight) =>
                flight.departure_city === searchParams.departureCity &&
                flight.arrival_city === searchParams.arrivalCity &&
                !filteredFlightsData.some( f => f.id === flight.id) &&
              ( !searchParams.departureDate || new Date(flight.departure_time) >= searchParams.departureDate)
              );
              const filteredFlightsData3 = flights.filter((flight: Flight) =>
              flight.departure_city === searchParams.arrivalCity &&
              flight.arrival_city === searchParams.departureCity &&
              new Date(flight.departure_time).toDateString() === searchParams.returnDate?.toDateString()
            );

              setFilteredFlights(filteredFlightsData);
              setFilteredFlights2(filteredFlightsData2);
              setFilteredFlights3(filteredFlightsData3)
              handleFilteredWDate(filteredFlightsData);
              handleFilteredWRoute(filteredFlightsData2);
              handleReturnFlights(filteredFlightsData3)


              
            
              }
        }, [searchParams, flights]);

        useEffect(()=>{
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
            handleFilteredWDate(sortedFlights);
            const sortedFlights2 = sortArray(filteredFlights2, sortType);
            handleFilteredWRoute(sortedFlights2);
            const sortedFlights3 = sortArray(filteredFlights3, sortType);
            handleReturnFlights(sortedFlights3);
          } catch (error) {
            console.error('Error sorting flights:', error);
          }
        }, [sortType, filteredFlights])
}





/*
  const [filteredWDate, setFilteredWDate] = useState([]);
  const [filteredWRoute, setFilteredWRoute] = useState([]);
*/