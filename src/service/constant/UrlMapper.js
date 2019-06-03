// 用户操作相关API接口地址
const UserApi = {
    Login: "/login",    // 用户登录
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



export {UserApi, ChannelApi,};
