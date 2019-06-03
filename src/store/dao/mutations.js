import StorageService from '../interfaces';

const mutations = {
    [StorageService.User.setInfo](state, userInfo) {
        state.userInfo = userInfo;
    },
    [StorageService.User.setToken](state, userToken) {
        state.userToken = userToken;
    },
    [StorageService.User.saveAccount](state, account) {
        state.loginInfo = account;
    },
    [StorageService.Device.set](state, device) {
        state.device = device;
    },
};

export default mutations;
