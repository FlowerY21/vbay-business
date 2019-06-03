<template>
    <div>
        <el-card class="common-margin">
            <common-top-form :model="formModel" :show="false">
                <el-row>
                    <el-form-item label="机构名称">
                        <el-select v-model="formModel.organ">
                            <el-option
                                v-for="item in organs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="应用名称">
                        <el-select v-model="formModel.apply">
                            <el-option
                                v-for="item in applys"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="通道名称">
                        <el-select v-model="formModel.channel">
                            <el-option
                                v-for="item in channels"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-form-item label="交易方式">
                    <el-select v-model="formModel.type">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="充值时间">
                    <el-date-picker
                        v-model="formModel.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </common-top-form>
        </el-card>
        <el-card class="common-margin">
            <p class="commonTitle">交易笔数走势图</p>
            <daily-number-chart ref="rjybs"></daily-number-chart>
            <p class="commonTitle">交易金额走势图</p>
            <daily-money-chart ref="rjyje"></daily-money-chart>
        </el-card>
    </div>

</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import DailyNumberChart from '../../fragment/echarts/DailyNumberChart'
    import DailyMoneyChart from '../../fragment/echarts/DailyMoneyChart'
    export default {
        name: "DailyStatistics",
        components:{
            DailyNumberChart,
            CommonTopForm,
            DailyMoneyChart
        },
        data(){
            return{
                formModel:{
                    organ:'',
                    apply:'',
                    channel:'',
                    type:'',
                    time:'',
                },
                organs:[],
                applys:[],
                channels:[],
                types:[],

            }
        },
        methods:{
            //调整窗口
            chartResize() {
                this.$refs.rjybs.charts.resize();
                this.$refs.rjyje.charts.resize();
            },

        },
        mounted() {
            window.addEventListener('resize', this.chartResize);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.chartResize);
        },

    }
</script>

<style scoped>

</style>
