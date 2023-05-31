import Pagination from '@/components/Pagination' // Importing Pagination component
import PostList from '@/components/PostList' // Importing PostList component
import { getPosts } from '@/utils.mjs'
import appConfig from '@/appConfig'


export async function getStaticProps() {
  const {pagination: {postsPerPage}} = appConfig
  let posts = getPosts()
  // Get the first page of posts
  posts = posts.slice(0, postsPerPage)
  let noMorePages = posts.length <=  postsPerPage
 


  return {
    props: {
      posts: posts || [],
      noMorePages
    },
  }
}

// This is the main Blog component
export default function Blog(props) {
  const { posts, noMorePages } = props // Destructuring posts from props
  if (!posts || posts?.length === 0) { // If there are no posts, display a message
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
        <PostList posts={posts} />
        <Pagination noMorePages={noMorePages} page={1} count={posts.length} />
      </div>
    </>
  )
}