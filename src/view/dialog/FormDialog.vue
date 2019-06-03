<template>
    <el-dialog :title="formDialogTitle" :visible.sync="dialogFormVisible" center class="dialog"  @close="close" @open="openDialog">
        <el-form label-position="right" :label-width="labelWidth" :model="model"
                 :rules="rules" ref="ruleForm"  @validate="updateBtn">
            <slot></slot>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit()" >{{showPower ? '保 存' : '确 定'}}</el-button>
            <el-button @click="closeDialog">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {submitMixin} from "mixin";
    import {ergodicKeys} from "common/js/common-utils";
    import SubmitText from "mixin/model/SubmitText";

    export default {
        name: "FormDialog",
        mixins: [submitMixin],
        props: {
            formDialogTitle:{
                type:String,
                default:''
            },
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
            dialogService: {
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
            labelWidth:{
                type:String,
                default:'90px'
            },
            showPower:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                dialogFormVisible: false,
                validMap: {},
                canSubmit: false
            };
        },
        mounted() {
            ergodicKeys(this.rules, key => {
                this.validMap[key] = !(typeof this.rules[key][0].required == 'function' ? this.rules[key][0].required() : this.rules[key][0].required);
                // console.log(key, this.validMap[key])
            });

        },
        methods: {
            openDialog(){
                this.$emit('opend')
            },
            open(){
                this.dialogFormVisible = true;
            },
            close(){
                this.$nextTick(() => {
                    this.$refs.ruleForm.clearValidate();
                });
                this.$emit('close')
            },
            closeDialog(){
                if (this.showPower) {
                    this.dialogFormVisible = false;
                }else {
                    this.$emit('cancelChecked')
                }

            },
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
                if (this.showPower) {
                    const params = this.submitData == null ? this.model : this.submitData;
                    ergodicKeys(params, key=>{
                        if (typeof params[key] == 'string') {
                            params[key] = params[key].trim();
                        }
                    });
                    this.doValidAndSubmit('ruleForm', this.dialogService, params, res => {
                        this.$emit("success", res);
                        // this.showSuccess(JSON.parse(res.contents).optMsg)
                    }, new SubmitText({
                        failTitle: this.failTitle,
                        loadingText: this.loadingText,
                        successText: this.successText,
                        failText: this.failText
                    }), error => {
                        this.$emit("fail", error)
                    });
                }else {
                    this.$emit("success");
                }

            },
            validate(callback) {
                this.$refs['ruleForm'].validate(valid => {
                    callback && callback(valid)
                });
            },
            validateField(key, callback) {
                this.$refs.ruleForm.validateField(key, callback);
            },
            // clearValidate(key, callback) {
            //     this.$refs.ruleForm.clearValidate(key, callback);
            // },
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

</style>
