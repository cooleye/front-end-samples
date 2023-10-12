<template>
    <!-- 外层元素设置成绝对定位，覆盖其他元素 -->
    <transition name="fade">
        <div class='container' v-show="isShow">

            <!-- wrapper 设置成相对定位 -->
            <div class="wrapper">
                <div class="dialog">

                    <!-- 标题 -->
                    <slot name="title" v-if="showTitle">
                        <h1>{{ title }}</h1>
                    </slot>

                    <!-- 内容 -->
                    <div class="content">
                        <slot name="content">
                            {{ content }}
                        </slot>
                    </div>

                    <!-- 按钮 -->
                    <slot name="btns">
                        <div class="bts">
                            <div v-if="type == 'confirm'" @click="cancelHandler">取消</div>
                            <div @click="confirmHandler">确认</div>
                        </div>
                    </slot>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'm-dialog',
    data() {
        return {
            isShow: false,
            showTitle: true,
            type: "confirm",
            title: "标题",
            content: '内容',
            confirmCb: null,
            cancelCb: null
        }
    },

    methods: {
        show({ title = '', content = '', confirm, cancel }) {
            if (title) {
                this.title = title
            }
            if (content) {
                this.content = content
            }
            if (confirm) {
                this.confirmCb = confirm
            }
            if (cancel) {
                this.cancelCb = cancel
            }
            this.isShow = true;
        },

        confirmHandler() {
            this.isShow = false;
            this.$emit('confirm')
            if (this.confirmCb) {
                this.confirmCb()
            }
        },
        cancelHandler() {
            this.isShow = false;
            this.$emit('cancel')
            if (this.cancelCb) {
                this.cancelCb()
            }
        }
    }


}
</script>
<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}


.container {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    .wrapper {
        position: relative;
        height: 100%;

        .dialog {
            padding-top: 24px;
            width: 90vw;
            max-width: 400px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 12px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            // overflow: hidden;

            // 样式穿透给子组件
            :deep(h1) {
                text-align: center;
                font-size: 16px;
                font-weight: 400;
            }


            .content {
                padding: 24px;
                padding-top: 12px;
                font-size: 14px;
                color: #555;
            }

            .bts {
                display: flex;
                border-top: solid 1px #eee;
                color: #66e;

                div {
                    flex: 1;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;

                    &:nth-of-type(2) {
                        border-left: solid 1px #eee;
                    }
                }


            }

        }


    }




}
</style>
