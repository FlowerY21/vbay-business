import {outter_post} from 'common/js/axios-helper';
import {ChannelRateApi, OrganApi} from "./constant/UrlMapper";

/*
    通道管理——支付费率 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-27
*/
const add = (data) => {
    return outter_post(ChannelRateApi.Add, data);
};

const list = (data) => {
    return outter_post(ChannelRateApi.List, data);
};

const update = (data) => {
    return outter_post(ChannelRateApi.Update, data);
};

const dpstatus = (data) => {
    return outter_post(ChannelRateApi.DpStatus, data);
};

const detail = (data) => {
    return outter_post(ChannelRateApi.Detail, data);
};

const shortNames = (data) => {
    return outter_post(ChannelRateApi.ShortNames, data);
};




export default {add,list,update,dpstatus,detail,shortNames}
