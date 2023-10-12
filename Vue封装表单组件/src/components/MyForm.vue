<template>
    <div class='my-form'>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'my-form',
    methods: {
        validate(cb) {
           
            this.$children.forEach(children =>{
                children.validate()
            })
            let valid = this.$children.every(children => children.validate())
            cb(valid)
        }
    }
}
</script>
<style scoped lang='scss'>
.my-form {
    border: solid 1px blue;
}
</style>
