//Management/Drivers
/**
 * 司机信息
 * 一个司机能有多个车型
 司机状态：1在线、-1离线、2行程中。
 行程中司机无法抢单但可以接受指派订单
 * @package Management\Object
 */
define('Drivers',
    ['avalon'],
    function () {
        var obj = {

            obj: {
                DriverID: '',//司机编号  int(11) 必填:1 默认值:,
                UID: '',//用户编号  int(11) 必填:1 默认值:,
                SnapAmount: '',//抢单数  int(11) 必填:1 默认值:,
                AccessAmount: '',//接单数  int(11) 必填:1 默认值:,
                SumMoney: '',//总提款  double(10,2) 必填:1 默认值:,
                Debt: '',//应提款  double(10,2) 必填:1 默认值:,
                Status: '',//司机状态 在线、离线、行程中。;行程中司机无法抢单但可以接受指派订单; tinyint(1) 必填:1 默认值:1,
                Cars: [{
                    CarID: '',//车辆编号  int(11) 必填:1 默认值:,
                    Title: '',//车型  char(50) 必填:1 默认值:,
                    Number: '',//车牌号  char(50) 必填:1 默认值:,
                    Color: '',//颜色  char(50) 必填:1 默认值:,
                    Status: '',//车辆状态  tinyint(1) 必填:1 默认值:1
                }],
                User:{
                    UID: '',//用户编号  int(11) 必填:1 默认值:,
                    Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                    Account: '',//账户名  char(50) 必填:1 默认值:,
                    PWD: '',//账户密码  char(250) 必填:1 默认值:,
                    CTime: '',//注册时间  int(10) 必填:1 默认值:,
                    CIP: '',//注册地址  int(11) 必填:1 默认值:,
                    CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                    Name: '',//姓名  char(50) 必填: 默认值:,
                    CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                    Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                    Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                    OpenID: '',//微信openid  char(50) 必填: 默认值:,
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:,
                    Company: {
                        CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                        Address: '',//企业地址  char(250) 必填:1 默认值:,
                        Contactor: '',//企业联系人  char(50) 必填:1 默认值:,
                        Title: '',//企业名称  char(50) 必填:1 默认值:,
                        CTime: '',//企业添加时间  int(10) 必填:1 默认值:,
                        Sum: '',//企业总计消费  double(10,2) 必填:1 默认值:,
                        Debt: '',//企业欠款  double(10,2) 必填:1 默认值:,
                        CUID: '',//企业添加人  int(11) 必填:1 默认值:,
                        Type: '',//企业类型  tinyint(1) 必填:1 默认值:1,
                        PerMileage: '',//里程单价  double(10,2) 必填: 默认值:,
                        PerHour: '',//时长单价  double(10,2) 必填: 默认值:,
                        Phone: '',//联系人电话  char(50) 必填: 默认值:
                    }
                },
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
                    i: "Management/Drivers/bind",
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
                    i: "Management/Drivers/unbind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (DriverID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Drivers/get",
                    data: {
                        DriverID: DriverID
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
            gets: function (DriverIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Drivers/gets",
                    data: {
                        "Management/Drivers": DriverIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (DriverID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/Drivers/save',
                    data: {
                        DriverID: DriverID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (DriverID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Drivers/del",
                    data: {
                        "DriverID": DriverID
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
                    i: "Management/Drivers/search",
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
                    i: 'Management/Drivers/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_Drivers'] = obj
    })