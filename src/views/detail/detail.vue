<template>
  <div class="deviceHistory">
    <el-tag @click="goback"><i class="el-icon-arrow-left"></i>返回</el-tag>
    <div class="head" style="width: 100%;background: none;height: 60px;">
      <div style="font-size: 24px;">个人训练历史工况</div>
      <div class="time_table">
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            @change="dataChange"
            value-format="yyyy-MM-dd HH:mm:ss"  
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData">
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
    <div class="excel">
        <ve-histogram :data="chartData"></ve-histogram>
    </div>
  </div>
</template>

<script>
export default {
  name: "deviceHistory",
  components: {},
  data() {
    return {
    chartData: {
          columns: ['日期', '使用时长', '规定时长'],
          rows: [
            { '日期': '2020/1/1', '使用时长': 3, '规定时长': 10 },
            { '日期': '2020/1/2', '使用时长': 5, '规定时长': 10 },
            { '日期': '2020/1/3', '使用时长': 2, '规定时长': 13 },
            { '日期': '2020/1/4', '使用时长': 1, '规定时长': 8 },
            { '日期': '2020/1/5', '使用时长': 9, '规定时长': 12 },
            { '日期': '2020/1/6', '使用时长': 3, '规定时长': 13 }
          ]
        },
      tableData: [
        {
          moduleId: "20191147847578292",
          time: "2020-01-11",
          eqpId: "0418034",
          patientName: "李四",
          doctorName: "xxx",
          treatStage: "1",
          treatRate: "8",
          useTime: "5",
          aimTime: "8",
        },
         {
          moduleId: "20200147847578292",
          time: "2020-01-12",
          eqpId: "0418034",
          patientName: "李四",
          doctorName: "xxx",
          treatStage: "1",
          treatRate: "8",
          useTime: "3",
          aimTime: "8",
        },
         {
          moduleId: "20200147847578292",
          time: "2020-01-13",
          eqpId: "0418034",
          patientName: "李四",
          doctorName: "xxx",
          treatStage: "1",
          treatRate: "8",
          useTime: "6",
          aimTime: "8",
        },
        {
          moduleId: "20201147847578292",
            time: "2020-01-14",
          eqpId: "0418034",
          patientName: "李四",
          doctorName: "xxx",
          treatStage: "1",
          treatRate: "8",
          useTime: "6",
          aimTime: "8",
        },
      ],
      tableHead: [
        { index: 0, label: "模块识别码", prop: "moduleId" },
        { index: 1, label: "时间", prop: "time" },
        { index: 2, label: "设备编号", prop: "eqpId" },
        { index: 3, label: "当前患者", prop: "patientName" },
        { index: 4, label: "负责医师", prop: "doctorName" },
        { index: 5, label: "治疗阶段", prop: "treatStage" },
        { index: 6, label: "治疗成果", prop: "treatRate" },
        { index: 7, label: "使用时长", prop: "useTime" },
        { index: 8, label: "规定时长", prop: "aimTime" },
      ],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      totalNumber: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    handleCurrentChange(page) {
      //   getDeviceHistory(page)
      //     .then((res) => {
      //       console.log(res.data);
      //       this.table = res.data.list;
      //       this.totalNumber = res.data.total;
      //     })
      //     .catch((error) => {
      //       console.log(error.status);
      //     });
    }, //操作页码改变
    dataChange(val) {
      console.log(val);
    },
    goback(){
      console.log("++++++")
      this.$router.go(-1)
    }
  },
  watch: {
    value2: function(newQuestion, oldQuestion) {
      console.log(newQuestion);
      console.log(oldQuestion);
    },
  },
  created() {
    this.handleCurrentChange(1);
  },
};
</script>

<style scoped type="scss">
.head {
  display: flex;
  justify-content: space-between;
}
.time_table {
}
.news-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
