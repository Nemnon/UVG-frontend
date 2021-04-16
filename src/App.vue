<template>
  <div id="app" class="full-height">

    <el-container direction="vertical" class="full-height">
      <el-header v-if="token" style="padding: 0">
        <el-menu
          :router="true"
          :default-active="$route.path"
          mode="horizontal"
          style="user-select: none; border-bottom: none"
          background-color="#2e3031"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">Events</el-menu-item>
          <el-menu-item index="/users">Users</el-menu-item>
          <el-menu-item index="/logs">Logs</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="full-height" style="padding: 5px">
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {

  },
  data () {
    return {
    }
  },
  methods: {

  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}

body{
  margin: 0px;
  height: 100vh;
  font: 400 14px 'Avenir',Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000000e8 !important;
  /*color: #c7c7c7;*/
}

.full-height{
  height: 100%;
}

header{
  height: 40px !important;
}

header ul li {
  height: 40px !important;
  line-height: 40px !important;
}

</style>
