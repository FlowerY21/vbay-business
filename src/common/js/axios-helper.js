import axios from 'axios';
import Server from 'common/conf/Server';
import store from 'store';

const CommonParams = {
    // g_tk: 1928093487,
    // inCharset: 'utf-8',
    // outCharset: 'utf-8',
    // notice: 0,
    // format: 'jsonp'
};

const RespStatus = {
    Success: 200
};

export const getToken = () => {
    return store.getters.userToken
};

export const Host = Server[process.env.NODE_ENV];

export function get(url, data, host, needToken) {
    return axios.get((host || Host) + url, {
        // headers: header || {Authorization: getToken()},
        headers: Object.assign({
            "Content-Type":"application/x-www-form-urlencoded"
        }, needToken ? {token: getToken()} : {}),
        params: Object.assign({}, CommonParams, data),
    }).then((resp) => {
        if (RespStatus.Success != resp.status || resp.data == undefined || resp.data == null || (resp.data.respCode && (resp.data.respCode != 'A001' && resp.data.respCode != '0000')) || (!resp.data.respCode && !resp.data.success && !resp.data.rows)) {
            return Promise.reject({resp: resp, message: shelling(resp)});
        }
        return Promise.resolve(resp.data.data == undefined ? resp.data: resp.data.data);
    }, (error) => {
        console.log('[Get请求-请求失败]', error);
        return Promise.reject({resp: error, message: shelling(error)});
    }).catch((e) => {
        console.log('[Get请求-发生异常]', e);
        return Promise.reject(e);
    });
}

export function outter_get(url, data, host) {
    return get(url, data, host, false);
}

export function post(url, data, host, needToken) {

    return axios.post((host || Host) + url, Object.assign({}, CommonParams, data), {
        headers: Object.assign({
            "Content-Type":"application/x-www-form-urlencoded"
        }, needToken ? {token: getToken()} : {}),
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
    }).then((resp) => {
        // alert(JSON.stringify(resp))
        if (RespStatus.Success != resp.status || !resp.data ) {
        // if (RespStatus.Success != resp.status || !resp.data || !resp.data.success) {
            console.log('[Post请求-服务端返回错误响应]', resp);
            return Promise.reject({resp: resp, message: shelling(resp)});
        }
        return Promise.resolve(resp.data);
    }, (error) => {
        console.log('[Post请求-请求失败]', error);
        return Promise.reject({resp: error, message: shelling(error)});
    }).catch((e) => {
        console.log('[Post请求-发生异常]', e);
        return Promise.reject(e);
    });
}

export function outter_post(url, data, host) {
    return post(url, data, host, false);
}

export const shelling = (data) => {
    const defaultMsg = '未知错误';
    if (!data) {
        return defaultMsg;
    }
    if (!data.data) {
        return data.statusText || data.status || defaultMsg;
    }

    return data.data.respMsg || data.data.message || data.data.status || defaultMsg;
};
