/**
 * Created by mooshroom on 2016/2/1.
 * 订单
 * 订单来源：1微信、2人工(电话或其他方式)
事由由管理员手工录入
超过100公里算长途，自动计价，允许修改
抢单由管理人员发出，自动发送给拥有目标车型的司机账号
抢单成功后有管理员审核通过后通知司机和乘客及下单人
下单人和乘车人可能不一致
订单归属企业默认为下单人所在企业，管理员可更改归属企业。
订单类型：1短途、2长途、3接机、4包车
成功指派司机后允许修改指派司机
 */
define('Order',
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
                    i:"Management/Order/add",
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
                    i:"Management/Order/save",
                    data:{
                        "OrderID":ID,
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
                    i:"Management/Order/get",
                    data:{
                        "OrderID":ID
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
                    i:"Management/Order/gets",
                    data:{
                        "OrderIDs":IDs,
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
                    i:"Management/Order/search",
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
                    i:"Management/Order/del",
                    data:{
                        "OrderID":id
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },

        }
        return window['obj_Management_Order']=obj
    })