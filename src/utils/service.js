import config from '/src/config.js'

const GITHUB_API = 'https://api.github.com/repos';

const { username, repo, token } = config;
const blog = `${GITHUB_API}/${username}/${repo}`;
const access_token = `token ${token.join ('')}`;

// check response status
const check = (response) => {
	if (response.status >= 200 && response.status < 300)
		return response;
	const error = new Error (response.statusText);
	error.response = response;
	throw error;
}

// github fetch
const githubFetch = async (url, type = 0) => { // type == 1 -> query page
	try {
		const response = await fetch (url, {
			method: 'GET',
			headers: {
				Authorization: access_token,
			},
		});
		check (response);
		const data = response.json ();
		return type ? data[0] : data;
	}
	catch (error) {
		console.log (error);
	}
}

export const queryPost = (number) => {
	const url = `${blog}/issues/${number}?state=open`;
	return githubFetch (url);
}
export const queryPostList = ({ filter = '' }) => {
	// const url = `${blog}/issues?state=open&page=${page}&per_page=${limit}${filter}`;
	const url = `${blog}/issues?state=open${filter}`;
	return githubFetch (url);
}

export const queryCategory = (number) => {
	const url = `${blog}/milestones/${number}`;
	return githubFetch (url);
}
export const queryCategoryList = () => {
	const url = `${blog}/milestones`;
	return githubFetch (url);
}

export const queryTags = () => {
	const url = `${blog}/labels`;
	return githubFetch (url);
}

export const queryPage = (type) => {
	const url = `${blog}/issues?state=closed&labels=${type}`;
	return githubFetch (url);
}