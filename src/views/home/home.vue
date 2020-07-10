<template>
    <div class="home">
        <el-row :gutter="50" style="margin-bottom: 20px;">
            <el-col :span="6" v-for="item in dataform" :key="item.id">
                <chart-view :number="item.number" :footer="item.footer" :src="item.src" :color="chartData2.colors[item.id]" :title="item.title"></chart-view>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="15">
                <div class="block">
                    <span style="color: #0c82fe;font-size: 18px;font-weight: bold;font-family: 等线">近期设备使用情况</span>
                    <ve-line :data="chartData1" height='580px' :settings="{area: true}" :extend="extend"
                             :colors="chartData1.colors"></ve-line>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="block">
                    <span style="color: #0c82fe;font-size: 18px;font-weight: bold;font-family: 等线">设备实时总览</span>
                    <ve-ring :data="chartData2" height='580px' :settings="chartData2.chartSettings"
                             :colors="chartData2.colors" :graphic="chartData2.graphic"></ve-ring>
                </div>
            </el-col>
        </el-row>
        <!--        <ve-map :data="chartData3"></ve-map>-->
        <!--        <div id="main" ref="main" :style="{width: '300px', height: '300px'}"></div>-->
    </div>
</template>

<script>
    import {getHome,getHomePic} from "../../api/device";
    // import mockHome from "../../mock/mockHome";
    import chartView from "../../components/chartView/index"
    export default {
        name: "home",
        components: {chartView},
        data() {
            return {
                data2:{
                    use:0,
                    unuse:0,
                    wait:0,
                    end:0
                },
                chartData1: {
                    columns: ['日期', '使用人数'],
                    rows: [
                        {'日期': '2018-05-22', '使用人数': 312,},
                        {'日期': '2018-05-23', '使用人数': 581,},
                        {'日期': '2018-05-24', '使用人数': 666,},
                        {'日期': '2018-05-25', '使用人数': 1000,},
                        {'日期': '2018-05-26', '使用人数': 1314,},
                        {'日期': '2018-05-27', '使用人数': 814,},
                        {'日期': '2018-05-28', '使用人数': 914,},
                        {'日期': '2018-05-29', '使用人数': 888,},
                    ],
                    colors: ['#007dfe']
                },
                chartData2: {
                    columns: ['状态', '设备数量'],
                    graphic:[{
                        id: 0,
                        type:'text',
                        left:'center',
                        top:'center',
                        style:{
                            text:'133台',
                            textAlign:'center',
                            fill:'#000',
                            width:30,
                            height:30,
                            fontSize: 28
                        }
                    },{
                        id: 1,
                        type:'text',
                        left:'center',
                        top: '55%',
                        style:{
                            text:'总台数',
                            textAlign:'center',
                            fill:'#000',
                            width:30,
                            height:30,
                            fontSize: 16,
                        }
                    }],
                    chartSettings: {
                        radius: [75, 150],
                        offsetY: 300,
                    },
                    rows: [
                        {'状态': '正在使用', '设备数量': 120},
                        {'状态': '待机中', '设备数量': 10},
                        {'状态': '未使用', '设备数量': 5},
                        {'状态': '已失效', '设备数量': 8},
                    ],
                    colors: ['#1764e8', '#ffa95a', '#64c8bc', '#ffc5c4'],
                },
                dataform: [
                    {
                        id: 1,
                        number: 120,
                        title: "设备正在使用情况",
                        footer: "今日设备正在使用/台",
                        src: require("../../assets/form1.png"),
                        color: "#3a8ee6"
                    },
                    {
                        id: 2,
                        number: 10,
                        title: "设备待机中情况",
                        footer: "今日设备待机中/台",
                        src: require("../../assets/form2.png"),
                        color: "#ffa95a"
                    }, {
                        id: 3,
                        number: 5,
                        title: "设备未使用情况",
                        footer: "今日设备未使用/台",
                        src: require("../../assets/form3.png"),
                        color: "#64c9bb"

                    }, {
                        id: 4,
                        number: 8,
                        title: "设备已失效情况",
                        footer: "今日设备已失效/台",
                        src: require('../../assets/form4.png'),
                        color: '#ffc5c4'
                    }
                ],
            }
        },
        mounted() {
            // this.$nextTick(()=>{
            //     this.drawLine();
            // })
        },
        methods: {
            handleGetHome(){
                getHome().then((res)=>{
                    this.obj1=res.data;
                    console.log(this.obj1.use);
                }).catch((err)=>{
                    console.log(err)
                });
            },
            handleGetHomePic(){
                getHomePic().then((res)=>{
                    // this.chartData1.rows=res.data;
                    console.log(res.data);
                    this.chartData1.rows=res.data;
                }).catch((err)=>{
                    console.log(err)
                });
            }
        },
        created() {
            // this.handleGetHome();
            // this.handleGetHomePic();
        }
    }
</script>

<style scoped>
    .block {
        background: #ffffff;
        border: #fff 1px solid;
        border-radius: 10px;
        padding: 20px;
        position: relative;
    }

    .block_header {
        font-size: 18px;
        font-weight: bold;
        font-family: 微软雅黑, sans-serif;
    }

    .block_number {
        font-size: 36px;
        color: #3a8ee6;
    }

    .block_footer {
        font-size: 6px;
    }
</style>
