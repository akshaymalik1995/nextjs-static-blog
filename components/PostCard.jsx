import Link from 'next/link'
import Tags from './Tags';

export default function PostCard({ post }) {
    const postURL = "/blog/" + post.slug;
    return (
        <div className="my-8">
            <div className="md:w-1/5 font-bold md:pt-1 text-gray-700 dark:text-gray-300">
                {post.date}
            </div>
            <div className="md:w-4/5">
                <div className="flex  flex-col gap-2 flex-wrap">
                <Link href={postURL}>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                    </h2>
                </Link>
                <Tags tags={post.tags} />
                </div>
               
                {/* <div className="text-gray-700 dark:text-gray-300 mt-2">
                    {post.description.length > 200
                        ? post.description.slice(0, 200) + "..."
                        : post.description}
                </div> */}
                {/* {post.description && <Link
                    className="my-2 font-bold text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 block transition-colors duration-300"
                    href={postURL}
                >
                    Read more →
                </Link>} */}
            </div>
        </div>
    );
}