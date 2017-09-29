/**
 * Created by mooshroom on 2016/2/1.
 * 订单状态
 * 当订单状态变更时存储变更情况
 */
define('OrderStatus',
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
                    i:"Management/OrderStatus/add",
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
                    i:"Management/OrderStatus/save",
                    data:{
                        "StatusID":ID,
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
                    i:"Management/OrderStatus/get",
                    data:{
                        "StatusID":ID
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
                    i:"Management/OrderStatus/gets",
                    data:{
                        "StatusIDs":IDs,
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
                    i:"Management/OrderStatus/search",
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
                    i:"Management/OrderStatus/del",
                    data:{
                        "StatusID":id
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },

        }
        return window['obj_Management_OrderStatus']=obj
    })