/*
 后台登录 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('adminLogin', [
    'avalon',
    'text!../../package/adminLogin/adminLogin.html',
    'css!../../package/adminLogin/adminLogin.css',
    '../../obj/bridge/User',
    '../../plugins/isIt/isIt.js',
    '../../plugins/Gate/Gate.js'
], function (avalon, html, css, obj) {
    var vm = avalon.define({
        $id: "adminLogin",
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
                //自动登陆
                Gate.comeIn({
                    haveLogin: function (res) {

                        if (res.d.Company.CompanyID !== '1') {
                            tip.on('请使用管理员账户登录')
                            require(['../../obj/bridge/User'],function (User) {
                                User.logout(function () {
                                    goto('#!/adminLogin/0');
                                })
                            })
                            Gate.reset()
                            return
                        }

                        // var G=res.G
                        index.uid = res.UID
                        goto('#!/OrderListAdmin/0');
                    },
                })
            }


        },
        reset: function () {
            avalon.mix(vm, {

                info: {
                    Account: '',
                    PWD: ''
                },
                flag: 0,
                count: 60,
                accountPhone: "",
                Code:"",


            })
        },
        info: {
            Account: '',
            PWD: ''
        },
        flag: 0,
        waitingCode: false,
        count: 60,
        accountPhone: "",
        Code:"",
        waitCode: function () {
            vm.waitingCode = true;
            clearInterval(vm.interval);
            vm.interval = setInterval(function () {
                vm.count--;
                if (vm.count <= 0) {
                    clearInterval(vm.interval);
                    vm.waitingCode = false;
                    vm.count=60;
                }
            }, 1000)

        },
        getInChange: function () {
            if (vm.flag == 0) {
                vm.flag = 1;
            } else {
                vm.flag = 0;
            }
        },

        getCode: function () {
            vm.waitCode();
            var data = {
                Account: '',
                Type: "Alidayu",
                UID: ""
            };
            var accountVal = document.getElementById('Phone').value;
            data.Account = vm.accountPhone;
            if (data.Account == '') {
                if (accountVal == '') {
                    tip.on("账户名或手机号码不能为空");
                    return
                } else {
                    data.Account = accountVal
                }
            }
            // if (isIt.mobile(data.Account) === false) {
            //     tip.on("请正确填写手机号");
            //     return
            // }
            obj.sendVerify(data.UID, data.Account, data.Type, function (res) {
                tip.on("短信验证码已发送，请注意接收", 1, 3000);
            }, function (err) {
                tip.on("发送失败", 0, 3000);
                console.error("ERROR :" + err);
            })
        },

        getInByMsg: function () {
            var data = {
                Account: '',
                Code: ""
            };
            var accountVal = document.getElementById('Phone').value,
            codeVal = document.getElementById('Code').value;
            data.Account = vm.accountPhone;
            data.Code = vm.Code;

            if (data.Account == '') {
                if (accountVal == '') {
                    tip.on("手机号码不能为空");
                    return
                } else {
                    data.Account = accountVal
                }
            }

            if (data.Code == '') {
                if (codeVal == '') {
                    tip.on("请输入验证码");
                    return
                } else {
                    data.Code = accountVal
                }
            }
            obj.loginByCode(data.Account, data.Code, function (res) {
                if (res.Company.CompanyID !== '1') {
                    tip.on('请使用管理员账户登录');
                    User.logout();
                    Gate.reset();
                    return
                }

                goto("#!/OrderListAdmin/0")
                cache.go(res)
                index.uid = cache.go('UID')
                cache.go('UN')
                index.un = res.Name
            }, function (err) {
                tip.on(err)
            })

        },
        login: function () {
            if (vm.flag == 0) {
                vm.loginByPWD();
            } else {
                vm.getInByMsg();
            }
        },
        loginByPWD: function () {
            var data = {
                Account: '',
                PWD: ''
            };
            var accountVal = document.getElementById('Account').value,
                PWDVal = document.getElementById('PWD').value
            avalon.mix(data, vm.info)


            if (data.Account == '') {
                if (accountVal == '') {
                    tip.on("用户名不能为空")
                    return
                } else {
                    data.Account = accountVal
                }
            }
            if (data.PWD == "") {
                if (PWDVal == '') {
                    tip.on("密码不能为空")
                    return
                } else {
                    data.PWD = PWDVal
                }
            }


            obj.login(data.Account, data.PWD, function (res) {
                if (res.Company.CompanyID !== '1') {
                    tip.on('请使用管理员账户登录')
                    obj.logout(function () {
                        goto('#!/adminLogin/0');
                    })
                    Gate.reset()
                    return
                }

                goto("#!/OrderListAdmin/0")
                cache.go(res)
                index.uid = cache.go('UID')
                cache.go('UN')
                index.un = res.Name
            }, function (err) {
                tip.on(err)
            })

        }

    })
    return window[vm.$id] = vm
})