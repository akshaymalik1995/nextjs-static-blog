import Link from "next/link";
import data from "@/data.mjs";

export async function getStaticProps() {
    try {
        const { posts } = data;
        if (!posts || posts.length === 0) {
            return {
                props: {
                    tags: [],
                },
            };
        }

        // Initialize an empty array to hold the tags
        let tags = [];

        // Loop through each post
        posts.forEach((post) => {
            // If the post has no tags, skip it
            if (!post.tags || post.tags.length === 0) return  ;

            // Loop through each tag in the post
            post.tags.forEach((tag) => {
                // Check if the tag already exists in the tags array
                let index = tags.findIndex((t) => t.name === tag.name);

                // If the tag doesn't exist, add it to the tags array
                if (index === -1) {
                    tags.push({ name: tag.name, id: tag.id, _count: { posts: 1 } });
                } else {
                    // If the tag already exists, increment the post count
                    tags[index]._count.posts++;
                }
            });
        });

        // Return the tags as props
        return {
            props: {
                tags ,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                tags: [],
            },
        };
    }
}

export default function Tags(props) {
    const { tags } = props;
    if (!tags || tags.length === 0) {
        return (
            <div className="container max-w-3xl mx-auto">
                <h1 className="text-4xl my-12">No Tags</h1>
            </div>
        );
    }

    return (
        <div className="container max-w-2xl mx-auto">
            <h1 className="text-4xl my-12">Tags</h1>
            <div className="flex flex-wrap">
                {tags.map((tag) => (
                    <Link key={tag.id} href={`/tags/${tag.name}`} className="btn-black m-2 ">
                        {tag.name} ({tag._count.posts})
                    </Link>
                ))}
            </div>
        </div>
    );
}