<template>
    <div class="wrapper">
        <top></top>
        <el-container>
            <nav-bar @addTab="addTab"></nav-bar>
            <el-main class="main">
                <div class="content">
                    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"
                             @tab-click="clickTab">
                        <el-tab-pane
                            v-for="(item, index) in editableTabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                        >
                            <!--<keep-alive>-->
                            <router-view v-if="isRouterAlive"/>
                            <!--</keep-alive>-->
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import Top from '../fragment/Top'
    import NavBar from '../fragment/NavBar'
    import ElContainer from "element-ui/packages/container/src/main";

    import StorageService from 'store/interfaces';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "index",
        components: {
            ElContainer,
            Top, NavBar
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true,
                editableTabsValue: '1',
                routerIndex: '',
                editableTabs: [{
                    title: '首页',
                    name: '1',
                    routerPath: 'Welcome'
                }],
                tabIndex: 1,
                tabBarObj: {},
            }
        },
        mounted() {
            if (this.tabBar.editableTabsValue) {
                this.editableTabs = this.tabBar.editableTabs;
                this.editableTabsValue = this.tabBar.editableTabsValue;
            }

        },
        computed: {
            ...mapGetters(['tabBar'])
        },
        methods: {
            /**
             *  根据顶部筛选条件筛选-项目和时间段(存在vuex中)
             *  刷新当前显示的组件
             *  参考：https://juejin.im/entry/5b5ac53c5188251abb46c250
             * */
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                })
            },
            addTab(targetName, routerPath) {
                let newTabName = ++this.tabIndex + '';
                for (let i = 0; i < this.editableTabs.length; i++) {
                    if(newTabName == this.editableTabs[i].name){
                        newTabName = newTabName + 1;
                    }
                    if (targetName == this.editableTabs[i].title) {
                        this.editableTabsValue = this.editableTabs[i].name;
                        return;
                    }

                }

                this.editableTabs.push({
                    title: targetName,
                    name: newTabName,
                    routerPath: routerPath
                });
                this.editableTabsValue = newTabName;

                this.tabBarObj.editableTabsValue = this.editableTabsValue;
                this.tabBarObj.editableTabs = this.editableTabs;
                this.setTabBar(this.tabBarObj);
            },
            removeTab(targetName) {


                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;

                if (targetName == 1) {
                    return;
                }

                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }


                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);

                for (let i = 0; i < tabs.length; i++) {
                    if (this.editableTabsValue == tabs[i].name) {
                        this.$router.replace({
                            // name:tabs[i].routerName
                            path: tabs[i].routerPath
                        })
                    }
                }

                this.tabBarObj.editableTabsValue = this.editableTabsValue;
                this.tabBarObj.editableTabs = this.editableTabs;
                this.setTabBar(this.tabBarObj);
            },
            clickTab(data) {
                let tabs = this.editableTabs;
                let tabsName = data.label;
                tabs.forEach((tab, index) => {
                    if (tab.title == tabsName) {
                        this.$router.replace({
                            // name:tab.routerName
                            path: tab.routerPath
                        })
                    }
                });

                console.log('data',data);


                this.tabBarObj.editableTabsValue = data.name;
                this.tabBarObj.editableTabs = this.editableTabs;
                this.setTabBar(this.tabBarObj);
            },
            ...mapActions({
                setTabBar: StorageService.TabBar.setTabBar,
            })
        }


    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 1px 3px;
        width: 100%;
    }

    .main {
        flex: 1;
        background: #f9f9f9;
        overflow: hidden;
        position: relative;
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }

</style>
