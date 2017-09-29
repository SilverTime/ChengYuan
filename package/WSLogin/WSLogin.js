/*
 用户绑定 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
 */
define('WSLogin', [
    'avalon',
    'text!../../package/WSLogin/WSLogin.html',
    'css!../../package/WSLogin/WSLogin.css',
    '../../plugins/isIt/isIt.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "WSLogin",
        ready: function (i) {
            var obj = ''
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset()
                index.html = html

                //以及其他方法
                vm.state = i
            }


        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
            })
        },


        //切换登录与注册:0为用户注册,1为教练员登录
        state: 0,

        //用户注册
        reg: function () {
            /*
             * * 验证码注册接口 Management/User/regCode
             * @param string $Account 账户名
             * @param string $PWD 密码
             * @param array $Properties 用户属性
             * @param string $Code 验证码
             * */
            //验证手机号码
            if (vm.Phone == '') {
                tip.on('还没有填入手机号码')
                return
            }
            if (String(vm.Phone).length != 11) {
                tip.on('手机号码格式错误')
                return
            }
            //验证验证码
            if (vm.Verify == '') {
                tip.on('请填写短信验证码')
                return
            }
            //验证姓名
            if (vm.Name == '') {
                tip.on('请填写姓名')
                return
            }

            //执行请求
            var data = {
                Account: vm.Phone,
                PWD: String(vm.Phone).slice(3, 11),
                Code: vm.Verify,
                Properties: {
                    Phone: vm.Phone,
                    Name: vm.Name,
                    CompanyID: 3,
                    OpenID:cache.go('Openid'),
                }
            }

            //拉取openID
            var OpenID = cache.go('OpenID')
            if (typeof OpenID == 'string' && OpenID.length > 0) {
                data.Properties.OpenID = OpenID
            }

            $$.call({
                i: "Management/User/regCode",
                data: data,
                success: function (res) {
                    cache.go({'UID': res.UID});
                    cache.go({'CompanyID': res.CompanyID});
                    Gate.locked = true;//门禁状态
                    Gate.logined = false;//用户登录状态
                    vm.jumpBack(0)
                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },

        //验证账户名是否重复
        checkAccount: function (account, notAccount, hasAccount) {
            require(['../../obj/bridge/User'], function (obj) {
                obj.checkAccount(account, function (res) {
                    if (!res) {
                        notAccount();
                        return
                    }
                    hasAccount()
                }, function (err) {
                    tip.on(err);
                    notAccount()
                })
            })
        },


        //司机登录所需
        Phone: '',
        Verify: '',
        Name: '',
        //发送验证码

        /*
         * Management/User/sendVerify
         *
         *   Type字段参数为 Alidayu ，

         UID为用户编号

         Address为用户手机号。
         * */

        sendVerify: function () {
            //验证手机号码
            if (vm.Phone == '') {
                tip.on('还没有填入手机号码')
                return
            }
            if (String(vm.Phone).length != 11) {
                tip.on('手机号码格式错误')
                return
            }

            //验证账户是否存在

            function send() {
                //发送验证码
                $$.call({
                    i: "Management/User/sendVerify",
                    data: {
                        Account: vm.Phone
                    },
                    success: function (res) {
                        if (!res) {
                            tip.on('发送验证码失败,请稍后重试')
                            return
                        }
                        vm.setVerTimeout()
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })
            }

            function dontSend() {
                top.on('该手机号尚未注册')
            }

            if (vm.state == 0) {
                //注册，没有账户才发起
                vm.checkAccount(vm.Phone, send, function () {
                    tip.on('手机号已注册，如果您是司机请直接登录')
                })
            } else {
                //绑定，有账户才发起
                vm.checkAccount(vm.Phone, function () {
                    tip.on('手机号未注册')
                }, send)
            }


        },

        //重新发送的延迟
        verTimeout: 0,
        setVerTimeout: function () {
            vm.verTimeout = 90
            var o = setInterval(function () {
                vm.verTimeout--
                if (vm.verTimeout <= 0) {
                    clearInterval(o)
                }
            }, 1000)
        },

        //司机登录
        driverLogin: function () {
            //验证手机号码
            if (vm.Phone == '') {
                tip.on('还没有填入手机号码')
                return
            }
            if (String(vm.Phone).length != 11) {
                tip.on('手机号码格式错误')
                return
            }
            //验证验证码
            if (vm.Verify == '') {
                tip.on('请填写短信验证码')
                return
            }

            //TODO 司机登录
            require(['../../obj/bridge/User'], function (user) {
                user.loginByCode(vm.Phone, vm.Verify,
                    function (res) {
                        //检查账户是否满足绑定要求
                        if (res.OpenID != '') {
                            tip.on('您的账户已经绑定了其他的微信号，如果需要换号请联系管理员')
                            User.logout()
                            return
                        }
                        if (res.Company.CompanyID != 2) {
                            tip.on('您的账户不是司机账户')
                            User.logout()
                            return
                        }

                        //正常使用的：
                        vm.driverBind()
                    },
                    function (err) {
                        tip.on(err)
                    }
                )
            })
        },

        //司机绑定
        driverBind: function () {
            $$.call({
                i: "User/bindByWechat",
                data: {
                    OpenID: cache.go('Openid'),
                },
                success: function (res) {
                    vm.jumpBack(1)
                },
                error: function (err) {
                    tip.on('微信号绑定失败：' + err + ',请尝试重新登录')
                    require(['../../obj/bridge/User'], function (user) {
                        user.logout()
                    })
                }
            })
        },

        //跳转之前访问的页面
        jumpBack: function (role) {

            Gate.reset()
            if (role == 1) {
                goto('#!/DriverCenter/0');
            } else {
                goto('#!/CusCenter/0');
            }


        }


    })
    return window[vm.$id] = vm
})