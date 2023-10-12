<template>
    <div class=''>
        <ul>
            <li v-for="img in imgs">
                <img v-lazy="img" src="@/assets/imgs/animation.gif">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            imgs: []
        }
    },
    created() {
        for (let i = 1; i < 14; i++) {
            this.imgs.push(require(`@/assets/imgs/${i}.jpeg`))
        }
    },
    mounted() { },
    methods: {}
}
</script>
<style scoped lang='scss'>
img {
    height: 300px;
}
</style>
