import Mock from 'mockjs'
export default {
    getMenu: config => {
        const {username, password} = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xeg' && password === '123456') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: 999,
                data: {
                    message: '密码错误'
                }
            }
        }
    }
}
