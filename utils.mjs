export const slugify = (text, addId = true) => {
    // Add a random number of six digits to the end of the slug to avoid conflicts
    const randomNumber = Math.floor(Math.random() * 1000000)
    text = text.toString().toLowerCase()
    .replace(/\s/g, '-') // Replace spaces with -
    // Remove all symbols except -
    .replace(/[^\w-]+/g, '')
    .replace(/--/g, '-') // Replace multiple - with single -
    .replace(/^-/, "") // Trim - from start of text
    .replace(/-$/, "") // Trim - from end of text
    if (addId) {
        text = text + "-" + randomNumber
    }
    return text
}


export const formatDate = (date) => {
    date = new Date(date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}



import {remark} from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'

export async function markdownToHtml(markdown) {
    let result = await remark().use(html, {sanitize: false}).use(highlight).process(markdown)
    return result.toString()
}


            
