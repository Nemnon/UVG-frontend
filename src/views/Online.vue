<template>
  <div class="wrapper">
    <el-row
      type="flex"
      class="full-height"
      style="flex-wrap: wrap; align-items: flex-start; align-content: start;"
    >
      <div class="user-online"
           v-for="user of getUsersOnline"
           :key="user[0]"
           :class="{camera: user[1].camera, arvut: user[1].agent === 'arvut', zoom: user[1].agent === 'zoom'}"
      >
        {{ user[0] }} : {{ user[1].realName }}
      </div>
    </el-row>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      timer: null
    }
  },
  methods: {
    ...mapActions(['loadUsersOnline'])
  },
  computed: {
    ...mapGetters(['getUsersOnline'])
  },
  mounted () {
    this.loadUsersOnline()
    this.timer = setInterval(() => {
      this.loadUsersOnline()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

.wrapper {
  margin: 0 auto;
  width: 950px;
}

.user-online {
  padding: 10px;
  margin: 5px;
  flex-grow: 1;
}

.arvut {
  background-color: #00ff2621;
}

.zoom {
  background-color: #0037ff52;
}

.camera {
  color: #6fbcff;
}
</style>
