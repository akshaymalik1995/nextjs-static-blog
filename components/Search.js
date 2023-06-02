import Link from "next/link";
import { useState } from "react";
export default function Search({ posts }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Filter Post Title
        const results = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        ).slice(0, 5)
        setSearchResults(results);
    }

    return (
        <div className="container max-w-3xl mx-auto" >
            <form className="flex items-center" >
                <input
                    onChange={handleSearchChange}
                    type="search"
                    placeholder="Search"
                    className="px-4 mt-8 mb-1 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
            </form>

            {/* Display search results in a box */}
            {searchTerm.length > 0 && searchResults.length > 0 && (
                <div className="overflow-y-auto max-h-72">
                {searchResults.map(post => (
                     <Link href={"/blog/" + post.slug} key={post.id} className="font-bold rounded  text-blue-700 p-4 hover:bg-blue-100 block">
                        {post.title}
                    </Link>    
                ))}
            </div>
            )}
            
        </div>
    )
}