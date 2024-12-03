import Link from "next/link"
export default function Footer() {

return (
    <footer className="mt-8 text-center">
        <div className="flex text-sm mb-2">
            <p className="mr-1 text-gray-600 dark:text-gray-400">Made for a job application by</p>
            <Link href="https://www.ybarandogan.com/" className=" text-orange-600  hover:underline">Baran</Link>
        </div>
        <Link href="https://github.com/phscloq/flight-search-app" className="text-orange-600 hover:underline font-medium">
        View on GitHub
        </Link>
    </footer>
)

}