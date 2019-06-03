import {outter_post} from 'common/js/axios-helper';
import {ChannelApi} from "./constant/UrlMapper";

/*
    通道管理——支付通道 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-22
*/
const list = (data) => {
    return outter_post(ChannelApi.List, data);
};

const update = (data) => {
    return outter_post(ChannelApi.Update, data);
};

const add = (data) => {
    return outter_post(ChannelApi.Add, data);
};

const prohibit = (data) => {
    return outter_post(ChannelApi.Prohibit, data);
};

const names = (data) => {
    return outter_post(ChannelApi.Names, data);
};

const detail = (data) => {
    return outter_post(ChannelApi.Detail, data);
};




export default {list,update,add,prohibit,names,detail}
