import { useSearchContext } from "@/app/lib/SearchContext"
export default function SortButtons(){
    const {handleSortType} = useSearchContext();
    return (
        <div className='flex justify-evenly mb-4'>
        <button className='px-4 py-2 rounded bg-blue-600 text-white  shadow hover:bg-blue-700' onClick={() => handleSortType('departure_time')}>Departure T.</button>
        <button className='px-4 py-2  bg-blue-600 text-white  shadow hover:bg-blue-700 rounded'onClick={() => handleSortType('arrival_time')}>Arrival T.</button>
        <button className=' px-4 py-2 rounded bg-blue-600 text-white  shadow hover:bg-blue-700 'onClick={() => handleSortType('duration')}>Duration</button>
        <button className=' px-4 py-2 rounded bg-blue-600 text-white  shadow hover:bg-blue-700'onClick={() => handleSortType('price')}>$$$</button>
      </div>
    )
}