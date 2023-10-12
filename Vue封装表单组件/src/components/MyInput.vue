<template>
    <div class='my-input'>
        <span class="input-label" :style="{ width: `${labelWidth}px` }">{{ label }}:</span>
        <input :type="type" :value="value" @input="inputHandler" @blur="validate" :class="{ 'check-faild': tip }">

        <span v-if="tip" class="tip">{{ tip }}</span>
    </div>
</template>

<script>
export default {
    name: 'my-input',
    props: {
        value: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        // 输入框类型： text 文本框    passwword 是密码框
        type: {
            type: String,
            default: "text"
        },
        labelWidth: {
            type: Number,
            default: 100
        },
        rule: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            tip: "",
            val: ""
        }
    },
    created() {
        this.val = this.value;
    },
    methods: {
        inputHandler(e) {
            this.val = e.target.value;
            this.$emit('input', this.val)
        },
        // 验证输入框
        /**
         * 
         * @param {*} e
         * 
         * [
            { required: true, message: '请输入活动名称', },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
          ] 
         */

        validate() {
            this.tip = ''
            let val = this.val;
            let valid = true;

            /**  ====================外部传入验证规规则，使用for循环遍历规则========================  */
            for (let i = 0; i < this.rule.length; i++) {

                let r = this.rule[i];
                if (r.required && !val) {
                    this.tip = r.message;
                    valid = false;
                    break;
                }

                if (r.min && (val.length < r.min || val.length > r.max)) {
                    this.tip = r.message
                    valid = false;
                    break;
                }

            }
            return valid;
        }
    }
}
</script>
<style scoped lang='scss'>
.my-input {

    padding: 6px;
    display: flex;

    .input-label {
        font-size: 14px;
        color: #333;
        font-weight: 400;
        line-height: 40px;
    }

    input {
        width: 200px;
        font-size: 16px;
        color: #333;
        padding: 10px;
        border-radius: 6px;
        border: solid 1px #999;
        outline-color: #33e;
    }

    .check-faild {
        border-color: red;
    }


    .tip {
        color: red;
        font-size: 12px;
        line-height: 40px;
        margin-left: 10px;
    }
}
</style>
