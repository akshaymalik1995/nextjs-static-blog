import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import {slugify} from '../utils.mjs';
import { type } from 'os';

function cleanFilename(filename) {
    // If the filename contains "/", it's probably a path, so we only want the last part
    if (filename.includes("\\")) {
        filename = filename.split("\\").pop()
    }
    // remove the .md extension
    filename = filename.replace(/\.md$/, '')
    return filename
}

function getTagsFromFilename(filename) {
    // If the filename contains "/", it's probably a path, split the path and convert each part to a tag except the last part
    if (filename.includes("\\")) {
        let tags = filename.split("\\").slice(0, -1)
        return tags
    }
    return []
}


const contentPath = path.join(process.cwd(), 'content');
let contentFiles;
try {
    contentFiles = fs.readdirSync(contentPath , {recursive: true});
} catch (err) {
    console.error(`Unable to read directory ${contentPath}: ${err}`);
    process.exit(1);
}

const pagesData = []

contentFiles.forEach(file => {
    // If the dir is ".obsidian", skip it
    if (file === ".obsidian") {
        return;
    }
    getTagsFromFilename(file)
    let filename = cleanFilename(file)
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
        data.title = filename;
    }
    if (!data.date) {
        data.date = null
    }
    
    if (!data.description) {
        data.description = "";
    }
    
    data = {...data, slug: slugify(filename, false), id : slugify(data.title)}

    if (!data.tags) {
        data.tags = getTagsFromFilename(file)
    }

    if (typeof data.tags === "string") {
        console.error(`File ${file} contains a string for tags, but it should be an array`);
        process.exit(1);
        return;
    }

    data.tags = data.tags.map(tag => {
            if (typeof tag !== "string") return
            return {name: slugify(tag, false), id: slugify(tag)}
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
    console.log(`Processed :  "${file}"`)
});

// Write the data to a file
try {
    fs.writeFileSync(path.join(process.cwd(), "data.mjs"), `
        const data = {
            "posts": ${JSON.stringify(pagesData)}
        }
        export default data;
    `, 'utf8');
} catch (err) {
    console.error(`Unable to write data to file: ${err}`);
    process.exit(1);
}
