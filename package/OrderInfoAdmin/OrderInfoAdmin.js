/*
 后台订单详情 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('OrderInfoAdmin', [
    'avalon',
    'text!../../package/OrderInfoAdmin/OrderInfoAdmin.html',
    'css!../../package/OrderInfoAdmin/OrderInfoAdmin.css'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "OrderInfoAdmin",
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
                vm.reset()
                index.html = html
                vm.ID = i;
                //以及其他方法
                vm.getInfo(i)
            }


        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                ID: "",
                details: {},
                driverInfo: {
                    User: {},
                    Car: {}
                },
            })
        },
        ID: "",
        details: {},
        //分类型渲染路径点

        //获取信息
        getInfo: function (i) {
            var obj = "Order"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(i, {
                    success: function (res) {
                        vm.details = res;
                        // vm.details.Time=T2IS(vm.details.Time);
                        vm.getAddress(vm.details);
                        // if (vm.details.SnapDriverID !== "" && vm.details.SnapDriverID !== undefined &&
                        //     vm.details.SnapDriverID !== null) {
                        // vm.getDriver(vm.details.SnapDriverID);
                        // }
                        vm.driverInfo = {};
                        vm.driverInfo = res.Driver;
                        vm.driverInfo.carFlag = 0;
                        try {
                            if (res.Driver.Cars && res.Driver.Cars.length !== 0) {
                                res.Driver.Cars.forEach(function (el) {
                                    if (el.CarID === res.AssignCarID) {
                                        vm.driverInfo.Car = el;
                                        vm.driverInfo.carFlag = 1;
                                    }
                                })
                                if (vm.driverInfo.carFlag !== 1) {
                                    vm.driverInfo.Car.Number = "暂无信息";
                                    vm.driverInfo.Car.Color = "暂无信息";
                                }
                            }

                        } catch (err) {
                            console.info(err)
                        }
                    }
                })
            })
        },
        getAddress: function (el) {     //根据类型判断获取路径点的函数
            el.beginAddress = el.endAddress = el.otherAddress = "";     //新增的本地变量，当路径为空，为渲染时不将表达式渲染出来
            el.Routers.forEach(function (al) {
                if (al.TypeID == 1 && al.Address) {
                    el.beginAddress += al.Address;
                } else if (al.TypeID == 2 && al.Address) {
                    el.otherAddress += "  " + al.Address + "  "
                } else if (al.TypeID == 3 && al.Address) {
                    el.endAddress += al.Address
                }
            })
        },
        $Order_Status: {
            "1": "待指派或抢单",
            "2": "已审核",
            "3": " 已发起抢单",
            "4": "抢到单，待审核",
            "5": "已通过抢单审核",
            "6": "已被指派",
            "7": "行程中",
            "8": "订单完成，等待结算",
            "9": "结算完成",
        },
        driverInfo: {
            User: {},
            Car: {}
        },
        //获取司机信息
        // getDriver: function (id) {
        //     var obj = "Drivers"
        //     require(['../../obj/Management/' + obj + '.js'], function (obj) {
        //         obj.get(3, {
        //             success: function (res) {
        //                 if (res.length === 0) {
        //                     return
        //                 }
        //                 vm.driverInfo = res;
        //                 // safeMix(vm.driverInfo,res);
        //                 for (var i = 0; i < res.Cars.length; i++) {
        //                     // if (res.Cars[i].Title === vm.details.CarType) {
        //                     console.warn(vm.driverInfo.Car)
        //                     vm.driverInfo.Car.push(res.Cars[i]);
        //
        //                     console.warn(vm.driverInfo.Car[0])
        //                     // safeMix(vm.driverInfo.Car, res.Cars[i]);
        //                     // }
        //                 }
        //             }
        //         })
        //     })
        // },
        toEdit: function () {
            require(['../../package/OrderEditAdmin/OrderEditAdmin'], function (pack) {
                pack.ready(vm.ID)
            })
        },
        toBill: function () {
            require(['../../package/OrderBillAdmin/OrderBillAdmin'], function (pack) {
                pack.ready(vm.ID)
            })
        },
        $Order_Type: {
            "1": "短途",
            "2": "长途",
            "3": "接机",
            "4": "包车"
        },
        $Car_Type: {
            "1": "商务",
            "2": "经济",
            "3": "舒适",
        },

    })
    return window[vm.$id] = vm
})