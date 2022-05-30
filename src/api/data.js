import axios from './axios';

export const getMenu = (params) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}

export const getList = (params) => {
    return axios.request({
        url: '/user/getList',
        method: 'get',
        params
    })
}
