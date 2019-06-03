<template>
    <div class="chart-wrap">
        <div class="chart" ref="chart" v-if="!isEmpty"></div>
        <no-result v-else></no-result>

    </div>
</template>

<script>
    import NoResult from '../../../components/common/NoResult'

    const option = {
        // title: {
            // text: '交易笔数',
            // subtext: '纯属虚构'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['交易笔数']
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        series: [
            {
                name:'交易笔数',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                smooth: true,
                color:'#66b1ff'
            }
        ]
    };


    export default {
        name: "DailyNumberChart",
        components: {
            NoResult
        },
        data() {
            return {
                isEmpty: false,
                params: {}
            };
        },
        mounted() {
            this.init(); // 初始化图表
            // this.getData(); //获取图表所需数据

        },
        methods: {
            init() {
                this.charts = this.$echarts.init(this.$refs.chart);
                this.charts.setOption(option);
                // console.log(this.charts)
            },
            getData(){
                this.formatData('a'); // 图表数据
            },
            formatData(data) {

            },

        }
    };

</script>

<style scoped>
    .chart-wrap{
        width: 100%;
        height: 500px;
    }
    .chart{
        width: 100%;
        height: 100%;
    }
</style>
