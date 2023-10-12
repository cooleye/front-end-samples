<template>
  <div class="hello">

    <h1>{{ username }}</h1>
    <h1>{{ password }}</h1>


    <!-- v-model  双向绑定  同时实现父传子和子传父 -->
    <my-form ref="myForm">
      <my-input label="用户名" :label-width="100" v-model="username" :rule="rules.name"></my-input>
      <my-input label="密码" type="password" v-model="password"  :rule="rules.password"></my-input>
      <button @click="submitForm"> 提交 </button>
    </my-form>
  </div>
</template>

<script>
import MyForm from './MyForm.vue';
import MyInput from './MyInput.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      username: "",
      password: "",
      rules: {
        name: [
          { required: true, message: "用户名不能为空" },
          { min: 5, max: 10, message: "用户名长度为5~10位" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 3, max: 6, message: "用户名长度为3~6位" }
        ]
      }
    }
  },
  components: {
    MyForm, MyInput
  },
  methods: {
    submitForm() {
      this.$refs['myForm'].validate(valid => {
        if (valid) {
          console.log("表单验证通过")
        } else {
          console.log("表单验证失败")
        }
      })
    }
  }
}
</script>

<style scoped lang="scss"></style>
