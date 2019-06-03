<template>
    <div class="simple-dialog-wrapper flex-col vertical-stretch flow-center" v-show="isShow || isDialogShow">
        <transition name="fade-show">
            <div class="simple-dialog-cover" v-show="isShow" @click="close"></div>
        </transition>
        <transition name="pop-show">
            <div class="simple-dialog-box" v-show="isDialogShow">
                <div class="simple-dialog-close-top flex-col" v-if="topClose">
                    <a class="simple-dialog-close" @click="close"></a>
                </div>
                <div class="simple-dialog-content">
                    <slot></slot>
                </div>
                <a class="simple-dialog-close" @click="close" v-if="!topClose"></a>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SimpleDialog",
        props: {
            topClose: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                isShow: false,
                isDialogShow: false,
            }
        },
        methods: {
            open() {
                this.isShow = true;
                // this.$el.addEventListener('transitionend', this.showDialog);
                this.showDialog();
            },
            showDialog() {
                this.isDialogShow = true;
                // this.$el.removeEventListener('transitionend', this.showDialog);
            },
            close() {
                this.isDialogShow = false;
                // transform不触发transitionend事件，opacity可以，原因不详
                setTimeout(() => {
                    this.isShow = false;
                    this.$emit('closed')
                }, 300);
            },
        },
    }
</script>

<style scoped>
    .fade-show-enter-active, .fade-show-leave-active,
    .pop-show-enter-active, .pop-show-leave-active {
        transition: all 0.3s;
    }

    .fade-show-enter, .fade-show-leave-to {
        opacity: 0;
    }

    .pop-show-enter, .pop-show-leave-to {
        transform: translateY(100%);
    }

    .simple-dialog-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        padding: 0 .75rem;
    }

    .simple-dialog-wrapper .simple-dialog-cover {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, .6);
        margin: 0 -.75rem;
    }

    .simple-dialog-wrapper .simple-dialog-box {
        z-index: 2;
    }

    .simple-dialog-wrapper .simple-dialog-box > .simple-dialog-content {
        max-height: 8rem;
        border-radius: .2rem;
        background: #fff;
        overflow: hidden;
    }

    .simple-dialog-wrapper .simple-dialog-box .simple-dialog-close {
        display: block;
        margin: .5rem auto;
        width: .8rem;
        height: .8rem;
        background: no-repeat center center url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAh1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9qkf8RAAAALHRSTlMAEc3rR3ZqCgf1WuIN3yyT1/kV28eolY/vbjq9uJyHgSECTD0eF9GwUCPEnUz5PeMAAAMBSURBVFjDpJLZkqpAFAQLaVZRQXAbt3GbJSb///uudMSNcGSwEfPJUDv71OmSg6kJJ+vcTyj88mM9Cc1U/YmOiw8afCyOkXpwMLOEFpKZOeg5stUIS1HNw+P4kknZZXwM51WBZbTKnska+NTku1OsO+LTLqfGDzonT4f2wGKsFsYLe+EwVRfOGxspjB5mCO1KNmc5SZf1dGEsB3FYT7lMXX/74crEUwe8CVd+4oc1rurVvKkjb/WyqwdVfy+BT0+d8T6B8r318eoLAz1FUEdqqcP31VekepK0uBq//9xfCYnR05gEyqkaxBUURj0wBVTNt94CqXqRAtu/vgzUk6A5zHkJn+rNDJZn3bKBkafeZCVs7gOf9AJvv0NHQ5joJSYwjG6X6nt6Cc+/edTMh1AvEoKfSZYVjOL7ngd779FA+yC+OzCClSwH+7FZrYHX7htA0BxxdFCNAT/SHXussd3HXr+JfDD/W7loNmtgje2+QaY7FjCz5gTGbac8df9lDEmd9AtyOc51uymHL0lz2MltdPu0g7mkEozcRrdPJyilKRSR3Ea3T3ECUxmoJLfR7ZOqOmxgg7uNbp99jkBbCOU0dvIphK3W9ZhuYxefDKyV21q7jW6frXYuHy7qYHx3+3QBX0vI1MGYuH3KIBEgdTG6fbKyf8WZyw6CMBBFa0CEhRQ3LFiYxqCB6v9/n2F1EhMr9TKBNWnazuOeub2sWNCFZtnj7NYsWHBkZYcc+UxQlDskKA/SJhnlmSgn04bElvKQxKb0pEqh9GgOSi2DD0fal9JtaF83GqzUD2mwSIDWsZGAJSpXVVMQKWRUUj1kFKGXdBmhB0UUcgBFgCWdbYClBecqjb7AOYBT4kOAEyQWCBYk3hraTcYKBp9BHnwsRzMX9OExmI63+gD+NLAILE0M3WaxNYL4xu4fq6obEz/EfDMtJjdQ+1y7z/9yGqc8Q3La2DINOaauH77encfUNbCdM43x2Fdlez+5+hDasupjgzG+rXW//+PC5/PHqym6Nc8fb8+vlWvqtxxuAAAAAElFTkSuQmCC");
        background-size: cover;
    }

    .simple-dialog-wrapper .simple-dialog-box > .simple-dialog-close-top {
        align-items: flex-end;
    }

    .simple-dialog-wrapper .simple-dialog-box > .simple-dialog-close-top > .simple-dialog-close {
        width: .5rem;
        height: .5rem;
        margin: 0;
    }

    .simple-dialog-wrapper .simple-dialog-box > .simple-dialog-close-top::after {
        content: '';
        display: block;
        width: .02rem;
        height: .4rem;
        background: #fff;
        margin-right: .24rem;
    }
</style>
