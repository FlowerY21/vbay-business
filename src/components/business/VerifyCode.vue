<template>
    <div class="verify-code-area">
        <el-form-item prop="phone" :label="`${showLabel?phoneLabel:''}`">
            <el-input :placeholder="phonePlaceholder" v-model="model.phone" clearable autocomplete="off" :disabled="disabledPhone"></el-input>
        </el-form-item>
        <slot></slot>
        <el-form-item prop="verifyCode" :label="`${showLabel?'手机验证码':''}`" v-show="showVerifyCode">
            <el-input placeholder="手机验证码" v-model="model.verifyCode" clearable autocomplete="off">
                <a slot="append" :disabled="isDisabled" plain @click="getCode()"
                   class="verify-button">{{buttonText}}</a>
            </el-input>
        </el-form-item>
    </div>
</template>

<script>
    import Dimens from "common/conf/Dimens";
    import BaseService from "service/BaseService";
    import {validatorsMixin, loadMixin} from "mixin";

    export default {
        name: "VerifyCode",
        mixins: [validatorsMixin, loadMixin],
        props: {
            model: {
                type: Object,
                default: {}
            },
            disabledPhone:{
                type:Boolean,
                default: false
            },
            showLabel:{
                type:Boolean,
                default: false
            },
            phoneLabel:{
                type:String,
                default:'手机号码'
            },
            phonePlaceholder:{
                type:String,
                default:'请输入您的手机号码'
            },
            showVerifyCode:{
                type:Boolean,
                default: true
            }
        },
        data() {
            return {
                time: Dimens.GetVerifyCodeInterval,
                interval: null,
                hasMessage: false,
            }
        },
        computed: {
            isDisabled() {
                return this.time != Dimens.GetVerifyCodeInterval;
            },
            buttonText() {
                return this.time != Dimens.GetVerifyCodeInterval ? this.time + "秒后重新获取" : "获取验证码";
            }
        },
        methods: {
            getCode() {
                if (this.hasMessage) {
                    return;
                }
                this.validPhone(null, this.model.phone, messages => {
                    if (messages) {
                        this.hasMessage = true;
                        this.$message({
                            message: messages.message,
                            onClose: () => {
                                this.hasMessage = false;
                            }
                        });
                        return;
                    }
                    this.countDown();
                    this.doLoad(BaseService.sendVerifyCode, {
                        phone: this.model.phone
                    });
                });
            },
            countDown() {
                --this.time;
                this.interval = setInterval(() => {
                    if (--this.time < 1) {
                        this.reset();
                    }
                }, 1000);
            },
            reset(){
                this.time = Dimens.GetVerifyCodeInterval;
                this.interval && clearInterval(this.interval);
                this.interval = null;
            }
        }
    }
</script>

<style scoped>

    .verify-button {
        display: block;
        width: 2rem;
        color: #EA3E39;
        text-align: right;
        border: none;
        padding: 0;
        height: .8rem;
        line-height: .8rem;
        font-size: .26rem;
    }

    .verify-button[disabled] {
        color: #888;
    }
</style>
