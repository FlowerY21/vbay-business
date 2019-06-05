import Vue from 'vue';
import Router from 'vue-router';

const Login = (resolve) => {
    import('@/view/page/Login').then((module) => {
        resolve(module);
    })
};

const Index = (resolve) => {
    import('@/view/page/Index').then((module) => {
        resolve(module);
    })
};

const Welcome = (resolve) => {
    import('@/view/page/Welcome').then((module) => {
        resolve(module);
    })
};
// 机构管理

const ChannelManage = (resolve) => {
    import('@/view/page/ChannelManage/ChannelManage').then((module) => {
        resolve(module);
    })
};

const ChangeChannelManage = (resolve) => {
    import('@/view/page/ChannelManage/ChangeChannelManage').then((module) => {
        resolve(module);
    })
};

const OtherRate = (resolve) => {
    import('@/view/page/ChannelManage/OtherRate').then((module) => {
        resolve(module);
    })
};

// 计划管理
const PlanSelect = (resolve) => {
    import('@/view/page/PlanManage/PlanSelect').then((module) => {
        resolve(module);
    })
};

const PlanDetails = (resolve) => {
    import('@/view/page/PlanManage/PlanDetails').then((module) => {
        resolve(module);
    })
};

// 快捷收款管理
const QuickCollectionSelect = (resolve) => {
    import('@/view/page/QuickCollectionManage/QuickCollectionSelect').then((module) => {
        resolve(module);
    })
};

// 系统管理
const BillReminder = (resolve) => {
    import('@/view/page/SystemManage/BillReminder').then((module) => {
        resolve(module);
    })
};

// 会员管理
const MemberBasicInfo = (resolve) => {
    import('@/view/page/MemberManage/MemberBasicInfo').then((module) => {
        resolve(module);
    })
};
const BasicInfo = (resolve) => {
    import('@/view/fragment/MemberManage/BasicInfo').then((module) => {
        resolve(module);
    })
};
const FundsDetail = (resolve) => {
    import('@/view/fragment/MemberManage/FundsDetail').then((module) => {
        resolve(module);
    })
};


Vue.use(Router);
export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
            redirect:'/index/welcome',
            children:[
                {
                    path:'welcome',
                    name:'Welcome',
                    component:Welcome
                },{
                    path:'channelmanage',
                    name:'channelmanage',
                    component:ChannelManage
                },{
                    path:'addchannelmanage',
                    name:'addchannelmanage',
                    component:ChangeChannelManage
                },{
                    path:'updatechannelmanage/:id',
                    name:'updatechannelmanage',
                    component:ChangeChannelManage
                },{
                    path:'otherrate',
                    name:'otherrate',
                    component:OtherRate
                },{
                    path:'planselect',
                    name:'planselect',
                    component:PlanSelect
                },{
                    path:'plandetails/:id',
                    name:'plandetails',
                    component:PlanDetails
                },{
                    path:'quickcollectionselect',
                    name:'quickcollectionselect',
                    component:QuickCollectionSelect
                },{
                    path:'billreminder',
                    name:'billreminder',
                    component:BillReminder
                },{
                    path:'memberbasicinfo',
                    name:'memberbasicinfo',
                    component:MemberBasicInfo,
                    redirect:'memberbasicinfo/basicinfo',
                    children:[{
                        path:'basicinfo',
                        name:'basicinfo',
                        component:BasicInfo
                    },{
                        path:'fundsdetail',
                        name:'fundsdetail',
                        component:FundsDetail
                    },]
                },

            ]
        },
    ]
});
