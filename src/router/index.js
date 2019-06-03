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
const OrganManage = (resolve) => {
    import('@/view/page/OrganizationManage/OrganManage').then((module) => {
        resolve(module);
    })
};

const AddOrganManage = (resolve) => {
    import('@/view/page/OrganizationManage/AddOrganManage').then((module) => {
        resolve(module);
    })
};

const OrganUser = (resolve) => {
    import('@/view/page/OrganizationManage/OrganUser').then((module) => {
        resolve(module);
    })
};

const OrganRate = (resolve) => {
    import('@/view/page/OrganizationManage/OrganRate').then((module) => {
        resolve(module);
    })
};

const AddOrganRate = (resolve) => {
    import('@/view/page/OrganizationManage/AddOrganRate').then((module) => {
        resolve(module);
    })
};

const OrganNote = (resolve) => {
    import('@/view/page/OrganizationManage/OrganNote').then((module) => {
        resolve(module);
    })
};

const OrganCertification = (resolve) => {
    import('@/view/page/OrganizationManage/OrganCertification').then((module) => {
        resolve(module);
    })
};

// 通道管理
const ChannelPay = (resolve) => {
    import('@/view/page/ChannelManage/ChannelPay').then((module) => {
        resolve(module);
    })
};

const ChannelRate = (resolve) => {
    import('@/view/page/ChannelManage/ChannelRate').then((module) => {
        resolve(module);
    })
};

const AddChannelRate = (resolve) => {
    import('@/view/page/ChannelManage/AddChannelRate').then((module) => {
        resolve(module);
    })
};

const ChannelMerchant = (resolve) => {
    import('@/view/page/ChannelManage/ChannelMerchant').then((module) => {
        resolve(module);
    })
};

const ChannelNote = (resolve) => {
    import('@/view/page/ChannelManage/ChannelNote').then((module) => {
        resolve(module);
    })
};

const AddChannelCommon = (resolve) => {
    import('@/view/page/ChannelManage/AddChannelCommon').then((module) => {
        resolve(module);
    })
};

const ChannelCertification = (resolve) => {
    import('@/view/page/ChannelManage/ChannelCertification').then((module) => {
        resolve(module);
    })
};

// 交易管理
const RepaymentPlan = (resolve) => {
    import('@/view/page/TransactionManage/RepaymentPlan').then((module) => {
        resolve(module);
    })
};

const PlanDetails = (resolve) => {
    import('@/view/page/TransactionManage/PlanDetails').then((module) => {
        resolve(module);
    })
};

const Repayment = (resolve) => {
    import('@/view/page/TransactionManage/Repayment').then((module) => {
        resolve(module);
    })
};

const QuickCollection = (resolve) => {
    import('@/view/page/TransactionManage/QuickCollection').then((module) => {
        resolve(module);
    })
};

const Message = (resolve) => {
    import('@/view/page/TransactionManage/Message').then((module) => {
        resolve(module);
    })
};

const Certification = (resolve) => {
    import('@/view/page/TransactionManage/Certification').then((module) => {
        resolve(module);
    })
};

const CreditCard = (resolve) => {
    import('@/view/page/TransactionManage/CreditCard').then((module) => {
        resolve(module);
    })
};

// 财务管理
const AccountManage = (resolve) => {
    import('@/view/page/FinanceManage/AccountManage').then((module) => {
        resolve(module);
    })
};

const AccountAdjustmentDetail = (resolve) => {
    import('@/view/page/FinanceManage/AccountAdjustmentDetail').then((module) => {
        resolve(module);
    })
};

const OutAccountDetail = (resolve) => {
    import('@/view/page/FinanceManage/OutAccountDetail').then((module) => {
        resolve(module);
    })
};

const RepaymentDetail = (resolve) => {
    import('@/view/page/FinanceManage/RepaymentDetail').then((module) => {
        resolve(module);
    })
};

const ReceiveDetail = (resolve) => {
    import('@/view/page/FinanceManage/ReceiveDetail').then((module) => {
        resolve(module);
    })
};

const InventedDetail = (resolve) => {
    import('@/view/page/FinanceManage/InventedDetail').then((module) => {
        resolve(module);
    })
};

const SettleManage = (resolve) => {
    import('@/view/page/FinanceManage/SettleManage').then((module) => {
        resolve(module);
    })
};

const ServiceManage = (resolve) => {
    import('@/view/page/FinanceManage/ServiceManage').then((module) => {
        resolve(module);
    })
};

// 统计管理
const DailyStatistics = (resolve) => {
    import('@/view/page/StatisticsManage/DailyStatistics').then((module) => {
        resolve(module);
    })
};

// 系统管理
const DictionaryManage = (resolve) => {
    import('@/view/page/SystemManage/DictionaryManage').then((module) => {
        resolve(module);
    })
};

// 权限管理
const UserManage = (resolve) => {
    import('@/view/page/PowerManage/UserManage').then((module) => {
        resolve(module);
    })
};

const RoleManage = (resolve) => {
    import('@/view/page/PowerManage/RoleManage').then((module) => {
        resolve(module);
    })
};

const MenuManage = (resolve) => {
    import('@/view/page/PowerManage/MenuManage').then((module) => {
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
                },
                {
                    path:'organmanage',
                    name:'organmanage',
                    component:OrganManage,
                },
                {
                    path:'addorganmanage',
                    name:'addorganmanage',
                    component:AddOrganManage
                },
                {
                    path:'updateorganmanage/:id',
                    name:'updateorganmanage',
                    component:AddOrganManage
                },
                {
                    path:'organuser',
                    name:'organuser',
                    component:OrganUser
                },
                {
                    path:'organrate',
                    name:'organrate',
                    component:OrganRate,
                },
                {
                    path:'addorganrate',
                    name:'addorganrate',
                    component:AddOrganRate
                },
                {
                    path:'updateorganrate/:id',
                    name:'updateorganrate',
                    component:AddOrganRate
                },
                {
                    path:'organnote',
                    name:'organnote',
                    component:OrganNote
                },
                {
                    path:'organcertification',
                    name:'organcertification',
                    component:OrganCertification
                },
                {
                    path:'channelpay',
                    name:'channelpay',
                    component:ChannelPay
                },
                {
                    path:'channelrate',
                    name:'channelrate',
                    component:ChannelRate
                },
                {
                    path:'addchannelrate',
                    name:'addchannelrate',
                    component:AddChannelRate
                },
                {
                    path:'updatechannelrate/:id/:chnId',
                    name:'updatechannelrate',
                    component:AddChannelRate
                },
                {
                    path:'channelmerchant',
                    name:'channelmerchant',
                    component:ChannelMerchant
                },
                {
                    path:'channelnote',
                    name:'channelnote',
                    component:ChannelNote
                },
                {
                    path:'addchannel/:type',
                    name:'addchannelcommon',
                    component:AddChannelCommon
                },
                {
                    path:'updatechannel/:type/:id',
                    name:'updatechannelcommon',
                    component:AddChannelCommon
                },
                {
                    path:'channelcertification',
                    name:'channelcertification',
                    component:ChannelCertification
                },
                {
                    path:'repaymentplan',
                    name:'repaymentplan',
                    component:RepaymentPlan
                },
                {
                    path:'plandetails/:id',
                    name:'plandetails',
                    component:PlanDetails
                },
                {
                    path:'repayment',
                    name:'repayment',
                    component:Repayment
                },
                {
                    path:'quickcollection',
                    name:'quickcollection',
                    component:QuickCollection
                },
                {
                    path:'message',
                    name:'message',
                    component:Message
                },
                {
                    path:'certification',
                    name:'certification',
                    component:Certification
                },
                {
                    path:'creditcard',
                    name:'creditcard',
                    component:CreditCard
                },
                {
                    path:'accountmanage',
                    name:'accountmanage',
                    component:AccountManage
                },
                {
                    path:'accountadjustmentdetail',
                    name:'accountadjustmentdetail',
                    component:AccountAdjustmentDetail
                },
                {
                    path:'outaccountdetail',
                    name:'outaccountdetail',
                    component:OutAccountDetail
                },
                {
                    path:'repaymentdetail',
                    name:'repaymentdetail',
                    component:RepaymentDetail
                },
                {
                    path:'receivedetail',
                    name:'receivedetail',
                    component:ReceiveDetail
                },
                {
                    path:'inventeddetail',
                    name:'inventeddetail',
                    component:InventedDetail
                },
                {
                    path:'settlemanage',
                    name:'settlemanage',
                    component:SettleManage
                },
                {
                    path:'servicemanage',
                    name:'servicemanage',
                    component:ServiceManage
                },
                {
                    path:'dailystatistics',
                    name:'dailystatistics',
                    component:DailyStatistics
                },
                {
                    path:'dictionarymanage',
                    name:'dictionarymanage',
                    component:DictionaryManage
                },
                {
                    path:'usermanage',
                    name:'usermanage',
                    component:UserManage
                },
                {
                    path:'rolemanage',
                    name:'rolemanage',
                    component:RoleManage
                },
                {
                    path:'menumanage',
                    name:'menumanage',
                    component:MenuManage
                },
            ]
        },
    ]
});
