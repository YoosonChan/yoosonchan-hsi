import { Controller, Get, Ctx, Post } from 'koa-controllers'
import { Context } from 'koa'
import sequelize = require('sequelize')

@Controller
export class ClassController {
    // 获取表格列表
    @Get('/class')
    public async list(@Ctx ctx: Context) {
        const { like } = sequelize.Op
        const name = ctx.query.name
        const { eq } = sequelize.Op
        let classList = (await ctx.state.db['class'].findAll({
            include: [
                {
                    model: ctx.state.db['course'],
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.state.db['teacher'],
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
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                name: {
                    [like]: '%' + (name ? name : '') + '%'
                }
            }
        })).map((entry: any) => entry.toJSON())
        classList = classList.reduce((memo: any[], cur: any, index: number) => {
            memo[index] = {
                ...cur,
                courses: cur.courses.filter((c: any) => c.id > 1).map((c: any) => { return { id: c.id, name: c.name } }),
                headmaster: cur.teachers.filter((t: any) => t.id === cur.headmasterId).map((h: any) => { return { id: h.id, name: h.name } }),
                teachers: cur.teachers.map((t: any) => { return { id: t.id, name: t.name } }),
                termId: cur.terms[0].id
            }
            delete memo[index].headmasterId
            delete memo[index].terms
            return memo
        }, [])
        ctx.body = {
            code: 0,
            data: classList,
            message: '获取成功'
        }
    }
    @Get('/classList')
    public async classList(@Ctx ctx: Context) {
        let classList = (await ctx.state.db['class'].findAll({
            attributes: ['id', 'name']
        })).map((entry: any) => entry.toJSON())
        ctx.body = {
            code: 0,
            data: classList,
            message: '获取成功'
        }
    }
    // 微信小程序
    @Get('/classListmp')
    public async classListmp(@Ctx ctx: Context) {
        const { eq } = sequelize.Op
        const id = ctx.request.query.teacherId
        let res = (await ctx.state.db['courseInfo'].findAll({
            attributes: ['id'],
            include: [{
                model: ctx.state.db['class'],
                attributes: ['id', 'name']
            }],
            where: {
                teacherId: {
                    [eq]: id
                }
            }
        })).map((entry: any) => entry.toJSON())
        res = res.map((c: any) => c.class)
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
    // 增加或更新
    @Post('/classNew')
    public async upsert(@Ctx ctx: Context) {
        const { eq } = sequelize.Op
        const classes = ctx.request.body
        let termId = (await ctx.state.db['term'].findOne({
            attributes: ['id'],
            where: {
                status: {
                    [eq]: 1
                }
            }
        })).toJSON().id
        let res = false
        if (await ctx.state.db['class'].upsert({
            id: classes.id,
            name: classes.name,
            headmasterId: classes.headmasterId
        })) {
            try {
                let classId = (await ctx.state.db['class'].findOne({
                    attributes: ['id'],
                    where: {
                        name: {
                            [eq]: classes.name
                        },
                        headmasterId: {
                            [eq]: classes.headmasterId
                        }
                    }
                })).toJSON().id
                console.log(classId);
                (classes.teacherIds + '').split(',').forEach((cls: any) => {
                    (classes.courseIds + '').split(',').forEach(async (c: any) => {
                        await ctx.state.db['courseInfo'].upsert({
                            teacherId: cls,
                            courseId: c,
                            termId,
                            classId
                        })
                    })
                })
                res = true
            } catch (err) {
                console.log(err)
                ctx.state.db['class'].destroy({
                    where: {
                        name: {
                            [eq]: classes.name
                        },
                        headmasterId: {
                            [eq]: classes.headmasterId
                        }
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
    @Post('/classDel')
    public async del(@Ctx ctx: Context) {
        const classes = ctx.request.body.ids
        let res = false
        try {
            await ctx.state.db['courseInfo'].destroy({
                where: {
                    classId: (classes + '').split(',')
                }
            })
            await ctx.state.db['release'].destroy({
                where: {
                    classId: (classes + '').split(',')
                }
            })
            await ctx.state.db['class'].destroy({
                where: {
                    id: (classes + '').split(',')
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
}
