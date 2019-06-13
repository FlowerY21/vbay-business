<template>
    <div>
        <el-table :class="'commonTable'" :data="data" tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  :show-summary="showSummary" :summary-method="getSummaries" style="width: 100%" >
            <slot></slot>
        </el-table>
        <el-pagination
            v-if="isShow"
            class="pagination-size"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :current-page="page.currentPage"
            :page-sizes="[2, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper, total, sizes "
            :total="page.total">
        </el-pagination>
    </div>

</template>

<script>
    export default {
        name: "CommonTable",
        props:{
            data:{
                type:Array,
                default:[]
            },
            multipleSelection:{
                type:Array,
                default:[]
            },
            showSummary:{
                type:Boolean,
                default:false
            },
            isShow:{
                type:Boolean,
                default:true
            },
        },
        data(){
            return{
                page:{
                    pageSize:2,
                    currentPage:1,
                    total:1
                }
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.page.pageSize = val;
                this.page.currentPage = 1;
                this.$emit('handleChange')
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.page.currentPage = val;
                this.$emit('handleChange')
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        if (index > 6 && index < 12) {
                            return sums[index];
                        }else{
                            sums[index] = '';
                        }
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            }
        },

    }
</script>

<style scoped>
.pagination-size{
    text-align: right;
    margin-top: 30px;
}
</style>
