/**
 * Created by mooshroom on 2016/2/1.
 * 订单行程
 * 行程类型有 1起点，2中转点，3终点。
用户在下单时要可以无限添加路径并可选填写路径时间
路径时间的意思是到达该路径点的时间要求

 */
define('Router',
    ['avalon'],
    function () {
        var obj={
            add: function (data,callback) {
                var configFn={
                    success: function () {},
                    error: function (err) {tip.on(err)}
                }
                avalon.mix(configFn,callback)
                $$.call({
                    i:"Management/Router/add",
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            },
            save: function (ID,Params,callback) {
                var configFn={
                    success: function () {},
                    error: function (err) {tip.on(err)}
                }
                avalon.mix(configFn,callback)
                $$.call({
                    i:"Management/Router/save",
                    data:{
                        "RouteID":ID,
                        "Params":Params
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            get: function (ID,callback) {
                var configFn={
                    success: function () {},
                    error: function (err) {tip.on(err)}
                }
                avalon.mix(configFn,callback)
                $$.call({
                    i:"Management/Router/get",
                    data:{
                        "RouteID":ID
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            gets: function (IDs,callback) {
                var configFn={
                    success: function () {},
                    error: function (err) {tip.on(err)}
                }
                avalon.mix(configFn,callback)
                $$.call({
                    i:"Management/Router/gets",
                    data:{
                        "RouteIDs":IDs,
                        "P":1,
                        "N":1000000
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },
            search: function (data,callback) {
                var configFn={
                    success: function () {},
                    error: function (err) {tip.on(err)}
                }
                avalon.mix(configFn,callback)
                $$.call({
                    i:"Management/Router/search",
                    data:data,
                    success:configFn.success,
                    error:configFn.error
                })
            },
            del: function (id,callback) {
                var configFn={
                    success: function () {},
                    error: function (err) {tip.on(err)}
                }
                avalon.mix(configFn,callback)
                $$.call({
                    i:"Management/Router/del",
                    data:{
                        "RouteID":id
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },

        }
        return window['obj_Management_Router']=obj
    })