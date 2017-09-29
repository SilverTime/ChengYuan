//Management/Billing
/**
 * 订单计价信息
 *

 该表中数据自动生成，允许用户修改：类型、价格、说明
 * @package Management\Object
 */
define('Billing',
    ['avalon'],
    function () {
        var obj = {

            obj: {
                BillingID: '',//计价编号  int(11) 必填:1 默认值:,
                OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                Type: '',//计价类型  tinyint(1) 必填:1 默认值:,计价类型：1时间，2里程，3次
                Money: '',//计价值  double(10,2) 必填:1 默认值:,计价说明中填写该价格的备注，
                Memo: '',//计价说明  char(250) 必填:1 默认值:,
                CTime: '',//计价时间  int(10) 必填:1 默认值:
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
                    i: "Management/Billing/bind",
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
                    i: "Management/Billing/unbind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (BillingID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Billing/get",
                    data: {
                        BillingID: BillingID
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
            gets: function (BillingIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Billing/gets",
                    data: {
                        "Management/Billing": BillingIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (BillingID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/Billing/save',
                    data: {
                        BillingID: BillingID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (BillingID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Billing/del",
                    data: {
                        "BillingID": BillingID
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
                    i: "Management/Billing/search",
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
                    i: 'Management/Billing/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_Billing'] = obj
    })