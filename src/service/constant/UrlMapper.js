// 用户操作相关API接口地址
const UserApi = {
    Login: "/login",    // 用户登录
};

//  通道管理——支付费率 相关API接口地址
const ChannelRateApi = {
    Add: '/chnfee/add',       //支付费率添加
    List:'/chnfee/list',       //支付费率列表
    Update: '/chnfee/edit',
    DpStatus: '/chnfee/udpStatus',
    Detail: '/chnfee/detail',
    ShortNames: '/chnfee/getShortNames', // 简称列表
};

//  机构管理——支付费率 相关API接口地址
const OrganRateApi = {
    Add: '/tatfee/add',       //支付费率添加
    List:'/tatfee/list',       //支付费率列表
    Update: '/tatfee/edit',
    DpStatus: '/tatfee/udpStatus',
    Detail: '/tatfee/detail',
};

//  通道管理 相关API接口地址
const ChannelApi = {
    List: '/chninfo/list',    // 获取通道管理列表
    Add: '/chninfo/add',        // 添加通道管理
    Update: '/chninfo/edit',     // 修改通道管理信息
    Prohibit: '/chninfo/udpStatus', // 通道禁用
    Names: '/chninfo/getNames', // 通道名称列表
    Detail: '/chninfo/detail', // 通道详情
};

//  机构管理 相关API接口地址
const OrganApi = {
    List: '/tatinfo/list',    // 获取机构管理列表
    Add: '/tatinfo/add',        // 添加机构管理
    Update: '/tatinfo/edit',     // 修改机构管理信息
    Prohibit: '/tatinfo/udpStatus', // 机构z状态修改
    SimpleNames: '/tatinfo/getSimpleNames', // 机构简称列表
    Detail: '/tatinfo/detail', // 机构详情
    Abbrs: '/tatinfo/getAbbrs', // 机构缩写列表

};




export {UserApi, ChannelRateApi,OrganRateApi,ChannelApi,OrganApi};
