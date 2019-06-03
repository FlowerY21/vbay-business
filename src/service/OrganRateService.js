import {outter_post} from 'common/js/axios-helper';
import {OrganRateApi} from "./constant/UrlMapper";

/*
    机构管理——支付费率 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-29
*/
const add = (data) => {
    return outter_post(OrganRateApi.Add, data);
};

const list = (data) => {
    return outter_post(OrganRateApi.List, data);
};

const update = (data) => {
    return outter_post(OrganRateApi.Update, data);
};

const dpstatus = (data) => {
    return outter_post(OrganRateApi.DpStatus, data);
};

const detail = (data) => {
    return outter_post(OrganRateApi.Detail, data);
};





export default {add,list,update,dpstatus,detail}
