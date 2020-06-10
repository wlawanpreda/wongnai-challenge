import axios from 'axios';

const url = `http://localhost:5556/graphql`;

export const axiosGraphqlKeywords = () => {
    return axios({
        url,
        method: 'post',
        data: {
            query: `
                query {
                    keywords
                }
                `
        }
    }).then(res => res.data.data.keywords);
}