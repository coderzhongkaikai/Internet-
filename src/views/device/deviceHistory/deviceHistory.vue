<template>
  <div class="deviceHistory">
    <!--        <el-table :data="tableForm">
                    <el-table-column label="时间" prop="date"/>
                    <el-table-column label="设备编号" prop="equipmentName"/>
                    <el-table-column label="模块识别码" prop="MID"/>
                    <el-table-column label="病人ID" prop="patientName"/>
                    <el-table-column label="病人基本信息"/>
                    <el-table-column label="康复方案"/>
                    <el-table-column label="实际康复数据"/>
                    <el-table-column label="治疗进程"/>
                    <el-table-column label="治疗评价"/>
                </el-table>-->
    <div
      class="head"
      style="width: 100%;background: none;height: 60px;box-sizing: border-box;padding: 20px"
    >
      <div style="font-size: 24px;">设备历史工况</div>
    </div>
    <div class="table">
      <el-table :data="table">
        <el-table-column
          v-for="item in tableHead"
          :key="item.index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>

        <el-table-column label="操作">
             <router-link to="/deviceHistory/detail">
            <el-button size="mini" type="primary"
              >查看</el-button
            >
             </router-link>
        </el-table-column>
      </el-table>

      <div class="news-footer">
        <el-pagination
          :background="true"
          :total="totalNumber"
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
// import deviceHistory from "../../../mock/deviceHistory";
// import {getDeviceHistory} from '../../../api/device'
import ExportTable from "../../../components/exportTable/exportTable";
import { findAll, add, Delete, update } from "../../../api/history";

export default {
  name: "deviceHistory",
  components: {},
  data() {
    return {
      table: [],
      tableHead: [
        { index: 0, label: "模块识别码", prop: "moduleId" },
        { index: 1, label: "设备编号", prop: "eqpId" },
        { index: 2, label: "当前患者", prop: "patientName" },
        { index: 3, label: "负责医师", prop: "doctorName" },
        { index: 4, label: "治疗阶段", prop: "treatStage" },
        { index: 5, label: "治疗成果", prop: "treatRate" },
      ],
      totalNumber: 0,
    };
  },
  methods: {
    handleCurrentChange(page) {
      findAll(page)
        .then((res) => {
          console.log(res.data);
          this.table = res.data.list;
          this.totalNumber = res.data.total;
        })
        .catch((error) => {
          console.log(error.status);
        });
    }, //操作页码改变
  },
  created() {
    this.handleCurrentChange(1);
  },
};
</script>

<style scoped type="scss">
.news-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
