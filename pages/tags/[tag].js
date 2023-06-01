import PostList from "@/components/PostList";
import data from "@/data.mjs";
import { formatDate } from "@/utils.mjs";

export async function getStaticProps(context) {
    try {
        let { posts } = data;
        let tag = context.params.tag;
        posts = posts.filter((post) => {
            return post.tags.some((t) => t.name === tag);
        });
        // Format data for all posts
        posts = posts.map((post) => {
            return {
                ...post,
                date: formatDate(post.date),
            };
        });
        return {
            props: {
                posts,
                tag
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    try {
        let { posts } = data;
        let tags = [];
        // Get unique tags
        posts.forEach((post) => {
            post.tags.forEach((tag) => {
                let index = tags.findIndex((t) => t.name === tag.name);
                if (index === -1) {
                    tags.push({ name: tag.name, id: tag.id });
                }
            });
        });

        // Create paths
        let paths = tags.map((tag) => {
            return { params: { tag: tag.name } };
        });
        return {
            paths : [],
            fallback: "blocking",
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
}

export default function Tag(props) {
    const { posts, tag } = props;
    if (!posts || !tag) {
        return (
            <>
                <div className="container max-w-3xl mx-auto">
                    <h1 className="text-4xl my-12">Error</h1>
                    <p>There was an error loading this page.</p>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="container max-w-3xl mx-auto">
                <h1 className="text-3xl  my-12">Posts tagged with <span className="text-violet-700">{tag}</span> </h1>
                <PostList posts={posts} />
            </div>
        </>
    );
}