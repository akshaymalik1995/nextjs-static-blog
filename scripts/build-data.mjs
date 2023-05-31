import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import {slugify} from '../utils.mjs';
import { type } from 'os';

const contentPath = path.join(process.cwd(), 'content' ,'pages');
let contentFiles;
try {
    contentFiles = fs.readdirSync(contentPath);
} catch (err) {
    console.error(`Unable to read directory ${contentPath}: ${err}`);
    process.exit(1);
}

const pagesData = []

contentFiles.forEach(file => {
    if (!file.endsWith('.md') || file === '_template.md') {
        return;
    }
    let fileContent;
    try {
        fileContent = fs.readFileSync(path.join(contentPath, file), 'utf8');
    } catch (err) {
        console.error(`Unable to read file ${file}: ${err}`);
        return;
    }
    let {data, content} = matter(fileContent);
    if (!data.title) {
        console.error(`File ${file} does not contain a title`);
        process.exit(1);
        return;
    }
    if (!data.date) {
        console.error(`File ${file} does not contain a date`);
        process.exit(1);
        return;
    }
    
    if (!data.description) {
        data.description = "";
    }
    const filename = file.replace(/\.md$/, '');
    data = {...data, slug: slugify(filename, false), id : slugify(data.title)}

    if (!data.tags) {
        data.tags = [];
    }

    if (typeof data.tags === "string") {
        console.error(`File ${file} contains a string for tags, but it should be an array`);
        process.exit(1);
        return;
    }

    data.tags = data.tags.map(tag => {
            if (typeof tag !== "string") return
            return {name: tag, id: slugify(tag)}
        })
    

    
    // Convert markdown to HTML
    let processedContent;
    try {
        processedContent = remark().use(html, {sanitize: false} ).use(highlight).processSync(content).toString();
    } catch (err) {
        console.error(`Unable to process content for file ${file}: ${err}`);
        return;
    }
    pagesData.push({ ...data, content : processedContent });
});

// Write the data to a file
try {
    fs.writeFileSync(path.join(process.cwd(), "data.js"), `
        const data = {
            "posts": ${JSON.stringify(pagesData)}
        }
        export default data;
    `, 'utf8');
} catch (err) {
    console.error(`Unable to write data to file: ${err}`);
    process.exit(1);
}
