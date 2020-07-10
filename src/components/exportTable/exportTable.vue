<template>
    <div class="exportTable">
        <div class="head" style="width: 100%;background: none;height: 60px;box-sizing: border-box;padding: 20px">
            <div style="font-size: 24px;">{{table.tableName}}</div>
            <div class="button-handle" v-if="isButtonHandle">
                <el-button type="primary" size="large" @click="handleAdd()">
                    <i class="el-icon-edit"/><span>添加</span>
                </el-button>
                <el-button type="primary" size="large" disabled  @click="handleExport()"><i class="el-icon-download"/><span>导出</span></el-button>
            </div>
        </div>
        <div class="table">
            <el-table :data="table">
                <el-table-column v-for="item in table.tableHead" :key="item.index" :label="item.label"
                                 :prop="item.prop"></el-table-column>
                <el-table-column label="操作" v-if="isButtonHandle">
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
        </div>
    </div>

</template>

<script>
    import {exportExcel} from "../../api/exportExcel"
    export default {
        name: "exportTable",
        data() {
            return {
                allList: {}
            }
        },
        props: {
            table: {},
            isButtonHandle: Boolean,
            handleEditCallback: {},
            handleDeleteCallback: {},
            handleAddCallback: {}
        },
        methods: {
            handleEdit(index, row) {
                this.handleEditCallback(index, row);
            },
            handleDelete(index, row) {
                this.handleDeleteCallback(index, row);
            },
            handleAdd() {
                this.handleAddCallback();
            },
            handleExport(){
                exportExcel().then((res) => {
                    this.allList = res.data.table;
                }).catch((error) => {
                    console.log(error.status);
                });
                import('../../vendor/Export2Excel').then(excel => {
                    excel.export_json_to_excel({
                        header: this.allList.tableHead, //表头 必填
                        data: this.allList.tableData, //具体数据 必填
                        filename: 'excel-list', //非必填
                        autoWidth: true, //非必填
                        bookType: 'xlsx' //非必填
                    })
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .exportTable {
        width: 100%;
        height: 100%;

        .head {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
<style>
    .el-table {
        border: #f4f4f5 2px solid;
        border-radius: 10px;
    }
</style>
