/*
 司机车辆列表 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('CarInfoAdmin', [
    'avalon',
    'text!../../package/CarInfoAdmin/CarInfoAdmin.html',
    'css!../../package/CarInfoAdmin/CarInfoAdmin.css',

], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "CarInfoAdmin",
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
            //    goto('#!/CarInfoAdmin/1')
            //    return
            //}
            vm.DriverID = i;
            vm.reset();
            index.html = html;
            vm.search(vm.P)
        },
        reset: function (params) {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                P: 1,

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
        DriverName: "",
        // $pager: {
        //     id: "CarInfoAdminPager",
        //     N: 12,
        //     showPage: 6,//显示多少页
        //     getList: function (p) {
        //         vm.P = p
        //         vm.search(p)
        //     }
        // },

        list: [],
        DriverID: "",
        search: function (p) {
            var data = {
                P: 1,
                N: vm.N,
                W: {
                    DriverID: vm.DriverID
                }
            }

            var obj = "Drivers";
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.search(data, {
                    success: function (res) {
                        //假设没有数据，重置各种东西
                        // avalon.mix(CarInfoAdminPager, {
                        //     T: 0,
                        //     P: vm.P
                        // });
                        // CarInfoAdminPager.build(vm.P)
                        vm.list = [];

                        //填充返回数据
                        if (!res.L[0]) {
                            return;
                        }
                        vm.list = res.L[0].Cars;
                        vm.DriverName = res.L[0].User.Account;
                        // vm.P = res.P;
                        // avalon.mix(CarInfoAdminPager, {
                        //     T: res.T,
                        //     P: res.P
                        // });
                        // CarInfoAdminPager.build(res.P)
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
        $W: {},


        //跳转编辑
        toCarsEdit: function (id) {
            require(['../../package/CarEditAdmin/CarEditAdmin'], function (pack) {
                pack.ready(id,vm.DriverID);
            })
        },

        //查看司机
        findDriver: function (id) {
            require(['../../package/FindDriverAdmin/FindDriverAdmin'], function (pack) {
                pack.ready(id)
            })
        },
        // $optCarList: {
        //     callback: function (res, id) {
        //         //获得行数
        //         var row = id.split("DEACarInput")[1]
        //         //填入
        //         avalon.mix(vm.cars[row], {
        //             CarID: res.CarID,
        //             Title: res.Title,
        //             Number: res.Number,
        //             Color: res.Color,
        //             Status: res.Status//1空闲、-1维修、2出行、-2不可用
        //         })
        //
        //     }
        // }

    })
    return window[vm.$id] = vm
})