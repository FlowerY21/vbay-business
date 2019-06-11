<template>
    <div class="card-container">
        <div>
            <common-el-form :model="model" :rules="rules" :submitData="submitData" @success="onSuccess"
                            @cancel="onCancel" submit-btn-text="提交" failTitle="提交失败" loadingText="提交中...">

                <el-form-item label="消息标题" prop="tatSimpleId">
                    <el-input v-model="model.title" placeholder="请输入消息标题" style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="消息类型" prop="tatSimpleId">
                    <el-radio v-model="model.adType" label="0" class="commonMargin">自建广告</el-radio>
                    <el-radio v-model="model.adType" label="1" class="commonMargin">外链广告</el-radio>
                </el-form-item>
                <el-form-item label="是否热播" prop="tatSimpleId">
                    <el-radio v-model="model.isHot" label="0" class="commonMargin">是</el-radio>
                    <el-radio v-model="model.isHot" label="1" class="commonMargin">否</el-radio>
                </el-form-item>
                <div v-if="model.adType == 1" style="margin-bottom: 20px">
                    <p class="commonTitle">外链文章</p>
                    <div style="margin-bottom: 20px">
                        <p class="el-form-item__label">展示图片</p>
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="model.imgUrl" :src="model.imgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <el-form-item label="文章地址" prop="address">
                        <el-input placeholder="请输入文章地址" v-model="model.address" style="width: 500px">
                            <template slot="prepend">Http://</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div v-else style="margin-bottom: 20px">
                    <p class="commonTitle">自建文章</p>
                    <div style="margin-bottom: 20px">
                        <p class="el-form-item__label">展示图片</p>
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="model.imgUrl" :src="model.imgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <p class="pText">文章内容</p>
                    <vue-ueditor-wrap v-model="msg" :config="myConfig" @ready="ready"
                                      :destroy="true"></vue-ueditor-wrap>
                </div>

            </common-el-form>

        </div>
    </div>
</template>

<script>

    import CommonElForm from 'components/common/CommonElForm'
    import VueUeditorWrap from 'vue-ueditor-wrap'
    import ElInput from "element-ui/packages/input/src/input";

    export default {
        name: 'ChangeArtical',
        components: {
            ElInput,
            VueUeditorWrap, CommonElForm
        },
        data() {
            return {
                myConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://api.demo.com/ueditor/upload',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: './static/UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false
                },
                addFormVisible: false,
                msg: '啊啊啊啊啊啊啊啊啊啊啊啊啊',
                model: {
                    title: '',
                    adType: '0',
                    isHot: '0',
                    imageUrl: '',
                    address: '',

                },
                rules: {},
            }
        },
        computed: {
            submitData() {

            }
        },
        methods: {
            ready(editorInstance) {
                console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
            },
            onSuccess() {
            },
            onCancel() {
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
        }
    }

</script>

<style scoped>
    .commonTitle::before {
        left: -30px;
    }
    .pText{
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
