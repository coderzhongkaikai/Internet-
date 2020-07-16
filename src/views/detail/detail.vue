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
                <el-tag><i class="el-icon-arrow-left"></i>返回</el-tag>
    <div
      class="head"
      style="width: 100%;background: none;height: 60px;"
    >
      <div style="font-size: 24px;">个人训练历史工况</div>
        <div class="time_table">
                 <div class="block">
        <!-- <span class="demonstration">请选择时间范围</span> -->

        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>


        </div>
    </div>
    <div class="table">
      <el-table :data="table">
        <el-table-column
          v-for="item in tableHead"
          :key="item.index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
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
import { getDeviceHistory } from "../../api/device";
import ExportTable from "../../components/exportTable/exportTable";

export default {
  name: "deviceHistory",
  components: {},
  data() {
    return {
      table: [],
      tableHead: [
        { index: 0, label: "模块识别码", prop: "moduleId" },
        { index: 1, label: "模块识别码", prop: "moduleId" },
        { index: 2, label: "设备编号", prop: "eqpId" },
        { index: 3, label: "当前患者", prop: "patientName" },
        { index: 4, label: "负责医师", prop: "doctorName" },
        { index: 5, label: "治疗阶段", prop: "treatStage" },
        { index: 6, label: "治疗成果", prop: "treatRate" },
        { index: 7, label: "使用时长", prop: "treatRate" },
        { index: 8, label: "规定时长", prop: "treatRate" },
      ],
      totalNumber: 0,
      
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
    };
  },
  methods: {
    handleCurrentChange(page) {
      getDeviceHistory(page)
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
.head{
   display: flex;
   justify-content: space-between;
}
.time_table{

}
.news-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
