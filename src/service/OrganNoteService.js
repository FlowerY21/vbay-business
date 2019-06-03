import {outter_post} from 'common/js/axios-helper';
import {OrganNoteApi} from "./constant/UrlMapper";

/*
    机构管理——机构短信 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-27
*/
const list = (data) => {
    return outter_post(OrganNoteApi.List, data);
};

const update = (data) => {
    return outter_post(OrganNoteApi.Update, data);
};

const add = (data) => {
    return outter_post(OrganNoteApi.Add, data);
};

const dpstatus = (data) => {
    return outter_post(OrganNoteApi.DpStatus, data);
};

const detail = (data) => {
    return outter_post(OrganNoteApi.Detail, data);
};





export default {list,update,add,dpstatus,detail}
