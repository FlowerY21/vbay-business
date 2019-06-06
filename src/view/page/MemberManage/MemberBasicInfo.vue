<template>
    <div class="card-container">
        <el-card class="box-card">
            <div class="user-box flex-row vertical-center flow-justify">
                <div class="user-left flex-row">
                    <div class="user-head" :style="'background: url('+headUrl+') center/cover no-repeat;'"></div>
                    <div class="flex-col around-justify">
                        <p class="user-name">赵小花</p>
                        <p class="user-tel">18640455721</p>
                    </div>
                    <div class="flex-col around-justify user-msg" v-for="(item,index) in msgList" :key="index">
                        <p class="user-title">{{item.title}}</p>
                        <p class="user-value">{{item.value}}</p>
                    </div>
                </div>
                <div class="user-right">
                    <el-button type="primary" class="button-size" @click="openDialog(1)">变更上级</el-button>
                    <el-button type="primary" class="button-size" @click="openDialog(2)">升降级</el-button>
                    <el-button type="warning" class="button-size" @click="openDialog(3)">冻结账户</el-button>
                </div>
            </div>
        </el-card>
        <el-card class="box-card member">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab,index) in userTabs" :key="index">
                    <!--{{tab.label}}-->
                    <router-view></router-view>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                     :submitData="dialogData"
                     @success="dialogSuccess" @close="dialogClose" @opend="dialogOpen" class="over">
            <div v-if="dialogType == 1">
                <div class="flex-row vertical-center msgbox">
                    <p>当前上级为：</p>
                    <p>花花花❀</p>
                </div>
                <el-form-item prop="upperId">
                    <el-input v-model="dialogModel.upperId" placeholder="请输入要变更的直接上级ID"></el-input>
                </el-form-item>
                <p class="notice">变更上级后，当前会员旗下会员同时随之全部变更</p>
            </div>
            <div v-else-if="dialogType == 2">
                <div class="flex-row vertical-center msgbox">
                    <p>当前角色等级：</p>
                    <p>普通会员</p>
                </div>
                <el-form-item prop="upperId">
                    <el-select v-model="dialogModel.level">
                        <el-option
                            v-for="item in levelList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div v-else>
                <el-form-item prop="content">
                    <el-radio-group v-model="dialogModel.forzen">
                        <el-radio :label="0">冻结，不可登录</el-radio>
                        <el-radio :label="1">冻结，可登录不可提现</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="content">
                    <el-input v-model="dialogModel.content" placeholder="请输入冻结备注"></el-input>
                </el-form-item>
            </div>

        </form-dialog>
    </div>
</template>

<script>
    import FormDialog from '../../dialog/FormDialog'

    export default {
        name: "MemberBasicInfo",
        data() {
            return {
                headUrl: 'http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg',
                msgList: [{
                    title: '可提现余额',
                    value: '￥0.35',
                }, {
                    title: '账户余额',
                    value: '￥789.35',
                }, {
                    title: '可提现余额',
                    value: '￥986636789.35',
                }, {
                    title: '可提现余额',
                    value: '63946',
                }],
                activeName: 'basicinfo',
                userTabs: [{
                    label: '基本信息',
                    name: 'basicinfo',
                }, {
                    label: '资金明细',
                    name: 'fundsdetail',
                }, {
                    label: '好友信息',
                    name: 'friendinfo',
                }, {
                    label: '余额明细',
                    name: 'balancedetail',
                }, {
                    label: '卡片信息',
                    name: 'cardinfo',
                }, {
                    label: '还款计划',
                    name: 'repayment',
                }, {
                    label: '快捷交易',
                    name: 'quicktrading',
                }, {
                    label: '积分信息',
                    name: '1',
                }, {
                    label: '任务详情',
                    name: '2',
                }],
                formDialogTitle: '',
                dialogService: '',
                dialogModel: {
                    upperId: '',
                    level: '',
                    forzen: 1,
                    content: '',
                },
                dialogType: '',
                levelList: [{
                    id: '1',
                    name: '普通会员',
                }]
            }
        },
        components: {
            FormDialog
        },
        computed: {
            dialogData() {

            },
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.$router.replace({
                    name: tab.name
                })
            },
            openDialog(type) {
                this.dialogType = type;
                this.$refs.formDialog.open();
                switch (type) {
                    case 1 :
                        this.formDialogTitle = '变更上级';
                        break;
                    case 2 :
                        this.formDialogTitle = '升降级';
                        break;
                    case 3 :
                        this.formDialogTitle = '是否冻结该用户？';
                        break;
                    default:
                        break;
                }
            },
            dialogSuccess() {

            },
            dialogClose() {

            },
            dialogOpen() {

            },
        }
    }
</script>

<style scoped>

    .button-size {
        width: 100px;
        height: 40px;
    }

    .user-head {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 14px;
    }

    .user-name {
        font-size: 16px;
        color: rgba(7, 154, 222, 1);
    }

    .user-tel {
        font-size: 14px;
        color: rgba(170, 170, 170, 1);
    }

    .user-msg {
        margin-left: 50px;
    }

    .user-title {
        font-size: 14px;
        color: #000;
    }

    .user-value {
        font-size: 20px;
        color: #000;
        font-weight: bold;
    }

    .box-card {
        margin-bottom: 30px;
    }

    .notice {
        font-size: 14px;
        color: #FF6600;
    }

    .msgbox p {
        font-size: 14px;
        color: #000;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 1600px) {
        .user-box {
            display: block;
        }

        .user-right {
            margin-top: 20px;
        }
    }

    @media screen and (max-width: 1220px) {
        .user-msg {
            margin-left: 40px;
        }
    }
</style>
