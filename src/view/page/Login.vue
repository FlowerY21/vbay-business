<template>
    <transition name="fade">
        <div>
            <div class="nav-top flex-row vertical-center flow-justify" :class="{'on':showNav}">
                <img src="../../assets/images/logo_white.png" alt="logoIcon" class="top-logo">
                <div>
                    <div class="login-button" @click="alertLogin">登录</div>
                </div>
            </div>
            <div class="flex-row absolute-center section-box section-one">
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
            <div class="section-box section-two">
                <p>2</p>
            </div>
            <div class="section-box section-three" ref="sectionTwo">
                <p>3</p>
            </div>
            <div class="section-box section-four">
                <p>4</p>
            </div>
            <div class="section-box section-five">
                <p>5</p>
            </div>
            <el-dialog title="登录" :visible.sync="centerDialogVisible" width="25%" center class="dialog-box">
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

                    </common-el-form>
                </div>

            </el-dialog>
        </div>
    </transition>
</template>


<script>
    import UserService from "service/UserService";
    import CommonElForm from "components/common/CommonElForm";
    import FormDialog from '../dialog/FormDialog'
    import StorageService from 'store/interfaces';
    import Device from "service/model/Device";
    import Account from "service/model/Account";
    import {mapActions, mapGetters} from 'vuex';
    import {submitMixin, sessionMixin} from "mixin";

    export default {
        name: 'Login',
        components: {CommonElForm, FormDialog},
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
                submitService: UserService.login,
                showNav: false,
                centerDialogVisible:false,
            }

        },
        computed: {
            ...mapGetters(["nextStep"])
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            this.formModel.userName = this.loginInfo.i;
            this.formModel.passWord = this.loginInfo.p;
        },
        beforeRouteUpdate(to, from, next) {
            this.formModel.username = this.loginInfo.i;
            this.formModel.password = this.loginInfo.p;
            next();
        },
        methods: {
            alertLogin() {
                this.centerDialogVisible = true;
            },
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (this.$refs.sectionTwo.offsetTop <= scrollTop) {
                    this.showNav = true;
                } else {
                    this.showNav = false;
                }
            },
            clearPassword() {
                this.$refs.userNameInput.focus();
                this.formModel.passWord = '';
            },
            onSuccess(data) {
                if (data.respCode == '0000') {
                    this.showSuccess(data.respMsg);

                    // 本地缓存账号密码2小时
                    this.saveAccount(new Account({
                        i: this.formModel.userName,
                        p: this.formModel.passWord
                    }));

                    let result = JSON.parse(data.contents);
                    console.log('result', result);

                    // 缓存token及用户信息
                    this.setUser(result.user);
                    this.setToken(result.token);

                    this.$router.replace({name: 'Welcome'});
                } else {
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

    .page-login {
        width: 1200px;
        box-shadow: 0px 2px 4px 0px rgba(2, 35, 51, 0.1);
    }

    .login_img {
        width: calc(100% - 500px);
        height: 580px;
        background: no-repeat center url('../../assets/images/login.png');
        background-size: cover;
    }

    .login_form {
        width: 500px;
        height: 580px;
        background: #ffffff;
        padding: 0 100px;
    }

    .login_form h1 {
        margin-bottom: 50px;
    }

    .section-box {
        width: 100%;
        height: 100vh;
        position: relative;
        z-index: 9;
    }

    .section-one {
        position: fixed;
        top: 0;
        left: 0;
        background: url("../../assets/images/login.png") center/cover no-repeat;
        background-attachment: fixed
    }

    .section-two {
        background: red;
        margin-top: 100vh;
    }

    .section-three {
        background: yellow;
    }

    .section-four {
        background: blue;
    }

    .section-five {
        background: green;
    }

    .login-button {
        border: 1px solid #03aef3;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        color: #03aef3;
        text-align: center;
        padding: 10px 30px;
        cursor: pointer;
    }

    .nav-top {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        background: lightblue;
        padding: 20px 30px;
        opacity: 0;
        transition: all 1s;
        -moz-transition: all 1s;
        -webkit-transition: all 1s;
        -o-transition: all 1s;
    }

    .nav-top.on {
        opacity: 1;
    }
    .dialog-box .login_form{
        width: auto;
        height: auto;
    }
</style>
