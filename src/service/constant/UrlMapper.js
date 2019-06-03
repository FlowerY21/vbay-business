// 用户操作相关API接口地址
const UserApi = {
    Login: "/login",    // 用户登录
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

//  机构管理——机构短信 相关API接口地址
const OrganNoteApi = {
    List: '/tatsms/list',    // 获取机构管理列表
    Add: '/tatsms/add',        // 添加机构管理
    Update: '/tatsms/edit',     // 修改机构管理信息
    DpStatus: '/tatsms/udpStatus', // 机构z状态修改
    Detail: '/tatsms/detail', // 机构详情
};

//  机构管理——机构认证 相关API接口地址
const OrganAuthApi = {
    List: '/tatrauth/list',    // 获取机构管理列表
    Add: '/tatrauth/add',        // 添加机构管理
    Update: '/tatrauth/edit',     // 修改机构管理信息
    DpStatus: '/tatrauth/udpStatus', // 机构z状态修改
    Detail: '/tatrauth/detail', // 机构详情
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

//  通道管理——支付费率 相关API接口地址
const ChannelRateApi = {
    Add: '/chnfee/add',       //支付费率添加
    List:'/chnfee/list',       //支付费率列表
    Update: '/chnfee/edit',
    DpStatus: '/chnfee/udpStatus',
    Detail: '/chnfee/detail',
    ShortNames: '/chnfee/getShortNames', // 简称列表
};

//  通道管理——短信管理 相关API接口地址
const ChannelNoteApi = {
    List: '/chnsms/list',       //获取短信管理列表
    Add: '/chnsms/add',       //添加短息通道
    Detail: '/chnsms/detail',       //短信详情
    ShortNames: '/chnsms/getShortNames',       //简称列表
    Update: '/chnsms/edit',       //修改信息
    DpStatus: '/chnsms/udpStatus',       //修改状态
};

//  通道管理——认证管理 相关API接口地址
const ChannelAuthApi = {
    List: '/chnrauth/list',       //获取短信管理列表
    Add: '/chnrauth/add',       //添加短息通道
    Detail: '/chnrauth/detail',       //短信详情
    ShortNames: '/chnrauth/getShortNames',       //简称列表
    Update: '/chnrauth/edit',       //修改信息
    DpStatus: '/chnrauth/udpStatus',       //修改状态
};

//  系统管理——字典管理 相关API接口地址
const SystemDicApi = {
    List: '/sysdict/list',
    Add: '/sysdict/add',
    Detail: '/sysdict/detail',
    CheckUnique: '/sysdict/checkUnique', //  唯一键查询
    Update: '/sysdict/edit',
    DpStatus: '/sysdict/udpStatus',
    ByType: '/sysdict/getByType',        //根据类型查询
};

//  权限管理——用户管理 相关API接口地址
const PowerUserApi = {
    List: '/user/select',
    Add: '/user/add',
    Update: '/user/update',
    Delete: '/user/delete',
    ModifyPW: '/user/modifyPW',
    SelectOne: '/user/selectOne',
    selectPerms: '/user/selectPerms',
};

//  权限管理——角色管理 相关API接口地址
const PowerRoleApi = {
    List: '/role/select',
    Add: '/role/add',
    Update: '/role/update',
    Delete: '/role/delete',
    SelectOne: '/role/selectOne',
    SelectPerms: '/role/selectPerms',
    SelectMenu: '/role/selectMenu',
};

//  权限管理——权限管理 相关API接口地址
const PowerInfoApi = {
    List: '/perm/select',
    Add: '/perm/add',
    Update: '/perm/update',
    Delete: '/perm/delete',
    SelectOne: '/perm/selectOne',
};


export {UserApi, OrganApi, ChannelApi, ChannelRateApi, ChannelNoteApi, ChannelAuthApi, OrganNoteApi, SystemDicApi,OrganAuthApi,OrganRateApi,PowerUserApi,PowerRoleApi,PowerInfoApi };
