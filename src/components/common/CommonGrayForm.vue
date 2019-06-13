<template>
    <div class="gray-container">
        <div class="flex-row flow-justify vertical-center">
            <el-form :model="model" :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="model.searchText" :placeholder="placeholder" style="width: 500px"></el-input>
                </el-form-item>
                <el-button type="primary" @click="search()">搜索</el-button>
            </el-form>
            <el-button type="primary" @click="add()" class="button-size">新建</el-button>
        </div>
        <div class="flex-row flow-justify vertical-center">
            <div class="flex-row vertical-center">
                <div class="flex-row vertical-center text-button on" @click="textButton(0)">
                    <p>创建时间</p>
                    <img src="../../assets/images/order.png" alt="orderIcon" class="order-icon">
                </div>
                <div class="flex-row vertical-center text-button">
                    <p>活动时间</p>
                </div>
            </div>
            <el-button @click="BatchDelete()" class="button-size">批量删除</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommonGrayForm",
        props:{
            placeholder:{
                type:String,
                default:'请输入内容'
            }
        },
        data(){
            return{
                model:{
                    searchText:'',
                }
            }
        },
        methods:{
            search(){

            },
            BatchDelete(){

            },
            add(){
                this.$emit('add')
            }
        }
    }
</script>

<style scoped>
    .gray-container{
        background: #f5f5f5;
        padding: 20px;
        padding-bottom: 0;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    .text-button{
        margin-right: 25px;
    }
    .text-button{
        font-size: 16px;
        line-height: 16px;
    }
    .on p{
        color: #00b2b2;
    }
    .order-icon{
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }
</style>
