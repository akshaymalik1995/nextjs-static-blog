import Link from 'next/link'
import Tags from './Tags';
import { Link as ScrollLink } from 'react-scroll';
export default function Blog({ post, headings }) {
    return (
        <>
            <nav className="breadcrumb my-4">
                <Link href="/blog" className="text-gray-500 hover:text-gray-700">Blog</Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-700">{post.title}</span>
            </nav>


            <h1 className="header-title text-4xl ">{post.title}</h1>

            {/* ADD TAGS */}
            <Tags tags={post.tags} />
            <div className="text-sm my-2 text-gray-600">
                {post.date}
            </div>
            <hr></hr>

            {/* Table of Content */}
            {headings ? (<div className="my-8 2xl:my-0 2xl:fixed 2xl:top-36 2xl:left-32 2xl:block">
                <div className="text-gray-500 text-sm">
                    <h3 className="text-gray-700 text-lg mb-2">Table of Contents</h3>
                    <ul className="list-disc list-inside">
                        {headings.map((heading, index) => (
                            <li key={index} className={`pl-${heading.level * 2}  my-1`}>
                                <ScrollLink
                                    to={heading.id}
                                    smooth={true}
                                    duration={500}
                                    className="hover:text-gray-700 cursor-pointer"

                                >{heading.text}</ScrollLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>) : ""}
            {/* End Table of Content */}

            <article dangerouslySetInnerHTML={{ __html: post.content }} className="prose my-8 lg:prose-lg">

            </article>
        </>
    )
}