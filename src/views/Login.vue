<template>
  <el-row type="flex" justify="center" align="middle">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>Login</span>
      </div>

      <el-form
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
        label-width="120px"
        size="mini"
      >
        <el-form-item label="User name" prop="username">
          <el-input
            ref="user"
            v-model="loginForm.username"
            autocomplete="off"
            @keyup.enter.native="$refs.pass.focus()"
          ></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            ref="pass"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>

        <el-row type="flex" justify="end">
          <el-button
            type="primary"
            @click="onSubmit"
          >Login</el-button>
        </el-row>

      </el-form>

    </el-card>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please input login name', trigger: 'blur' },
          { min: 3, max: 32, message: 'Length should be 3 to 30', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, max: 32, message: 'Length should be 6 to 30', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    ...mapActions(['loginUser']),

    async onSubmit () {
      const valid = await this.$refs.loginForm.validate()
      if (valid) {
        const res = await this.loginUser(this.loginForm)
        if (res) {
          this.$router.push('/')
        }
      }
    }

  },

  mounted () {
    this.$refs.user.focus()
  }
}
</script>

<style scoped>
.login-card {
  width: 400px;
}
</style>
