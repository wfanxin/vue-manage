import axios from 'axios'
import config from '../config' // 配置

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor (baseUrl) {
        this.baseUrl = baseUrl
    }

    // 内置配置
    getInsideConfig() {
        return {
            baseUrl: this.baseUrl,
            header: {}
        }
    }

    // 拦截器
    interceptors (instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (request) {
            // 在发送请求之前做些什么
            return request;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    // 请求
    request(options) {
        const instance = axios.create() // 创建实例
        options = {...this.getInsideConfig, ...options} // 合并请求参数
        this.interceptors(instance) // 添加拦截器
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)
