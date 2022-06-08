import { format } from 'timeago.js'
import config from '../config'

/*
Format
extract object from data received
e.g. content of the article, time of creation of the article
*/

// post
const regex = /^(.+)?(\r\n)*([\s\S]+)?/
const summaryRegex = /^(\>)?([\S]+)?(\r\n)*([\s\S]+)?/
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/
export const formatPost = (post) => {
    const { body, created_at } = post;
    const res = regex.exec (body);
    const cover = coverRegex.exec (res[1]);
    // console.log (summary);
    let txt, sum;
    if (cover && cover.length == 3) {
        post.cover = {
            title: cover[1],
            src: cover[2]
        }
        // post.description = res[3];
        const summary = summaryRegex.exec (res[3]);
        sum = summary[2];
        txt = summary[4];
    }
    else {
        post.cover = {
            title: '',
            src: config.defaultCover
        }
        // post.description = res[0];
        const summary = summaryRegex.exec (res[0]);
        sum = summary[2];
        txt = summary[4];
    }
    txt = txt.replace (/\n/g, '<br>');
    post.description = txt;
    post.summary = sum;
    post.created_at = format (created_at, 'en'.replace (/\s/, ''));
    return post;
}

// category
export const formatCategory = (item) => {
    if (item.description)
        item.intro = item.description.split ('intro: ')[1];
    return item;
}