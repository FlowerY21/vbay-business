<template>
    <div class="wrapper">
        <top></top>
        <el-container>
            <nav-bar @addTab="addTab"></nav-bar>
            <el-main class="main">
                <div class="content">
                    <div class="index-top" v-if="!topShow">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/index/welcome' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) in itemList" :key="index">{{item.name}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <router-view v-if="isRouterAlive"/>
                </div>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import Top from '../fragment/Top'
    import NavBar from '../fragment/NavBar'
    import ElContainer from "element-ui/packages/container/src/main";

    import StorageService from 'store/interfaces';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "index",
        components: {
            ElContainer,
            Top, NavBar
        },
        data() {
            return {
                isRouterAlive: true,
                itemList:[{
                    name:'',
                    path:'',
                }],

            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        // watch:{
        //     $route(to,from){
        //         // console.log(to,from)
        //         this.itemList.push({
        //             path : to.fullPath,
        //             name:''
        //         })
        //     }
        // },
        computed:{
            topShow(){
                return this.$route.name == 'Welcome'
            }
        },
        methods: {
            /**
             *  根据顶部筛选条件筛选-项目和时间段(存在vuex中)
             *  刷新当前显示的组件
             *  参考：https://juejin.im/entry/5b5ac53c5188251abb46c250
             * */
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                })
            },
            addTab(targetName, routerPath) {
                this.itemList[0].path = routerPath;
                this.itemList[0].name = targetName;
            },
        }


    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 1px 3px;
        width: 100%;
    }

    .main {
        flex: 1;
        background: #ffffff;
        overflow: hidden;
        position: relative;
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .index-top{
        height: 40px;
        background: #f5f5f5;
        color: #AAAAAA;
        padding: 0 16px;
        border-bottom: 1px solid #DDDDDD;
    }
</style>
