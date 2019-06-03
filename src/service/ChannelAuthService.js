import {outter_post} from 'common/js/axios-helper';
import {ChannelAuthApi} from "./constant/UrlMapper";

/*
    通道管理——短信通道 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-25
*/
const add = (data) => {
    return outter_post(ChannelAuthApi.Add, data);
};
const list = (data) => {
    return outter_post(ChannelAuthApi.List, data);
};
const detail = (data) => {
    return outter_post(ChannelAuthApi.Detail, data);
};
const shortNames = (data) => {
    return outter_post(ChannelAuthApi.ShortNames, data);
};
const update = (data) => {
    return outter_post(ChannelAuthApi.Update, data);
};
const dpStatus = (data) => {
    return outter_post(ChannelAuthApi.DpStatus, data);
};



export default {add,list,detail,shortNames,update,dpStatus}
