import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class ParentController {
    @Get('/parent')
    public async getList(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const name = ctx.query.name
        const teacherId = ctx.query.teacherId
        let parentList = (await ctx.state.db['parent'].findAll({
            include: [
                {
                    model: ctx.state.db['student'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['avatarUrl', 'createdAt', 'updatedAt']
            },
            where: {
                name: {
                    [like]: '%' + (name ? name : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        parentList = parentList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                childes: cur.students.map((p: any) => p.name)
            }
            delete memo[index].students
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: parentList,
            message: '获取成功'
        }
    }
    // 学生基本信息（微信小程序 我的）
    @Get('/studentBase')
    public async getStudentBase(@Ctx ctx: Context) {
        const { ne, eq } = sequelize.Op
        const id = ctx.query.id
        let res = (await ctx.state.db['parent'].findAll({
            attributes: ['name'],
            include: [{
                model: ctx.state.db['student'],
                attributes: ['id', 'name', 'headmasterId'],
                include: [
                    {
                        model: ctx.state.db['class'],
                        attributes: ['id', 'name'],
                        include: [{
                            model: ctx.state.db['teacher'],
                            attributes: ['id', 'name']
                        }]
                    }
                ]
            }],
            where: {
                id: {
                    [eq]: id
                }
            }
        })).map((entry: any) => entry.toJSON())
        if (res[0]) {
            res = res[0].students
            res = res.reduce((memo: any[], cur: any, index: number) => {
                memo[index] = {
                    ...cur,
                    headmaster: cur.class.teachers.filter((t: any) => t.id === cur.headmasterId).map((h: any) => h.name)[0],
                    class: cur.class.name,
                }
                delete memo[index].family
                delete memo[index].headmasterId
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
    // 学生课程信息（微信小程序 课程管理）
    @Get('/studentCourse')
    public async getStudentCourse(@Ctx ctx: Context) {
        const { ne, eq } = sequelize.Op
        const id = ctx.query.id
        let res = (await ctx.state.db['parent'].findAll({
            attributes: ['name'],
            include: [{
                model: ctx.state.db['student'],
                attributes: ['name'],
                include: [{
                    model: ctx.state.db['class'],
                    attributes: ['id', 'name'],
                    include: [{
                        model: ctx.state.db['courseInfo'],
                        attributes: ['id'],
                        include: [
                            {
                                model: ctx.state.db['teacher'],
                                attributes: ['name', 'phone'],
                            },
                            {
                                model: ctx.state.db['course'],
                                attributes: ['name'],
                                where: {
                                    id: {
                                        [ne]: 1
                                    }
                                }
                            }
                        ]
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
            res = res[0].students
            res = res.reduce((memo: any[], cur: any, index: number) => {
                let courses = cur.class.courseInfos
                courses = courses.map((c: any) => {
                    return {
                        teacher: c.teacher.name,
                        phone: c.teacher.phone,
                        course: c.course.name
                    }
                })
                memo[index] = {
                    name: cur.name,
                    courses
                }
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
    // 增加或更新
    @Post('/parentNew')
    public async upsert(@Ctx ctx: Context) {
        const par = ctx.request.body
        let res = (await ctx.state.db['parent'].upsert({
            ...par
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/parentDel')
    public async del(@Ctx ctx: Context) {
        const parent = ctx.request.body.ids
        let res = false
        try {
            await ctx.state.db['family'].destroy({
                where: {
                    parentId: (parent + '').split(',')
                }
            })
            await ctx.state.db['feedback'].destroy({
                where: {
                    parentId: (parent + '').split(',')
                }
            })
            await ctx.state.db['parent'].destroy({
                where: {
                    id: (parent + '').split(',')
                }
            })
            res = true
        } catch (err) {
            res = false
        }
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 获取状态
    @Get('/getParentStatus')
    public async getStatus(@Ctx ctx: Context) {
        const { ne, eq } = sequelize.Op
        const openid = ctx.query.openid
        let res = (await ctx.state.db['parent'].findOne({
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
    // 获取电话
    @Get('/getParentPhone')
    public async getPhone(@Ctx ctx: Context) {
        const { ne, eq } = sequelize.Op
        const phone = ctx.query.phone
        let res = (await ctx.state.db['parent'].findOne({
            where: {
                phone: {
                    [eq]: phone
                }
            }
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/familyNew')
    public async addChild(@Ctx ctx: Context) {
        const family = ctx.request.body.rows
        let res = (await ctx.state.db['family'].bulkCreate(family))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
}
