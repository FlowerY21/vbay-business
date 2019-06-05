<template>
    <div class="flex-row vertical-center basicInfo">
        <div class="flex-col">
            <p>真实姓名：<span>未实名</span></p>
            <p>手机号码：<span>15845987634</span></p>
            <p>注册时间：<span>2019-03-15 14:30:30</span></p>
            <p>上级ID：<span>13</span></p>
            <p>最后登录时间：<span>2019-05-27 15:20:30</span></p>
        </div>
        <div class="flex-col">
            <p>所属地区：<span>辽宁省沈阳市浑南新区</span></p>
            <p>用户等级：<span>青铜3</span></p>
            <p>身份证号：<span>15847456465439999</span></p>
            <p>上级手机：<span>13697784563</span></p>
            <p>实名认证时间：<span>2019-05-27 15:20:30</span></p>
        </div>
        <div class="flex-col">
            <p>用户ID：<span>963</span></p>
            <p>手机型号：<span>苹果</span></p>
            <p>上级等级：<span>黄金2</span></p>
            <p>IP地址：<span>黄金2</span></p>
            <p>上三级：<span class="blue">张晓、李彤、张凤</span></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BasicInfo"
    }
</script>

<style scoped>
    .basicInfo{
        padding-top: 20px;
    }
    .basicInfo div{
        margin-right: 120px;
    }
    .basicInfo p{
        font-size: 14px;
        color: #000;
        font-weight: bold;
        margin-bottom: 50px;
    }
    .basicInfo p span{
        font-weight: normal;
    }
    .basicInfo p span.blue{
        color: rgba(7, 154, 222, 1);
    }
    @media screen and (max-width: 1470px) {
        .basicInfo div{
            margin-right: 50px;
        }
    }
    @media screen and (max-width: 1255px) {
        .basicInfo div{
            margin-right: 30px;
        }
    }
</style>
