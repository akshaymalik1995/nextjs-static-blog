import Link from 'next/link'
export default function Tags({ tags }) {
    return (
        <div className="flex  space-x-2 flex-wrap">
                {tags.map((tag) => (
                    <Link className='bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-900 transition-colors text-white dark:bg-gray-800 py-1 px-2 rounded' href={`/tags/${tag.name}`} key={tag.id}>
                        <span className=" dark:text-green-400 inline-block rounded-full cursor-pointer">
                            {tag.name}
                        </span>
                    </Link>
                ))}
        </div>
    )
}