import {outter_post} from 'common/js/axios-helper';
import {ActivityApi} from "./constant/UrlMapper";

/*
    用户相关接口服务类
    author: ZhaoYue
    Date:   2019-06-13
*/
const list = (data) => {
    return outter_post(ActivityApi.List, data, host);
};

export default {list}
