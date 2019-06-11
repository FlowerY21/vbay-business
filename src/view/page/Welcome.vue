<template>
    <div class="flex-row absolute-center welcome">
        <div class="flex-row vertical-center flow-justify">
            <el-card class="box-card">
                <div>
                    <p>账户余额</p>
                    <div class="flex-row vertical-center around-justify">
                        <div class="flex-col vertical-center border-right">
                            <p class="big-text">84066.00</p>
                            <p class="small-text">AUD</p>
                        </div>
                        <div class="flex-col vertical-center">
                            <p class="big-text">84066.00</p>
                            <p class="small-text">AUD</p>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    export default {
        name: "welcome"
    }
</script>

<style scoped>
    .welcome{
       margin-top: 10vh;
    }
    .big-text{
        font-size: 36px;
        color: #00b2b2;
    }
    .small-text{
        font-size: 16px;
        color: #666666;
    }
    .border-right{
        border-right: 1px solid #666666;
    }
</style>
