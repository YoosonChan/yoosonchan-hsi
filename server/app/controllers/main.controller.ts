/**
 * 控制器就是通过class来实现的
 * 但并不是随便一个class他就能成为控制器
 */
import {Controller, Get, Ctx, Post} from 'koa-controllers'
import {Context} from 'koa'
import sequelize = require('sequelize')
import md5 = require('md5')

@Controller
export class MainController {
    // 登录
    @Post('/login')
    public async login(@Ctx ctx: Context) {
        const { eq } = sequelize.Op
        let login = ctx.request.body
        const password = md5(login.password)
        let message = ''
        let res = {}
        if(password === (await ctx.state.db['teacher'].findOne({
            attribute: ['password'],
            where: {
                id: {
                    [eq]: login.username
                }
            }
        })).toJSON().password) {
            res = (await ctx.state.db['teacher'].findByPk(login.username, {
                attribute: ['id', 'type']
            })).toJSON()
            message = '登录成功'
        } else {
            res = '密码错误'
            message = '登录失败'
        }
        ctx.body = {
            code: 0,
            data: res,
            message
        }
    }
    @Get('/test')
    public async test(@Ctx ctx: Context) {
        ctx.body = (await ctx.state.db['class'].findByPk(1)).toJSON().headmasterId
    }
 }