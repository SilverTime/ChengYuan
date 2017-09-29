/*
 订单详情 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
 */
define('DriverCenter', [
    'avalon',
    'text!../../package/DriverCenter/DriverCenter.html',
    'css!../../package/DriverCenter/DriverCenter.css',
    'dic',
    '../../obj/bridge/Drivers.js',
    '../../lib/hey/hey'
], function (avalon, html, css, dic, Drivers) {

    //构建基础字段
    var base = {}
    avalon.mix(base, dic)
    base.info = Drivers.obj

    var vm = avalon.define(avalon.mix({
        $id: "DriverCenter",
        //    传入的i为用户编号UID！！
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

                if(i==0){
                    i=cache.go('UID');
                }
                vm.reset();
                index.html = html;

                //以及其他方法
                //传入的i为用户编号UID！！
                vm.UID = i;
                vm.getDriverInfo(i);

                vm.$watch('tab_which', function (a, b) {
                    setTimeout(function () {
                        avalon.mix(vm, {
                            list: [],
                            P: 1,
                            N: 6,
                            T: 0
                        });
                        vm.getDriverOrder(1)
                    }, 300)
                })
            }


        },
        reset: function () {
            avalon.mix(vm, {
                tab_which: "left",
                info: {
                    User: {
                        Company: {}
                    }
                }
            })
        },
        tab_which: "left",
        RS: false,   //由于数据渲染刷新采用的是刷新list数组，因此，添加一个responseStatus作为中间状态。
        orderList: function () {
            vm.tab_which = 'left';
            vm.RS = false;
        },
        orderChase: function () {
            vm.tab_which = 'right';
            vm.RS = false;

        },

        //获取司机信息
        UID: "",
        getDriverInfo: function (UID) {
            //require(['../../obj/bridge/User'], function (obj) {
            //    obj.get(UID, function (res) {
            //        vm.info=res
            //    })
            //})

            require(['../../obj/bridge/Drivers'], function (obj) {
                obj.search({
                    P: 1,
                    N: 9999999999999999,
                    W: {
                        UID: vm.UID,
                    }
                }, function (res) {

                    //var info=res.L[0]
                    //
                    //ForEach(info, function (el, key) {
                    //    if(typeof el=='object'){
                    //
                    //        ForEach(el, function (al,al_kay) {
                    //            vm.info[key][al_kay]=al
                    //        })
                    //        return
                    //    }
                    //    vm.info[key]=el
                    //})
                    if(res.L.length==0){
                        //当前用户不是司机，跳转客户中心
                        goto('#!/CusCenter/0')
                        return
                    }

                    vm.info = res.L[0];
                    vm.getDriverOrder(1)
                })
            })
        },


        //获取订单
        list: [],
        P: 1,
        N: 6,
        T: 0,
        getDriverOrder: function (P) {
            var data = {
                P: P,
                N: vm.N,
                W: {}
            }

            switch (vm.tab_which) {
                case 'left':
                    //获取司机的订单
                    data.W = {
                        AssignDriverID: ['EQ', vm.info.DriverID],
                        SnapDriverID: ['EQ', vm.info.DriverID],
                        _logic: 'or'
                    };
                    break;
                case 'right':
                    //获取抢单列表
                    data.W.Status = 3;//已经发起了抢单才可以抢
                    break
            }
            vm.RS = true;
            require(['../../obj/bridge/Order'], function (obj) {
                obj.search(data, function (res) {
                    avalon.mix(vm, {
                        P: res.P,
                        T: res.T
                    });
                    vm.list = [];
                    // vm.list = res.L;
                    vm.list = vm.list.concat(res.L);
                    vm.list.forEach(function (el) {     //遍历数组，填充路径
                        vm.getAddress(el);
                    });
                });
            });
        },
        getAddress: function (el) {     //根据类型判断获取路径点的函数
            el.beginAddress = el.endAddress = el.otherAddress = "  ";     //新增的本地变量，当路径为空，为渲染时不将表达式渲染出来
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

        //详情
        MyOrdersInfo: function (OrderID) {
            goto("#!/OrderInfo/" + OrderID + "&&driver/");
        },
        //抢单
        $opthey: {
            id: "hey",
            tipType: 'both_double',    //仅当参数为both时，显示为确定和取消
            titleColor: "#ff0000",
            btn1Color: "#777777",
            btn2Color: "#000066",
        },
        snap: function (id) {
            require(['../../obj/bridge/Order'], function (obj) {
                obj.snap(id, vm.info.DriverID,
                    function (res) {
                        hey.confirmLR("提示", "恭喜您抢单成功,正在进行抢单审核！",
                            "查看", function () {
                                // console.info("这里是左侧的回调函数");
                                vm.MyOrdersInfo(id);
                                hey.close();
                            },
                            "确认", function () {
                                // console.info("这里是右侧的回调函数");
                                hey.close();
                            });
                    },
                    function (err) {
                        tip.on("抢单失败", 0, 3000);
                        console.error(err);
                    }
                )
            })
        }


    }, base));
    window.setInterval(function () {
        vm.getDriverOrder();
    },2000);
    return window[vm.$id] = vm
})