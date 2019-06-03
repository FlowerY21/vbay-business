import {outter_post} from 'common/js/axios-helper';
import {ChannelNoteApi} from "./constant/UrlMapper";

/*
    通道管理——短信通道 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-24
*/
const add = (data) => {
    return outter_post(ChannelNoteApi.Add, data);
};
const list = (data) => {
    return outter_post(ChannelNoteApi.List, data);
};
const detail = (data) => {
    return outter_post(ChannelNoteApi.Detail, data);
};
const shortNames = (data) => {
    return outter_post(ChannelNoteApi.ShortNames, data);
};
const update = (data) => {
    return outter_post(ChannelNoteApi.Update, data);
};
const dpStatus = (data) => {
    return outter_post(ChannelNoteApi.DpStatus, data);
};



export default {add,list,detail,shortNames,update,dpStatus}
