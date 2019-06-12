<template>
    <div class="navbar">
        <div class="content">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :router="true">
                <el-menu-item :index="nav.index" v-for = "(nav,first) in navsBar" :key = "first"  @click="goTo(nav.navsName,nav.index)">
                    <i class="el-icon-setting"></i>
                    <span slot="title">{{nav.navsName}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>

    // import PowerUserService from 'service/PowerUserService'

    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapGetters} from 'vuex'

    export default {
        name: "navBar",
        data(){
            return{
                navsBar:[{
                    index:'/index/welcome',
                    navsName:'首页',
                    routerName:'Welcome',
                },{
                    index:'/index/activitymanage',
                    navsName:'活动',
                    routerName:'ActivityManage',
                },{
                    index:'/index/goodsservice',
                    navsName:'商品/服务',
                    routerName:'GoodsService',
                }]
            }
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        computed:{
            ...mapGetters(['userInfo'])
        },
        mounted(){
            this.getSelectPerms();
        },
        methods: {
            goTo(navsName,routerPath){
                this.$emit('addTab',navsName,routerPath);
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            getSelectPerms(){
                const params = {
                    id : this.userInfo.id
                }
                // this.doLoad(PowerUserService.selectperms, params, res => {
                //     const result = JSON.parse(res.contents);
                //     console.log(result)
                //     // this.navsBar = result
                // }, '信息获取失败')
            }
        }
    }
</script>

<style scoped>
    .navbar {
        width: 260px;
        min-width: 260px;
        position: relative;
        transition: .4s;
        user-select:none;
        z-index: 1;
        box-shadow:0px 2px 4px 0px rgba(2,35,51,0.1);
    }
    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 260px;
    }
    /deep/ .el-submenu.is-active .el-icon-class {
        color: #409EFF;
    }

</style>
