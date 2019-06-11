import LocalStorageDao from '../dao/localstorage-dao';

const state = {
    userInfo: LocalStorageDao.loadUserInfo(),
    userId: '1',
    userToken: LocalStorageDao.loadUserToken(),
    loginInfo: LocalStorageDao.loadAccount(),
    device: LocalStorageDao.loadDevice(),
    tabBar: LocalStorageDao.loadTabBar(),

};
export default state;
