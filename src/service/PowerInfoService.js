import {outter_post,post} from 'common/js/axios-helper';
import {PowerInfoApi} from "./constant/UrlMapper";
const host = "/userApi";

/*
    权限管理--权限管理 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-31
*/
const list = (data) => {
    return post(PowerInfoApi.List, data, host, true);
};
const add = (data) => {
    return post(PowerInfoApi.Add, data, host, true);
};
const update = (data) => {
    return post(PowerInfoApi.Update, data, host, true);
};
const Delete = (data) => {
    return post(PowerInfoApi.Delete, data, host, true);
};
const selectone = (data) => {
    return post(PowerInfoApi.SelectOne, data, host, true);
};

export default {list,add,update,Delete,selectone}
