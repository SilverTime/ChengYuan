//Management/Order
/**
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
 * @package Management\Object
 */
define('Order',
    ['avalon'],
    function () {
        var obj = {
            obj: {
                OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                FromID: '',//订单来源 微信、电话; tinyint(1) 必填: 默认值:,
                Longitude: '',//下单纬度  double(15,3) 必填: 默认值:,
                Latitude: '',//下单经度  double(15,3) 必填: 默认值:,
                CTime: '',//下单时间  int(10) 必填:1 默认值:,
                CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                CUID: '',//下单人编号  int(11) 必填:1 默认值:,
                Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                Name: '',//用车人 默认为下单人姓名 char(50) 必填:1 默认值:,
                Time: '',//用车时间  int(10) 必填:1 默认值:,
                CarAmount: '',//需求数量  int(11) 必填:1 默认值:,
                CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
                Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
                SnapSendTime: '',//抢单发布时间  int(10) 必填:1 默认值:,
                Status: '',//订单状态 已下单，3待抢单;已下单，待派单;抢单成功，1等待审核;2审核成功;指派成功; tinyint(1) 必填: 默认值:,
                SnapDriverID: '',//抢单司机编号  int(11) 必填:1 默认值:,
                SnapTime: '',//抢单时间  int(10) 必填:1 默认值:,
                SnapJudgeUID: '',//抢单审核人  int(11) 必填:1 默认值:,
                SnapJudgeTime: '',//抢单审核时间  int(10) 必填:1 默认值:,
                SnapJudteResult: '',//抢单审核结果  tinyint(1) 必填: 默认值:,
                AssignUID: '',//指派人  int(11) 必填:1 默认值:,
                AssignTime: '',//指派时间  int(10) 必填:1 默认值:,
                AssignDriverID: '',//指派司机编号  int(11) 必填:1 默认值:,
                StartTime: '',//行程开始时间  int(10) 必填:1 默认值:,
                EndTime: '',//行程结束时间  int(10) 必填:1 默认值:,
                Money: '',//行程费用  double(10,2) 必填: 默认值:,
                Evaluate: '',//服务评价  varchar(1000) 必填: 默认值:,
                Mileage: '',//里程数  double(10,2) 必填: 默认值:,
                PayTime: '',//订单结算时间  int(10) 必填:1 默认值:,
                Reason: '',//出行原因  varchar(1000) 必填: 默认值:,
                Type: '',//订单类型：1短途、2长途、3接机、4包车 tinyint(1) 必填:1 默认值:,
                Push: '',//发送推送 0不发送，1发送 tinyint(1) 必填:1 默认值:1,
                OtherMemo: '',//其他要求  varchar(1000) 必填: 默认值:,
                Billings: [
                    {
                        BillingID: '',//计价编号  int(11) 必填:1 默认值:,
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        Type: '',//计价类型  tinyint(1) 必填:1 默认值:,
                        Money: '',//计价值  double(10,2) 必填:1 默认值:,
                        Memo: '',//计价说明  char(250) 必填:1 默认值:,
                        CTime: '',//计价时间  int(10) 必填:1 默认值:
                    }
                ],
                Routers: [
                    {
                        RouteID: '',//行程编号  int(11) 必填:1 默认值:,
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        Address: '',//行程点  char(50) 必填:1 默认值:,
                        Time: '',//预期时间  int(10) 必填:1 默认值:,
                        TypeID: '',//行程类型 起点，中转，终点 tinyint(1) 必填:1 默认值:
                    }
                ],
                Statuses: [
                    {
                        StatusID: '',//状态编号  int(11) 必填:1 默认值:,
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        Status: '',//状态码  tinyint(1) 必填:1 默认值:,
                        Memo: '',//状态备注  varchar(1000) 必填:1 默认值:,
                        CTime: '',//状态时间  int(10) 必填:1 默认值:,
                        CUID: '',//状态人  int(11) 必填:1 默认值:
                    }
                ],
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
                },
                Creator: {
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
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                },
                SnapJudgeUser: {
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
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                },
                Assignor: {
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
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                }
            },
            /**
             * 开始行程
             * @param  OrderID
             * @param StartTime
             */

            beginRoute:function(OrderID,StartTime,success, error){
                var configFn = {
                    success: success ? success : function () {
                        },
                    error: error ? error : function (err) {
                            tip.on(err)
                        }
                }

                $$.call({
                    i: "Management/Order/beginRoute",
                    data: {
                        OrderID: OrderID,
                        StartTime:StartTime
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            /**
             * 结束订单
             * @param  OrderID
             * @param double Mileage
             */
            finish: function (OrderID, Mileage,EndTime, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/finish",
                    data: {
                        OrderID: OrderID,
                        Mileage: Mileage,
                        EndTime:EndTime
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 审核订单，指派或发起抢单请求时应该自动调用该接口
             * @param  OrderID 订单编号
             * @param  Pass 是否审核通过，1通过0不通过，或者true/false
             */
            judge: function (OrderID, Pass, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/judge",
                    data: {
                        OrderID: OrderID,
                        Pass: Pass
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 指派.
             * @param OrderID
             * @param DriverID
             */
            assign: function (OrderID, AssignDriverID,AssignCarID,Pass, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/assign",
                    data: {
                        OrderID: OrderID,
                        AssignDriverID: AssignDriverID,
                        AssignCarID: AssignCarID,
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 发起抢单命令
             * @param OrderID
             */
            beginSnap: function (OrderID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/beginSnap",
                    data: {
                        OrderID: OrderID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 司机抢单接口
             * @param  OrderID
             * @param  SnapDriverID 司机编号
             */
            snap: function (OrderID, SnapDriverID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/snap",
                    data: {
                        OrderID: OrderID,
                        SnapDriverID: SnapDriverID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            /**
             * 审核抢单结果，完成后调用指派接口
             * @param OrderID
             * @param  Pass
             */
            judgeSnap: function (OrderID, Pass, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/judgeSnap",
                    data: {
                        OrderID: OrderID,
                        Pass: Pass
                    },
                    success: configFn.success,
                    error: configFn.error
                })
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
                    i: "Management/Order/bind",
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
                    i: "Management/Order/unbind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (OrderID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/get",
                    data: {
                        OrderID: OrderID
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
            gets: function (OrderIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/gets",
                    data: {
                        "Management/Order": OrderIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (OrderID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/Order/save',
                    data: {
                        OrderID: OrderID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (OrderID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Order/del",
                    data: {
                        "OrderID": OrderID
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
                    i: "Management/Order/search",
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
                    i: 'Management/Order/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_Order'] = obj
    })