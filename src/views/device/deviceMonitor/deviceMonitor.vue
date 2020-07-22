<template>
    <div class="deviceMonitor">
<!--        <el-table :data="tableForm">-->
<!--            <el-table-column label="设备编号"/>-->
<!--            <el-table-column label="模块识别码"/>-->
<!--            <el-table-column label="病人ID"/>-->
<!--            <el-table-column label="病人基本信息"/>-->
<!--            <el-table-column label="主治医生"/>-->
<!--            <el-table-column label="治疗进程"/>-->
<!--            <el-table-column label="治疗评价"/>-->
<!--        </el-table>-->
        <div class="head" style="width: 100%;background: none;height: 60px;box-sizing: border-box;padding: 20px">
            <div style="font-size: 24px;">设备实时工况</div>
        </div>
        <div class="table">
            <el-table :data="table">
                <el-table-column v-for="item in tableHead" :key="item.index" :label="item.label"
                                 :prop="item.prop"></el-table-column>
            </el-table>
            <div class="news-footer">
                <el-pagination :background="true" :total="totalNumber"
                               layout="total, prev, pager, next, jumper"
                               :prev-text="'上一页'"
                               :next-text="'下一页'"
                               :page-size="10"
                               @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import ExportTable from "../../../components/exportTable/exportTable";
    // import {getDeviceMonitor} from "../../../api/device";
    import {findAll,add,Delete,update} from "../../../api/now"

    export default {
        name: "deviceMonitor",
        components: {},
        data() {
            return {
                table: [],
                tableHead: [
                    {index: 0, label: '模块识别码', prop: 'moduleId'},
                    {index: 1, label: '设备编号', prop: 'eqpId'},
                    {index: 2, label: '当前患者', prop: 'patientName'},
                    {index: 4, label: '患者编号', prop: 'patientId'},
                    {index: 3, label: '负责医师', prop: 'doctorName'},
                    {index: 6, label: '治疗阶段', prop: 'treatStage'},
                    {index: 5, label: '治疗情况', prop: 'treatRate'},
                ],
                totalNumber: 0,
            }
        },
        methods: {
            handleCurrentChange(page) {
                findAll(page).then(res => {
                    this.table = res.data.list;
                    this.totalNumber = res.data.total;
                    console.log(res.data);
                }).catch(error => {
                    console.log(error);
                })
            },   //操作页码改变
        },
        created() {
            this.handleCurrentChange(1);
        }
    }
</script>

<style scoped type="scss">
    .news-footer {
        text-align: center;
        margin-top: 20px;
    }
</style>
