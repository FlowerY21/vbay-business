import {outter_post} from 'common/js/axios-helper';
import {OrganApi} from "./constant/UrlMapper";

/*
    机构管理——机构管理 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-21
*/
const list = (data) => {
    return outter_post(OrganApi.List, data);
};

const update = (data) => {
    return outter_post(OrganApi.Update, data);
};

const add = (data) => {
    return outter_post(OrganApi.Add, data);
};

const prohibit = (data) => {
    return outter_post(OrganApi.Prohibit, data);
};

const simpleNames = (data) => {
    return outter_post(OrganApi.SimpleNames, data);
};

const detail = (data) => {
    return outter_post(OrganApi.Detail, data);
};

const abbrs = (data) => {
    return outter_post(OrganApi.Abbrs, data);
};




export default {list,update,add,prohibit,simpleNames,detail,abbrs}
