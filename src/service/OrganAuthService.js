import {outter_post} from 'common/js/axios-helper';
import {OrganAuthApi} from "./constant/UrlMapper";

/*
    机构管理——机构短信 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-27
*/
const list = (data) => {
    return outter_post(OrganAuthApi.List, data);
};

const update = (data) => {
    return outter_post(OrganAuthApi.Update, data);
};

const add = (data) => {
    return outter_post(OrganAuthApi.Add, data);
};

const dpstatus = (data) => {
    return outter_post(OrganAuthApi.DpStatus, data);
};

const detail = (data) => {
    return outter_post(OrganAuthApi.Detail, data);
};





export default {list,update,add,dpstatus,detail}
