import Link from 'next/link'
import PostList from '@/components/PostList'
import appConfig from '@/appConfig'
import { getPosts } from '@/utils.mjs'
import Search from '@/components/Search'

export async function getStaticProps() {
 let allPosts = getPosts()
 const { postsOnHomePage } = appConfig
 let pagePosts = allPosts.slice(0, postsOnHomePage)

  return {
    props: {
      pagePosts: pagePosts || [],
      allPosts : allPosts || [],
    },
  }

}


export default function Home({ pagePosts, allPosts}) {
  if (!pagePosts || pagePosts?.length === 0) {
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
      <Search posts={allPosts} />
      <h1 className="text-4xl my-12">Latest</h1>
      <hr></hr>
        <PostList posts={pagePosts} />
        {/* Link to all posts */}
        <Link className="btn-black inline-block my-8" href="/blog">
          All Posts
        </Link>

      </div>
    </>
  )
}
