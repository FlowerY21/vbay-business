import storage from 'good-storage';
import Account from "../../service/model/Account"

const Keys = {
    UserInfo: '__u__',
    UserToken: '__t__',
    Device: '__d__',
    Account: '__a__',
    TabBar: '__b__',
};

const loadUserInfo = () => {
    return storage.session.get(Keys.UserInfo, {});
};

const saveUserInfo = (user) => {
    storage.session.set(Keys.UserInfo, user);
    return user;
};

const loadUserToken = () => {
    return storage.session.get(Keys.UserToken, {});
};

const saveUserToken = (token) => {
    storage.session.set(Keys.UserToken, token);
    return token;
};

const loadAccount = () => {
    const account = storage.get(Keys.Account, new Account({}));
    if (2 * 60 * 60 * 1000 > new Date().getTime() - account.t) {
        return account;
    }
    account.p = "";
    return account;
};

const saveAccount = (account) => {
    storage.set(Keys.Account, account);
    return account;
};

const loadDevice = () => {
    return storage.session.get(Keys.Device, {});
};

const saveDevice = (device) => {
    storage.session.set(Keys.Device, device)
    return device;
};

const loadTabBar = () => {
    return storage.session.get(Keys.TabBar, {});
};

const saveTabBar = (tabBar) => {
    storage.session.set(Keys.TabBar, tabBar);
    return tabBar;
};

export default {
    loadUserInfo,
    saveUserInfo,
    loadUserToken,
    saveUserToken,
    loadAccount,
    saveAccount,
    loadDevice,
    saveDevice,
    loadTabBar,
    saveTabBar,
}
