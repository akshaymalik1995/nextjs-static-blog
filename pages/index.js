import Link from 'next/link'
import PostList from '@/components/PostList'
import appConfig from '@/appConfig'
import { getPosts } from '@/utils.mjs'


export async function getStaticProps() {
 let posts = getPosts()

  return {
    props: {
      posts: posts || [],
    },
  }

}


export default function Home({ posts}) {
  if (!posts || posts?.length === 0) {
    return (
      <>
        <div className="container max-w-3xl mx-auto" >
          <h1 className="text-4xl my-12">No Posts</h1>
        </div>
      </>

    )
  }
  return (
    <>
      <div className="container max-w-3xl mx-auto" >
        
      <h1 className="text-4xl my-12">Latest</h1>
      <hr></hr>
        <PostList posts={posts} />
        {/* Link to all posts */}
        <Link className="btn-black inline-block my-8" href="/blog">
          All Posts
        </Link>

      </div>
    </>
  )
}
