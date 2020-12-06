import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class GradeController {
    @Get('/grade')
    public async getList(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const name = ctx.query.name
        const id = ctx.query.id
        const teacherId = ctx.query.teacherId
        let gradeList = (await ctx.state.db['grade'].findAll({
            include: [
                {
                    model: ctx.state.db['student'],
                    attributes: ['id', 'name'],
                    where: {
                        id: {
                            [like]: '%' + (id ? id : '') + '%'
                        },
                        name: {
                            [like]: '%' + (name ? name : '') + '%'
                        }
                    }
                },
                {
                    model: ctx.state.db['class'],
                    attributes: ['name'],
                    where: {
                        headmasterId: {
                            [like]: '%' + (teacherId ? teacherId : '') + '%'
                        }
                    }
                },
                {
                    model: ctx.state.db['course'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['term'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })).map((entry: any) => entry.toJSON())
        gradeList = gradeList.reduce((memo:any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                student: cur.student.name,
                class: cur.class.name,
                course: cur.course.name,
                term: cur.term.name,
            }
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: gradeList,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/gradeNew')
    public async upsert(@Ctx ctx: Context) {
        const grade = ctx.request.body
        delete grade.name
        let res = (await ctx.state.db['grade'].upsert({
            ...grade
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 上传成绩
    @Post('/gradeUpload')
    public async upload(@Ctx ctx: Context) {
        const grades = ctx.request.body.rows
        let res = (await ctx.state.db['grade'].bulkCreate(grades))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/gradeDel')
    public async del(@Ctx ctx: Context) {
        const grade = ctx.request.body.ids
        let res = (await ctx.state.db['grade'].destroy({
            where: {
                id: (grade + '').split(',')
            }
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
}
