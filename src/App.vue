<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: 'App',
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

#nprogress .bar {
  background: red !important;
}
</style>
