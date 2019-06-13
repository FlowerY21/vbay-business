<template>
    <div class="common-container">
        <common-el-form :model="model" :rules="rules" :submitData="submitData" @success="onSuccess"
                        @cancel="onCancel" submit-btn-text="提交" failTitle="提交失败" loadingText="提交中..."
                        :submitService="submitService" labelWidth="110px">
            <el-form-item label="名称" prop="chnId">
                <el-input type="text" v-model="name" style="width: 500px;"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="chnId">
                <el-checkbox v-model="checked">免费</el-checkbox>
                <div v-if="!checked">

                </div>
            </el-form-item>
            <el-form-item label="开始时间" prop="chnId">
                <el-date-picker
                    v-model="startDay"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <el-time-select
                    v-model="value"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }"
                    placeholder="选择时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="结束时间" prop="chnId">
                <el-date-picker
                    v-model="startDay"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <el-time-select
                    v-model="value"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                      }"
                    placeholder="选择时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="限制人数" prop="chnId">
                <el-checkbox v-model="checked">限制</el-checkbox>
                <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="活动地址" prop="chnId">
                <el-input type="text" v-model="name" style="width: 500px;" placeholder="活动详细地址"></el-input>
                <p class="red-notice">如需地图导航，请在APP端中进行编辑，通过GPS获取真实位置信息</p>
            </el-form-item>
            <el-form-item label="封面图片" prop="chnId">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </common-el-form>
    </div>
</template>

<script>
    import CommonElForm from 'components/common/CommonElForm'

    export default {
        name: "changeActivity",
        data(){
            return{
                model:{},
                rules:{},
                submitService:'',
                checked: false,
                imageUrl: ''
            }
        },
        components:{
            CommonElForm
        },
        computed:{
            submitData(){},

        },
        methods:{
            onSuccess(){},
            onCancel(){},
            handleChange(value) {
                console.log(value);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .coverImg{
        width: 110px;
        height: 80px;
    }
    .red-notice{

    }
</style>
