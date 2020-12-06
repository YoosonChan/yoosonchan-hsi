let url = {
    get: '/course',
    upsert: '/courseNew',
    del: '/courseDel'
}

export default {
    // 获取课程列表
    async getList (params = { id: '', name: '' }) {
        let list = []
        await this.$axios.get(this.$baseURL + url.get + `?id=${params.id}&name=${params.name}`).then(res => {
            if (!res.data.code) {
                list = res.data.data
            } else {
                this.$message.error('获取课程列表失败')
            }
        }).catch(err => {
            this.$message.error('获取课程列表失败')
            console.log(err);
        })
        return list
    },
    // 添加或者编辑
    async upsert(params) {
        await this.$axios.post(this.$baseURL + url.upsert,{
            ...params
        }).then(res => {
            if (!res.data.code) {
                this.$message.success('成功')
            } else {
                this.$message.error('出错')
            }
        }).catch(err => {
            this.$message.error('失败')
            console.log(err);
        })
    },
    // 删除
    async del(ids) {
        await this.$axios.post(this.$baseURL + url.del, {
            ids
        }).then(res => {
            if (!res.data.code) {
                this.$message.success('删除课程成功')
            } else {
                this.$message.error('删除课程出错')
            }
        }).catch(err => {
            this.$message.error('删除课程失败')
            console.log(err);
        })
    }
}