import * as Koa from 'koa'
import * as Koa2Cors from 'koa2-cors'
import { useControllers } from 'koa-controllers'
import * as KoaBodyparser from 'koa-bodyparser'
import db from './models'

let app = new Koa() 
app.use(Koa2Cors())
app.use(KoaBodyparser())
app.use(async (ctx: Koa.Context, next) => {
    // 把db对象挂载state上
    ctx.state.db = db
    await next()
})
useControllers(app, __dirname + '/controllers/**/*.controller.js', {
    multipart: {
        dest: './uploads'
    }
})
app.listen(8888)