/*
 订单管理 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('OrderListAdmin', [
    'avalon',
    'text!../../package/OrderListAdmin/OrderListAdmin.html',
    'css!../../package/OrderListAdmin/OrderListAdmin.css',
    '../../lib/pager/pager.js',
    '../../lib/hey/hey',
    '../../lib/searchTool/searchTool'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "OrderListAdmin",
        ready: function (i) {
            var obj = 'Order';
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }
            function start() {


                vm.reset();

                index.html = html;
                function go() {

                    try {
                        OrderListAdminSearchTool.keys = []
                    } catch (err) {
                        setTimeout(go, 300)
                        return
                    }

                    if (i > 0) {
                        //传入了企业编号

                        //填充企业编号到组件中

                        avalon.mix(OrderListAdminSearchTool.adding, {
                            key: "CompanyID",
                            exp: "EQ",
                            val: i,
                            name: "企业编号"
                        });
                        OrderListAdminSearchTool.add()


                    } else {
                        vm.search(vm.P)
                    }


                }

                setTimeout(go, 300)


            }


        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: 1,
                T: 0,
                radio_choose: {
                    id: "",
                    value: false
                },
                checked_num: 0,
                Amount: 0,
                id_arr: [],
                list: [],
                $W: {},

            })


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
        T: 0,
        $pager: {
            id: "OrderListAdminPager",
            N: 12,
            showPage: 6,//显示多少页
            getList: function (p) {
                vm.P = p
                vm.search(p)
            }
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
        $Order_Status: {
            "1": "待指派或抢单",
            "2": "已审核",
            "3": " 已发起抢单",
            "4": "抢单结果待审",
            "5": "通过抢单审核",
            "6": "已被指派",
            "7": "行程中",
            "8": "等待结算",//订单完成，等待结算
            "9": "结算完成",
        },
        list: [],

        search: function (p) {
            var data = {
                P: p,
                N: vm.N,
                W: vm.$W,
                Sort: 'Status,Time DESC'
            }

            var obj = "Order"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(OrderListAdminPager, {
                            T: 0,
                            P: vm.P
                        });
                        OrderListAdminPager.build(vm.P);
                        vm.list = [];

                        //填充返回数据
                        vm.list = res.L;
                        vm.P = res.P;
                        avalon.mix(OrderListAdminPager, {
                            T: res.T,
                            P: res.P
                        });
                        OrderListAdminPager.build(res.P)
                        vm.list.forEach(function (el) {
                            if (el.Routers != []) {
                                vm.getAddress(el)
                            }
                            el.Status=Number(el.Status)
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
                        el.otherAddress += "--  " + al.Address + "--  "
                    } else if (al.TypeID == 3 && al.Address) {
                        el.endAddress += al.Address
                    }
                })
        },

        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        //跳转编辑
        toEdit: function (id) {
            require(['../../package/OrderEditAdmin/OrderEditAdmin'], function (pack) {
                pack.ready(id);
            })
        },
        toInfo: function (id) {
            document.location.href = "#!/OrderInfoAdmin/" + id
        },
        appointDriver: function (id) {
            require(['../../package/AppointDriverAdmin/AppointDriverAdmin'], function (pack) {
                pack.ready(id, 0)
            })
        },


        /*
         * Options choose it or not
         * 本处是一个单选按钮
         * 就函数而言，允许父子两层div 嵌套，将RadioClick注册在父上，也可以只用一层div
         * @var obj,string
         * @param father 点击事件绑定的div
         * @param id ‘all’|other id
         * */
        checked_num: 0,
        id_arr: [],
        Amount: 0,
        RadioClick: function (father, id) {
            var cls, me, radios, radioall, checked_all = 0, flag = 0;
            var status = 7;
            if (father.querySelector("div")) {
                me = father.querySelector("div");
            } else {
                me = father;
            }
            cls = me.getAttribute("class");
            radios = document.getElementsByName("checkradio");
            radioall = document.getElementsByName("radioall")[0];
            vm.list.forEach(function (el) {//计算当前符合待结算状态的选项个数
                if (el.Status == status) {
                    checked_all++;
                }
            });


            if (cls === "circle_choose") {
                //选中时
                me.setAttribute('class', 'circle_choose chosen');
                if (id === "all") {
                    vm.checked_num = checked_all;
                    radios.forEach(function (el) {
                        el.setAttribute('class', 'circle_choose chosen');
                    })


                    vm.id_arr = [];
                    vm.list.forEach(function (el) {//计算当前符合待结算状态的选项个数
                        if (el.Status == status) {
                            vm.id_arr.push(el.OrderID);
                        }
                    });

                } else {
                    vm.checked_num++;
                    if (vm.checked_num === checked_all) {
                        radioall.setAttribute('class', 'circle_choose chosen');
                    }


                    vm.id_arr.forEach(function (el) {
                        if (el == id) {
                            flag = 1;
                        }
                    });
                    if (flag === 0) {
                        vm.id_arr.push(id); //记录OrderID
                    }


                }
            } else {
                //未选中时
                me.setAttribute('class', 'circle_choose')
                if (id === "all") {
                    vm.checked_num = 0;
                    radios.forEach(function (el) {
                        el.setAttribute('class', 'circle_choose');
                    })


                    vm.id_arr = [];
                } else {
                    vm.checked_num--;
                    radioall.setAttribute('class', 'circle_choose');


                    for (var j = 0; j < vm.id_arr.length; j++) {
                        if (vm.id_arr[j] === id) {
                            vm.id_arr.splice(j, 1);  //记录OrderID
                            break;
                        }
                    }

                }
            }
            // console.info(vm.id_arr);    //获得的选中id 数组

            vm.list.forEach(function (el) {
                console.info(el.OrderID)
                vm.id_arr.forEach(function (id) {
                    if (id === el.OrderID) {
                        // 计算金额
                        vm.Amount += parseFloat(el.Money);
                    }
                })
            })

        },
        CloseAccounts: function () {

            //进行结算前先判断用户有么有选择订单
            if ( vm.id_arr.length === 0) {
               return tip.on("请选择需要结算的订单", 1, 1500);
            }

            $$.call({
                i:"Order/pay",
                data:{
                    OrderIDs:vm.id_arr
                },
                success:function (res) {
                    tip.on("订单全部结算成功", 1, 3000);
                    window.location.reload()
                },
                error:function (err) {
                    tip.on("订单结算失败");
                }
            })
        },


        CompetitionForOrders: function (id, status) {
            hey.confirm("抢单", "确定要发送至抢单页面？", function () {
                require(['../../obj/bridge/Order'], function (obj) {
                    obj.beginSnap(id, function (res) {
                        vm.search(vm.P);
                        hey.close()
                    })
                })

            })
        },
        $opthey: {
            id: 'hey',
            tipType: 'both',//仅当参数为both时，显示为确定和取消
        },
        $W: {},
        $optST: {
            "id": "OrderListAdminSearchTool",
            "Columns": [
                {
                    "Name": "订单编号",
                    "Code": "OrderID",
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
                    "Name": "订单来源",
                    "Code": "FromID",
                    "Comment": "微信、电话\n",
                    "DataType": "tinyint(1)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "下单纬度",
                    "Code": "Longitude",
                    "Comment": false,
                    "DataType": "double(15,3)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "下单经度",
                    "Code": "Latitude",
                    "Comment": false,
                    "DataType": "double(15,3)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "下单时间",
                    "Code": "CTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "企业编号",
                    "Code": "CompanyID",
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
                    "Name": "下单人编号",
                    "Code": "CUID",
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
                    "Name": "用车人电话",
                    "Code": "Phone",
                    "Comment": "默认为下单人电话",
                    "DataType": "char(50)",
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
                    "Name": "用车人",
                    "Code": "Name",
                    "Comment": "默认为下单人姓名",
                    "DataType": "char(50)",
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
                    "Name": "用车时间",
                    "Code": "Time",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "需求数量",
                    "Code": "CarAmount",
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
                    "Name": "需求车型",
                    "Code": "CarType",
                    "Comment": false,
                    "DataType": "tinyint(1)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "其他需求描述",
                    "Code": "Memo",
                    "Comment": false,
                    "DataType": "varchar(1000)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "抢单发布时间",
                    "Code": "SnapSendTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "订单状态",
                    "Code": "Status",
                    "Comment": "已下单，待抢单\n已下单，待派单\n抢单成功，等待审核\n审核成功\n指派成功\n",
                    "DataType": "tinyint(1)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "抢单司机编号",
                    "Code": "SnapDriverID",
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
                    "Name": "抢单时间",
                    "Code": "SnapTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "抢单审核人",
                    "Code": "SnapJudgeUID",
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
                    "Name": "抢单审核时间",
                    "Code": "SnapJudgeTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "抢单审核结果",
                    "Code": "SnapJudteResult",
                    "Comment": false,
                    "DataType": "tinyint(1)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "指派人",
                    "Code": "AssignUID",
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
                    "Name": "指派时间",
                    "Code": "AssignTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "指派司机编号",
                    "Code": "AssignDriverID",
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
                    "Name": "行程开始时间",
                    "Code": "StartTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "行程结束时间",
                    "Code": "EndTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "行程费用",
                    "Code": "Money",
                    "Comment": false,
                    "DataType": "double(10,2)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "服务评价",
                    "Code": "Evaluate",
                    "Comment": false,
                    "DataType": "varchar(1000)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "里程数",
                    "Code": "Mileage",
                    "Comment": false,
                    "DataType": "double(10,2)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "订单结算时间",
                    "Code": "PayTime",
                    "Comment": false,
                    "DataType": "int(10)",
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
                    "Name": "出行原因",
                    "Code": "Reason",
                    "Comment": false,
                    "DataType": "varchar(1000)",
                    "Length": [
                        "11"
                    ],
                    "Must": false,
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
                    "Name": "订单类型",
                    "Code": "Type",
                    "Comment": "长途、短途、接机",
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
    })
    setInterval(function () {
        vm.search(vm.P);
    },3000);
    return window[vm.$id] = vm
})