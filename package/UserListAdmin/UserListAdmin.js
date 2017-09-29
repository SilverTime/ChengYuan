/*
 后台客户管理 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！


 ！！！所有被注释掉的代码都需要在如果列表有筛选的情况下根据实际需要修改后打开！！！


 */
define('UserListAdmin',[
    'avalon',
    'text!../../package/UserListAdmin/UserListAdmin.html',
    'css!../../package/UserListAdmin/UserListAdmin.css',
    '../../lib/pager/pager.js',
    '../../lib/searchTool/searchTool'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"UserListAdmin",
        ready: function (i) {
            var obj='User'
            if(obj!=""){
                require(['../../obj/Management/'+obj+'.js'], function () {
                    start()
                })
            }else{
                start()
            }

            function start() {


                vm.reset();


                index.html = html;
                function go() {

                    try {
                        UserListAdminSearchTool.keys = []
                    } catch (err) {
                        setTimeout(go, 300)
                        return
                    }

                    if (i > 0) {
                        //传入了企业编号

                        //填充企业编号到组件中

                        avalon.mix(UserListAdminSearchTool.adding, {
                            key: "CompanyID",
                            exp: "EQ",
                            val: i,
                            name: "企业编号"
                        });
                        UserListAdminSearchTool.add()


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
                //w: {
                //    Keywords: params[1],
                //    Target:params[2].split("_")
                //}
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
            id: "UserListAdminPager",
            N: 12,
            showPage: 6,//显示多少页
            getList: function (p) {
                vm.P=p;
                vm.search(p)
            }
        },

        sex:['女','男'],
        list: [],
        search: function (p) {
            var data = {
                P: p,
                N: vm.N,
               W:{
                    CompanyID:['gt',2]
               }
            }

            avalon.mix(data.W,vm.$W)

            var obj="User"
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        avalon.mix(UserListAdminPager, {
                            T: 0,
                            P: vm.P
                        });
                        UserListAdminPager.build(vm.P)
                        vm.list = []

                        //填充返回数据
                        vm.list = res.L
                        vm.P = res.P
                        avalon.mix(UserListAdminPager, {
                            T: res.T,
                            P: res.P
                        });
                        UserListAdminPager.build(res.P)
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
        $optST:{
            "id": "UserListAdminSearchTool",
            "Columns": [
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
                    "Name": "账户手机号",
                    "Code": "Phone",
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
                    "Name": "账户名",
                    "Code": "Account",
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
                    "Name": "姓名",
                    "Code": "Name",
                    "Comment": false,
                    "DataType": "char(50)",
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
                    "Name": "性别",
                    "Code": "Sex",
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
            ],
            callback: function (W) {
                //console.log(JSON.stringify(W))
                vm.$W=W
                vm.search(1)
            }
        },
        //$old_w: {
        //    Keywords: '',
        //    W: {Target: []}
        //},
        //跳转编辑
        toEdit: function (id) {
            require(['../../package/UserEditAdmin/UserEditAdmin'], function (pack) {
                pack.ready(id)
            })
        }


    })
    return window[vm.$id]=vm
})