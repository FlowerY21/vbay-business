<template>
    <el-form :model="model" :inline="inline" :rules="rules" ref="ruleForm" :show-message="true"
             @validate="updateBtn" label-position="right" :label-width="labelWidth"  class="demo-form-inline">
        <slot></slot>
        <el-button  type="primary" @click="submit()" :disabled="!canSubmit" :class="buttonClass ? 'button-size' : 'overWidth'">
            {{submitBtnText}}
        </el-button>
        <el-button class="button-size" @click="cancel()" v-if="showButton">
            取 消
        </el-button>
    </el-form>
</template>

<script>
    import {submitMixin} from "mixin";
    import {ergodicKeys} from "common/js/common-utils";
    import SubmitText from "mixin/model/SubmitText";

    export default {
        name: "CommonElForm",
        mixins: [submitMixin],
        props: {
            model: {
                type: Object,
                default: {},
            },
            rules: {
                type: Object,
                default: null,
            },
            submitBtnText: {
                type: String,
                default: "确定",
            },
            submitService: {
                type: Function,
                default: null
            },
            submitData: {
                type: Object,
                default: null
            },
            failTitle: {
                type: String,
                default: null
            },
            loadingText: {
                type: String,
                default: null
            },
            failText: {
                type: String,
                default: null
            },
            successText: {
                type: String,
                default: null
            },
            buttonClass:{
                type:Boolean,
                default:true
            },
            showButton:{
                type:Boolean,
                default:true
            },
            inline:{
                type:Boolean,
                default:false
            },
            labelWidth:{
                type:String,
                default:''
            },
            SubmitButton:{
                type:Boolean,
                default:false,
            }
        },
        data() {
            return {
                validMap: {},
                canSubmit: this.SubmitButton
            }
        },
        mounted() {
            ergodicKeys(this.rules, key => {
                this.validMap[key] = !(typeof this.rules[key][0].required == 'function' ? this.rules[key][0].required() : this.rules[key][0].required);
                // console.log(key, this.validMap[key])
            });
        },
        methods: {
            updateBtn(key, valid) {
                // console.log(key, valid, this.validMap)
                if (this.validMap[key] == valid) {
                    return;
                }
                this.validMap[key] = valid;

                let result = true;
                ergodicKeys(this.validMap, key => {
                    // console.log(key, result, this.validMap[key], result && this.validMap[key])
                    result = result && this.validMap[key];
                    return !result;
                });
                this.canSubmit = result;
                this.$emit('validField', {
                    key, valid, canSubmit: result
                })
            },
            submit: function () {
                const params = this.submitData == null ? this.model : this.submitData;
                ergodicKeys(params, key=>{
                    if (typeof params[key] == 'string') {
                        params[key] = params[key].trim();
                    }
                });
                this.doValidAndSubmit('ruleForm', this.submitService, params, res => {
                    this.$emit("success", res);
                }, new SubmitText({
                    failTitle: this.failTitle,
                    loadingText: this.loadingText,
                    successText: this.successText,
                    failText: this.failText
                }), error => {
                    this.$emit("fail", error)
                });
            },
            cancel(){
                this.$emit('cancel');
            },
            validate(callback) {
                this.$refs['ruleForm'].validate(valid => {
                    callback && callback(valid)
                });
            },
            validateField(key, callback) {
                this.$refs.ruleForm.validateField(key, callback);
            },
            clearValidate(key, callback) {
                this.$refs.ruleForm.clearValidate(key, callback);
            },
            resetFields(){
                ergodicKeys(this.model, key=>{
                    this.model[key] = ''
                })
            }
        },
        watch: {
            rules() {
                ergodicKeys(this.rules, key => {
                    this.validMap[key] = false
                });
                this.canSubmit = false;
            }
        }
    }
</script>

<style scoped>
    .el-button.isLight {
        background-color: #fff;
        border-color: #fff;
        color: #EA3E39;
    }

    .el-button.isLight:active,
    .el-button.isLight.is-active {
        background-color: rgba(255, 255, 255, .8);
        border-color: rgba(255, 255, 255, .8);
    }

    .el-button.isLight.is-disabled,
    .el-button.isLight.is-disabled:active {
        color: #ccc;
    }

    .overWidth{
        width: 100%;
        margin-bottom: 20px;
    }
</style>
