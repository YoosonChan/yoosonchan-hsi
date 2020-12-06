import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class StudentController {
    @Get('/student')
    public async getList(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const name = ctx.query.name
        const id = ctx.query.id
        const teacherId = ctx.query.teacherId
        let studentList = (await ctx.state.db['student'].findAll({
            include: [
                {
                    model: ctx.state.db['class'],
                    attributes: ['id', 'name'],
                    where: {
                        headmasterId: {
                            [like]: '%' + (teacherId ? teacherId : '') + '%'
                        }
                    },
                    include: [{
                        model: ctx.state.db['teacher'],
                        attributes: ['id', 'name']
                    }]
                },
                {
                    model: ctx.state.db['parent'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
        studentList = studentList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                headmaster: cur.class.teachers.filter((t: any) => t.id === cur.headmasterId).map((h: any) => { return { id: h.id, name: h.name } }),
                class: {id: cur.class.id, name: cur.class.name},
                parents: cur.parents.map((p: any) => p.name)
            }
            delete memo[index].classId
            delete memo[index].headmasterId
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: studentList,
            message: '获取成功'
        }
    }
    @Get('/studentInfo')
    public async getStudentInfo(@Ctx ctx: Context) {
        const id = ctx.query.id
        let res = await ctx.state.db['student'].findByPk(id, {
            attributes: ['name'],
            include: [
               {
                   model: ctx.state.db['class'],
                   attributes: ['id', 'name']
               }
            ]
        })
        ctx.body = {
            code: 0,
            data: res,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/studentNew')
    public async upsert(@Ctx ctx: Context) {
        const stu = ctx.request.body
        if (!stu.headmasterId) {
            stu.headmasterId = (await ctx.state.db['class'].findByPk(stu.classId)).toJSON().headmasterId
        }
        let res = (await ctx.state.db['student'].upsert({
            ...stu
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/studentDel')
    public async del(@Ctx ctx: Context) {
        const student = ctx.request.body.ids
        let res = false
        try {
            await ctx.state.db['family'].destroy({
                where: {
                    studentId: student.split(',')
                }
            })
            await ctx.state.db['student'].destroy({
                where: {
                    id: student.split(',')
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
}
