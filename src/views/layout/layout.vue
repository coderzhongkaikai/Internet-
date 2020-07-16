<template>
  <div class="manage">
    <el-row style="height: 100%;">
      <el-col
        :span="3"
        style="min-height: 100%; background-color: #1777db; border-radius: 0 3% 3% 0"
      >
        <el-menu
          :default-active="defaultActive"
          background-color="rgb(23, 119, 219)"
          text-color="#f4f5f9"
          router="true"
          style="height: 100%;border: none;overflow: hidden"
        >
          <!-- <template v-for="route in routes">
                   </template>
                   <el-submenu 
                    :index="route.title"
                    :key="route.title">
                            {{route.title}}
                   </el-submenu> -->
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/deviceInfo">设备信息</el-menu-item>
          <el-menu-item index="/deviceMonitor">设备实时工况</el-menu-item>
          <el-menu-item index="/deviceHistory">设备历史工况</el-menu-item>
        </el-menu>
      </el-col>
      <el-col
        :span="21"
        style="height: 100%;overflow: auto;background: #f4f5f9;padding:0 20px"
      >
        <head-top></head-top>
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeadTop from "../../components/headTop/headTop";
import "../../styles/transition.scss";
export default {
  name: "manage",
  components: { HeadTop },
  computed: {
    defaultActive: function() {
      const resultPath = this.$route.path.replace(/\/index/, "");
      console.log(resultPath)
      return resultPath;
    },
  },
};
</script>

<style scoped lang="scss">
.manage {
  height: 100%;
  box-sizing: border-box;
  background: #f4f5f9;
  .el-menu {
    margin: 20px 0;
    .el-menu-item {
      padding-left: 20px !important;
      margin: 0 0 10px 10px;
      border-radius: 15px 0 0 15px;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }
    .el-menu-item.is-active {
      background-color: #f4f5f9 !important;
      color: #1777db !important;
    }
    .el-menu-item:hover {
      background-color: #f4f5f9 !important;
      color: #1777db !important;
    }
  }
}
.el-submenu__title:hover {
  background-color: #48576a !important;
}
</style>
