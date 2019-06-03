<template>
    <div class="card-container">
        <common-top-form :selectShow="false" :model="model" @openAddDialog="addInfo"></common-top-form>
        <el-table :data="tableData" ref="commonTable" style="width: 100%;margin-bottom: 20px;" row-key="id" border
                   :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="permName" label="菜单名称"></el-table-column>
            <el-table-column prop="userName" label="图标"></el-table-column>
            <el-table-column prop="index" label="菜单路径"></el-table-column>
            <el-table-column prop="menuType" label="类型">
                <template slot-scope="scope">
                    <p v-if="scope.row.menuType == 0">目录</p>
                    <p v-else-if="scope.row.menuType == 1">页面</p>
                    <p v-else>按钮</p>
                </template>
            </el-table-column>
            <el-table-column prop="menuStatus" label="状态">
                <template slot-scope="scope">
                    <p>{{scope.row.menuStatus == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <el-button type="text" @click="Delete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                     :dialogService="dialogService" :submitData="dialogData" :rules="dialogRules"
                     :showPower="buttonType" @success="dialogSuccess" @close="dialogClose"
                     @opend="dialogOpen" @cancelChecked="cancelChecked" class="note">
            <div v-if="showPower">
                <el-form-item label="菜单名称" prop="permName">
                    <el-input v-model="dialogModel.permName" type="text" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单类型" prop="permType">
                    <el-select v-model="dialogModel.permType">
                        <el-option
                            v-for="item in permTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="permStatus">
                    <el-select v-model="dialogModel.permStatus">
                        <el-option
                            v-for="item in dialogOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择上级" prop="permList">
                    <el-input v-model="dialogModel.permList" placeholder="请选择角色权限" suffix-icon="el-icon-arrow-down"
                              @focus="choosePerm()"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径" prop="permPath">
                    <el-input v-model="dialogModel.permPath" placeholder="请选择角色权限"></el-input>
                </el-form-item>
                <el-form-item label="添加备注" prop="remark">
                    <el-input v-model="dialogModel.remark" type="textarea" resize="none" rows="5"></el-input>
                </el-form-item>
            </div>

            <el-collapse-transition>
                <div v-if="!showPower">
                    <el-input placeholder="输入关键字" v-model="filterText"></el-input>

                    <el-tree class="filter-tree" :data="perms" :props="defaultProps"  :default-checked-keys="checkedIdArr"
                             show-checkbox node-key="id"  :default-expanded-keys="defaultCheckedArr"
                             :check-strictly="true" :filter-node-method="filterNode"
                             @check-change="handleCheckChange" @node-click="nodeClick" ref="tree">
                    </el-tree>
                </div>
            </el-collapse-transition>
        </form-dialog>
    </div>
</template>

<script>
    import CommonTopForm from 'components/common/CommonTopForm'
    import CommonTable from 'components/common/CommonTable'
    import FormDialog from '../../dialog/FormDialog'

    import PowerInfoService from 'service/PowerInfoService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapGetters} from 'vuex'

    export default {
        name: "MenuManage",
        components: {
            CommonTopForm, CommonTable, FormDialog
        },
        mounted() {
            this.getList();
            this.getPerms();
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        data() {
            return {
                tableData: [],
                model: {},
                dialogRules: {},
                formDialogTitle: '',
                dialogModel: {
                    permName: '',
                    permPath: '',
                    permType: '',
                    permStatus: '1',
                    parentId: '',
                    iconUrl: '',
                    remark: '',
                },
                dialogOptions: [{
                    value: '0',
                    label: '禁用'
                }, {
                    value: '1',
                    label: '启用'
                }],
                permTypes: [{
                    value: '0',
                    label: '目录'
                }, {
                    value: '1',
                    label: '页面'
                }, {
                    value: '2',
                    label: '按钮'
                }],
                showPower: true,
                powerId: '',
                perms: [],
                defaultProps: {
                    children: 'children',
                    label: 'permName'
                },
                checkedId: '',
                filterText: '',
                checkedIdArr: [],
                defaultCheckedArr: [],
                parentId:'0',
            }
        },
        computed: {
            dialogService() {
                if (this.powerId) {
                    return PowerInfoService.update;
                } else {
                    return PowerInfoService.add;
                }
            },
            dialogData() {
                const params = {
                    permName: this.dialogModel.permName,
                    permPath: this.dialogModel.permPath,
                    permType: this.dialogModel.permType,
                    permStatus: this.dialogModel.permStatus,
                    parentId: this.parentId,
                    iconUrl: this.dialogModel.iconUrl,
                    remark: this.dialogModel.remark,
                    creatorId: this.userInfo.modifierId,
                };
                if (this.powerId) {
                    delete params.creatorId;
                    params.id = this.powerId;
                    params.parentId = this.dialogModel.parentId;
                    params.modifierId = this.userInfo.modifierId;
                }
                if(this.dialogModel.remark == '' || this.dialogModel.remark == undefined){
                    delete params.remark;
                }
                return params;
            },
            buttonType() {
                return this.showPower;
            },
            ...mapGetters(['userInfo'])
        },
        methods: {
            addInfo() {
                this.formDialogTitle = '添加菜单';
                this.$refs.formDialog.open();
            },
            getList() {
                this.doLoad(PowerInfoService.list, '', res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result;
                }, '信息获取失败')
            },
            updateInfo(id) {
                this.dialogServiceType = false;
                this.powerId = id;
                this.getDetail();
                this.formDialogTitle = '修改菜单';
                this.$refs.formDialog.open();
            },
            getDetail(){
                const params = {
                    id:this.powerId
                };
                this.doLoad(PowerInfoService.selectone, params, res => {
                    const result = JSON.parse(res.contents);
                    this.dialogModel = result;
                    this.dialogModel.permType = this.dialogModel.permType.toString();
                    this.dialogModel.permStatus = this.dialogModel.permStatus.toString();
                    this.traverseTree(this.perms);
                    if (this.dialogModel.remark == 'undefined') {
                        this.dialogModel.remark == '';
                    }
                }, '信息获取失败')
            },
            traverseTree(node){
                if (!node) {
                    return;
                }

                for(let i=0;i<node.length;i++){
                    if (node[i].children && node[i].children.length > 0) {
                        if(node[i].id == this.dialogModel.parentId){
                            this.dialogModel.permList = node[i].permName;
                        }
                        for (let a = 0; a < node[i].children.length; a++) {
                            if(node[i].children[a].id == this.dialogModel.parentId){
                                this.dialogModel.permList = node[i].children[a].permName;
                            }
                            this.traverseTree(node[i].children[a]);
                        }
                    }else{
                        if(node[i].id == this.dialogModel.parentId){
                            this.dialogModel.permList = node[i].permName;
                        }
                    }
                }
            },
            choosePerm() {
                this.showPower = false;
            },
            getPerms() {
                this.doLoad(PowerInfoService.list, '', res => {
                    const result = JSON.parse(res.contents);
                    this.perms = result;
                }, '信息获取失败')
            },
            Delete(id) {
                this.showMsg = '确定删除该菜单？'
                this.showConfirm(this.showMsg).then(() => {
                    this.doDelete(id)
                }).catch(() => {
                });
            },
            doDelete(id) {
                const delParams = {
                    id: id,
                    modifierId: this.userInfo.modifierId
                };
                this.doLoad(PowerInfoService.Delete, delParams, res => {
                    this.showSuccess('操作成功');
                    this.getList();
                }, '操作失败')
            },
            handleCheckChange(data, checked, indeterminate) {
                if(checked == true){
                    this.checkedId = data.id;
                    this.$refs.tree.setCheckedNodes([data]);
                    if (data.id) {
                        this.defaultCheckedArr.push(data.id);
                        this.parentId = data.id;
                    } else {
                        this.defaultCheckedArr.push(data.id);
                        this.parentId = 0;
                    }
                    this.checkedIdArr[0] = data.id;
                    this.dialogModel.permList = data.permName;
                }
            },
            nodeClick(data,checked,node){
                this.checkedId = data.id;
                this.$refs.tree.setCheckedNodes([data]);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.permName.indexOf(value) !== -1;
            },
            dialogSuccess(data) {
                if (this.showPower == false) {
                    this.showPower = true;
                }else{
                    this.showSuccess(data.respMsg);
                    this.$refs.formDialog.closeDialog();
                    this.getList();
                }
            },
            cancelChecked() {
                this.showPower = true;
            },
            dialogClose() {
                this.dialogModel = {};
                this.checkedIdArr = [];
                this.showPower = true;
            },
            dialogOpen() {
                this.getPerms();
            },
        }
    }
</script>

<style scoped>

</style>
