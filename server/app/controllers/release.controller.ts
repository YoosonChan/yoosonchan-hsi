import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class ReleaseController {
    @Get('/release')
    public async getList(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const title = ctx.query.title
        const teacherId = ctx.query.teacherId
        let releaseList = (await ctx.state.db['release'].findAll({
            include: [
                {
                    model: ctx.state.db['class'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['course'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                title: {
                    [like]: '%' + (title ? title : '') + '%'
                },
                teacherId: {
                    [like]: '%' + (teacherId ? teacherId : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        releaseList = releaseList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                class: cur.class.name,
                course: cur.course.name
            }
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: releaseList,
            message: '获取成功'
        }
    }
    @Get('/releaseList')
    public async list(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const title = ctx.query.title
        const teacherId = ctx.query.teacherId
        let releaseList = (await ctx.state.db['release'].findAll({
            include: [
                {
                    model: ctx.state.db['class'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['teacher'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['course'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt']
            },
            where: {
                teacherId: {
                    [like]: '%' + (teacherId ? teacherId : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        releaseList = releaseList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                class: cur.class.name,
                course: cur.course.name,
                teacher: cur.teacher.name
            }
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: releaseList,
            message: '获取成功'
        }
    }
    @Get('/getRelease')
    public async release(@Ctx ctx: Context) {
        const { like, ne } = sequelize.Op
        const title = ctx.query.title
        const teacherId = ctx.query.teacherId
        let releaseList = (await ctx.state.db['release'].findAll({
            include: [
                {
                    model: ctx.state.db['class'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['teacher'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['course'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt']
            },
            where: {
                teacherId: {
                    [like]: '%' + (teacherId ? teacherId : '') + '%'
                },
                type: {
                    [ne]: 1
                }
            }
        })).map((entry: any) => entry.toJSON())
        releaseList = releaseList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                class: cur.class.name,
                course: cur.course.name,
                teacher: cur.teacher.name
            }
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: releaseList,
            message: '获取成功'
        }
    }
    @Get('/getWork')
    public async work(@Ctx ctx: Context) {
        const { like, eq } = sequelize.Op
        const title = ctx.query.title
        const teacherId = ctx.query.teacherId
        let releaseList = (await ctx.state.db['release'].findAll({
            include: [
                {
                    model: ctx.state.db['class'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['teacher'],
                    attributes: ['name']
                },
                {
                    model: ctx.state.db['course'],
                    attributes: ['name']
                }
            ],
            attributes: {
                exclude: ['createdAt']
            },
            where: {
                teacherId: {
                    [like]: '%' + (teacherId ? teacherId : '') + '%'
                },
                type: {
                    [eq]: 1
                }
            }
        })).map((entry: any) => entry.toJSON())
        releaseList = releaseList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                class: cur.class.name,
                course: cur.course.name,
                teacher: cur.teacher.name
            }
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: releaseList,
            message: '获取成功'
        }
    }
    // 增加或更新
    @Post('/releaseNew')
    public async upsert(@Ctx ctx: Context) {
        const release = ctx.request.body
        delete release.name
        let res = (await ctx.state.db['release'].upsert({
            ...release
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
    // 删除
    @Post('/releaseDel')
    public async del(@Ctx ctx: Context) {
        const release = ctx.request.body.ids
        let res = (await ctx.state.db['release'].destroy({
            where: {
                id: (release + '').split(',')
            }
        }))
        ctx.body = {
            code: 0,
            data: res,
            message: res ? '成功' : '出错'
        }
    }
}
