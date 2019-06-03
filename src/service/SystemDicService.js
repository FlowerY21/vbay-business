import {outter_post} from 'common/js/axios-helper';
import {SystemDicApi} from "./constant/UrlMapper";

/*
    系统管理——字典通道 相关接口服务类
    author: ZhaoYue
    Date:   2019-05-25
*/
const add = (data) => {
    return outter_post(SystemDicApi.Add, data);
};
const list = (data) => {
    return outter_post(SystemDicApi.List, data);
};
const detail = (data) => {
    return outter_post(SystemDicApi.Detail, data);
};
const checkUnique = (data) => {
    return outter_post(SystemDicApi.CheckUnique, data);
};
const update = (data) => {
    return outter_post(SystemDicApi.Update, data);
};
const dpStatus = (data) => {
    return outter_post(SystemDicApi.DpStatus, data);
};

const bytype = (data) => {
    return outter_post(SystemDicApi.ByType, data);
};



export default {add,list,detail,checkUnique,update,dpStatus,bytype}
