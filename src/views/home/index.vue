<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card>
                <div class="user" slot="header">
                    <img :src="userImg">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2022-2-24</span></p>
                    <p>上次登录地点：<span>莆田</span></p>
                </div>
            </el-card>
            <el-card class="table-card">
                <el-table :data="tableData">
                    <el-table-column 
                        v-for="(val, index) in tableLabel" 
                        :key="index"
                        :prop="index"
                        :label="val"
                    >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="count">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0, height: '60px'}">
                    <i class="icon" :class="'el-icon-' + item.icon" :style="{background: item.color}"></i>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="line-chart">
                <div ref="echarts"></div>
            </el-card>
            <div class="graph">
                <el-card>
                    <div ref="userEcharts"></div>
                </el-card>
                <el-card>
                    <div ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import { getData } from '../../api/data.js'
    import * as echarts from 'echarts'

    export default {
        name: 'Home',
        data() {
            return {
                userImg: require('@/assets/images/user.png'),
                tableLabel: {
                    name: '名称',
                    todayBuy: '今日购买',
                    monthBuy: '本月购买',
                    totalBuy: '总购买'
                },
                tableData: [],
                countData: []
            }
        },
        mounted() {
            getData().then(res => {
                const { code, data } = res.data
                
                if (code == 200) {
                    this.tableData = data.tableData
                    this.countData = data.countData
                    const orderData = data.orderData

                    // 通过第一条记录获取key
                    const keyArray = Object.keys(orderData.data[0])
                    const series = []
                    keyArray.forEach(key => {
                        series.push({
                            name: key,
                            data: orderData.data.map(item => item[key]),
                            type: 'line'
                        })
                    })

                    // 折线图start
                    const option = {
                        xAxis: {
                            data: orderData.date
                        },
                        yAxis: {},
                        legend: {
                            data: keyArray
                        },
                        series
                    }

                    const E = echarts.init(this.$refs.echarts)
                    E.setOption(option)
                    // 折线图end

                    // 柱状图start
                    const userOption = {
                        legend: {
                            textStyle: {
                                color: '#333'
                            }
                        },
                        grid: {
                            left: '20%'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type: 'category',
                            data: data.userData.map(item => item.date),
                            axisLine: {
                                lineStyle: {
                                    color: '#17b3a3'
                                }
                            },
                            axisLabel: {
                                interval: 0,
                                color: '#333'
                            }
                        },
                        yAxis: [
                            {
                                type: 'value',
                                axisLine: {
                                    lineStyle: {
                                        color: '#17b3a3'
                                    }
                                }
                            }
                        ],
                        color: ['#2ec7c9', '#b6a2de'],
                        series: [
                            {
                                name: '新增用户',
                                data: data.userData.map(item => item.new),
                                type: 'bar'
                            },
                            {
                                name: '活跃用户',
                                data: data.userData.map(item => item.active),
                                type: 'bar'
                            }
                        ]
                    }
                    const userE = echarts.init(this.$refs.userEcharts)
                    userE.setOption(userOption)
                    // 柱状图end

                    // 饼图start
                    const videoOption = {
                        tooltip: {
                            trigger: 'item'
                        },
                        color: [
                            '#0f78f4',
                            '#dd536b',
                            '#9462e5',
                            '#a6a6a6',
                            '#e1bb22',
                            '#39c362',
                            '#3ed1cf'
                        ],
                        series: [
                            {
                                data: data.videoData,
                                type: 'pie'
                            }
                        ]
                    }

                    const videoE = echarts.init(this.$refs.videoEcharts)
                    videoE.setOption(videoOption)
                    // 饼图end
                }
            })
        }
    }
</script>

<style lang="less" scoped>
    .user{
        display: flex;
        align-items: center;
        img{
            width: 100px;
            height: 100px;
            margin-right: 20px;
        }
    }
    .login-info{
        p{
            margin: 0;
            padding: 0;
            line-height: 25px;
            font-size: 14px;
            color: #909399;
            span{
                margin-left: 20px;
                color: #303133;
            }
        }
    }
    .table-card{
        margin-top: 20px;
        height: 398px;
    }
    .count{
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        width: 100%;
        .el-card{
            margin-bottom: 10px;
            width: 32%;
            .icon{
                width: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30px;
                color: #ffffff;
            }
            .detail{
                padding-left: 10px;
                .num{
                    padding: 0;
                    margin: 0;
                    margin-top: 15px;
                    line-height: 10px;
                    font-size: 20px;
                }
                .txt{
                    font-size: 12px;
                    color: #C0C4CC;
                }
            }
        }
    }
    .line-chart{
        div{
            height: 210px;
        }
    }
    .graph{
        display: flex;
        margin-top: 10px;
        .el-card{
            flex: 1;
            height: 240px;
            div{
                height: 220px;
            }
        }
        .el-card:nth-child(1){
            margin-right: 10px;
        }
    }
</style>
