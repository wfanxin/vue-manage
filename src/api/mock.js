import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

Mock.mock('/home/getData', 'get', homeApi.getStatisticalData())
Mock.mock('/user/add', 'post', userApi.addUser)
Mock.mock('/user/edit', 'post', userApi.updateUser)
Mock.mock(RegExp('/user/getList'+'.*'), 'get', userApi.getUserList)
Mock.mock('/user/del', 'post', userApi.deleteUser)
