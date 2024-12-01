export default function Error({error}:{error:string}){

    return(
        <div className="mb-4 text-red-500 font-semibold">
            <p>{error}</p>
          </div>
    )

}