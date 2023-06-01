

import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import appConfig from '@/appConfig'

import { getPosts } from '@/utils.mjs'

export async function getStaticProps(context) {
    const {pagination: {postsPerPage}} = appConfig
    let posts = getPosts()
    let page = +context.params.page || 1
    let skip = (page - 1) * postsPerPage
    let noMorePages = posts.length <= skip + postsPerPage
    posts = posts.slice(skip, skip + postsPerPage)
    console.log(`getStaticProps: page=${page}, skip=${skip}, posts.length=${posts.length}, noMorePages=${noMorePages}`)
    
  
  
    return {
      props: {
        posts: posts || [],
        page,
        noMorePages
      },
    }
  }

//   Write getStaticPaths function
export async function getStaticPaths() {
    const {pagination: {postsPerPage}} = appConfig
    let posts = getPosts()
    let count = posts.length
    let pageCount = Math.ceil(count / postsPerPage)
    let paths = []
    for (let i = 1; i <= pageCount; i++) {
        paths.push({params: {page: `${i}`}})
    }
    return {
        paths : [],
        fallback: "blocking"
    }
}



export default function Blog(props) {
    const { posts, page, noMorePages } = props
    let count = posts ? posts.length : 0
    return (
        <>
            <div className="container max-w-3xl mx-auto" >
                <PostList posts={posts} />
                <Pagination noMorePages={noMorePages} page={page} count={count} />
            </div>
        </>
    )
}