<template>
    <div class="welcome">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="grid-content">
                    <el-card class="box-card">
                        <div>
                            <p>账户余额</p>
                            <div class="flex-row vertical-center around-justify border-right">
                                <div class="flex-col vertical-center card-inner-box">
                                    <p class="big-text">84066.00</p>
                                    <p class="small-text">AUD</p>
                                </div>
                                <div class="flex-col vertical-center card-inner-box">
                                    <p class="big-text">84066.00</p>
                                    <p class="small-text">AUD</p>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="grid-content">
                    <el-card class="box-card">
                        <div>
                            <p>今日收入</p>
                            <div class="flex-row vertical-center around-justify border-right">
                                <div class="flex-col vertical-center card-inner-box">
                                    <p class="big-text">84066.00</p>
                                    <p class="small-text">AUD</p>
                                </div>
                                <div class="flex-col vertical-center card-inner-box">
                                    <p class="big-text">84066.00</p>
                                    <p class="small-text">AUD</p>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-card class="box-card">
            <div>
                <p>最新消息</p>
                <div class="flex-row vertical-center around-justify">
                    <div class="flex-col vertical-center card-inner-box">
                        <p class="big-text">3</p>
                        <p class="small-text">顾客评论</p>
                    </div>
                    <div class="flex-col vertical-center card-inner-box">
                        <p class="big-text">5</p>
                        <p class="small-text">会员消息</p>
                    </div>
                    <div class="flex-col vertical-center card-inner-box">
                        <p class="big-text">5</p>
                        <p class="small-text">申请预订</p>
                    </div>
                    <div class="flex-col vertical-center card-inner-box">
                        <p class="big-text">5</p>
                        <p class="small-text">申请入会</p>
                    </div>
                    <div class="flex-col vertical-center card-inner-box">
                        <p class="big-text">5</p>
                        <p class="small-text">今日新增会员</p>
                    </div>
                    <div class="flex-col vertical-center card-inner-box">
                        <p class="big-text">5</p>
                        <p class="small-text">今日新增顾客</p>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "welcome"
    }
</script>

<style scoped>
    .welcome {
        padding: 20px;
    }

    .big-text {
        font-size: 36px;
        color: #00b2b2;
    }

    .small-text {
        font-size: 16px;
        color: #666666;
    }
    .border-right{
        position: relative;
    }
    .border-right::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        background: #DDDDDD;
        left: 0;
        right: 0;
        margin: auto;
    }
    .box-card{
        position: relative;
    }
    .card-inner-box {
        padding-top: 25px;
        padding-bottom: 25px;
    }
</style>
