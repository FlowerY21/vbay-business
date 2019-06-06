<template>
    <div class="navbar">
        <div class="content">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :router="true">
                <el-submenu :index="navs.index" v-for = "(navs,first) in navsBar" :key = "first">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{navs.navName}}</span>
                    </template>
                    <el-menu-item :index="nav.index"  v-for = "(nav,second) in navs.navsSecond" :key = "second" @click="goTo(nav.navsSecondName,nav.routerName)">{{nav.navsSecondName}}</el-menu-item>
                </el-submenu>
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
                    index:'1',
                    navName:'通道管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/channelmanage',
                        navsSecondName:'通道管理',
                        routerName:'channelmanage',
                    },{
                        index:'/index/otherrate',
                        navsSecondName:'其他费率说明',
                        routerName:'otherrate',
                    }]
                },{
                    index:'2',
                    navName:'计划管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/planselect',
                        navsSecondName:'计划查询',
                        routerName:'planselect',
                    },]
                },{
                    index:'3',
                    navName:'快捷收款管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/quickcollectionselect',
                        navsSecondName:'快捷收款查询',
                        routerName:'quickcollectionselect',
                    },]
                },{
                    index:'4',
                    navName:'系统管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/billreminder',
                        navsSecondName:'账单提醒配置',
                        routerName:'billreminder',
                    },]
                },{
                    index:'5',
                    navName:'会员管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/memberbasicinfo',
                        navsSecondName:'会员基本信息',
                        routerName:'memberbasicinfo',
                    },]
                },{
                    index:'6',
                    navName:'信创学院',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/articalmanage',
                        navsSecondName:'文章管理',
                        routerName:'articalmanage',
                    },]
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
            goTo(navsSecondName,routerPath){
                this.$emit('addTab',navsSecondName,routerPath);
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
