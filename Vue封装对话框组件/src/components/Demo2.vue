<template>
    <div class=''>

        <button @click="showDialog"> 消息框 </button>

    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },

    methods: {
        showDialog() {
            console.log(this.$dialog)
            this.$dialog.show({
                title: "这是新标题",
                content: "这是新内容",
                confirm() {
                    console.log("点击确认")
                },
                cancel() {
                    console.log("点击取消")
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'></style>
