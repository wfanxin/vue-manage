import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search) // 对被转码的地址进行解码
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            address: Mock.Random.county(true),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page, limt有默认值
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        console.log(config.url)
        // 获取符合条件的数据
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.address.indexOf(name) === -1) {
                return false
            }
            return true
        })
        // 对数据进行分页
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page -1))
        return {
            code: 200,
            count: mockList.length,
            list: pageList
        }
    },

    /**
     * 添加用户
     * @param name, address, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
     addUser: config => {
        const { name, address, age, birth, sex } = JSON.parse(config.body)
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            address, address,
            age: age,
            birth: birth,
            sex: sex
        })
        return {
            code: 200,
            data: {
                message: '添加成功'
            }
        }
    },

    /**
     * 删除用户
     * @param id
     * @return {*}
     */
    deleteUser: config => {
        const { id } = param2Obj(config.url)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(user => user.id !== id)
            return {
                code: 200,
                message: '删除成功'
            }
        }
    },

    /**
     * 批量删除
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    batchRemove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(user => !ids.includes(user.id))
        return {
            code: 200,
            data: {
                message: '批量删除成功'
            }
        }
    },

    /**
     * 修改用户
     * @param id, name, address, age, birth, sex
     * @return {{code: number, data: {message: string}}}
     */
    updateUser: config => {
        const { id, name, address, age, birth, sex } = JSON.parse(config.body)
        List.some(user => {
            if (user.id === id) {
                user.name = name
                user.address = address
                user.age = age
                user.birth = birth
                user.sex = parseInt(sex)
                return true
            }
        })
        return {
            code: 200,
            data: {
                message: '编辑成功'
            }
        }
    }
}
