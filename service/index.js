// ###############################################
// const Koa = require('koa')
// const app = new Koa()

// app.use(async(ctx)=>{
//     ctx.body = '<h1>hello Koa2</h1>'
// })

// app.listen(3000,()=>{
//     console.log('[Server] starting at port 3000')
// })

// ##################################################// async是让方法变成异步，await是等待异步方法完成。
// async function testAsync(){
//     return 'Hello async';
// }
// const result = testAsync();
// console.log(result);

// ###################################// await等待的只是一个表达式，这个表达式在官方文档里说的是Promise对象，可是它也可以接受普通值。
// function getSomething(){
//     return 'something';
// }

// async function testAsync(){
//     return 'Hello async';
// }

// async function test(){
//     const v1=await getSomething();
//     const v2=await testAsync();
//     console.log(v1,v2);
// }

// test();

// ########################################
// function takeLongTime() {
//     return new Promise(resolve => {
//         setTimeout(() => resolve("long_time_value"), 1000);
//     });
// }

// async function test() {
//     const v = await takeLongTime();
//     console.log(v);
// }

// test();

// ##########################################
const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    let url =ctx.url;
    let request =ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    ctx.body={
        url,
        req_query,
        req_querystring
    }

});

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});