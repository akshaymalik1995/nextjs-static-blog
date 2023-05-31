import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import {slugify} from '../utils.mjs';

const contentPath = path.join(process.cwd(), 'content' ,'pages');
const contentFiles = fs.readdirSync(contentPath);

const pagesData = []

contentFiles.forEach(file => {
    const fileContent = fs.readFileSync(path.join(contentPath, file), 'utf8');
    let {data, content} = matter(fileContent);
    const filename = file.replace(/\.md$/, '');
    data = {...data, slug: slugify(filename, false), id : slugify(data.title)}
    data.tags  = data.tags.map(tag => {
        return {name: slugify(tag, false) ,id: slugify(tag)}
    })
    // Convert markdown to HTML
    const processedContent = remark().use(html, {sanitize: false} ).use(highlight).processSync(content).toString();
    pagesData.push({ ...data, content : processedContent });
});

// Write the data to a file
fs.writeFileSync(path.join(process.cwd(), "data.js"), `
    const data = {
        "posts": ${JSON.stringify(pagesData)}
    }
    export default data;
`, 'utf8');
