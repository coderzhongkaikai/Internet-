<template>
    <div class="device">
        <upload-excel :on-success="handleSuccess"/>

        <!--        <export-table :table="table" :is-button-handle="true"-->
        <!--                      :handleEditCallback="handleEdit"-->
        <!--                      :handleDeleteCallback="handleDelete"-->
        <!--                      :closeDialog="closeDialog"-->
        <!--                      :confirm="confirmChange"-->
        <!--                      :handleAddCallback="handleAdd"-->
        <!--                      :rules="rules"-->
        <!--        ></export-table>-->
        <div class="head" style="width: 100%;background: none;height: 60px;box-sizing: border-box;padding: 20px">
            <div style="font-size: 24px;">设备信息</div>
            <div class="button-handle">
                <el-button type="primary" size="large" @click="handleAdd()">
                    <i class="el-icon-edit"/><span>添加</span>
                </el-button>
                <el-button type="primary" size="large" disabled @click="handleExport()"><i
                        class="el-icon-download"/><span>导出</span></el-button>
            </div>
        </div>
        <div class="table">
            <el-table :data="table">
                <el-table-column v-for="item in tableHead" :key="item.index" :label="item.label"
                                 :prop="item.prop"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :title="isEdit?'修改信息':'添加设备'" :visible.sync="dialogFormVisible" @close="closeDialog" width="40%">
                <el-form :model="dataForm" label-width="100px" status-icon :rules="rules">
                    <el-form-item label="设备ID" prop="id">
                        <el-input v-model="dataForm.id"/>
                    </el-form-item>
                    <el-form-item label="设备编号" prop="eqpId">
                        <el-input v-model="dataForm.eqpId"/>
                    </el-form-item>
                    <el-form-item label="模块识别码" prop="moduleId">
                        <el-input v-model.number="dataForm.moduleId"/>
                    </el-form-item>
                    <el-form-item label="设备型号" prop="eqpTypeId">
                        <el-input v-model="dataForm.eqpTypeId"/>
                    </el-form-item>
                    <el-form-item label="所属医院" prop="hospitalId">
                        <el-input v-model="dataForm.hospitalId"/>
                    </el-form-item>
                    <el-form-item label="所属医生" prop="doctorName">
                        <el-input v-model="dataForm.doctorName"/>
                    </el-form-item>
                    <el-form-item label="现使用人" prop="patientName">
                        <el-input v-model="dataForm.patientName"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible=false">取 消</el-button>
                    <el-button type="primary" @click="confirmChange()">确 定</el-button>
                </div>
            </el-dialog>

            <div class="news-footer float-left">
                <el-pagination :background="true" :total="totalNumber"
                               layout="total, prev, pager, next, jumper"
                               :prev-text="'上一页'"
                               :next-text="'下一页'"
                               :page-size="2"
                               @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    // import getEquipmentInformation from "@/mock/getEquipmentInformation"; //mock数据
    import UploadExcel from "../../../components/uploadExcel/uploadExcel";
    import {getDeviceInfo, deleteDevice, addEquipment, editEquipment, uploadExcel} from "../../../api/device";
    import ExportTable from "../../../components/exportTable/exportTable";

    export default {
        name: "device",
        components: {UploadExcel},
        data() {
            return {
                table: [],
                tableHead:[
                    {index: 0,label:'模块识别码',prop:'moduleId'},
                    {index: 1,label:'设备编号',prop:'eqpId'},
                    {index: 2,label:'设备类型',prop:'eqpTypeId'},
                    {index: 4,label:'当前状态',prop:'nowStatus'},
                    {index: 5,label:'当前患者',prop:'patientName'},
                    {index: 6,label:'负责医师',prop:'doctorName'},
                    {index: 7,label:'所属医院',prop:'hospitalId'},
                ],
                currentPage: 1,
                totalNumber: 0,
                dialogFormVisible: false,
                dataForm: {},
                rules: {},
                isEdit: false,
            }
        },
        methods: {
            handleCurrentChange(page) {//操作页码改变
                this.httpGetTableData(page);
                this.currentPage = page;
            },
            httpGetTableData(page) {//拉取当前页设备数据（有请求）
                getDeviceInfo(page).then(res => {
                    console.log(res.data)
                    this.table = res.data.list;
                    this.totalNumber = res.data.total;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleSuccess({results, header}) {
                uploadExcel(results).then(res => {
                    this.httpGetTableData(1);
                }).catch(error => {
                    this.tableData = results;
                });
                console.log(results);
                console.log(header);
                // this.tableHeader = header
            },
            closeDialog() {//当dialog关闭时的操作：重新拉取当前的数据页（有请求）
                this.dataForm = {
                    id:'',
                    eqpId: '',
                    moduleId: '',
                    eqpTypeId: '',
                    hospitalId: '',
                    doctorName: '',
                    patientName: '',
                };
                this.isEdit = false;
                this.dialogFormVisible = false;
                this.httpGetTableData(this.currentPage);
            },
            handleEdit(index, row) {//编辑设备
                this.dialogFormVisible = true;
                this.dataForm.eqpId = row.eqpId;
                this.dataForm.id = row.eqpId;
                // this.dataForm.equipmentID = row.equipmentID;
                this.dataForm.eqpTypeId = row.eqpTypeId;
                this.dataForm.hospitalId = row.hospitalId;
                this.dataForm.doctorName = row.doctorName;
                this.dataForm.patientName = row.patientName;
                this.dataForm.moduleId = row.moduleId;
                this.isEdit = true;
            },
            confirmChange() {  //确定修改（新增）设备信息（有请求）
                if (this.isEdit) {
                    editEquipment(this.dataForm, 1).then(res => {
                            this.dialogFormVisible = false;
                            this.httpGetTableData(this.currentPage);
                    }).catch(error => {
                        console.log(error.status);
                    });
                } else {
                    addEquipment(this.dataForm, 1).then(res => {
                            this.dialogFormVisible = false;
                            this.httpGetTableData(1);
                    }).catch(error => {
                        console.log(error.status);
                    });
                }
            },
            handleDelete(index, row) {//删除设备（有请求）
                deleteDevice(row.id).then(res => {
                    this.httpGetTableData(this.currentPage);
                }).catch(error => {
                    console.log(error.status);
                });
            },
            handleAdd() { //新增设备
                this.dialogFormVisible = true;
            },
            handleExport(){

            }
        },
        created() {
            this.httpGetTableData(1);
        },
    }
</script>

<style scoped lang="scss">
    .device {
        .head {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .news-footer {
            text-align: center;
            margin-top: 20px;
        }

        .el-table {
            .el-button {
                margin: 1px;
            }
        }

    }
</style>
