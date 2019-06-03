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
                <!--<el-submenu :index="navs.index" v-for = "(navs,first) in navsBar" :key = "first">-->
                    <!--<template slot="title">-->
                        <!--<i class="el-icon-location"></i>-->
                        <!--<span>{{navs.permName}}</span>-->
                    <!--</template>-->
                    <!--<el-menu-item :index="nav.index"  v-for = "(nav,second) in navs.children" :key = "second" @click="goTo(nav.permName,nav.routerName)">{{nav.permName}}</el-menu-item>-->
                <!--</el-submenu>-->
            </el-menu>
        </div>
    </div>
</template>

<script>

    import PowerUserService from 'service/PowerUserService'

    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapGetters} from 'vuex'

    export default {
        name: "navBar",
        data(){
            return{
                navsBar:[{
                    index:'1',
                    navName:'机构管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/organmanage',
                        navsSecondName:'机构管理',
                        routerName:'organmanage',
                    },{
                        index:'/index/organuser',
                        navsSecondName:'机构用户管理',
                        routerName:'organuser',
                    },{
                        index:'/index/organrate',
                        navsSecondName:'机构费率管理',
                        routerName:'organrate',
                    },{
                        index:'/index/organnote',
                        navsSecondName:'机构短信管理',
                        routerName:'organnote',
                    },{
                        index:'/index/organcertification',
                        navsSecondName:'机构实名认证管理',
                        routerName:'organcertification',
                    }]
                },{
                    index:'2',
                    navName:'通道管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/channelpay',
                        navsSecondName:'支付通道管理',
                        routerName:'channelpay',
                    },{
                        index:'/index/channelrate',
                        navsSecondName:'支付费率管理',
                        routerName:'channelrate',
                    },{
                        index:'/index/channelmerchant',
                        navsSecondName:'通道子商户管理',
                        routerName:'channelmerchant',
                    },{
                        index:'/index/channelnote',
                        navsSecondName:'短信通道管理',
                        routerName:'channelnote',
                    },{
                        index:'/index/channelcertification',
                        navsSecondName:'认证通道管理',
                        routerName:'channelcertification',
                    }]
                },{
                    index:'5',
                    navName:'机构管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/dailystatistics',
                        navsSecondName:'按日统计',
                        routerName: 'dailystatistics',
                    }]
                },{
                    index:'6',
                    navName:'系统管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/dictionarymanage',
                        navsSecondName:'字典管理',
                        routerName: 'dictionarymanage',
                    }]
                },{
                    index:'7',
                    navName:'权限管理',
                    navLogo:'',
                    navsSecond:[{
                        index:'/index/usermanage',
                        navsSecondName:'用户管理',
                        routerName: 'usermanage',
                    },{
                        index:'/index/rolemanage',
                        navsSecondName:'角色管理',
                        routerName: 'rolemanage',
                    },{
                        index:'/index/menumanage',
                        navsSecondName:'菜单管理',
                        routerName: 'menumanage',
                    }]
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
            goTo(navsSecondName,routerName){
                this.$emit('addTab',navsSecondName,routerName);
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
                this.doLoad(PowerUserService.selectperms, params, res => {
                    const result = JSON.parse(res.contents);
                    console.log(result)
                    // this.navsBar = result
                }, '信息获取失败')
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
