<template>
    <div class="top flex-row flow-justify">
        <el-aside class="logo-wrap" width="260px">
            <div class="logo_box">
                <img class="logo" src="../../assets/images/logo_white.png" alt="logo" width="100%">
            </div>
        </el-aside>

        <el-aside class="user-info flex-row vertical-center flow-justify" width="400px">
            <div class="flex-row" v-for = "(btn,index) in topBtn" :key = "index">
                <img :src="btn.btnImg" alt="">
                <p class="font-bold">{{btn.btnName}}</p>
            </div>
            <div class="exit flex-row absolute-center">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAoCAYAAAB0HkOaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDRBRTYyMjc4NjUxMUU5QTE0REJDNEY4REQzNzYzNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDRBRTYyMzc4NjUxMUU5QTE0REJDNEY4REQzNzYzNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJENEFFNjIwNzg2NTExRTlBMTREQkM0RjhERDM3NjM1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJENEFFNjIxNzg2NTExRTlBMTREQkM0RjhERDM3NjM1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+wQY3wQAAArhJREFUeNrEmLtrFEEcx3dv54yaUtCIhQ8ICFoErrAQFcQuBrG0UAQl2HnG1x9hLxJNQNFCrC2stLFXG0EkVqZQ8ZGHXs7bWz+/MCfDuneZx+458OV3u3sz+9nfY5iZuNFo1LIsOx1FUTOO43FspuXaYtRirFPYNx79I4VOAnEfOxqV00Z8Oyq+ZBqYPEjmOV475CsUILuM669oHsBX2ES73iVMv+n7wRsGpb2LNE0fA3cD+XomAsYt0eI46na76/2UGRIeLASEaOAL5WVii56ZnvnbarWa8v3Cfo0xrcerFcT9H+IQj/S8YgW+0WChIE5etBl0GCBWMK5AviDWMK5eKWi70Y6hwxS0fVTUoyRJHvJ7LBgmoMz3oAfoMDoB1D3szv/lmU2560nCOIvd7gUTOPm9o/957Esjp2SVMF8UsmHkzHuAzmGfG0CTOmRj1jA5r9TRZr1ecdUCY13EvjBDBtCsWWXKsky3oZtoAq16emgZoNFc6U9xfRd7CS0qy4G2ouOoUcEcNEXZb+l0Ok2XnOmWkD9pH8hPhKxl65ll9EQvtFs+ay60pOebY7lnEqar8g5bmO/oVohLyJeDEupcqCSBZ3p5qKqsaalGvcI7hOa4dSDnkRmzICqDkXWtzoejSOaUcQNSJr1r3F+tfNLrgchUwAtv50DEI5e5v1T5DEyJrsNofWTH8dbIEwlVE63026pU1oD43G63p/FGrJSSra/kyM9B+6aq2ze8dYGJbW2jaUG5VEZA+1HastMFpNI1sK9HSt8dlLWr9IXJygRxDZkqOl8pyyMyTr1eNyfBgV5X5v6aP+ztd1oQuvkvAiqCSYzrM3T8BdBr38MiPuQZ9ovvMdoiA0zoGMvy8nrAYZGE+YgvjCTwHYBWCr7SRyMh4ZQwPUVn0RW0Xy8vvY9e0ZovzB8BBgBLTvsv9cSQmwAAAABJRU5ErkJggg==" alt="exit">
            </div>
        </el-aside>
    </div>

</template>

<script>
    export default {
        name: "top",
        data(){
            return{
                topBtn:[{
                    btnImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODM3MDgwQzc4NjUxMUU5QkUzN0YxN0Q1RkRGQkRERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODM3MDgwRDc4NjUxMUU5QkUzN0YxN0Q1RkRGQkRERiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4MzcwODBBNzg2NTExRTlCRTM3RjE3RDVGREZCRERGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4MzcwODBCNzg2NTExRTlCRTM3RjE3RDVGREZCRERGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PbLMjwAAATRJREFUeNqkk0srRVEYhtc6uRsYkOGZGBjIpSQjBq4/QUwoQ2XuFxj4BcTA37CJGPgBkoEYmBFRbm3K9nz17jqts3f7nPZbT7t263u/21ouSRIXqALLcArP8A03sAN94WEXGPTAkf2GE9iCTdiFN3iB2TwDD8fwCouuXpY9gk8YyzJYUeYFl68uuFJ7dQaRyi7SkhINpANLNakWipQmmQgNOuGrAYN3fbtDgzsYasBgWN/bcAbbWlVvgcE+PEJraNCvFUZqJ0ur8AcbeRdpBj7gWtO2ajpgHA4UfKg7k2lgGoUzraqWJ2X2tYe9GXjvs8odhBG18wCXEIeHfPvevSsjW2NVDyjOKDuPWDHVFg1nrsnEbTBvA7UKpkt0MFVxJWUG5yXiL8xgXa/wp4nAX8Ws/QswABh5ZIA0eEB/AAAAAElFTkSuQmCC',
                    btnName:'个人信息'
                },{
                    btnImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyOUYzM0VFRjc4NjUxMUU5OUM5MTk0OEUxRDBDODJBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyOUYzM0VGMDc4NjUxMUU5OUM5MTk0OEUxRDBDODJBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5RjMzRUVENzg2NTExRTk5QzkxOTQ4RTFEMEM4MkFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI5RjMzRUVFNzg2NTExRTk5QzkxOTQ4RTFEMEM4MkFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+A2EEwwAAAbJJREFUeNp8lM8rBGEYx993ZtvlJKmNg4MDwoGoPfgDZEvOohzIhcu2knKwLmtTDmoPSHuQo5uLRLlIIicXIUoSLgqbZXZmfJ96RjNv78xbn94fzzPf932e931GuK4rVNCawSZ4AR/gBAxpfTUf94BX8ASKIA8OARlzkQJoCXALLkG9YsuwSDpKYICdUiGhXYE9/5ohgq0bOOBG6NsRaPUvqAKST2CECPyCWJRAhfvPEAEL2P6FfzUpZR+6fmCCGczLGoEUaIBtHP05cnDtZX6Hj05H/OKxDrKXeUy5ylDMBZAFo+BC2dFzNJV12nQRjEiOt4jjLHjWmq0HbQIqUy3CF3IjhUFJrAX3Gv+8cB1L2FVHOHYhJKHfBsdVp3GYF9KICTMmhWFmNXbaOE4Cj6BT4+CPO66xt4EkCezS+0ZMCcXBVh6Q2ibADwmUQBOYVRxW8NgtUMV4NfBcpexANwY2JBUEFnKYLIFBzA+ibgG+SQyPOQe9XpVRvNt873N0zyHVmOYbe6O8BcqZC2mZRegI62AaTPL6KdvOQHvUH6kLrIE78M6/tGewD4apfvz+fwIMAIT9HELOTWGPAAAAAElFTkSuQmCC',
                    btnName:'修改密码'
                }]
            }
        }
    }
</script>

<style scoped>
    .top {
        height: 80px;
        width: 100%;
        background: #ffffff;
        z-index: 1;
        box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }
    .logo_box{
        width: 100%;
        height: 80px;
        background: #079ADE;
        position: relative;
    }
    .logo{
        width: 56%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .exit{
        width: 95px;
        height: 79px;
        background:rgba(7,154,222,0.02);
    }
    .user-info div{
        cursor: pointer;
    }
    .user-info img{
        margin-right: 10px;
    }
    .exit img{
        margin: 0;
    }
</style>
