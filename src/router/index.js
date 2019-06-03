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
                },

            ]
        },
    ]
});
