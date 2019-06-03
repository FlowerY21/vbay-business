import {outter_post} from 'common/js/axios-helper';
import {UserApi} from "./constant/UrlMapper";
const host = "/userApi";

/*
    用户相关接口服务类
    author: ZhaoYue
    Date:   2019-05-30
*/
const login = (data) => {
    return outter_post(UserApi.Login, data, host);
};

export default {login}
