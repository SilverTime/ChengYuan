//Management/Cars
/**
 * 车辆库
 * 所有车辆全部登记在此，
 车辆状态：1空闲、-1维修、2出行、-2不可用
 * @package Management\Object
 */
define('Cars',
    ['avalon'],
    function () {
        var obj = {

            obj: {
                CarID: '',//车辆编号  int(11) 必填:1 默认值:,
                Title: '',//车型  char(50) 必填:1 默认值:,
                Number: '',//车牌号  char(50) 必填:1 默认值:,
                Color: '',//颜色  char(50) 必填:1 默认值:,
                Status: '',//车辆状态  tinyint(1) 必填:1 默认值:1
            },
            /**
             * 绑定多对多属性到关联表
             * @param  Property 属性名称
             * @param  Data 绑定数据
             * @param  PKID 主键ID
             * @return ||mixed
             */
            bind: function (Property, Data, PKID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Cars/bind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },


            /**
             * 解除绑定多对多属性到关联表
             * @param  Property 属性名称
             * @param  Data 绑定数据
             * @param  PKID 主键ID
             * @return ||mixed
             */
            unbind: function (Property, Data, PKID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Cars/unbind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (CarID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Cars/get",
                    data: {
                        CarID: CarID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 获取对象的列表
             * @param  IDs 参数为各自对象的主键 此处不做限制
             * @param  Properties 限定取出属性范围
             * @return |
             */
            gets: function (CarIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Cars/gets",
                    data: {
                        "Management/Cars": CarIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (CarID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/Cars/save',
                    data: {
                        CarID: CarID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (CarID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Cars/del",
                    data: {
                        "CarID": CarID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            search: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Cars/search",
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            },

            add: function (data, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/Cars/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_Cars'] = obj
    })