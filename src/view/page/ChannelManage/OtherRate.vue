<template>
    <div class="flex-row rate-box">
        <div v-for="(item,index) in rateList" :key="index">
            <el-card class="box-card">
                <div class=" flex-row vertical-center">
                    <img :src="item.imgUrl" alt="rateIcon" class="rate-icon">
                    <p class="rate-name">{{item.name}}</p>
                    <p class="rate-fee">{{item.fee}} 元/次</p>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    export default {
        name: "OtherRate",
        data(){
            return{
                rateList:[{
                    imgUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUYxQzg0Qjg3MzQxMUU5QTQ5OEZDMURGNzIwM0ZGMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUYxQzg0Qzg3MzQxMUU5QTQ5OEZDMURGNzIwM0ZGMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBFRjFDODQ5ODczNDExRTlBNDk4RkMxREY3MjAzRkYzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBFRjFDODRBODczNDExRTlBNDk4RkMxREY3MjAzRkYzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QR3a5gAAA49JREFUeNrMWU1oE1EQ3n27m2wS0zRpktZIBXuxeFQRwVp/QEoPelfBXr3oqYKKChXtoRQPRUFBb3rzJCrioQetP1CwqCcFK1ha2iZN+pdks+nuOg9nyxKb7Mtmm2TgI5vk/Xxv5s2bmbf8wLMPnEMJAIIAP0AGSAAB/9MARYACyAHWAFknk4hVtvcAYoAIPlcal8IHCONvKiANSOKzqwRpuwQgCuAdapwuqAPQDkgB5gAbbhCkGtjtQNvlhEcr0HH/ADKVGhObgSixLhfJlSqnC+fgq9Ugwc4hbvslhuafBugsGqSr2VMncqaEcE6ehWAnoJWrv7Ti3BUJhlHljRLzCNuSoIgbttHSafUNK8HENnmrE+9OlBL04CHcLBI1IxWx2J5vIoLmYb5p0ohdj1f52OWsLvThV8P5xDyReW3ijH/xrk1bymlWxKzEYzdyTheO6Bzf7oZ6YJwgY+wOEEyZbOWAd/VSgNee10IMJkvFBfV2ny91k7FLkGA+ZyvTRd/Rw97l+7sEZZBwxkK15GReH4f+5zuEwre3+egQYzc/wWTTVlK6Z/B9ITy6g2gLx+TMWR+vvWTTmrEYFdTh0/7Fqz+KgZPf1eBjxSDHWdclYibMYp5V1SAHfxYDD1Ka5xGY6c7HQvhLSpMuwp6Kb9XHy+vv9krZMdBe7kUuPlowSC+OtcRIUCKWNJ3F9an7tizp0pXX+dhYQlCmeuTMOWq+koZp2GtDvXL6xpzm3T9ZCD01yVnHYhDBceQAbR76qrY8aRPUhyfkpVuTauhzRpMGBN6Y75ayw2BafUKJXMsbpL/WsKI5DXGgzQiY+/q40tazT1q/1yXmJ3YKhcynQmt/JdNXIZqI1VdNMZiaD7TZ7Scbb8AJOkBrp1yKTEURS0Nf7YcvF1/XxQsuhzyFYN3arJIjWFSz7DfXpIqx1ghW/CyFtOwiR5axKKes6RxpLKrLxxyIHBABetzQJBzgUwzN0tZ0K4kVf1nPg1A1Ah8jddp7BnLaTFhVvI5oFkmZ285akzDdldRBNpDLf0UT/WOmCQjOWBVFttiYyQabNm13s0BXsNwAcst422V79UE96DdgpY7kVnBOg4UghlbuV53MncS59HLpVqWziKp8vfQ6wkVvnSndc9UQtDrOKlf7FbB14a5eAZurpdqcx4q/jbWWseZ23L9aZFsu0a0BfBZR+hrCY9nTOrat+TXEXwEGAC9tDjXV9coCAAAAAElFTkSuQmCC',
                    name:'短信服务费',
                    fee:'0.1',
                },{
                    imgUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGQjM2QkVCQjg3MzMxMUU5OEY0NDg2NEM1RDgzNzFCRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQjM2QkVCQzg3MzMxMUU5OEY0NDg2NEM1RDgzNzFCRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZCMzZCRUI5ODczMzExRTk4RjQ0ODY0QzVEODM3MUJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZCMzZCRUJBODczMzExRTk4RjQ0ODY0QzVEODM3MUJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jda+kQAABb5JREFUeNrEWVtoHFUYnnPmkr1vstkYmyYxTZpoSQ2mjWLVqrVvIqL4UB8EFdSHvgqKFB8KPijYh+KLvohYfFEKKrRIsdWCAS/VWNBYmibRblsbN9kke8vu3I7f2ZwJay4zs9lN/eGH2Z3ZOd/5L9///2fJ85+MSpuUMDQKDUEDUBUqi3sW1ICWoEVoDlrYzCJKjc9r0DZoQly7vZdrENoivtOhGWhaXDcUIH+uA5qEkk1anG/odmg7dBZ6A2o2AiC3QPcmrL2REOEF/t6r0Hm3h6nHiziw3gaCW22cXrEGqdWCVPw4Lm29tAn3T0FtPxbku9lxi8A5EhdrEj8Au6DN0q2XZrG2q4tbhMk95aIeHbhqBp8pMTrCJBKmhN2IEPO7frV4uk8p3qzD3XlBR2sAKiJgPeWHcvOeq2bgTUsiKzu2GUkuMHVoTI89XLDlt4a03JVNguTvzDoUVO3iDj/Z+o+lRa9ZgcPV4KrFZGT3lBl6ZcFWg3Vkd8fqGNQECXvKhBkeAoh+t2d0Ru+eMoM76ojHpFOpaJXvfVUIuK+bLZewDQX3ozlb2dYAMl8BmPD7S1MiUQ+C5wBVQyL10lTCARj2KPwrkrcVzWDUTyLJS7Z8JzK8ngrEMYWpaJl8ySJTwrCgL9fBgt1wc6BOK0ap6Od8yTa5tBCnxini0dvhfqmFGl+0yXq+ToAhKppNX4KH2UNN81+qxL7oFqYxan50IJD5qgHVJaCITtj/L4ht9ihL708aoXZwYd9/CIywy11y6d12uZw6W2p9Ci6+H9U/ho3lQ8Qa61OL51BlZmpYTlWq2nTfskfLjoOIPwZpH60CN36Pln191tI6L5TjxxGr/dXUhYR5bLEce/YvM/jBI7CuLDHbT7LROrnKucj1KsW3Aa4LAI4B3MB6vAqLb09b2pFvS4knawiryoDjWwAiPFpueWDOUp9zvotQ82SCGumUGXiNLSedRdbOHfy7Iu434R2Hf9VjAz6WsxQxfXny1S96bHDGatoHVw2ilA0x0S9y622Xy2cmjPABWKgHO063yeX3yoy2L9rqiw7gCLE+i1JzDGHxMp7bic08jZB4x4utFDEaupau86XEwRlLe9WWyG1rgoSwFCyY+9MM7q24hLAZZPBpbCY2Wm7eh83swSayu7T8CZ4gnxfbD1qM7MRGh31YsETF3Ooqc7Z6aD1wFYASy8BaAVilteITRjp4O4ZMzgaJ/X0lFYl9mYP73YjsMESjwfzxb5GKodq9/jLS6VJ3NYBEfDFDfE6kbXU/v+5Wlr5RJDYRI+Y5/vlvs2kvNnKH5H92zSli4tfd6jE65g25klsMFGOoEpvGS+5dphR5BNmcHFTz06jdRzvlUiprK005pjzoNBoIjWse4DimgkMzGfeCaJ6Ela5Qic2sLnOwSOeUEXo0KevnncwF6L5JM3Qfv0YiXMK9wm9GZBjxOLIygFDTq9Jkqlv+tJj417U8iPVDZN2pPFNaENxxxFwL3B4HuCBa/QgsmAN5X0CGfr3E5Me520FDL6GaKG1UH5+31Z60rb3g9JFNxB4dUnNn3Tu2CqYVgLo4jlh3YAoTS79LLaRwmVrDA4xQJBDBotawljv+sx6LYgP7Ab4bpPwGgM4jROKc/yo9FLEv7FLzx7hV3ejWOb+p5r8bYqqrqYdTCS9ZTBJJMRem5pGfyvFDqMNP8MyHJuEWAyFyPUStM7D0iW3IcNeeeBnLmqnOFBaqZ5aQWqlRHNGyn/5hhKeyTNmNEIiBGwvwwqUBtfCjBzhJYDA3mot5YEb8zsYbTjxw334kDef4Gn86uzph6QY7WPgfThYWxGmX59EHD6hp3uHfQnCLYk3m9/iN92qTTqpvsaTFWnatB5hMmDwvjiMafUboJGWm3hPWjDgrqfcIuHrjDT0CdnbLrXlTZHhrrbOM6DvnpC06RK8u4NeFrv4bQquKaVs8W/ffEP8KMABhpzHFu982XwAAAABJRU5ErkJggg==',
                    name:'实名认证服务费',
                    fee:'0.5',
                }],
            }
        }
    }
</script>

<style scoped>
    .rate-icon{
        width: 40px;
        height: 40px;
        margin-right: 11px;
    }
    .rate-name{
        font-size: 14px;
        color: #000;
        margin-right: 12px;
    }
    .rate-fee{
        font-size: 14px;
        color:rgba(170,170,170,1);
    }
    .box-card{
        width: 511px;
        margin: 15px;
    }
    .rate-box{
        padding: 15px;
    }
</style>
