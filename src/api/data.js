import axios from './axios';

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
