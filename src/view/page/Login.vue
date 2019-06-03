<template>
    <transition name="fade">
        <div class="flex-row absolute-center">
            <div class="page-login flex-row absolute-center">
                <div class="login_img"></div>
                <div class="login_form flex-col flow-center">
                    <h1>信创圈综合管理平台</h1>
                    <common-el-form :model="formModel" :rules="formRules" @success="onSuccess"
                                    submit-btn-text="登录" failTitle="登录失败" loadingText="登录中..."
                                    :submitService="submitService" :buttonClass="false" :showButton="false">
                        <el-form-item prop="userName">
                            <el-input placeholder="用户名" v-model.number="formModel.userName" clearable
                                      autocomplete="off" @clear="clearPassword" ref="userNameInput">
                                <i slot="prefix" class="el-input__icon icon-account"></i>
                            </el-input>
                        </el-form-item>
                        <!-- 密码的明文与密文的切换 -->
                        <el-form-item prop="passWord">
                            <el-input type="passWord" v-model="formModel.passWord" placeholder="密码" clearable
                                      autocomplete="off">
                                <i slot="prefix" class="el-input__icon icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <!--<el-form-item prop="passWord">-->
                            <!--<el-input type="passWord" v-model="formModel.passWord" placeholder="密码" clearable-->
                                      <!--autocomplete="off">-->
                                <!--<i slot="prefix" class="el-input__icon icon-lock"></i>-->
                            <!--</el-input>-->
                        <!--</el-form-item>-->

                    </common-el-form>
                </div>

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
                formModel: {
                    userName: '',
                    passWord: '',
                },
                formRules: {
                    userName: [{
                        required: true,
                        message: '请输入账号'
                    },],
                    passWord: [{
                        required: true,
                        message: '请输入密码'
                    },]
                },
                submitService: UserService.login
            }

        },
        computed: {
            ...mapGetters(["nextStep"])
        },
        mounted() {
            this.formModel.userName = this.loginInfo.i;
            this.formModel.passWord = this.loginInfo.p;
        },
        beforeRouteUpdate(to, from, next) {
            // if (this.fromPage != "index") {
            //     this.setFrom('index');
            // }
            // if (this.nextStep) {
            //     const nextStep = this.nextStep;
            //     this.setNext("");
            //     next({name: nextStep, replace: nextStep == 'main'});
            //     return;
            // }
            this.formModel.username = this.loginInfo.i;
            this.formModel.password = this.loginInfo.p;
            next();
        },
        methods: {
            clearPassword(){
                this.$refs.userNameInput.focus();
                this.formModel.passWord = '';
            },
            onSuccess(data) {
                if(data.respCode == '0000'){
                    this.showSuccess(data.respMsg);

                    // 本地缓存账号密码2小时
                    this.saveAccount(new Account({
                        i: this.formModel.userName,
                        p: this.formModel.passWord
                    }));

                    let result = JSON.parse(data.contents);
                    console.log('result',result);

                    // 缓存token及用户信息
                    this.setUser(result.user);
                    this.setToken(result.token);

                    this.$router.replace({name: 'Index'});
                }else{
                    this.showError(data.respMsg);
                }
            },
            ...mapActions({
                setUser: StorageService.User.setInfo,
                setToken: StorageService.User.setToken,
                // setRole: StorageService.User.setRole,
                // setDevice: StorageService.Device.set,
                // saveAccount: StorageService.User.saveAccount,
                // setRoleShow: StorageService.User.setRoleShow,
            })
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
    .page-login{
        width: 1200px;
        box-shadow:0px 2px 4px 0px rgba(2,35,51,0.1);
    }
    .login_img{
        width: calc(100% - 500px);
        height: 580px;
        background: no-repeat center url('../../assets/images/login.png');
        background-size: cover;
    }
    .login_form{
        width: 500px;
        height: 580px;
        background: #ffffff;
        padding: 0 100px;
    }
    .login_form h1{
        margin-bottom: 50px;
    }
</style>
