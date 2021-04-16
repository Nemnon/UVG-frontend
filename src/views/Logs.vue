<template>
  <el-row
    type="flex"
    style="flex-direction: column"
    class="full-height"
  >
    <div class="log-table-wrap">
      <table style="width: 100%;text-align: left;">
        <tr
          v-for="log of getLogList"
          :key="log.id"
        >
          <td nowrap>{{log.date}}</td>
          <td class="log-td">{{log.msg}}</td>
          <td>{{log.cnt}}</td>
        </tr>
      </table>
    </div>
  </el-row>
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
    ...mapActions(['loadLogList'])
  },
  computed: {
    ...mapGetters(['getLogList'])
  },
  mounted () {
    this.loadLogList()
    this.timer = setInterval(() => {
      this.loadLogList()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.log-table-wrap {
  margin:0 auto;
  width:950px;
  font-size:0.8rem;
  color:#b7b7b7;
}
.log-td{
  width: 100%;
  padding-left: 5px;
}
</style>
