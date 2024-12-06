import AvailableFlights from "./components/available-flights"
import Footer from "./components/footer"
import Search from "./components/search"
export default  function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-4xl mx-auto p-4 sm:p-6 dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Available Flights </h2>
      <AvailableFlights />
      <div className="bg-white dark:bg-gray-800   w-full  rounded-md shadow-lg pt-4">
        <h1 className=' text-2xl font-bold text-center '>Flight Search</h1>
        <Search/>
      </div>
      <Footer />
    </main>
  )
}
