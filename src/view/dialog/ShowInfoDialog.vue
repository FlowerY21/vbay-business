<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "showInfoDialog",
        props:{
            title:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                dialogVisible: false
            };
        },
        methods: {
            open(){
                this.dialogVisible = true;
            },
        }
    }
</script>

<style scoped>

</style>
