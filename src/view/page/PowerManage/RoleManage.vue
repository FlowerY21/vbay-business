<template>
    <div class="card-container">
        <common-top-form :model="formModel" @openAddDialog="addInfo()" :submitService="submitService"
                         :submitData="submitData" @success="onSuccess">
            <el-form-item label="角色" prop="roleName">
                <el-input v-model="formModel.roleName" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="roleStatus">
                <el-select v-model="formModel.roleStatus">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </common-top-form>
        <common-table :data="tableData" ref="commonTable" @handleChange="getList">
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="roleStatus" label="状态">
                <template slot-scope="scope">
                    <p>{{scope.row.userStatus == 0 ? '禁用' : '启用'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateInfo(scope.row.id)">修改</el-button>
                    <el-button type="text" @click="Delete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </common-table>
        <form-dialog ref="formDialog" :formDialogTitle="formDialogTitle" :model="dialogModel"
                     :dialogService="dialogService" :submitData="dialogData" :rules="dialogRules"
                     :showPower="buttonType" @success="dialogSuccess" @close="dialogClose"
                     @opend="dialogOpen" @cancelChecked="cancelChecked"  class="note">
            <div v-if="showPower">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="dialogModel.roleName" type="text" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="rePassWord">
                    <el-input v-model="dialogModel.remark" type="textarea" resize="none" rows="5"></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="roleStatus">
                    <el-select v-model="dialogModel.roleStatus">
                        <el-option
                            v-for="item in dialogOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择权限" prop="permList">
                    <el-input v-model="dialogModel.permList" placeholder="请选择角色权限" suffix-icon="el-icon-arrow-down"
                              @focus="choosePerm()"></el-input>
                </el-form-item>
            </div>
            <el-collapse-transition>
                <div v-if="!showPower">
                    <el-input placeholder="输入关键字" v-model="filterText"></el-input>

                    <el-tree class="filter-tree" :data="perms" :props="defaultProps"
                             show-checkbox accordion :default-checked-keys="checkedIdArr"
                             node-key="id" :default-expanded-keys="defaultCheckedArr"
                             :filter-node-method="filterNode" @check-change="handleCheckChange" ref="tree">
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

    import PowerRoleService from 'service/PowerRoleService'
    import PowerInfoService from 'service/PowerInfoService'
    import privateKey from 'service/constant/privateKey'
    import {encrypt, urlEncode, objKeySort} from "common/js/common-utils";
    import {loadMixin, dialogMixin, validatorsMixin} from "mixin";
    import {mapGetters} from 'vuex'

    export default {
        name: "RoleManage",
        components: {
            CommonTopForm,
            CommonTable,
            FormDialog,
        },
        mixins: [loadMixin, dialogMixin, validatorsMixin],
        data() {
            return {
                formModel: {
                    roleName: '',
                    roleStatus: '',
                },
                submitService: PowerRoleService.list,
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '0',
                    label: '禁用'
                }, {
                    value: '1',
                    label: '启用'
                }],
                dialogOptions: [{
                    value: '0',
                    label: '禁用'
                }, {
                    value: '1',
                    label: '启用'
                }],
                page: {},
                tableData: [],
                roleId: '',
                dialogModel: {
                    roleName: '',
                    remark: '',
                    roleStatus: '1',
                    permList: '',
                },
                formDialogTitle: '',
                dialogRules: {
                    roleName: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入角色名称'))
                            } else if (this.checkRoleOnly) {
                                callback(new Error('角色名称不能重复'))
                            } else {
                                callback()
                            }
                        },
                    }],
                    permList: [{
                        required: true,
                        message: '请选择角色权限'
                    }],
                    roleStatus: [{
                        required: true,
                        message: '请选择角色状态'
                    }]
                },
                showPower: true,
                roles: [],
                perms: [],
                defaultProps: {
                    children: 'children',
                    label: 'permName'
                },
                filterText: '',
                checkedIdArr: [],
                checkedNameArr: [],
                defaultCheckedArr: [],
                getRoleName:'',
            }
        },
        computed: {
            checkRoleOnly() {
                for (let i = 0; i < this.roles.length; i++) {
                    if (this.dialogModel.roleName == this.roles[i].roleName) {
                        if (this.getRoleName == this.roles[i].roleName) {
                            return false;
                        }
                        return true;
                    } else {
                        if (i == this.roles.length - 1) {
                            return false;
                        }
                    }
                }
            },
            submitData() {
                const params = {
                    roleName: this.formModel.roleName,
                    roleStatus: this.formModel.roleStatus,
                    current: this.page.currentPage,
                    size: this.page.pageSize,
                };
                return params;
            },
            dialogService() {
                if (this.roleId) {
                    return PowerRoleService.update;
                } else {
                    return PowerRoleService.add;
                }
            },
            dialogData() {
                const params = {
                    roleName: this.dialogModel.roleName,
                    creatorId: this.userInfo.modifierId,
                    permList: this.checkedIdArr,
                    remark: this.dialogModel.remark,
                    roleStatus: this.dialogModel.roleStatus,
                };
                if (this.roleId) {
                    params.id = this.roleId;
                    params.modifierId = this.userInfo.modifierId;
                    delete params.creatorId;
                }
                return params;
            },
            buttonType() {
                return this.showPower;
            },

            ...mapGetters(['userInfo'])
        },
        mounted() {
            this.page = this.$refs.commonTable.page;
            this.getList();
            this.getPerms();
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
        },
        methods: {
            addInfo() {
                this.dialogServiceType = false;
                this.formDialogTitle = '添加角色';
                this.$refs.formDialog.open();
            },
            updateInfo(id) {
                this.dialogServiceType = false;
                this.roleId = id;
                this.getDetail();
                this.getSelectPerms();
                this.formDialogTitle = '修改角色';
                this.$refs.formDialog.open();
            },
            onSuccess(data) {
                const result = JSON.parse(data.contents);
                this.tableData = result.rows;
                this.page.currentPage = result.current;
                this.page.total = result.total;
                this.page.pageSize = result.size;
            },
            getList() {
                this.doLoad(PowerRoleService.list, this.submitData, res => {
                    const result = JSON.parse(res.contents);
                    this.tableData = result.rows;
                    this.page.currentPage = result.current;
                    this.page.total = result.total;
                    this.page.pageSize = result.size;
                }, '信息获取失败')
            },
            getDetail(){
                const params = {
                    id:this.roleId
                };
                this.doLoad(PowerRoleService.selectone, params, res => {
                    const result = JSON.parse(res.contents);
                    this.dialogModel = result;
                    this.getRoleName = this.dialogModel.roleName;
                }, '信息获取失败')
            },
            traverseTree(node){
                if (!node) {
                    return;
                }

                for(let i=0;i<node.length;i++){
                    if (node[i].children && node[i].children.length > 0) {
                        for (let a = 0; a < node[i].children.length; a++) {
                            if(node[i].children[a].usable == 1){
                                this.checkedIdArr.push(node[i].children[a].id);
                                this.checkedNameArr.push(node[i].children[a].permName);
                                this.dialogModel.permList = this.checkedNameArr.join(',')
                            }
                            this.traverseTree(node[i].children[a]);
                        }
                    }else{
                        if(node[i].usable == 1){
                            this.checkedIdArr.push(node[i].id);
                            this.checkedNameArr.push(node[i].permName);
                            this.dialogModel.permList = this.checkedNameArr.join(',')
                        }
                    }
                }

            },
            getSelectPerms(){
                const params = {
                    id:this.roleId
                };
                this.doLoad(PowerRoleService.selectperms, params, res => {
                    const result = JSON.parse(res.contents);
                    this.traverseTree(result)
                }, '信息获取失败')
            },
            Delete(id) {
                this.showMsg = '确定删除该角色？'
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
                this.doLoad(PowerRoleService.Delete, delParams, res => {
                    const result = JSON.parse(res.contents);
                    this.showSuccess('操作成功');
                    this.getList();
                }, '操作失败')
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
                alert(1)
                this.showPower = true;
            },
            dialogClose() {
                this.dialogModel = {};
                this.checkedIdArr = [];
                this.checkedNameArr = [];
                this.showPower = true;
            },
            dialogOpen() {
                this.getRoleList();
            },
            handleCheckChange(data, checked, indeterminate) {
                if (checked) {
                    if (data.parentId) {
                        this.defaultCheckedArr.push(data.parentId);
                    } else {
                        this.defaultCheckedArr.push(data.id);
                    }
                    this.checkedIdArr.push(data.id);
                    this.checkedNameArr.push(data.permName);
                    this.dialogModel.permList = this.checkedNameArr.join(',')
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.permName.indexOf(value) !== -1;
            },
            choosePerm() {
                this.getPerms();
                this.showPower = false;
            },
            getPerms() {
                this.doLoad(PowerInfoService.list, '', res => {
                    const result = JSON.parse(res.contents);
                    this.perms = result;
                }, '信息获取失败')
            },
            getRoleList() {
                this.doLoad(PowerRoleService.selectmenu, '', res => {
                    const result = JSON.parse(res.contents);
                    this.roles = result;
                }, '信息获取失败')
            },
        }
    }
</script>

<style scoped>
    .filter-tree {
        margin-top: 20px;
    }
</style>
