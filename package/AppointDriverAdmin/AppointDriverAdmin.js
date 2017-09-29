/**
 * Created by ZhangGong on 2016/11/22.
 */

define('AppointDriverAdmin', [
    'avalon',
    'text!../../package/AppointDriverAdmin/AppointDriverAdmin.html',
    'css!../../package/AppointDriverAdmin/AppointDriverAdmin.css',
    '../../lib/find/find'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "AppointDriverAdmin",
        ready: function (i, from) {
            vm.reset()
            pop.open(html)
            vm.OrderID = i
            vm.from = from;
            vm.getDriversList(i)

        },
        reset: function () {
            avalon.mix(vm, {
                status: '',
                ID: "",
                from: 1,
                PopPanelName: "指派司机",
                list: [],
                pushMsg:1,
            })
        },
        list: [],
        PopPanelName: "指派司机",
        status: '',
        OrderID: "",
        from: 1,
        // pushMsg:1,
        appointTheDriver: function (DriverID, CarID, DriverName,sendMSG) {
            var OrderID = vm.OrderID,
                AssignDriverID = DriverID,
                AssignCarID = CarID,
                // checkedIt=document.getElementById('pushMsg').checked,
                Pass=sendMSG,
                obj = "Order";
            //审核订单
            // require(['../../obj/bridge/' + obj + '.js'], function (obj) {
            //     obj.judge(OrderID, 1,
            //         function success(res) {
            //             console.log("订单正常");
            //         },
            //         function error(err) {
            //             console.error(err);
            //             tip.on("订单异常");
            //             return false;
            //         }
            //     )
            // });

            // if(checkedIt){
            //     Pass=true;
            // }else{
            //     Pass="";
            // }

            //指派订单
            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                obj.assign(OrderID, AssignDriverID, AssignCarID,Pass,
                    function success(res) {
                        tip.on("已指派司机 " + DriverName + " 进行此订单", 1, 3000);
                        pop.close();
                        if (vm.from === 0) {
                            require(['../../package/OrderListAdmin/OrderListAdmin'], function (pack) {
                                pack.ready(0);
                            })
                        } else {
                            require(['../../package/OrderCheckAdmin/OrderCheckAdmin'], function (pack) {
                                pack.ready(0);
                            })
                        }
                    },
                    function error(err) {
                        console.log(err)
                        tip.on(err,0,3000)
                    }
                )
            })
        },
        getDriversList: function () {
            var data = {
                P:1,
                N:100,
            }
            var obj = "Drivers"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.search(data, {
                    success: function (res) {
                        vm.list = res.L;
                    }
                })
            })
        },

        // $Car_Status:{
        //     '1':"空闲",
        //     '-1':"维修",
        //     '2':"出行",
        //     '-2':"禁用",
        // },
    });
    return window[vm.$id] = vm
});
