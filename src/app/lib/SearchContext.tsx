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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  detailsVisible: boolean[]; 
  setDetailsVisible: React.Dispatch<React.SetStateAction<boolean[]>>; 
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
  const [isLoading, setIsLoading] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState<boolean[]>([]);


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

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, cities, flights, isLoading, setIsLoading, detailsVisible, setDetailsVisible }}>
      {children}
    </SearchContext.Provider>
  );
};
