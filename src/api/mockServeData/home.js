import Mock from 'mockjs'
import { AmeiData } from 'amei-date-format'

let len = 9
let List = []
let YearMonth = []
let today = AmeiData.strtotime(AmeiData.date('Y-m-01')) // 当月初

export default {
    getStatisticalData: () => {
        for (let i = 0; i < len; i++) {
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

            YearMonth.push(AmeiData.date('Ym', AmeiData.strtotime('-' + (len - i - 1) + 'months', today)))
        }

        return {
            code: 200,
            data: {
                videoData: [ // 饼图数据
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
                orderData: { // 折线图数据
                    date: YearMonth,
                    data: List
                },
                userData: [ // 柱状图数据
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
                tableData: [ // 表格数据
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
                countData: [ // 订单数据
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
