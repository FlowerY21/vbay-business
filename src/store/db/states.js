import LocalStorageDao from '../dao/localstorage-dao';

const state = {
    userInfo: LocalStorageDao.loadUserInfo(),
    userId: '1',
    userToken: LocalStorageDao.loadUserToken(),
    loginInfo: LocalStorageDao.loadAccount(),
    device: LocalStorageDao.loadDevice(),
    tabBar: LocalStorageDao.loadTabBar(),
    serverType:'1',
    tatId:'144a3ff3da0fbc619cc305a32d4e857c',

};
export default state;
