<template>
    <div class="card-container">
        <el-alert
            title="客户设置还款日和出账日后，会定时提醒推送"
            type="warning"
            show-icon
            class="warning-box"
            :closable="false"
        >
        </el-alert>
        <div>
            <common-el-form :model="model" :submitData="submitData" @success="onSuccess"
                            @cancel="onCancel" submit-btn-text="提交" failTitle="提交失败" loadingText="提交中..."
                             submitBtnText="保存" :showButton="false" :SubmitButton="true">
                <el-form-item label="开启账单提醒">
                    <el-radio v-model="model.tranCycleType" label="0" class="commonMargin">是</el-radio>
                    <el-radio v-model="model.tranCycleType" label="1" class="commonMargin">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="model.checkedList">
                        <el-checkbox :disabled="weekAllow" :label="item.label" v-for="(item,index) in ways" :key="index"
                                     class="checkbox">
                            {{item.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </common-el-form>
        </div>
    </div>
</template>

<script>
    import CommonElForm from 'components/common/CommonElForm'

    export default {
        name: "BillReminder",
        components: {
            CommonElForm
        },
        data() {
            return {
                model: {
                    tranCycleType: '0',
                    checkedList: [],
                },
                ways: [{
                    value: '1',
                    label: '短信提醒'
                }, {
                    value: '2',
                    label: '消息推送'
                },],
                submitService:'',
            }
        },
        computed: {
            weekAllow(){
                if (this.model.tranCycleType == 0) {
                    return false;
                }else{
                    return true;
                }
            },
            submitData(){

            }
        },
        methods:{
            onSuccess(){

            },
            onCancel(){

            }
        }
    }
</script>

<style scoped>
    .warning-box {
        height: 60px;
        margin-bottom: 30px;
    }

    .checkbox {
        display: block;
        width: 200px;
    }
</style>
