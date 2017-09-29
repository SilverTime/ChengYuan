/**
 * Created by mooshroom on 2016/2/1.
 * 司机车辆
 * 一个司机可以有权驾驶多个车辆，
一个车辆也可以被多个司机驾驶

 */
define('DriverCarLink',
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
                    i:"Management/DriverCarLink/add",
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
                    i:"Management/DriverCarLink/save",
                    data:{
                        "LID":ID,
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
                    i:"Management/DriverCarLink/get",
                    data:{
                        "LID":ID
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
                    i:"Management/DriverCarLink/gets",
                    data:{
                        "LIDs":IDs,
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
                    i:"Management/DriverCarLink/search",
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
                    i:"Management/DriverCarLink/del",
                    data:{
                        "LID":id
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },

        }
        return window['obj_Management_DriverCarLink']=obj
    })