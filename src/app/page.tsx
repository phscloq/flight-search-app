import Search from "./components/search"
export default  function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="bg-white p-6 w-full rounded-md shadow-lg">
      <h1 className=' text-3xl mb-12 font-bold text-center'>Best Flight</h1>
      <Search
      />
      </div>
     
     
      
    </main>
  )
}
