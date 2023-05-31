
import Link from "next/link";
import data from "@/data";
export async function getStaticProps() {
    const {posts} = data
    // Write logic to get a list of tags abd their post count
    let tags = []
    posts.forEach(post => {
        post.tags.forEach(tag => {
            let index = tags.findIndex(t => t.name === tag)
            if (index === -1) {
                tags.push({name: tag.name, id : tag.id, _count: {posts: 1}})
            } else {
                tags[index]._count.posts++
            }
        })
    }
    )

    console.log(tags)

    return {
        props: {
            tags
        }
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
                    <Link
                        key={tag.id}
                        href={`/tags/${tag.name}`}

                        className="btn-black mx-2 ">
                        {tag.name} ({tag._count.posts})

                    </Link>
                ))}
            </div>
        </div>
    );
}