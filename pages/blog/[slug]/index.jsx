
import CustomHead from "@/components/CustomHead"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import Loading from "@/components/Loading"
import Link from "next/link"
import { Link as ScrollLink } from 'react-scroll';
import Blog from "@/components/Blog"
import { formatDate } from '@/utils.mjs'
import data from '@/data'


export async function getStaticProps(context) {
    let { posts } = data
    //   Get slug
    const { slug } = context.params
    // Find the post that matches the slug
    let post = posts.find(post => post.slug === slug)
    // Format dates
    post = {...post, date: formatDate(post.date)}

    return {
        props: {
            post: post || {},
        },
    }
}

// Write code for getStaticPaths
export async function getStaticPaths() {
    let { posts } = data
    // Get slugs for all posts
    const slugs = posts.map(post => post.slug)
    // Create paths with `slug` param
    const paths = slugs.map(slug => ({ params: { slug } }))
    return {
        paths,
        fallback: false,
    }
}


export default function Post(props) {
    const { post } = props
    const headings = post?.content?.match(/<h([1-6]).*?>(.*?)<\/h\1>/gi)?.map((heading) => {
        const level = heading.match(/<h([1-6]).*?>/i)[1];
        const text = heading.replace(/<\/?h[1-6].*?>/gi, '');
        const id = text.replace(/\s+/g, '-').toLowerCase();
        return { level, text, id };
    });




    // Adding ID to each heading in post content and return it
    post.content = post?.content?.replace(/<h([1-6]).*?>(.*?)<\/h\1>/gi, (match, level, text) => {
        const id = text.replace(/\s+/g, '-').toLowerCase();
        return `<h${level} id="${id}">${text}</h${level}>`;
    });

    const router = useRouter()
    const [loading, setLoading] = useState(false)


    return (
        <>
            <CustomHead title={post.title} description={post.description}>

            </CustomHead>
            {loading && <Loading />}
            <div className="container max-w-2xl mx-auto">
                <Blog post={post} headings={headings} />
            </div>
        </>
    )
}





