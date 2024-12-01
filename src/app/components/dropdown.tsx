export default  function Cities({SearchedCity, cities, show, onSelect}:{SearchedCity:string, cities:any, show:boolean, onSelect:any}){
   let filteredCities=[]
    if(cities) {
        if (SearchedCity.trim() === '') {
            filteredCities = [];
          } else {
            filteredCities = cities.filter((city: any) =>
              city.name.toLowerCase().includes(SearchedCity.toLowerCase()) ||
              city.code.toLowerCase().includes(SearchedCity.toLowerCase()) ||
              city.airports.some((airport: any) =>
                airport.name.toLowerCase().includes(SearchedCity.toLowerCase()) ||
                airport.code.toLowerCase().includes(SearchedCity.toLowerCase())
              )
            );
          }
        }
console.log(filteredCities);
    return (
        <div className={`${show ? 'block': 'hidden'} shadow-lg absolute bg-white  z-20  overflow-auto max-h-60`}>
            <ul className="">
                {filteredCities.map((city:any)=>{
                    return(
                        <>
                        <li key={city.code} className=" p-2 hover:bg-slate-200 hover:text-black"
                          onClick={() => onSelect(city.name)}
                        >{city.name}</li>   
                      
                      </>
                    )
                })}
               
            </ul>
        </div>
    )
}