<template>

  <el-row
    type="flex"
    style="flex-direction: column"
    class="full-height"
  >
    <div class="log-table-wrap">
      <table style="width: 100%;text-align: left;">

        <transition-group name="fade" tag="tbody">
          <tr
            v-for="user of getUsersEvents"
            :key="user.id"
            :class="{
              alarm: !user.user_id,
              nextday:isOtherDay(user.event_date)
            }"
          >
            <td>{{user.user_id}}</td>

            <td>{{user.event_date}}</td>

            <td
              v-if="user.user_id !== 0"
              class="key-url"
              @click="goUserPage(user)"
            >{{user.real_name}}</td>
            <td v-else>{{user.real_name}}</td>

            <td>{{user.name}}</td>
            <td
              v-if="user.user_id === 0 && user.key.length > 5"
              class="key-url"
              @click="goUserPage(user)"
            >{{user.key}}</td>
            <td v-else>{{user.key}}</td>

            <td>{{user.email}}</td>

          </tr>
        </transition-group>

      </table>
    </div>

  </el-row>

</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      timer: null
    }
  },
  methods: {
    ...mapActions(['loadUsersEvents']),

    isOtherDay (date) {
      const cmpDate = moment(date).format('YYYY-MM-DD')
      if (!this.prevDate) {
        this.prevDate = cmpDate
      }
      if (cmpDate !== this.prevDate) {
        this.prevDate = cmpDate
        return true
      }
      return false
    },

    goUserPage (user) {
      const u = { id: user.user_id }
      if (u.id === 0) {
        u.name = user.name
        u.key = user.key
      }
      this.$router.push({
        path: '/users',
        query: u
      })
    }
  },

  computed: {
    ...mapGetters(['getUsersEvents'])
  },

  mounted () {
    this.prevDate = null
    this.loadUsersEvents()
    this.timer = setInterval(() => {
      this.loadUsersEvents()
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

.nextday{
  background-color: #0000ff70;
}

.alarm {
  color:#ff6262;
}

.fade-enter-active {
  transition: opacity 2s;

}
.fade-enter {
  opacity: 0;
}

.key-url{
  cursor: pointer;
}

.key-url:hover{
  text-decoration: underline;
}
</style>
