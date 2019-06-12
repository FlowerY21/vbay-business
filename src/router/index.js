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

// 活动
const ActivityManage = (resolve) => {
    import('@/view/page/ActivityManage/ActivityManage').then((module) => {
        resolve(module);
    })
};

// 商品/服务
const GoodsService = (resolve) => {
    import('@/view/page/GoodsService/GoodsService').then((module) => {
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
                    path:'activitymanage',
                    name:'ActivityManage',
                    component:ActivityManage
                },{
                    path:'goodsservice',
                    name:'GoodsService',
                    component:GoodsService
                },
            ]
        },
    ]
});
