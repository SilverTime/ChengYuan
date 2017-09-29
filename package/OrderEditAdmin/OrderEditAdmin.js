/*
 后台订单编辑 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('OrderEditAdmin', [
    'avalon',
    'text!../../package/OrderEditAdmin/OrderEditAdmin.html',
    'css!../../package/OrderEditAdmin/OrderEditAdmin.css',
    '../../lib/find/find',
    '../../plugins/isIt/isIt'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "OrderEditAdmin",
        ready: function (i) {

            var obj = 'Order'
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset();
                pop.open(html);
                vm.ID = i;

                if (i > 0) {
                    vm.status = 1;
                    vm.PopPanelName = "修改订单";
                    vm.getDetails(i)
                }
                else {
                    vm.status = 0;
                    vm.PopPanelName = "添加订单";
                }

            }

            vm.getCompanies();
        },
        reset: function () {
            var date = new Date();
            var d = date.getTime();
            vm.NowTime = T2IS(d);
            avalon.mix(vm, {
                status: '',
                ID: "",
                PopPanelName: "添加订单",
                details: {

                    Type: "",
                    Name: "",//用车人
                    CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
                    Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                    Time: vm.NowTime,     //初始化为当前时间,//用车时间  int(10) 必填:1 默认值:,
                    // CompanyID: "",
                    Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
                    Status: "1",
                },
                Routers: [],
                beginAddress: {
                    TypeID: "1",
                    Address: ""
                },
                endAddress: {
                    TypeID: "3",
                    Address: ""
                },
                otherAddress: [
                    {
                        TypeID: "2",
                        Address: ""
                    },
                ],
            })
        },
        addInit: function () {
        },
        PopPanelName: "添加订单",
        status: '',
        ID: "",
        getDetails: function (id) {
            var obj = "Order"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(id, {
                    success: function (res) {
                        vm.details = res;
                        vm.details.Time = T2IS(vm.details.Time * 1000);
                        vm.otherAddress = [];
                        vm.getAddress();
                    }
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

        details: {

            Type: "",//行程类型
            Name: "",//用车人
            CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
            Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
            Time: '',//用车时间  int(10) 必填:1 默认值:,
            CompanyID: "",
            Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
        },

        Routers: [],
        beginAddress: {
            TypeID: "1",
            Address: ""
        },
        endAddress: {
            TypeID: "3",
            Address: ""
        },
        otherAddress: [],
        NowTime: "",
        //渲染获取到的路径点，成为字符串
        getAddress: function () {
            vm.details.Routers.forEach(function (el) {
                if (el.TypeID === '1') {
                    vm.beginAddress = {
                        TypeID: "1",
                        Address: el.Address//行程点
                    }
                } else if (el.TypeID === '3') {
                    vm.endAddress = {
                        TypeID: "3",
                        Address: el.Address//行程点
                    }
                } else {
                    vm.otherAddress.push({
                        TypeID: "2",
                        Address: el.Address//行程点
                    })
                }
            })
        },


        getCarsType: function () {
            var data = {};
            require(['../../obj/Management/Cars'], function (obj) {
                obj.search(data, {
                    success: function (res) {

                    }
                })
            })
        },


        add: function () {
            var data = {
                Type: "",//行程类型
                Name: "",//用车人
                CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
                Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                Time: '',//用车时间  int(10) 必填:1 默认值:,
                // CompanyID: "",
                Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
            };
            // vm.details.Status = 1;

            if (vm.details.Name === "") {
                document.getElementById('name').focus();
                tip.on("请填写用车人姓名");
                return false;
            }
            if (vm.details.Phone === "") {
                document.getElementById('phone').focus();
                tip.on("请填写用车人手机号码");
                return false
            }
            if (vm.details.Type === "") {
                document.getElementById('type').focus();
                tip.on("请选择行程类型");
                return false;
            }
            if (vm.details.CarType === "") {
                document.getElementById('cartype').focus();
                tip.on("请填写需求车型");
                return false
            }
            if (vm.details.Time === "") {
                document.getElementById('time').focus();
                tip.on("请选择填入用车时间点");
                return false
            }
            if (vm.beginAddress.Address === "") {
                document.getElementById('beginaddress').focus();
                tip.on("请选择填入用车起点");
                return false
            }

            if (vm.endAddress.Address === "") {
                document.getElementById('beginaddress').focus();
                tip.on("请选择填入用车终点");
                return false
            }


            if (isIt.mobile(vm.details.Phone) === false) {
                return false;
            }
            if (vm.details.Time < vm.NowTime) {
                vm.details.Time = vm.NowTime;
                tip.on("小于当前时间，请重新输入");
                return false;
            }

            // avalon.mix(data, vm.details);
            ForEach(data,function (val,key) {
                data[key]=vm.details[key]
            })

            data.Time = newDateAndTime(vm.details.Time)/1000;
            data.CompanyID=vm.details.CompanyID;

            // vm.bindAddress();
            var obj = "Order";


            if (vm.ID > 1) {
                //调用保存方法
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.save(vm.ID, data, {
                        success: function (res) {
                            tip.on('后台订单编辑保存成功', 1);
                            vm.addAddress(res.OrderID, res.Time);
                            goto('#!/OrderListAdmin/' + res[obj + 'ID'])

                        }
                    })
                });

                return
            }

            //发送数据
            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                obj.add(data, function (res) {
                    tip.on('后台订单创建成功', 1);
                    vm.addAddress(res.OrderID, res.Time);
                    require(['../../package/OrderListAdmin/OrderListAdmin'], function (pack) {
                        pack.ready(0)
                    })
                    pop.close()
                }, function (err) {
                    tip.on(err);
                })
            })


        },

        addWayPoints: function () {
            vm.otherAddress.push({
                TypeID: "2",
                Address: ''//行程点
            })
        },
        delWayPoints: function (id) {
            vm.otherAddress.splice(id, 1)
        },

        //为订单添加路径点
        addAddress: function (OrderID, Time) {
            vm.Routers = [];
            vm.Routers.push(vm.beginAddress);
            vm.Routers.push(vm.endAddress);
            vm.Routers = vm.Routers.concat(vm.otherAddress);
            var obj = "Router";
            //发送数据
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                //删除
                vm.details.Routers.forEach(function (el) {
                    if (el.TypeID == '2') {
                        obj.del(el.RouteID, function (res) {
                            console.log("路径点" + el.RouteID + "删除成功");
                        }, function (err) {
                            console.warn(err);
                            tip.on("路径点修改失败");
                            return
                        })
                    }
                });
                //添加
                for (var i = 0; i < vm.Routers.length; i++) {
                    var data = {
                        OrderID: OrderID,
                        // Time: Time,
                        TypeID: vm.Routers[i].TypeID,
                        Address: vm.Routers[i].Address
                    };
                    if (el.TypeID != '2') {
                        obj.add(data, {
                            success: function (res) {
                                console.log('路径点保存成功');
                                vm.ready(vm.ID);
                            },
                            error: function (err) {
                                console.warn(err);
                                tip.on("路径点修改失败")
                                return false;
                            }
                        })
                    }
                }
                pop.close();
                require(['../../package/OrderEditAdmin/OrderEditAdmin'], function (pack) {
                    pack.ready(vm.P)
                })
            })
        },

        del: function () {
            if (confirm('删除订单后将不可恢复，确定删除？')) {
                var obj = "Order"
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.del(vm.ID, {
                        success: function (res) {
                            tip.on('删除成功', 1)
                            pop.close()

                            //重新获取列表
                            // require(['../../package/OrderListAdmin/OrderListAdmin'], function (pack) {
                            //     alert(1)
                            //     pack.search(pack.P)
                            // })
                            window.location.href = "#!/OrderListAdmin/0"
                        }
                    })
                })
            }
        },
        getCompanies:function () {
            $$.call({
                i:'Company/search',
                data:{
                    W:{
                        CompanyID:['gt',2]
                    },
                    N:999
                },
                success:function (data) {
                    vm.Companies=data.L;
                }
            })
        },
        Companies:[],
        //企业动态搜索
        $optFindCompany: {
            callback: function (res) {
                vm.details.CompanyID = res.CompanyID
            },
            onInput: function () {
                vm.details.CompanyID = ''
            },
            target: "Company",
            keyName: 'Title',
            placeholder: "搜索企业"
        },

    });
    return window[vm.$id] = vm
});