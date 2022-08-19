import axios from 'axios'

const request=axios.create({
    baseURL: '/api',  //设置服务器地址
})

axios.interceptors.request.use(
    request => {
        console.log("请求成功");
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        console.log("响应成功");
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request
