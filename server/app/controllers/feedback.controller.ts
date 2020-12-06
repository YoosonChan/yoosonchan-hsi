import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class FeedbackController {
    @Get('/feedback')
    public async getList(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const title = ctx.query.title
        const teacherId = ctx.query.teacherId
        const parentId = ctx.query.parentId
        let feedbackList = (await ctx.state.db['feedback'].findAll({
            include: [
                {
                    model: ctx.state.db['parent'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['teacher'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt']
            },
            where: {
                title: {
                    [like]: '%' + (title ? title : '') + '%'
                },
                teacherId: {
                    [like]: '%' + (teacherId ? teacherId : '') + '%'
                },
                parentId: {
                    [like]: '%' + (parentId ? parentId : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        feedbackList = feedbackList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                parent: cur.parent.name,
                teacher: cur.teacher.name
            }
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: feedbackList,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/feedbackNew')
    public async upsert(@Ctx ctx: Context) {
        const feedback = ctx.request.body
        delete feedback.name
        let res = (await ctx.state.db['feedback'].upsert({
            ...feedback
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/feedbackDel')
    public async del(@Ctx ctx: Context) {
        const feedback = ctx.request.body.ids
        let res = (await ctx.state.db['feedback'].destroy({
            where: {
                id: (feedback + '').split(',')
            }
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
}
