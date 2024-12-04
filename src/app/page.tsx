import AvailableFlights from "./components/available-flights"
import Footer from "./components/footer"
import Search from "./components/search"
export default  function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-4xl mx-auto p-4 sm:p-6 dark:text-white">
      <h1 className=' text-2xl  font-bold text-center '>Flight Search</h1>
      <AvailableFlights />
      <div className="bg-white dark:bg-gray-800   w-full  rounded-md shadow-lg">
        <Search
        />
      </div>
      <Footer />
     
      
    </main>
  )
}
