//Management/User
/**
 * 用户账户
 * 首次客户注册通过手机注册，无需绑定到企业
 由工作人员绑定到企业
 账户状态：-1禁用，1正常
 性别：1男，0女
 客户登录第一次时用手机验证码绑定到微信
 之后从微信自动登录
 若其他地方登录则手机号+短信验证码登录
 * @package Management\Object
 */
define('User',
    ['avalon'],
    function () {
        var obj = {
            obj: {
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
            /**
             * 用户注册
             * @param  Account 注册帐号
             * @param  PWD 注册密码
             * @param  Properties 其他属性
             * @return UserObject
             */
            reg: function (Account, PWD, Properties, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/reg",
                    data: {
                        Account: Account,
                        PWD: PWD,
                        Properties: Properties
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 用户登录
             * @param  Account 账户名
             * @param  PWD 账户密码
             * @return UserObject
             */
            login: function (Account, PWD, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/login",
                    data: {
                        Account: Account,
                        PWD: PWD
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 退出登录
             */
            logout: function (success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/logout",
                    data: {},
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 查找我的账户
             * @param  Account 账户名称
             * @return  {'Email':"","Phone":"",'Account':"","UID":1}
             */
            findAccount: function (Account, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/findAccount",
                    data: {
                        Account: Account
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 重置密码
             * @param  UID 用户编号
             * @param  PWD 新密码
             * @param  Code 验证码或旧密码 当用户权限为管理员时不需要Code参数，如果不是则需要提供Code验证码或者旧密码做验证
             */
            resetPWD: function (UID, PWD, Code, Account, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/resetPWD",
                    data: {
                        UID: UID,
                        PWD: PWD,
                        Code: Code,
                        Account: Account
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 检查账户是否存在
             * @param  Account 账户名称
             * @return  存在true,不存在false
             */
            checkAccount: function (Account, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/checkAccount",
                    data: {
                        Account: Account
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 自动登录
             * @param  SID 自动登录的验证字符
             * @return UserObject| 成功返回用户对象，否则返回false
             */
            reLogin: function (SID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/reLogin",
                    data: {
                        SID: SID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },
            /**
             * 发送验证码
             * @param  UID 用户名
             * @param  Type 发送方式，默认为邮件，暂时支持邮件方式
             * @return  true/false
             */
            sendVerify: function (UID,Account , Type, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/sendVerify",
                    data: {
                        UID: UID,
                        Account: Account,
                        Type: Type
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            /**
             * 通过验证码登录
             * @param  UID 用户编号，通过findMyAccount接口获取
             * @param  Account 用户验证账户
             * @param  Code 用户验证码
             * @return mixed|
             */
            loginByCode: function ( Account, Code, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/loginByCode",
                    data: {
                        //UID: UID,
                        Account: Account,
                        Code: Code
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
                    i: "Management/User/bind",
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
                    i: "Management/User/unbind",
                    data: {
                        Property: Property,
                        Data: Data,
                        PKID: PKID
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            get: function (UID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/get",
                    data: {
                        UID: UID
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
            gets: function (UIDs, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/gets",
                    data: {
                        "Management/User": UIDs,
                        "P": 1,
                        "N": 1000000
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            save: function (UID, Params, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: 'Management/User/save',
                    data: {
                        UID: UID,
                        Params: Params
                    },
                    success: configFn.success,
                    error: configFn.error
                })
            },

            del: function (UID, success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },

                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/User/del",
                    data: {
                        "UID": UID
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
                    i: "Management/User/search",
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
                    i: 'Management/User/add',
                    data: data,
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_User'] = obj
    })