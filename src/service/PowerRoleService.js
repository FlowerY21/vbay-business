import {outter_post,post} from 'common/js/axios-helper';
import {PowerRoleApi} from "./constant/UrlMapper";
const host = "/userApi";

/*
    权限管理--角色管理 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-31
*/
const list = (data) => {
    return post(PowerRoleApi.List, data, host, true);
};
const add = (data) => {
    return post(PowerRoleApi.Add, data, host, true);
};
const update = (data) => {
    return post(PowerRoleApi.Update, data, host, true);
};
const Delete = (data) => {
    return post(PowerRoleApi.Delete, data, host, true);
};
const selectperms = (data) => {
    return post(PowerRoleApi.SelectPerms, data, host, true);
};
const selectone = (data) => {
    return post(PowerRoleApi.SelectOne, data, host, true);
};
const selectmenu = (data) => {
    return post(PowerRoleApi.SelectMenu, data, host, true);
};

export default {list,add,update,Delete,selectmenu,selectone,selectperms}
