import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class TermController {
    @Get('/term')
    public async getList(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const name = ctx.query.name
        const teacherId = ctx.query.teacherId
        let termList = (await ctx.state.db['term'].findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                name: {
                    [like]: '%' + (name ? name : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: termList,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/termNew')
    public async upsert(@Ctx ctx: Context) {
        const term = ctx.request.body
        let res = (await ctx.state.db['term'].upsert({
            ...term
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/termDel')
    public async del(@Ctx ctx: Context) {
        const term = ctx.request.body.ids
        let res = false
        try {
            await ctx.state.db['courseInfo'].destroy({
                where: {
                    termId: (term + '').split(',')
                }
            })
            await ctx.state.db['term'].destroy({
                where: {
                    id: (term + '').split(',')
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
