let url = {
    get: '/feedback',
    del: '/feedbackDel'
}

export default {
    // 获取反馈列表
    async getList (params = { title: '' }) {
        let list = []
        await this.$axios.get(this.$baseURL + url.get + `?title=${params.title}`).then(res => {
            if (!res.data.code) {
                list = res.data.data
            } else {
                this.$message.error('获取反馈列表失败')
            }
        }).catch(err => {
            this.$message.error('获取反馈列表失败')
            console.log(err);
        })
        return list
    },
    // 删除
    async del(ids) {
        await this.$axios.post(this.$baseURL + url.del, {
            ids
        }).then(res => {
            if (!res.data.code) {
                this.$message.success('删除反馈成功')
            } else {
                this.$message.error('删除反馈出错')
            }
        }).catch(err => {
            this.$message.error('删除反馈失败')
            console.log(err);
        })
    }
}