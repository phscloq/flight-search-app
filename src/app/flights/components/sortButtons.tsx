import { useSearchContext } from "@/app/lib/SearchContext"
export default function SortButtons(){
    const {handleSortType, sortType} = useSearchContext();
    return (
        <div className='flex mb-4  flex-wrap gap-2'>
        <button className={`${sortType === 'departure_time' ? '!bg-blue-600 text-white':''} px-4 py-2 rounded bg-white   shadow hover:bg-blue-700 hover:text-white`} onClick={() => handleSortType('departure_time')}>Departure</button>
        <button className={`${sortType === 'arrival' ? '!bg-blue-600 text-white':''} px-4 py-2 rounded bg-white   shadow hover:bg-blue-700 hover:text-white`} onClick={() => handleSortType('arrival_time')}>Arrival</button>
        <button className={`${sortType === 'duration' ? '!bg-blue-600 text-white':''} px-4 py-2 rounded bg-white   shadow hover:bg-blue-700 hover:text-white`} onClick={() => handleSortType('duration')}>Duration</button>
        <button className={`${sortType === 'price' ? '!bg-blue-600 text-white':''} px-4 py-2 rounded bg-white   shadow hover:bg-blue-700 hover:text-white`} onClick={() => handleSortType('price')}>$ Price</button>
      </div>
    )
}