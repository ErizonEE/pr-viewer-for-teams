import axios from 'axios';

const httpClient = axios.create({
  baseURL: "https://api.github.com",
  headers:{
    Authorization: `token ${process.env.VUE_APP_GITHUB_TOKEN}`
  }
})

httpClient.interceptors.request.use(req => {
  return req
})
httpClient.interceptors.response.use(response => response, (error) => {
    console.log(error)
    throw error;
});

export default httpClient;