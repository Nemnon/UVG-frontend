<template>
 <div style="display: flex; flex-direction: column; width: 50%; height: 360px">
   <el-table
     ref="valueTable"
     :data="data"
     @current-change="handleCurrentChange"
     :row-class-name="tableRowClassName"
     highlight-current-row
     row-key="id"
     height="100%"
     size="mini"
     :cell-style="{padding: '0', cursor: 'pointer'}"
   >
     <el-table-column
       property="val"
       :label="colName"
     >
     </el-table-column>
   </el-table>
   <el-button-group style="width: 100%; padding-top: 5px">
     <el-button style="width: 33%" icon="el-icon-edit" @click="edit"></el-button>
     <el-button style="width: 33%" icon="el-icon-plus" @click="add"></el-button>
     <el-button style="width: 33%" icon="el-icon-delete" @click="del"></el-button>
   </el-button-group>
 </div>
</template>

<script>

export default {
  data () {
    return {
      currentValue: null
    }
  },
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    colName: String,
    data: Array
  },
  methods: {
    genId: () => new Date().getTime(),

    tableRowClassName ({ row, rowIndex }) {
      if (row.mod === 'd') {
        return 'warning-row'
      }
      return ''
    },
    handleCurrentChange (val) {
      this.currentValue = val
    },
    edit () {
      if (!this.currentValue) {
        this.$message.error('Select row first!')
        return
      }
      this.$prompt('Please input value', 'Edit value', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValue: this.currentValue.val,
        inputPattern: /^.{3,}$/,
        inputErrorMessage: 'Invalid Value'
      }).then(({ value }) => {
        this.currentValue.mod = 'm'
        this.currentValue.val = value
        this.$emit('change', this.data)
      }).catch(() => {})
    },
    add () {
      this.$prompt('Please input value', 'Edit value', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^.{3,}$/,
        inputErrorMessage: 'Invalid Value'
      }).then(({ value }) => {
        this.data.push({ id: this.genId(), val: value, mod: 'n' })
        this.$emit('change', this.data)
      }).catch(() => {})
    },
    del () {
      if (!this.currentValue) {
        this.$message.error('Select row first!')
        return
      }
      if (this.currentValue.mod === 'n') {
        const newData = this.data.filter(e => e !== this.currentValue)
        this.$emit('change', newData)
      } else {
        this.currentValue.mod = 'd'
        this.$emit('change', this.data)
      }
    }
  },
  watch: {
    data () {
      this.currentValue = null
      this.$refs.valueTable.setCurrentRow()
    }
  }
}
</script>

<style>

.el-table .warning-row {
  color: red;
}
</style>
