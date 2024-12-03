import AvailableFlights from "./components/available-flights"
import Footer from "./components/footer"
import Search from "./components/search"
export default  function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-4xl mx-auto dark:text-white">
      <AvailableFlights />
      <div className="bg-white dark:bg-gray-800 p-6 w-full rounded-md shadow-lg">
      <h1 className=' text-2xl mb-12 font-bold text-center '>Flight Search</h1>
      <Search
      />
      </div>
      <Footer />
     
      
    </main>
  )
}
