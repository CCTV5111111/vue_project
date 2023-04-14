<template>
  <div class="box">
    <Header></Header>
    <div class="content">
      <aside>
        <Sidebar></Sidebar>
      </aside>
      <main style="flex-basis: auto;flex: 1;padding: 20px;overflow: auto;">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
export default {
  components: { Header, Sidebar },
};
</script>
<style lang="less" scoped>
.box {
  background-color: #E9EDF1;
  height: 100%;

  .content {
    display: flex;
    flex-wrap: nowrap;
    height: calc(100% - 60px);
  }
}
</style>
