/**
 * Created by mooshroom on 2016/2/1.
 * 车辆库
 * 所有车辆全部登记在此，
车辆状态：1空闲、-1维修、2出行、-2不可用
 */
define('Cars',
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
                    i:"Management/Cars/add",
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
                    i:"Management/Cars/save",
                    data:{
                        "CarID":ID,
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
                    i:"Management/Cars/get",
                    data:{
                        "CarID":ID
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
                    i:"Management/Cars/gets",
                    data:{
                        "CarIDs":IDs,
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
                    i:"Management/Cars/search",
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
                    i:"Management/Cars/del",
                    data:{
                        "CarID":id
                    },
                    success:configFn.success,
                    error:configFn.error
                })
            },

        }
        return window['obj_Management_Cars']=obj
    })