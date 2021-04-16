<template>
  <el-row type="flex" class="full-height" justify="center">
    <el-card class="users-card">
      <el-row type="flex" style="height: 500px">
        <el-col style="width: 300px">
        <el-table
          ref="usersListTable"
          :data="getUsersList"
          highlight-current-row
          @current-change="handleCurrentUserChange"
          style="width: 100%"
          row-key="id"
          height="100%"
          size="mini"
          :cell-style="{padding: '0', cursor: 'pointer'}"
        >
          <el-table-column
            property="id"
            label="id"
            width="50">
          </el-table-column>
          <el-table-column
            property="ten"
            label="Ten"
            width="50">
          </el-table-column>
          <el-table-column
            property="name"
            label="Name"
            width="200">
          </el-table-column>
        </el-table>
      </el-col>
        <el-col class="user-card-col">
          <div class="uc-row">
            <el-input
              ref="userName"
              placeholder="user name"
              size="small"
              style="flex-basis: 200px;flex-grow: 1;"
              v-model="currentUser.name"
            ></el-input>
            <div style="line-height: 32px;padding: 0px 10px 0px 10px;">Ten: </div>
            <el-input-number
              placeholder="user ten"
              style="flex-basis: 140px"
              v-model="currentUser.ten"
              size="small"
              :min="0"
              :max="100"
            ></el-input-number>
          </div>
          <div class="uc-row">
            <user-single-table v-model="userKeys" col-name="Keys"></user-single-table>
            <div style="min-width: 1px;background-color: #737373;margin: 0px 6px 0 6px;"></div>
            <user-single-table v-model="userAliases" col-name="Aliases"></user-single-table>
          </div>
          <el-divider></el-divider>
          <div style="text-align: end;">
            <el-button size="small" type="primary" @click="newUser">New user</el-button>
            <el-button size="small" type="danger" @click="saveUser" :disabled="currentUser.ten===0">Save user</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
import userSingleTable from '@/components/users/user-single-table'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    userSingleTable
  },
  data () {
    return {
      currentUser: { id: 0, ten: 0, name: '' },
      userKeys: [],
      userAliases: []
    }
  },
  methods: {
    ...mapActions(['loadUsersList', 'loadUser', 'postUser']),

    async getUser (id) {
      this.loadUser(id)
        .then(res => {
          if (res) {
            this.currentUser = res.user
            this.userKeys = res.userKeys.map(value => { return { ...value, mod: '' } })
            this.userAliases = res.userAliases.map(value => { return { ...value, mod: '' } })
          }
        })
    },

    handleCurrentUserChange (val) {
      this.currentUser = val
      this.getUser(this.currentUser.id)
      this.$router.push({ query: { id: this.currentUser.id } })
    },

    newUser () {
      this.currentUser = { id: 0, ten: 0, name: '' }
      this.userKeys = []
      this.userAliases = []
      this.$refs.userName.focus()
    },

    saveUser () {
      const user = {
        id: this.currentUser.id,
        name: this.currentUser.name,
        ten: this.currentUser.ten,
        userKeys: this.userKeys.filter(value => value.mod !== ''),
        userAliases: this.userAliases.filter(value => value.mod !== '')
      }
      this.postUser(user)
        .then(res => {
          if (res && res.id) {
            this.$message.success('User saved')
            this.loadUsersList()
            this.getUser(res.id)
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getUsersList'])
  },
  mounted () {
    this.loadUsersList()
    const q = this.$route.query
    if (q && q.id) {
      if (q.id > 0) {
        this.getUser(q.id)
      } else {
        this.currentUser = {
          id: 0,
          name: q.name,
          ten: 0
        }
        this.userKeys = [{ id: 1, val: q.key, mod: 'n' }]
        this.$message.warning('this is new User, press save')
      }
    }
  }
}
</script>

<style>

.users-card{
  height: 534px;
}

.user-card-col{
  padding-left: 20px;
  width: 600px !important;
}

.uc-row{
  padding-top: 10px;
  display: flex;
}

</style>
