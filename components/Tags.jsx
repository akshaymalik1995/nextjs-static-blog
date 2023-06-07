import Link from 'next/link'
export default function Tags({ tags }) {
    return (
        <div className="flex space-x-2 flex-wrap mt-2">
                {tags.map((tag) => (
                    <Link href={`/tags/${tag.name}`} key={tag.id}>
                        <span className="text-blue-600 dark:text-green-400 inline-block rounded-full font-bold cursor-pointer hover:text-blue-400 transition-colors duration-300">
                            {tag.name}
                        </span>
                    </Link>
                ))}
        </div>
    )
}