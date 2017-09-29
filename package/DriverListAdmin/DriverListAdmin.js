/*
 后台司机管理 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 ！！！所有被注释掉的代码都需要在如果列表有筛选的情况下根据实际需要修改后打开！！！
 */
define('DriverListAdmin',[
    'avalon',
    'text!../../package/DriverListAdmin/DriverListAdmin.html',
    'css!../../package/DriverListAdmin/DriverListAdmin.css',
    '../../lib/pager/pager.js',
    '../../lib/searchTool/searchTool'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"DriverListAdmin",
        ready: function (i) {
            var obj='Drivers';
            if(obj!=""){
                require(['../../obj/Management/'+obj+'.js'], function () {
                    start()
                })
            }else{
                start()
            }

            function start(){
                //解析参数
                /*
                 * 可能的参数格式:P&&keywords&&status[]
                 * 例如：1&&keywords&&1_2_3
                 * */
                //var params = String(i).split("&&")
                ////置入参数

                vm.reset();

                index.html = html;

                vm.search(vm.P)
            }
        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: 1,
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
        T: 150,
        $pager: {
            id: "DriverListAdminPager",
            N: 12,
            showPage: 6,//显示多少页
            getList: function (p) {
                vm.P=p
                vm.search(p)
            }
        },


        //司机状态：1在线、-1离线、2行程中。
        DS:{
            "1":"启用",
            "-1":"禁用",
        },
        sex:['女','男'],
        list: [],
        search: function (p) {
            var data = {
                P: p,
                N: vm.N,
                W:vm.$W
            }

            var obj="Drivers"
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(DriverListAdminPager, {
                            T: 0,
                            P: vm.P
                        });
                        DriverListAdminPager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                      try{
                          vm.list = res.L

                          vm.P = res.P
                          avalon.mix(DriverListAdminPager, {
                              T: res.T,
                              P: res.P
                          });
                          DriverListAdminPager.build(res.P)
                      }catch(err){
                            console.log(err)
                      }
                    }
                })
            })



            //vm.$old_w = {
            //    Keywords: data.Keywords,
            //    W: data.W
            //}

        },
        // myCarsInfo:function(UID){
        //         require(["../../package/CarInfoAdmin/CarInfoAdmin"],function(pack){
        //             pack.ready(UID);
        //             window.location.href="#!/CarInfoAdmin/"+UID;
        //             pop.close();
        //         })
        // },
        $W:{},
        $optST:{
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
                vm.$W=W
                vm.search(1)
            }
        },
        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        //跳转编辑
        toEdit: function (id,uid) {
            require(['../../package/DriverEditAdmin/DriverEditAdmin'], function (pack) {
                pack.ready(id,uid)
            })
        }

    })
    return window[vm.$id]=vm
})