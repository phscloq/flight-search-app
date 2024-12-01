import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GetData } from '../data/data';
interface SearchParams {
  departureCity: string;
  arrivalCity: string;
  isRoundTrip: boolean;
  departureDate: Date | null;
  returnDate: Date | null;
}

interface SearchContextProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  cities: any[]; 
  flights: any[]; 
  isLoading: boolean;
  sortType: string;
  showAllFlights: boolean;
  showDepartureCityList: boolean;
  showArrivalCityList: boolean;
  setShowDepart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowArrival: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  detailsVisible: string | null; 
  filteredWDate: any[];
  filteredWRoute: any[];
  returnFlights: any[];
  handleFilteredWDate: (e:any)=>void;
  handleFilteredWRoute: (e:any)=>void;
  handleReturnFlights: (e:any)=>void;
  handleSortType: (e:any)=>void;
  handleToggleFlights: ()=>void;
  handleDetailsVisible: (id:string)=>void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearchContext = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
interface SearchProviderProps {
    children: ReactNode; 
  }
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState([]);
  const [filteredWDate, setFilteredWDate] = useState([]);
  const [filteredWRoute, setFilteredWRoute] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState<string | null>(null);
  const [sortType, setSortType] = useState('departure_time');
  const [showAllFlights, setShowAllFlights] = useState<boolean>(false); 
  const [showDepartureCityList, setShowDepart] = useState<boolean>(false);
  const [showArrivalCityList, setShowArrival] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const data = await GetData();
      setCities(data.cities);
      setFlights(data.flights);
      setIsLoading(false);
    }
  
    fetchData();
  }, []);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureCity: '',
    arrivalCity: '',
    isRoundTrip: true,
    departureDate: null,
    returnDate: null,
  });

  const handleFilteredWDate = (e:any)=>{
    setFilteredWDate(e);
  };
  const handleFilteredWRoute = (e:any)=>{
    setFilteredWRoute(e);
  };
  const handleReturnFlights = (e:any)=>{
    setReturnFlights(e);
  };

  const handleSortType = (e:any)=>{
setSortType(e);

  };
  const handleToggleFlights = () => {
    setShowAllFlights(!showAllFlights);
   
  };
  const handleDetailsVisible = (id:string)=>{
    setDetailsVisible((prevFlightID)=>(prevFlightID===id ? null: id))
  };
  return (
    <SearchContext.Provider value={{returnFlights, handleReturnFlights, handleDetailsVisible, handleToggleFlights, 
    showAllFlights, handleSortType, sortType, filteredWDate, 
    filteredWRoute, handleFilteredWDate, handleFilteredWRoute, 
    searchParams, setSearchParams, cities, flights, 
    isLoading, setIsLoading, detailsVisible, showDepartureCityList, showArrivalCityList, setShowArrival, setShowDepart }}>
      {children}
    </SearchContext.Provider>
  );
};
