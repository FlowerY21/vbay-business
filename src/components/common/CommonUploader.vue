<template>
    <el-upload :accept="'image/*'" class="avatar-uploader" :action="action" :headers="headers" :show-file-list="false"
               :on-success="onUploaded" :before-upload="checkImage" :on-error="onError">
        <i :class="{placeholder:!imgUrl}" :style="{backgroundImage:`url('${imgUrl?imgUrl:placeholder}')`}">&nbsp;</i>
        <el-input v-model="imgKey" class="fake-input"></el-input>
    </el-upload>
</template>

<script>
    import {getToken, Host} from "common/js/axios-helper";
    import {dialogMixin} from "../../mixin";

    export default {
        name: "CommonUploader",
        model: {
            prop: 'imgKey',
            event: 'change'
        },
        mixins:[dialogMixin],
        props: {
            label: {
                type: String,
                default: '图片'
            },
            imgKey: {
                type: String,
                default: ''
            },
            placeholder:{
                type:String,
                default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAGyCAYAAAAYkScdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QUNCQzU0QjRDNDAxMUU5Qjg4OUZBOEMzMzIxMjZDNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QUNCQzU0QzRDNDAxMUU5Qjg4OUZBOEMzMzIxMjZDNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRBQ0JDNTQ5NEM0MDExRTlCODg5RkE4QzMzMjEyNkM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRBQ0JDNTRBNEM0MDExRTlCODg5RkE4QzMzMjEyNkM3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8BMVwQAAGIpJREFUeNrs3cmSHMd9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'
            }
        },
        data() {
            return {
                imgUrl: '',
                action: Host + "/api/upload",
                headers: {
                    Authorization: getToken()
                },
            }
        },
        methods: {
            onUploaded(res, file) {
                console.log("上传完成");
                console.log(res, file);
                this.imgUrl = URL.createObjectURL(file.raw);
                console.log(res)
                this.$emit('change', res);
                console.log(this.imgKey)
            },
            checkImage(file) {
                console.log("准备上传");
                console.log("file.size=" + file.size);
                console.log("file.type=" + file.type);
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt5M = file.size / 1024 / 1024 < 20;

                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    console.log("上传图片必须是JPG/GIF/PNG/BMP 格式!");
                    this.showWarming('上传图片必须是JPG/GIF/PNG/BMP 格式!')
                }
                if (!isLt5M) {
                    console.log("上传头像图片大小不能超过 20MB!");
                    this.showWarming('上传图片必须是JPG/GIF/PNG/BMP 格式!')
                }
                console.log("图片预处理结果" + ((isJPG || isBMP || isGIF || isPNG) && isLt5M));
                return (isJPG || isBMP || isGIF || isPNG) && isLt5M;
            },
            resetFields() {
                this.imgUrl = ''
            },
            onError(err, file, fileList){
                console.log(`${this.label}上传失败`);
                console.log(err.message);
                console.log(`========`);
                this.showError(`${this.label}上传失败`, err.message, true);
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>
<style scoped>
    .avatar-uploader {
        width: 100%;
        background: #fff;
        overflow: hidden;
        border-radius: .1rem;
        border: 1px solid #ddd;
        height: 3.6rem;
    }

    .avatar-uploader .el-upload i {
        height: 100%;
        display: block;
        background: no-repeat center;
        background-size: 100% 100%;
    }

    .avatar-uploader .el-upload i.placeholder{
        background-size: contain;
    }
    .avatar-uploader .fake-input {
        display: none;
    }
</style>
