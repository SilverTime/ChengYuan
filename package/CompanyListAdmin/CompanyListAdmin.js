/*
 后台企业管理 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！


 ！！！所有被注释掉的代码都需要在如果列表有筛选的情况下根据实际需要修改后打开！！！


 */
define('CompanyListAdmin',[
    'avalon',
    'text!../../package/CompanyListAdmin/CompanyListAdmin.html',
    'css!../../package/CompanyListAdmin/CompanyListAdmin.css',
    '../../lib/pager/pager.js',
    '../../lib/searchTool/searchTool'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"CompanyListAdmin",
        ready: function (i) {

            var obj='Company'
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
                //
                //if(params[0]==0){
                //    goto('#!/CompanyListAdmin/1')
                //    return
                //}


                vm.reset();


                index.html = html;

                vm.search(vm.P)


            }


        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P:1,

            })




        },
        //buildParams: function (p, k, t) {
        //    var params = []
        //    params.push(p)
        //    //todo 如果有更多变量，按需打开
        //    //params.push(k)
        //    //params.push(t.join("_"))
        //    //return params.join("&&")
        //},
        P: 1,
        N: 12,
        T: 150,
        $pager: {
            id: "CompanyListAdminPager",
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

            var obj="Company"
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(CompanyListAdminPager, {
                            T: 0,
                            P: vm.P
                        });
                        CompanyListAdminPager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                        vm.list = res.L
                        vm.P = res.P
                        avalon.mix(CompanyListAdminPager, {
                            T: res.T,
                            P: res.P
                        });
                        CompanyListAdminPager.build(res.P)
                    }
                })
            })



            //vm.$old_w = {
            //    Keywords: data.Keywords,
            //    W: data.W
            //}

        },
        //跳转编辑
        toCompanyEdit: function (id) {
            require(['../../package/CompanyEditAdmin/CompanyEditAdmin'], function (pack) {
                pack.ready(id)
            })
        },

        //跳转订单列表
        toOrder: function (id) {

        },
        $companyType:[
            {

            }
        ],

        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        $W:{},

        $optST:{
            Columns: [
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
                    "Name": "企业地址",
                    "Code": "Address",
                    "Comment": false,
                    "DataType": "char(250)",
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
                    "Name": "结算联系人",
                    "Code": "Contactor",
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
                    "Name": "企业名称",
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
                    "Name": "企业添加时间",
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
                    "Name": "企业总计消费",
                    "Code": "Sum",
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
                    "Name": "企业欠款",
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
                    "Name": "企业添加人",
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
                    "Name": "企业类型",
                    "Code": "Type",
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
                },
                {
                    "Name": "里程单价",
                    "Code": "PerMileage",
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
                    "Name": "时长单价",
                    "Code": "PerHour",
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