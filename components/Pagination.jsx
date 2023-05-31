import Link from "next/link";
import appConfig from '@/appConfig'
export default function Pagination({ count, page, noMorePages = false }) {
    const { pagination } = appConfig
    const { postsPerPage } = pagination
    const nextPage = page + 1
    const prevPage = page - 1 <= 1 ? 1 : page - 1
    return (
        <div className="my-8 btn-group">
            <Link className="btn" disabled={page === 1} href={`/blog/page/${prevPage}`}>Previous</Link>
            <button className="btn btn-primary">{page}</button>
            <Link className="btn" disabled={noMorePages} href={`/blog/page/${nextPage}`} >Next</Link>
        </div>
    )
}
