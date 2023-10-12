<template>
    <!-- 外层元素设置成绝对定位，覆盖其他元素 -->
    <transition name="fade">
        <div class='container' v-show="show">

            <!-- wrapper 设置成相对定位 -->
            <div class="wrapper">
                <div class="dialog">

                    <!-- 标题 -->
                    <slot name="title" v-if="showTitle">
                        <h1>标题</h1>
                    </slot>

                    <!-- 内容 -->
                    <div class="content">
                        <slot name="content">
                            内容 内容 内容 内容 内容
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
    // props: ['show','showTitle'],
    props: {

        show: {
            type: Boolean,
            default: false,
            // required: true
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        //对话框的类型: 确认框： confirm，  消息框： info 
        type: {
            type: String,
            default: 'confirm'
        }
    },
    mounted() {
        //对话框组件应该直接放到body元素下
        document.body.appendChild(this.$el)
    },
    methods: {
        confirmHandler() {
            // console.log('确认')
            this.$emit('confirm')
        },
        cancelHandler() {
            // console.log('取消')
            this.$emit('cancel')
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
