import Mock from 'mockjs'

let List = []
let YearMonth = []

export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(1000, 10000, 0, 0), // Random.float( min, max, dmin, dmax )
                    vivo: Mock.Random.float(1000, 10000, 0, 0),
                    oppo: Mock.Random.float(1000, 10000, 0, 0),
                    魅族: Mock.Random.float(1000, 10000, 0, 0),
                    三星: Mock.Random.float(1000, 10000, 0, 0),
                    小米: Mock.Random.float(1000, 10000, 0, 0),
                })
            )

            YearMonth.push(202101 + i)
        }

        return {
            code: 20000,
            data: {
                videoData: [
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1499
                    },
                    {
                        name: 'oppo',
                        value: 1999
                    },
                    {
                        name: '魅族',
                        value: 2199
                    },
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '三星',
                        value: 4399
                    }
                ],
                orderData: {
                    data: List,
                    date: YearMonth
                },
                userData: [
                    {
                        date: '周一',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    },
                    {
                        date: '周二',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    },
                    {
                        date: '周三',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    },
                    {
                        date: '周四',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    },{
                        date: '周五',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    },
                    {
                        date: '周六',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    },
                    {
                        date: '周日',
                        new: Mock.Random.integer(10, 20),
                        active: Mock.Random.integer(100, 200)
                    }
                ],
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(1000, 10000),
                        totalBuy: Mock.Random.integer(3000, 30000)
                    },
                    {
                        name: 'vivo',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(1000, 10000),
                        totalBuy: Mock.Random.integer(3000, 30000)
                    },
                    {
                        name: '苹果',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(1000, 10000),
                        totalBuy: Mock.Random.integer(3000, 30000)
                    },
                    {
                        name: '小米',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(1000, 10000),
                        totalBuy: Mock.Random.integer(3000, 30000)
                    },
                    {
                        name: '三星',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(1000, 10000),
                        totalBuy: Mock.Random.integer(3000, 30000)
                    },
                    {
                        name: '魅族',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(1000, 10000),
                        totalBuy: Mock.Random.integer(3000, 30000)
                    }
                ],
                countData: [
                    {
                        name: "今日支付订单",
                        value: Mock.Random.integer(100, 1000),
                        icon: "success",
                        color: "#2ec7c9"
                    },
                    {
                        name: "今日收藏订单",
                        value: Mock.Random.integer(100, 1000),
                        icon: "star-on",
                        color: "#ffb980"
                    },
                    {
                        name: "今日未支付订单",
                        value: Mock.Random.integer(10, 100),
                        icon: "s-goods",
                        color: "#5ab1ef"
                    },
                    {
                        name: "本月支付订单",
                        value: Mock.Random.integer(100, 1000),
                        icon: "success",
                        color: "#2ec7c9"
                    },
                    {
                        name: "本月收藏订单",
                        value: Mock.Random.integer(1000, 10000),
                        icon: "star-on",
                        color: "#ffb980"
                    },
                    {
                        name: "本月未支付订单",
                        value: Mock.Random.integer(100, 1000),
                        icon: "s-goods",
                        color: "#5ab1ef"
                    }
                ]
            }
        }
    }
}