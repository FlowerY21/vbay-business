<template>
    <transition name="fade">
        <div class="flex-row absolute-center">
            <div class="login-box flex-col vertical-center">
                <h1>VBAY</h1>
                <p class="small-title">商户管理端</p>
                <common-el-form :model="formModel" :showButton="false" :rules="rules"
                                submitBtnText="登录" @success="success" :buttonClass="false">
                    <el-form-item prop="username">
                        <div class="flex-row vertical-center flow-justify">
                            <el-input type="text" v-model="code" placeholder="+86" class="code-input"></el-input>
                            <el-input type="text" v-model="username" placeholder="用户名（手机号）" class="user-input"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="text" v-model="password" placeholder="密码" style="width: 300px;"></el-input>
                    </el-form-item>
                    <div class="flex-row vertical-center flow-justify">
                        <el-checkbox v-model="checked" class="text">记住密码</el-checkbox>
                        <el-button type="text" class="text">忘记密码？</el-button>
                    </div>
                </common-el-form>
                <el-button type="text" class="small-title">注册新商户</el-button>
            </div>
        </div>
    </transition>
</template>


<script>
    import UserService from "service/UserService";
    import CommonElForm from "components/common/CommonElForm";

    import StorageService from 'store/interfaces';
    import Device from "service/model/Device";
    import Account from "service/model/Account";
    import {mapActions, mapGetters} from 'vuex';
    import {submitMixin, sessionMixin} from "mixin";

    export default {
        name: 'Login',
        components: {CommonElForm},
        mixins: [submitMixin, sessionMixin],
        data() {
            return {
                formModel:{
                    code:'+86',
                    username:'',
                    password:'',

                },
                rules:{},
                checked:false,
            }

        },
        computed: {

        },
        mounted() {

        },
        beforeRouteUpdate(to, from, next) {

        },
        methods: {
            success(res){

            },
        },
    }
</script>

<style scoped>
    .fade-enter-active {
        transition: all .15s;
    }

    .fade-enter {
        transform: scale(.9, .9);
    }

    .login-box{
        width: 500px;
        padding: 30px;
        background: #FFFFFF;
        border-radius: 10px;
    }
    .login-box h1{
        font-size: 48px;
        color: #00b2b2;
    }
    .small-title{
        font-size: 16px;
        color: #00b2b2;
        margin-bottom: 30px;
    }

    .root{
        background: #CCCCCC;
    }

    .text{
        font-size: 14px;
        color: #101010;
    }

    .code-input{
        width: 75px;
    }

    .user-input{
        width: auto !important;
    }
</style>
