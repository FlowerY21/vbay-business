<template>
    <el-row class="chooseArea">
        <el-select v-model="province" @change="onProvinceChange">
            <el-option
                v-for="item in provinceList"
                :key="item.adcode"
                :label="item.name"
                :value="item.adcode">
            </el-option>
        </el-select>
        <el-select v-model="city" @change="onCityChange">
            <el-option
                v-for="item in cityList"
                :key="item.adcode"
                :label="item.name"
                :value="item.adcode">
            </el-option>
        </el-select>
        <el-select v-model="area" @change="onAreaChange">
            <el-option
                v-for="item in areaList"
                :key="item.adcode"
                :label="item.name"
                :value="item.adcode">
            </el-option>
        </el-select>
    </el-row>
</template>

<script>
    export default {
        name: "ChooseAddress",
        data(){
            return{
                province:'',
                city:'',
                area:'',
                provinceList: [],
                cityList: [],
                areaList: [],
                provinceName:'',
                cityName:'',
                areaName:'',
            }
        },
        props:{
            regionCode:{
                type:String,
                default:''
            }
        },
        mounted(){
            this.getProvince();
        },
        watch:{
            province(newVal){
                this.getCity();
            },
            city(newVal){
                this.getArea();
            },
            regionCode(newVal){
                this.province = newVal ? newVal.substr(0,6) : '';
                this.city = newVal ? newVal.substr(6,6) : '';
                this.area = newVal ? newVal.substr(12,6) : '';
            }
        },
        methods:{
            onProvinceChange(){
                this.city = '';
                this.area = '';

                for(let i=0; i<this.provinceList.length;i++){
                    if (this.province == this.provinceList[i].adcode) {
                        this.provinceName = this.provinceList[i].name
                    }
                }

            },
            onCityChange(){
                this.area = '';

                for(let i=0; i<this.cityList.length;i++){
                    if (this.city == this.cityList[i].adcode) {
                        this.cityName = this.cityList[i].name
                    }
                }
            },
            onAreaChange(){
                for(let i=0; i<this.areaList.length;i++){
                    if (this.area == this.areaList[i].adcode) {
                        this.areaName = this.areaList[i].name
                    }
                }
                let endCode = this.province + this.city + this.area;
                this.$emit('regionCode',endCode,this.provinceName,this.cityName,this.areaName);
            },
            getAreaInfo(level,func){
                AMap.plugin('AMap.DistrictSearch', () => {
                    var districtSearch = new AMap.DistrictSearch({
                        // 关键字对应的行政区级别，country表示国家
                        level: 'country',
                        //  显示下级行政区级数，1表示返回下一级行政区
                        subdistrict: 1
                    });
                    // 搜索所有省/直辖市信息
                    districtSearch.search(level, (status, result) => {
                        // 查询成功时，result即为对应的行政区信息
                        func(result);
                    });
                });
            },
            getProvince(){
                this.getAreaInfo('中国',(result) => {
                    this.provinceList = result.districtList[0].districtList;
                });
            },
            getCity(city){
                this.getAreaInfo(this.province,(result) => {
                    this.cityList = result.districtList[0].districtList;
                });
            },
            getArea(){
                this.getAreaInfo(this.city,(result) => {
                    console.log(result)
                    this.areaList = result.districtList[0].districtList;
                });
            },

        }
    }
</script>

<style scoped>

</style>
