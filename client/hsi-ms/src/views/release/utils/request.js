let url = {
    get: '/release',
    upsert: '/releaseNew',
    del: '/releaseDel',
    class: '/classList',
    course: '/courseAll'
}

export default {
    // 获取公告列表
    async getList (params = { title: '' }) {
        let list = []
        await this.$axios.get(this.$baseURL + url.get + `?title=${params.title}`).then(res => {
            if (!res.data.code) {
                list = res.data.data
            } else {
                this.$message.error('获取公告列表失败')
            }
        }).catch(err => {
            this.$message.error('获取公告列表失败')
            console.log(err);
        })
        return list
    },
    // 获取班级列表
    async getClassList() {
        let list = []
        await this.$axios.get(this.$baseURL + url.class).then(res => {
            if (!res.data.code) {
                list = res.data.data
            } else {
                this.$message.error('获取班级列表失败')
            }
        }).catch(err => {
            this.$message.error('获取班级列表失败')
            console.log(err);
        })
        return list
    },
    // 获取课程列表
    async getCourseList() {
        let list = []
        await this.$axios.get(this.$baseURL + url.course).then(res => {
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
                this.$message.success('删除公告成功')
            } else {
                this.$message.error('删除公告出错')
            }
        }).catch(err => {
            this.$message.error('删除公告失败')
            console.log(err);
        })
    }
}