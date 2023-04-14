<template>
  <el-container style="height: calc(100% - 50px);max-width: 200px;">
    <el-aside style="height: 100%; transition: width 0.45s;" :style="{ width: isCollapse ? '64px' : '200px' }">
      <div @click="toggleIndex()"
        style="height: 50px;justify-content: center;align-items: center;background-color: #4A5064;width: 100%;display: flex;position: relative;">
        <div style="cursor: pointer;">
          <Operation style="width: 2em; height: 2em; color: #fff;vertical-align: middle;" />
        </div>
      </div>
      <el-menu router :default-active="active" active-text-color="rgb(64, 159, 255)" background-color="#313743" class="el-menu-vertical-demo"
        text-color="#fff" style="height: 100%;" :collapse="isCollapse" unique-opened>
        <el-menu-item index="/home/welcome" @click="getPath('/home/welcome')">
          <Avatar class="el-icon-s-custom" />
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu v-for="(item, index) in menus" :key="item.id" :index="index + 2 + ''">
          <template #title><i :class="icons[index]" style="margin-right: 10px; color: #909399;"></i><span>{{ item.authName }}</span></template>
          <el-menu-item :index="it.path" v-for="(it, index) in item.children" :key="it.id" @click="getPath(it.path)"><el-icon>
              <Menu />
            </el-icon>{{ it.authName }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
import { getMenus } from '@/api/sidebar'

export default {
  name: 'Sidebar',

  data() {
    return {
      isCollapse: false,
      menus: [],
      active: '/home/welcome',
      path: '',
      icons: ['iconfont icon-users', 'iconfont icon-tijikongjian', 'iconfont icon-shangpin', 'iconfont icon-danju', 'iconfont icon-baobiao'],
    }
  },
  methods: {
    toggleIndex() {
      this.isCollapse = !this.isCollapse
    },
    getPath(v) {
      sessionStorage.setItem('path', v)
      this.active = v
    }
  },

  mounted() {
    this.active = sessionStorage.getItem('path')
    getMenus().then(res => {
      this.menus = res.data
    })
  },

}
</script>
<style lang="less" scoped>
* {
  overflow: visible;
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-icon-s-custom {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  user-select: none;

}

.el-menu {
  border-right: none;
}
</style>