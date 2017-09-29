/*
 后台司机编辑 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('DriverEditAdmin', [
    'avalon',
    'text!../../package/DriverEditAdmin/DriverEditAdmin.html',
    'css!../../package/DriverEditAdmin/DriverEditAdmin.css',
    '../../lib/find/find',
    '../../plugins/isIt/isIt',
    '../../lib/switch/switch'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "DriverEditAdmin",
        ready: function (i, uid) {

            var obj = 'Drivers'
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
                    vm.PopPanelName = "编辑司机";
                    vm.status = 1
                    vm.ID = i
                    vm.UID = uid;
                    vm.getDetails(i)
                    return
                }

                //否则为add
                vm.status = 0
                vm.PopPanelName = "添加司机"
                vm.addInit()
            }
        },
        reset: function () {
            avalon.mix(vm, {
                status: '',
                ID: "",
                UID: "",
                PopPanelName: "",
                details: {
                    User: {
                        Phone: "",
                        Account: "",
                        PWD: "",
                        Name: "",
                        Status: "1",
                        Sex: "0",
                        CompanyID: "2",     //CompanyID设为2，默认的企业
                    },
                },
                bindedCars: [],
                cars: [],
            })
        },
        addInit: function () {
            vm.addCarInput(1)
        },
        status: '',
        ID: "",
        UID: "",
        PopPanelName: "",
        getCompanyInfo: function () {

        },
        getDetails: function (id) {
            var obj = "Drivers"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(id, {
                    success: function (res) {
                        vm.details = res

                        // UEACInput.Keywords = res.User.Company.Title;

                        vm.bindedCars = res.Cars

                        DS_switch.toggle(res.User.Status)
                    }
                })
            })
        },
        details: {
            User: {
                Phone: "",
                Account: "",
                PWD: "",
                Name: "",
                Status: "1",
                Sex: "0",
                CompanyID: "2",
                VID:"",
            },
        },
        $optDriverStatus: {
            id:"DS_switch",
            nowVal: '1',
            left: {
                label: "启用",
                value: "1"
            },
            right: {
                label: "禁用",
                value: "-1"
            },
            callback: function (value) {
                vm.details.User.Status = value
            }
        },
        // //企业动态搜索
        // $optFindCompany: {
        //     callback: function (res) {
        //         vm.details.User.CompanyID = res.CompanyID
        //     },
        //     onInput: function () {
        //         vm.details.CompanyID = ''
        //     },
        //     target: "Company",
        //     keyName: 'Title',
        //     placeholder: "搜索企业"
        // },

        flag: false,
        add: function () {
            //todo 整合数据
            var data = {}, datasave = {};
            //加载基础数据
            data = {
                User: {
                    Account: vm.details.User.Account,
                    PWD: vm.details.User.PWD,
                    Phone: vm.details.User.Phone,
                    Name: vm.details.User.Name,
                    Status: vm.details.User.Status,
                    Sex: vm.details.User.Sex,
                    CompanyID: vm.details.User.CompanyID,
                    VID:vm.details.User.VID
                }
            };
            datasave = {
                Phone: vm.details.User.Phone,
                Name: vm.details.User.Name,
                Status: vm.details.User.Status,
                Sex: vm.details.User.Sex,
                VID:vm.details.User.VID
            }


            if (vm.details.User.Account === "") {
                document.getElementById('account').focus();
                tip.on("账户不能为空");
                return
            }
            if (vm.details.User.Name === "") {
                document.getElementById('name').focus();
                tip.on("姓名不能为空");
                return
            }
            if (vm.details.User.Phone === "") {
                document.getElementById('phone').focus();
                tip.on("请填写您的手机号码");
                return
            }
            if (vm.details.User.PWD === "") {
                document.getElementById('psw').focus();
                tip.on("密码不能为空");
                return
            }

            if (isIt.mobile(vm.details.User.Phone) === false) {
                return false;
            }
            var obj = "Drivers";
            var obj1 = "User";


            if (vm.status == 1) {
                //调用保存方法
                require(['../../obj/bridge/' + obj1 + '.js'], function (obj1) {
                    obj1.save(vm.UID, datasave, function (res) {
                        tip.on('保存成功', 1);
                        pop.close();
                        vm.ready(vm.ID,vm.UID);
                        //更新条目
                        require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                            ForEach(pack.list, function (el, index) {
                                if (el.UID == res.UID) {
                                    avalon.mix(el, res)
                                }
                            })
                            pack.ready(0);
                        })
                    }, function (err) {
                        console.warn(err)
                    })
                })
                return
            }

            // 新建时才保存密码
            if (isIt.pwd(vm.details.User.PWD) === false) {
                return false;
            }
            //检测账户
            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                obj.checkAccount(vm.details.User.Account,
                    function (res) {
                        if (res == true) {
                            tip.on("账户" + vm.details.User.Account + "已存在");
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
                obj.add(data, function (res) {
                    tip.on('创建成功', 1);
                    vm.flag = true;
                    vm.ID = res.DriverID;
                    vm.UID = res.UID;
                    vm.ready(vm.ID,vm.UID);
                    require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                            pack.search(pack.P);
                            pop.close();
                        },
                        function (err) {
                            console.warn(err)
                        })
                })
            })


        },


        //车辆数据
        $car: {
            CarID: "",
            Title: "",
            Number: "",
            Color: "",
            Status: '',//1空闲、-1维修、2出行、-2不可用
        },
        carStatus: {
            '1': '空闲',
            '-1': '维修',
            '2': '出行中',
            '-2': '禁用',
        },
        bindedCars: [],
        cars: [],


        //增加列表项
        addCarInput: function (n) {
            function add() {
                vm.cars.push(vm.$car)
            }

            for (var i = 0; i < n; i++) {
                add()
            }
        },
        //删除列表项：
        delCarInput: function (i) {
            vm.cars.splice(i, 1);
        },
        checkValue: function () {
            for (var arr = vm.cars, i = arr.length - 1; i > -1; i--) {
                if (arr[i].CarID === "") {
                    arr.splice(i, 1);
                }
            }
        },

        //车辆动态搜索
        $optCar: {
            callback: function (res, id) {
                //获得行数
                var row = id.split("DEACarInput")[1]
                //填入
                avalon.mix(vm.cars[row], {
                    CarID: res.CarID,
                    Title: res.Title,
                    Number: res.Number,
                    Color: res.Color,
                    Status: res.Status//1空闲、-1维修、2出行、-2不可用
                })

            },
            onInput: function (cvm) {
                var row = cvm.id.split("DEACarInput")[1]
                avalon.mix(vm.cars[row], vm.$car)
            },
            target: "Cars",
            keyName: 'Number',
            placeholder: "输入车牌号码"
        },


        //绑定车辆
        bindCar: function () {
            if (vm.status == 0 && vm.flag === false) {
                // vm.add();
                tip.on("请先添加司机", 0, 3000);
                return
            }
            if (vm.cars.length === 0) {
                tip.on("未绑定任何车辆", 1, 3000)
                require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                    pop.close();
                    pack.ready(0);
                });
            }
            vm.checkValue();
            require(['../../obj/Management/Cars'], function (obj) {
                var oldCars = [];
                var newCars = [];
                var errCars = [];
                var adding = 0;
                var addErr = 0;
                var empty = 0;

                ForEach(vm.cars, function (el, index) {

                    if (el.CarID > 0) {
                        //添加到老车列表中
                        oldCars.push({
                            CarID: el.CarID
                        })

                        bind()
                    } else {
                        //抓取要判断的东西
                        var Title = el.Title,
                            Number = window['DEACarInput' + index].Keywords,
                            Color = el.Color,
                            Status = el.Status

                        //忽略掉空白的条目
                        if (Title == "" && Number == '' && Color == "") {
                            empty++
                            return
                        }


                        //抓出数据不完整的东西
                        if (Title == "" || Number == '' || Color == "") {
                            errCars.push(index)
                            return
                        }

                        //需要新添加的车辆
                        addCar({
                            Title: Title,
                            Number: Number,
                            Color: Color,
                            Status: Status,
                        })


                    }


                    function addCar(data) {
                        adding++
                        obj.add(data, {
                            success: function (res) {

                                oldCars.push({
                                    CarID: res.CarID
                                })
                                vm.cars[index] = res;
                                addOver(true)
                            },
                            error: function (err) {
                                addOver(false)
                                tip.on(err)
                            }
                        })
                    }

                    //添加完毕之后的统一操作
                    function addOver(success) {
                        adding--
                        if (!success) {
                            addErr++
                        }

                        bind()
                    }

                    //全部整理完毕之后的绑定操作
                    function bind() {
                        //判断是否真的完毕了
                        if (adding > 0 || addErr > 0) {
                            return
                        }

                        if (errCars.length > 0) {
                            //todo 提示
                            return
                        }

                        if (oldCars.length < vm.cars.length - empty) {
                            //还没有统计完
                            return
                        }

                        //开始绑定

                        $$.call({
                            i: "Management/Drivers/bind",
                            data: {
                                Property: "Cars",
                                Data: oldCars,
                                DriverID: vm.ID
                            },
                            success: function (res) {
                                tip.on('保存成功', 1);
                                require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                                    pop.close();
                                    pack.ready(vm.P);
                                });
                            }
                        })
                    }
                })
            })
        },

        //接触绑定
        unbindCar: function (id) {
            $$.call({
                i: "Management/Drivers/unbind",
                data: {
                    Property: "Cars",
                    Data: [{CarID: id}],
                    DriverID: vm.ID
                },
                success: function (res) {
                    tip.on('保存成功', 1)
                    vm.ready(vm.ID)
                }
            })
        },
        //删除司机
        del: function () {
            if (confirm('删除该司机后，信息将不可恢复，确定删除？')) {
                var obj = "Drivers"
                require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                    obj.del(vm.ID,
                        function (res) {
                            tip.on('删除成功', 1);
                            pop.close();
                            //重新获取列表
                            require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                                pack.search(pack.P);
                            });
                        },
                        function (err) {
                            console.warn(err)
                        })
                });
            }
        },
        $Car_Status: {
            '1': "空闲",
            '-1': "维修",
            '2': "出行",
            '-2': "禁用",
        }


    })
    return window[vm.$id] = vm
})