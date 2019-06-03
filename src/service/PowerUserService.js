import {outter_post,post} from 'common/js/axios-helper';
import {PowerUserApi} from "./constant/UrlMapper";
const host = "/userApi";

/*
    权限管理--用户管理 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-30
*/
const list = (data) => {
    return post(PowerUserApi.List, data, host, true);
};
const add = (data) => {
    return post(PowerUserApi.Add, data, host, true);
};
const update = (data) => {
    return post(PowerUserApi.Update, data, host, true);
};
const Delete = (data) => {
    return post(PowerUserApi.Delete, data, host, true);
};
const modifypw = (data) => {
    return post(PowerUserApi.ModifyPW, data, host, true);
};
const selectone = (data) => {
    return post(PowerUserApi.SelectOne, data, host, true);
};
const selectperms = (data) => {
    return post(PowerUserApi.selectPerms, data, host, true);
};

export default {list,add,update,Delete,modifypw,selectone,selectperms}
