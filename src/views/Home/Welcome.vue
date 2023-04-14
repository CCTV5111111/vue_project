<template >
  <div style="flex: 1; padding: 20px; display: flex;flex-direction: column;align-items: center;">
    <h2 class="h2">Welcome administrator</h2>
    <img src="../../assets/welcome.png" alt="" style="width: 450px;">
  </div>
</template>
<script>
export default {
  name: 'Welcome',
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: 'MagicFont';
  src: url('@/assets/fonts/MagicOwl.otf') format('truetype');
}

.h2 {
  font-family: 'MagicFont', sans-serif;
  font-size: 50px;
  color: #000;
  text-align: center;
  font-weight: 500;
}
</style>