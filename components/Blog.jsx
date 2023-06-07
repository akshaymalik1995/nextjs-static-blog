
import Link from 'next/link';
import Tags from './Tags';
import Headings from './Headings';

export default function Blog({ post, headings }) {
    return (
        <div className="blog-container mx-auto">
            <nav className="breadcrumb my-4">
                <Link href="/blog" className="text-gray-500 hover:text-gray-700">Blog
                </Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-700">{post.title}</span>
            </nav>

            <h1 className="header-title text-4xl">{post.title}</h1>

            {/* ADD TAGS */}
            <Tags tags={post.tags} />

            <div className="text-sm my-2 text-gray-600">{post.date}</div>

            <hr className="my-8" />

           <Headings headings={headings} />

            <article
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose my-8 lg:prose-lg"
            ></article>
        </div>
    );
}