import Dialog from './Dialog.vue'
export const MyDialog = {
    install(Vue) {
        const Constructor = Vue.extend(Dialog)
        const instance = new Constructor()
        let div = document.createElement('div')
        document.body.appendChild(div)
        instance.$mount(div)
        Vue.prototype.$dialog = instance
    }
}


