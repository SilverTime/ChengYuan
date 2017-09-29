/*
 后台客户编辑 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('UserEditAdmin', [
    'avalon',
    'text!../../package/UserEditAdmin/UserEditAdmin.html',
    'css!../../package/UserEditAdmin/UserEditAdmin.css',
    '../../lib/find/find',
    '../../plugins/isIt/isIt'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "UserEditAdmin",
        ready: function (i) {

            var obj = 'User'
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset()
                pop.open(html)
                //index.html=html

                //以及其他方法
                /*
                 * 如果i为0则为添加
                 * 如果i大于0为编辑，i为id
                 * */

                if (i > 0) {
                    //为编辑
                    vm.PopPanelName = "编辑客户"
                    vm.status = 1
                    vm.ID = i
                    vm.getDetails(i)
                    return
                }

                //否则为add
                vm.PopPanelName = "添加客户"
                vm.status = 0
                vm.addInit()
            }


        },
        reset: function () {
            avalon.mix(vm, {
                status: '',
                ID: "",
                PopPanelName: "",
                details: {
                    //UID: "",
                    Phone: "",
                    Account: "",
                    PWD: "",
                    //CTime: "",
                    //CIP: "",
                    //CType: "",
                    Name: "",
                    CompanyID: "",
                    Status: "",
                    Sex: "",
                    Post:"",
                    //OpenID: "",
                },
            })
        },
        addInit: function () {
            //todo 添加重置新增后台客户编辑的操作
        },
        status: '',
        ID: "",
        PopPanelName: "",
        getDetails: function (id) {
            var obj = "User"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(id, {
                    success: function (res) {
                        vm.details = res;
                        vm.details.Status = res.Status;
                        UEACInput.Keywords = res.Company.Title;
                        //UEAStatus.nowVal = res.Status;
                        if (res.Status == -1) {
                            UEAStatus.nowSide = 'right'
                        } else if (res.Status == 1) {
                            UEAStatus.nowSide = 'left'
                        }

                    }
                })
            })
        },
        details: {
            //UID: "",
            Phone: "",
            Account: "",
            PWD: "",
            //CTime: "",
            //CIP: "",
            //CType: "",
            Name: "",
            CompanyID: "",
            Status: "",
            Sex: "",
            Post:"",
            //OpenID: "",
            VID:"",//客户编号字段、司机编号，人工输入(通常以V网小号为准) 詹伟 2017-04-21
        },

        add: function () {
            if (vm.details.Name === "") {
                tip.on("用户名不能为空哦！", 0, 3000);
                return false;
            }
            // if (vm.details.VID === "") {
            //     tip.on("编号不能为空哦！", 0, 3000);
            //     return false;
            // }
            if (vm.details.Account === "") {
                tip.on("账户名不能为空哦！", 0, 3000);
                return false;
            }
            if (vm.details.Phone === "") {
                tip.on("请输入您的手机号！", 0, 3000);
                return false;
            }
            if (vm.details.PWD === "") {
                tip.on("密码不能为空哦！", 0, 3000);
                return false;
            }
            if (vm.details.CompanyID === "") {
                tip.on("企业不能为空哦！", 0, 3000);
                return false;
            }

            if (isIt.mobile(vm.details.Phone) === false) {
                return false;
            }


            var data = {}, datasave = {};
            //加载基础数据
            data = {
                Phone: vm.details.Phone,
                Name: vm.details.Name,
                CompanyID: vm.details.CompanyID,
                Status: vm.details.Status,
                Sex: vm.details.Sex,
                Post:vm.details.Post,
                VID:vm.details.VID,
            };
            var obj = "User";


            if (vm.status == 1) {
                //调用保存方法
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.save(vm.ID, data, {
                        success: function (res) {
                            tip.on('后台客户编辑保存成功', 1);
                            pop.close();

                            //更新条目
                            require(['../../package/UserListAdmin/UserListAdmin'], function (pack) {
                                ForEach(pack.list, function (el, index) {
                                    if (el.UID == res.UID) {
                                        avalon.mix(el, res)
                                    }
                                })
                            })
                        }
                    })
                })

                return
            }
            // 新建时才保存密码
            if (isIt.pwd(vm.details.PWD) === false) {
                return false;
            }
            //检测账户
            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                obj.checkAccount(vm.details.Account,
                    function (res) {
                        if (res == true) {
                            tip.on("账户" + vm.details.Account + "已存在");
                            return false;
                        }
                    },
                    function (f) {
                        console.warn(f);
                        // tip.on("账户" + vm.details.Account + "已存在");
                        // return false;
                        //false为该账户不存在，继续之后的逻辑
                        // return false;
                    }
                )
            })
            //发送数据

            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                obj.reg(vm.details.Account, vm.details.PWD, data, function (res) {
                    tip.on('客户创建成功', 1, 3000);
                    pop.close();
                    //重新获取列表
                    require(['../../package/UserListAdmin/UserListAdmin'], function (pack) {
                        pack.search(pack.P)
                    })

                }, function (error) {
                    console.warn(error);
                })
            })
        },
        //删除
        del: function () {
            if (confirm('删除该客户信息后将不可恢复，确定删除？')) {
                var obj = "User";
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.del(vm.ID, {
                        success: function (res) {
                            tip.on('删除成功', 1)
                            pop.close()

                            //重新获取列表
                            require(['../../package/UserListAdmin/UserListAdmin'], function (pack) {
                                pack.search(pack.P)
                            })
                        }
                    })
                })
            }
        }

        ,
        $optUserStatus: {
            id: "UEAStatus",
            nowVal: '1',
            left: {
                label: "启用",
                value: "1"
            }
            ,
            right: {
                label: "禁用",
                value: "-1"
            }
            ,
            callback: function (value, id, v) {
                vm.details.Status = value
            }
        }
        ,
        //企业动态搜索
        $optFindCompany: {
            callback: function (res) {
                vm.details.CompanyID = res.CompanyID
            }
            ,
            onInput: function () {
                vm.details.CompanyID = ''
            }
            ,
            target: "Company",
            keyName: 'Title',
            placeholder: "搜索企业"
        }
        ,

    })
    return window[vm.$id] = vm
})