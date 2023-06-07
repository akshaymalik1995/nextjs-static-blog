import Link from 'next/link';
import Tags from './Tags';
import Headings from './Headings';

export default function Blog({ post, headings }) {
    return (
        <div className="blog-container mx-auto ">
            <nav className="breadcrumb my-4">
                <Link href="/blog" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Blog
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
                <span className="text-gray-700 dark:text-white">{post.title}</span>
            </nav>

            <h1 className="header-title text-4xl text-gray-700 dark:text-white">{post.title}</h1>

            {/* ADD TAGS */}
            <div className='mt-2'><Tags tags={post.tags} /></div>
            

            <div className="text-sm my-2 text-gray-600 dark:text-gray-400">{post.date}</div>

            <hr className="my-8 border-gray-400 dark:border-gray-600" />

           <Headings headings={headings} />

            <article
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose my-8 lg:prose-lg text-gray-700 dark:text-white"
            ></article>
        </div>
    );
}