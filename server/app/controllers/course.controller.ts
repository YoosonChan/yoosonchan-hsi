import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class CourseController {
    @Get('/course')
    public async getList(@Ctx ctx: Context) {
        const { like, ne } = sequelize.Op
        const name = ctx.query.name
        let courseList = (await ctx.state.db['course'].findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                name: {
                    [like]: '%' + (name ? name : '') + '%'
                },
                id: {
                    [ne]: 1
                }
            }
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: courseList,
            message: '获取成功'
        }
    }
    @Get('/courseList')
    public async courseList(@Ctx ctx: Context) {
        const { ne } = sequelize.Op
        let courseList = (await ctx.state.db['course'].findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    [ne]: 1
                }
            }
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: courseList,
            message: '获取成功'
        }
    }
    // 微信小程序
    @Get('/courseListmp')
    public async courseListmp(@Ctx ctx: Context) {
        const { eq } = sequelize.Op
        const id = ctx.request.query.teacherId
        let res = (await ctx.state.db['courseInfo'].findAll({
            attributes: ['id'],
            include: [{
                model: ctx.state.db['course'],
                attributes: ['id', 'name']
            }],
            where: {
                teacherId: {
                    [eq]: id
                }
            }
        })).map((entry: any) => entry.toJSON())
        res = res.map((c: any) => c.course)
        let newRes: any[] = []
        res.forEach((cur: any) => {
            if (!newRes.length) {
                newRes.push(cur)
            } else {
                if (cur.id !== newRes[newRes.length - 1].id) {
                    newRes.push(cur)
                }
            }
        })
        ctx.body = {
            code: 0,
            data: newRes,
            message: '获取成功'
        }
    }
    @Get('/courseAll')
    public async courseAll(@Ctx ctx: Context) {
        let courseList = (await ctx.state.db['course'].findAll({
            attributes: ['id', 'name']
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: courseList,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/courseNew')
    public async upsert(@Ctx ctx: Context) {
        const course = ctx.request.body
        let res = (await ctx.state.db['course'].upsert({
            ...course
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/courseDel')
    public async del(@Ctx ctx: Context) {
        const course = ctx.request.body.ids
        let res = false
        try {
            await ctx.state.db['courseInfo'].destroy({
                where: {
                    courseId: (course + '').split(',')
                }
            })
            await ctx.state.db['release'].destroy({
                where: {
                    courseId: (course + '').split(',')
                }
            })
            await ctx.state.db['course'].destroy({
                where: {
                    id: (course + '').split(',')
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
