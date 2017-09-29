/**
 * Created by Chris Chang on 2016/11/9.
 */

define('OrderCheckAdmin', [
    'avalon',
    'text!../../package/OrderCheckAdmin/OrderCheckAdmin.html',
    'css!../../package/OrderCheckAdmin/OrderCheckAdmin.css',
    '../../lib/pager/pager.js',
    '../../lib/hey/hey'

], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "OrderCheckAdmin",
        ready: function (i) {
            //解析参数
            /*
             * 可能的参数格式:P&&keywords&&status[]
             * 例如：1&&keywords&&1_2_3
             * */
            //var params = String(i).split("&&")
            //置入参数


            vm.reset();


            index.html = html;

            vm.search(vm.P)
        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: 1,
                //w: {
                //    Keywords: params[1],
                //    Target:params[2].split("_")
                //}
                null_status: false,

            })

            //setTimeout(function () {
            //    var target=params[2].split("_")
            //    if(target[0]==''){
            //        return
            //    }
            //    ForEach(target, function (el) {
            //        selectDL.list[el-1].checked=true
            //    })
            //},500)


        },
        buildParams: function (p, k, t) {
            var params = []
            params.push(p)
            //params.push(k)
            //params.push(t.join("_"))
            //return params.join("&&")
        },
        P: 1,
        N: 12,
        T: 150,
        $pager: {
            id: "OrderCheckAdminPager",
            N: 12,
            showPage: 6,//显示多少页
            getList: function (p) {
                vm.P = p
                vm.search(p)
            }
        },
        list: [],
        null_status: false,
        $Order_Type: {
            "1": "短途",
            "2": "长途",
            "3": "接机",
            "4": "包车"
        },
        $Order_Status: {
            "1": "待指派或抢单",
            "2": "已审核",
            "3": " 已发起抢单",
            "4": "抢到单，待审核",
            "5": "已通过抢单审核",
            "6": "已被指派",
            "7": "订单完成，等待结算",
            "8": "结算完成",
        },
        search: function (p) {
            var data = {
                P: p,
                N: vm.N,
                W: {
                    Status: ['IN', "1,3,4"]
                },
                Sort:'Time DESC'
            }

            var obj = "Order"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(OrderCheckAdminPager, {
                            T: 0,
                            P: vm.P
                        });
                        OrderCheckAdminPager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                        vm.list = res.L

                        vm.P = res.P
                        avalon.mix(OrderCheckAdminPager, {
                            T: res.T,
                            P: res.P
                        });
                        OrderCheckAdminPager.build(res.P)
                        if (vm.list.length === 0) {
                            vm.null_status = true;
                            return
                        }
                        vm.list.forEach(function (el) {
                            if (el.Routers != []) {
                                vm.getAddress(el)
                            }
                        })
                    }
                })
            })


            //vm.$old_w = {
            //    Keywords: data.Keywords,
            //    W: data.W
            //}

        },
        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        //渲染路径点
        getAddress: function (el) {
            //el==vm.list[i]
            el.beginAddress = "",
                el.endAddress = "",
                el.otherAddress = "",
                el.Routers.forEach(function (al) {
                    if (al.TypeID == 1 && al.Address) {
                        el.beginAddress += al.Address;
                    } else if (al.TypeID == 2 && al.Address) {
                        el.otherAddress += "->  " + al.Address + "->  "
                    } else if (al.TypeID == 3 && al.Address) {
                        el.endAddress += al.Address
                    }
                })
        },
        changeOrderStatus: function (OrderID,SnapDriverID) {
            var obj = "Order"
            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
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
                //审核抢单
                obj.judgeSnap(OrderID, 1,
                    function success(res) {
                        //通过，并指派为该司机
                        obj.assign(OrderID, SnapDriverID,
                            function success(res) {
                                tip.on("抢单已审核通过", 1, 3000);
                                hey.close();
                                require(['../../package/OrderCheckAdmin/OrderCheckAdmin'], function (pack) {
                                    pack.ready(vm.P)
                                });
                            },
                            function error(err) {
                                console.error(err)
                            }
                        )
                    },
                    function error(err) {
                        hey.close();
                        tip.on(err, 0, 3000);
                        console.error(err);
                    }
                )
            })
        },

        passIt: function (id) {
            hey.confirm("通过", "确定要订单 " + id + " 的审核吗？", function () {
                vm.changeOrderStatus(id);
            })
        },
        $opthey: {
            id: 'hey',
            tipType: 'both',//仅当参数为both时，显示为确定和取消
        },
        appointDriver: function (id) {
            require(['../../package/AppointDriverAdmin/AppointDriverAdmin'], function (pack) {
                pack.ready(id,1)
            })
        },

        $W: {},
        $optST: {
            "Columns": [
                {
                    "Name": "司机编号",
                    "Code": "DriverID",
                    "Comment": false,
                    "DataType": "int(11)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                },
                {
                    "Name": "用户编号",
                    "Code": "UID",
                    "Comment": false,
                    "DataType": "int(11)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                },
                {
                    "Name": "抢单数",
                    "Code": "SnapAmount",
                    "Comment": false,
                    "DataType": "int(11)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                },
                {
                    "Name": "接单数",
                    "Code": "AccessAmount",
                    "Comment": false,
                    "DataType": "int(11)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                },
                {
                    "Name": "总提款",
                    "Code": "SumMoney",
                    "Comment": false,
                    "DataType": "double(10,2)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                },
                {
                    "Name": "应提款",
                    "Code": "Debt",
                    "Comment": false,
                    "DataType": "double(10,2)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                },
                {
                    "Name": "司机状态",
                    "Code": "Status",
                    "Comment": "在线、离线、行程中。\n行程中司机无法抢单但可以接受指派订单\n",
                    "DataType": "tinyint(1)",
                    "Length": [
                        "11"
                    ],
                    "Must": "1",
                    "Default": "",
                    "Editable": false,
                    "Hidden": false,
                    "GetBy": false,
                    "SearchBy": false,
                    "RegExp": "",
                    "QureyExp": [
                        "EQ",
                        "NEQ",
                        "GT",
                        "EGT",
                        "LT",
                        "ELT",
                        "LIKE",
                        "BETWEEN",
                        "NOT BETWEEN",
                        "IN",
                        "NOT IN"
                    ]
                }
            ],
            callback: function (W) {
                vm.$W = W
                vm.search(1)
            }
        },
        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        //跳转编辑
        toEdit: function (id) {
            require(['../../package/OrderEditAdmin/OrderEditAdmin'], function (pack) {
                pack.ready(id)
            })
        }

    })
    return window[vm.$id] = vm
})