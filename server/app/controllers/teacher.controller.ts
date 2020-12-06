import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class TeacherController {
    // 获取表格列表
    @Get('/teacher')
    public async list(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const name = ctx.query.name
        const id = ctx.query.id
        const { eq } = sequelize.Op
        let teacherList = (await ctx.state.db['teacher'].findAll({
            include: [
                {
                    model: ctx.state.db['course'],
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.state.db['class'],
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.state.db['term'],
                    attributes: ['id'],
                    where: {
                        status: {
                            [eq]: 1
                        }
                    }
                }
            ],
            attributes: {
                exclude: ['password', 'avatarUrl', 'createdAt', 'updatedAt']
            },
            where: {
                name: {
                    [like]: '%' + (name ? name : '') + '%'
                },
                id: {
                    [like]: '%' + (id ? id : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        teacherList = teacherList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                courses: cur.courses.filter((c: any) => c.id > 1).map((c: any) => { return { id: c.id, name: c.name } }),
                classes: cur.classes.map((c: any) => { return { id: c.id, name: c.name } }),
                termId: cur.terms[0].id
            }
            delete memo[index].terms
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: teacherList,
            message: '获取成功'
        }
    }
    // 获取教师列表
    @Get('/teacherList')
    public async teacherList(@Ctx ctx: Context) {
        const { ne } = sequelize.Op
        let teacherList = (await ctx.state.db['teacher'].findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    [ne]: 'admin'
                }
            }
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: teacherList,
            message: '获取成功'
        }
    }
    // 获取教师列表(微信小程序 家长管理)
    @Get('/classStudent')
    public async student(@Ctx ctx: Context) {
        const { eq } = sequelize.Op
        const id = ctx.request.query.teacherId
        let res = (await ctx.state.db['teacher'].findAll({
            attributes: ['id', 'name'],
            include: [{
                model: ctx.state.db['class'],
                attributes: ['id', 'name'],
                include: [{
                    model: ctx.state.db['student'],
                    attributes: ['id', 'name'],
                    include: [{
                        model: ctx.state.db['parent'],
                        attributes: ['name', 'phone']
                    }]
                }]
            }],
            where: {
                id: {
                    [eq]: id
                }
            }
        })).map((entry: any) => entry.toJSON())
        if (res[0]) {
            res = res[0].classes
            res = res.reduce((memo: any[], cur: any, index: number) => {
                let parent = cur.students.map((s: any) => {
                    return s.parents.map((p: any) => {
                        return {
                            student: s.name,
                            name: p.name,
                            phone: p.phone
                        }
                    })
                })
                memo[index] = {
                    class: cur.name,
                    parent
                }
                return memo
            }, [])
            res = res.reduce((memo: any[], cur: any, index: number) => {
                memo[index] = {
                    ...cur,
                    parents: cur.parent.flat()
                }
                delete memo[index].parent
                return memo
            }, [])
        } else {
            res = []
        }
        ctx.body = {
            code: 0,
            data: res,
            message: '获取成功'
        }
    }
    // 获取教师列表（微信小程序 我的）
    @Get('/teacherBase')
    public async teacherBase(@Ctx ctx: Context) {
        const { eq, ne } = sequelize.Op
        const id = ctx.request.query.teacherId
        let res = (await ctx.state.db['courseInfo'].findAll({
            attributes: ['id'],
            include: [
                {
                    model: ctx.state.db['class'],
                    attributes: ['id', 'name', 'headmasterId'],
                    include: [{
                        model: ctx.state.db['teacher'],
                        attributes: ['id', 'name']
                    }]
                },
                {
                    model: ctx.state.db['teacher'],
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.state.db['course'],
                    attributes: ['id', 'name']
                }
            ],
            where: {
                teacherId: {
                    [eq]: id
                },
                courseId: {
                    [ne]: 1
                }
            }
        })).map((entry: any) => entry.toJSON())
        res = res.map((c: any) => {
            return {
                courseId: c.course.id,
                course: c.course.name,
                teacherId: c.teacher.id,
                name: c.teacher.name,
                classId: c.class.id,
                class: c.class.name,
                headmaster: c.class.teachers.filter((t: any) => t.id === c.class.headmasterId).map((h: any) => h.name)[0]
            }
        })
        ctx.body = {
            code: 0,
            data: res,
            message: '获取成功'
        }
    }
    // 获取班主任列表
    @Get('/headmaster')
    public async headmaster(@Ctx ctx: Context) {
        const { gt } = sequelize.Op
        let headmaster = (await ctx.state.db['teacher'].findAll({
            attributes: ['id', 'name'],
            where: {
                type: {
                    [gt]: 0
                }
            }
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: headmaster,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/teacherNew')
    public async upsert(@Ctx ctx: Context) {
        const { eq } = sequelize.Op
        const teacher = ctx.request.body
        let termId = (await ctx.state.db['term'].findOne({
            attributes: ['id'],
            where: {
                status: {
                    [eq]: 1
                }
            }
        })).toJSON().id
        let res = false
        if (await ctx.state.db['teacher'].upsert({
            id: teacher.id,
            name: teacher.name,
            phone: teacher.phone,
            type: teacher.type,
            status: !!teacher.status ? 1 : 0
        })) {
            try {
                if (teacher.type > 1 && teacher.cur) {
                    (await ctx.state.db['courseInfo'].upsert({
                        teacherId: teacher.id,
                        termId,
                        classId: teacher.classIds,
                        courseId: 1
                    }))
                }
                (teacher.classIds + '').split(',').forEach((cls: any) => {
                    (teacher.courseIds + '').split(',').forEach((c: any) => {
                        ctx.state.db['courseInfo'].upsert({
                            teacherId: teacher.id,
                            termId,
                            classId: cls,
                            courseId: c
                        }).catch((err: any) => {
                            res = false
                            ctx.state.db['teacher'].destroy({
                                where: {
                                    id: teacher.id
                                }
                            })
                        })
                    })
                })
                res = true
            } catch (err) {
                console.log(err)
                ctx.state.db['teacher'].destroy({
                    where: {
                        id: teacher.id
                    }
                })
                res = false
            }

        }
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/teacherDel')
    public async del(@Ctx ctx: Context) {
        const teacher = ctx.request.body.ids
        let res = false
        try {
            await ctx.state.db['courseInfo'].destroy({
                where: {
                    teacherId: teacher.split(',')
                }
            })
            await ctx.state.db['release'].destroy({
                where: {
                    teacherId: teacher.split(',')
                }
            })
            await ctx.state.db['feedback'].destroy({
                where: {
                    teacherId: teacher.split(',')
                }
            })
            await ctx.state.db['teacher'].destroy({
                where: {
                    id: teacher.split(',')
                }
            })
            res = true
        } catch (err) {
            res = false
        }

        ctx.body = {
            code: 0,
            data: res,
            message: res ? '删除成功' : '删除出错'
        }
    }
    @Get('/getTeacherStatus')
    public async getStatus(@Ctx ctx: Context) {
        const { ne, eq } = sequelize.Op
        const openid = ctx.query.openid
        let res = (await ctx.state.db['teacher'].findOne({
            where: {
                openid: {
                    [eq]: openid
                }
            }
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: '获取成功'
        }
    }
    @Get('/getTeacherId')
    public async getId(@Ctx ctx: Context) {
        const { ne, eq } = sequelize.Op
        const id = ctx.query.id
        let res = (await ctx.state.db['teacher'].findByPk(id))
        ctx.body = {
            code: 0,
            data: res,
            message: '获取成功'
        }
    }
    // 绑定老师
    @Post('/teacherBind')
    public async bind(@Ctx ctx: Context) {
        const teacher = ctx.request.body
        let res = (await ctx.state.db['teacher'].upsert({
            ...teacher
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: '绑定成功'
        }
    }
}

