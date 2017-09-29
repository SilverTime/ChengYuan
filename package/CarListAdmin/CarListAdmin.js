/*
 司机车辆列表 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('CarListAdmin',[
    'avalon',
    'text!../../package/CarListAdmin/CarListAdmin.html',
    'css!../../package/CarListAdmin/CarListAdmin.css',
    '../../lib/pager/pager.js',
    '../../lib/searchTool/searchTool'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"CarListAdmin",
        ready: function (i) {

                //解析参数
                /*
                 * 可能的参数格式:P&&keywords&&status[]
                 * 例如：1&&keywords&&1_2_3
                 * */
                // var params = String(i).split("&&")
                ////置入参数
                //
                //if(params[0]==0){
                //    goto('#!/CarListAdmin/1')
                //    return
                //}
                vm.reset();
                index.html = html;
                vm.search(vm.P);
        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: 1,
                N: 12,
                T: 150,
                list: [],

            })




        },
        //buildParams: function (p, k, t) {
        //    var params = []
        //    params.push(p)
        //    //params.push(k)
        //    //params.push(t.join("_"))
        //    //return params.join("&&")
        //},
        P: 1,
        N: 12,
        T: 150,
        $carpager: {
            id: "CarListAdminPager",
            N: 12,
            showPage: 6,//显示多少页
            getList: function (p) {
                vm.P=p
                vm.search(p)
            }
        },

        list: [],
        search: function (p) {
            var data = {
                P: p,
                N: vm.N,
                W:vm.$W
            }

            var obj="Cars"
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(CarListAdminPager, {
                            T: 0,
                            P: vm.P
                        });
                        CarListAdminPager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                        try{
                            vm.list = res.L

                            vm.P = res.P
                            avalon.mix(CarListAdminPager, {
                                T: res.T,
                                P: res.P
                            });
                            CarListAdminPager.build(res.P)
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
        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        $W:{},



        //跳转编辑
        toCarsEdit: function (id) {
            require(['../../package/CarEditAdmin/CarEditAdmin'], function (pack) {
                pack.ready(id)
            })
        },

        //查看司机
        findDriver: function (id) {
            require(['../../package/FindDriverAdmin/FindDriverAdmin'], function (pack) {
                pack.ready(id)
            })
        },
        $Car_Status:{
            '1':"空闲",
            '-1':"维修",
            '2':"出行",
            '-2':"禁用",
        },
        $optCarList: {
            "Columns": [
                {
                    "Name": "车型",
                    "Code": "Title",
                    "Comment": false,
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
                    "Name": "车牌号",
                    "Code": "Number",
                    "Comment": false,
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
                    "Name": "颜色",
                    "Code": "Color",
                    "Comment": false,
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
                    "Name": "车辆状态",
                    "Code": "Status",
                    "Comment": false,
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
                //console.log(JSON.stringify(W))
                vm.$W=W
                vm.search(1)
            }
        }

    })
    return window[vm.$id]=vm
})