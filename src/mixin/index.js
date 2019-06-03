import {getKeys} from "common/js/common-utils";
import Regs from "common/conf/Regs";
import {mapActions, mapGetters} from "vuex";
import StorageService from 'store/interfaces';
import Account from "../service/model/Account";
import SubmitText from "./model/SubmitText";
import privateKey from 'service/constant/privateKey'
import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";

let loading;
const dialogMethods = {
    showError(title, message, isHTML) {
        this.$notify.error({
            title: title || "发生错误",
            message: message || "",
            dangerouslyUseHTMLString: false || isHTML,
        });
    },
    showSuccess(message) {
        this.$message.closeAll();
        this.$message({
            message: message,
            type: 'success',
        });
    },
    showWarming(message) {
        this.$message.closeAll();
        this.$message({
            message: message,
            type: 'warning'
        });
    },
    showLoading(message) {
        if (loading) {
            loading.setText(message);
            return;
        }
        loading = this.$loading({
            lock: true,
            text: message,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    },
    hideLoading(){
        if (!loading) {
            return;
        }
        loading.close();
        loading = null;
    },
    showConfirm(message, customClass, isHTML){
        return new Promise((resolve, reject)=>{
            this.$confirm(message, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: customClass,
                dangerouslyUseHTMLString: false || isHTML,
                showClose: false
            }).then(() => {
                return resolve();
            }).catch(()=>{
                return reject();
            });
        });
    }
};

const validators = {
    validPhone: (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入电话号码'))
        } else if (!Regs.phone.test(value)) {
            callback(new Error('请输入正确的11位手机号码'))
        } else {
            callback()
        }
    },
    validEmail: (rule, value, callback) => {
        if (value) {
            if (!Regs.email.test(value)) {
                callback(new Error('请输入正确的邮箱地址'))
            } else {
                callback()
            }
        }else {
            callback()
        }
    },
    validCertId: (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入身份证号码'))
        } else if (!Regs.certId.test(value)) {
            callback(new Error('请输入正确的身份证号码'))
        } else {
            callback()
        }
    },
};

const submitMethods = Object.assign({}, dialogMethods, validators, {
    doSubmit(func, data, onSuccess, text = new SubmitText({}), onFail) {
        this.showLoading(text.loadingText);
        const startTime = new Date().getTime();
        func(data).then((data) => {
            setTimeout(()=>{
                this.hideLoading();
                text.successText && this.showSuccess(text.successText);
                onSuccess && onSuccess(data);
            },500 - new Date().getTime() + startTime);
        }, (error) => {
            setTimeout(()=>{
                this.hideLoading();
                text.failTitle = typeof text.failTitle == "function" ? text.failTitle(error) : text.failTitle;
                text.failText = typeof text.failText == "function" ? text.failText(error) : text.failText;
                this.showError(text.failTitle, text.failText || error.message);
                onFail && onFail(error.resp);
            },500 - new Date().getTime() + startTime);
        })
    },
    doValidAndSubmit(formName, func, data, onSuccess, text, onFail) {
        this.doValid(formName).then((a) => {
            this.doSubmit(func, data, onSuccess, text, onFail)
        });
    },
    doValid(formName) {
        return new Promise((resolve, reject) => {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    return resolve()
                }
                this.doValidItems(formName, getKeys(this.$refs[formName].rules));
            })
        });
    },
    doValidItems(formName, keys) {
        return new Promise((resolve, reject) => {
            const messageArr = [];
            keys = typeof keys == "string" ? keys.split(",") : keys;
            this.$refs[formName].validateField(keys, (messsage) => {
                messsage && messageArr.push(messsage);
            });
            if (messageArr.length == 0) {
                return resolve()
            }
            this.showError("校验失败", messageArr.join("</br>"), true)
            console.log("校验失败", messageArr.join(","));
            // reject(messageArr); 加了会报Uncaught (in promise)
        });
    }
});

const loadMethods = Object.assign({}, dialogMethods, {
    doLoad(func, data, onSuccess, failTitle, onFail, failText) {

        func(data).then((data) => {
            onSuccess && onSuccess(data);
        }, (error) => {
            failTitle = typeof failTitle == "function" ? failTitle(error) : failTitle;
            failText = typeof failText == "function" ? failText(error) : failText;
            this.showError(failTitle || "请求失败", failText || error.message);
            onFail && onFail(error.resp);
        })
    },
    doCheck(data,onSuccess){
        const sortedRes = objKeySort(data);
        const sign = sortedRes.sign;
        delete sortedRes.sign;
        const checkSign = encrypt(urlEncode(sortedRes) + '&priKey=' + privateKey.priKey);
        if( checkSign == data.sign){
            onSuccess && onSuccess(data);
        }else{
            // alert(1)
            // this.showError(res.resMsg)
        }
    },



});

export const submitMixin = {
    methods: submitMethods
};

export const loadMixin = {
    methods: loadMethods
};

export const dialogMixin = {
    methods: dialogMethods
};

export const validatorsMixin = {
    methods: validators
};

export const sessionMixin = {
    computed: {
        ...mapGetters(['role', 'userInfo', 'fromPage', 'device', 'loginInfo'])
    },
    methods: {
        innerPageCheck(needQuit) {
            if (null == this.role || isNaN(this.role)) {
                if (needQuit) {
                    this.setToken(null);
                    this.setUser(null);
                    this.saveAccount(new Account({
                        i: this.loginInfo.i
                    }));
                    this.$router.replace({
                        name: 'index',
                        query: {
                            registrationId: this.device.id,
                            appType: this.device.type,
                            forPos: this.device.isPos ? 1 : 0
                        }
                    });
                }
                return false;
            }
            return true;
        },
        outterPageChcek() {
            if (this.role > 0) {
                if (this.fromPage == 'main') {
                    this.$router.back();
                } else {
                    this.$router.replace({name: 'main'});
                }
                return false;
            }
            return true;
        },
        backIndex(nextStep) {
            this.setNext(nextStep);
            if (this.fromPage == 'index') {
                this.$router.back();
            } else {
                this.$router.replace({name: 'index'});
            }
        },
        ...mapActions({
            setFrom: StorageService.Page.setFrom,
            setNext: StorageService.Page.next,
            setToken: StorageService.User.setToken,
            setUser: StorageService.User.setInfo,
            saveAccount: StorageService.User.saveAccount,
        })
    }
};


export const mainPageMixin = {
    props: {
        isShown: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.$el.style.left = this.isShown ? '0' : '100%';
    },
    methods: {
        onShown() {
        }
    },
    watch: {
        isShown(newVal) {
            this.$el.style.left = newVal ? '0' : '100%';
            if (newVal) {
                this.onShown();
            }
        }
    }
};
