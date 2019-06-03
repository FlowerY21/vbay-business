<template>
    <el-form :inline="true" :model="model" class="demo-form-inline" ref="topForm">
        <slot></slot>
        <el-button type="primary" v-if="selectShow" @click="submit()" class="button-size">
            查询
        </el-button>
        <el-button v-if="show" type="primary" @click="add()" class="button-size">
            {{buttonName}}
        </el-button>
        <el-button v-if="cutButton" type="primary" @click="cut()" class="button-size">
            扣款
        </el-button>
        <el-button v-if="buttonShow" type="primary" @click="upload()" class="button-size">
            批量上传
        </el-button>
        <el-button v-if="buttonShow" type="primary" @click="down()" class="button-size">
            下载模板
        </el-button>
    </el-form>
</template>

<script>
    import {submitMixin} from "mixin";
    import {ergodicKeys} from "common/js/common-utils";
    import SubmitText from "mixin/model/SubmitText";

    export default {
        name: "CommonTopForm",
        props: {
            model: {
                type: Object,
                default: {}
            },
            show: {
                type: Boolean,
                default: true
            },
            selectShow: {
                type: Boolean,
                default: true
            },
            buttonShow: {
                type: Boolean,
                default: false
            },
            cutButton: {
                type: Boolean,
                default: false
            },
            buttonName: {
                type: String,
                default: '添加'
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
        },
        mixins: [submitMixin],
        data() {
            return {
                validMap: {},
                canSubmit: false
            }
        },
        methods: {
            add() {
                this.$emit('openAddDialog');
            },
            cut() {
                this.$emit('cut');
            },
            upload() {
                this.$emit('upload');
            },
            down() {
                this.$emit('down');
            },
            submit: function () {
                const params = this.submitData == null ? this.model : this.submitData;
                ergodicKeys(params, key => {
                    if (typeof params[key] == 'string') {
                        params[key] = params[key].trim();
                    }
                });
                this.doValidAndSubmit('topForm', this.submitService, params, res => {
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

        },
    }
</script>

<style scoped>
    .button-size {
        margin-bottom: 22px;
    }
</style>
