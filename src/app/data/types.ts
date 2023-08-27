// data/types.ts

export interface Flight {
    id: string;
    airline: string;
    departure_city: string;
    arrival_city: string;
    departure_time: Date;
    arrival_time: Date;
    duration: number;
    price: number;
    [key: string]: number | string | any; 

  }
  