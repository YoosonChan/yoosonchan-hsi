let url = {
    login: '/login'
}

export default {
    // 登录
    async login(params) {
        return await this.$axios.post(this.$baseURL + url.login, {
            ...params
        })
    }
}