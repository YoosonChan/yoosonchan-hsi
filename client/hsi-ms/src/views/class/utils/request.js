let url = {
    get: '/class',
    teacher: '/teacherList',
    headmaster: '/headmaster',
    course: '/courseList',
    upsert: '/classNew',
    del: '/classDel'
}

export default {
    // 获取班级列表
    async getList (params = { id: '', name: '' }) {
        let list = []
        await this.$axios.get(this.$baseURL + url.get + `?id=${params.id}&name=${params.name}`).then(res => {
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
    // 获取教师列表
    async getTeacherList () {
        let list = []
        await this.$axios.get(this.$baseURL + url.teacher).then(res => {
            if (!res.data.code) {
                list = res.data.data
            } else {
                this.$message.error('获取教师列表失败')
            }
        }).catch(err => {
            this.$message.error('获取教师列表失败')
            console.log(err);
        })
        return list
    },
    // 获取班主任列表
    async getHeadmasterList() {
        let list = []
        await this.$axios.get(this.$baseURL + url.headmaster).then(res => {
            if (!res.data.code) {
                list = res.data.data
            } else {
                this.$message.error('获取班主任列表失败')
            }
        }).catch(err => {
            this.$message.error('获取班主任列表失败')
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
                this.$message.success('删除班级成功')
            } else {
                this.$message.error('删除班级出错')
            }
        }).catch(err => {
            this.$message.error('删除班级失败')
            console.log(err);
        })
    }
}