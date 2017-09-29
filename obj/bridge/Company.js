//Management/Company
/**
 * 客户企业信息
 * 设定企业欠款提醒额度，达到额度规定的做出提示。
 结算方式为线下手工结算。
 在订单管理中按条件筛选后批量结算。
 所有账号必须归属企业，
 企业类型分：1客户企业，2管理企业，3司机所在企业
 里程单价和时长单价只针对短途有效
 * @package Management\Object
 */
define('Company',
    ['avalon'],
    function () {
        var obj = {

            obj: {
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
                Phone: '',//联系人电话  char(50) 必填: 默认值:,
                Users: [
                    {
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
                ]
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
                    i: "Management/Company/bind",
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
                    i: "Management/Company/unbind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (CompanyID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Company/get",
                    data: {
                        CompanyID: CompanyID
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
            gets: function (CompanyIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Company/gets",
                    data: {
                        "Management/Company": CompanyIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (CompanyID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/Company/save',
                    data: {
                        CompanyID: CompanyID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (CompanyID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Company/del",
                    data: {
                        "CompanyID": CompanyID
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
                    i: "Management/Company/search",
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
                    i: 'Management/Company/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_Company'] = obj
    })