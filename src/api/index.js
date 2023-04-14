import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


axios.defaults.headers.common["Authorization"] = sessionStorage.token;

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/',
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()
  config.headers.Authorization = sessionStorage.getItem('token')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


http.interceptors.response.use(function (response) {
  NProgress.done()
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});





export default http;