/*
 客户订单列表 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！

 使用新模版进行构建【2016年11月30日】
 */
define('CusCenter', [
    'avalon',
    'text!../../package/CusCenter/CusCenter.html',
    'css!../../package/CusCenter/CusCenter.css',
    'dic',
    '../../obj/bridge/User.js'
], function (avalon, html, css, dic, User) {

    //构建基础字段
    var base = {};
    avalon.mix(base, dic);
    base.info = User.obj;

    //混入基础字段并构建vm
    var vm = avalon.define(avalon.mix({
        $id: "CusCenter",
        ready: function (i) {

            var obj = '';
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
                vm.reset(i);
                index.html = html;
                //以及其他方法
                vm.getUser(i);


            }


        },
        reset: function (i) {
            avalon.mix(vm, {
                UID: i,
                list: [],
                P: 0,
                N: 6,
                T: 0,
                info: User.obj,
                HeadImgUrl:cache.go('HeadImgUrl')

            })
        },
        UID: "",
        DriverID:"",
        HeadImgUrl:"",
        //    获取用户信息
        getUser: function (UID) {
            require(['../../obj/bridge/User.js'], function (obj) {
                obj.get(UID, function (res) {
                    vm.info = res
                    if(res.CompanyID>2){
                        vm.getOrderList(1);
                    }else{
                        require(['../../obj/bridge/Drivers.js'],function (D) {
                            D.search({P:1,N:1,W:{UID:vm.UID}},function (res2) {
                                if(res2.L.length>0){
                                    vm.DriverID=res2.L[0].DriverID
                                    vm.getOrderList(1)
                                }

                            })
                        })
                    }

                })
            })
        },
        //    获取用户订单列表
        list: [],
        P: 0,
        N: 6,
        T: 0,
        getOrderList: function (p) {

            var data={
                W: {},
                P: p,
                N: vm.N,

            }

            if(vm.info.CompanyID>2){
                data.W={CUID: vm.UID}
            }else{
                data.W={AssignDriverID:vm.DriverID}
            }

            require(['../../obj/bridge/Order'], function (obj) {
                obj.search(data, function (res) {
                    vm.list=[];
                    avalon.mix(vm, {
                        P: res.P,
                        T: res.T
                    });
                    vm.list = vm.list.concat(res.L);
                    vm.list.forEach(function (el) {     //遍历数组，填充路径
                        vm.getAddress(el);
                    });
                })
            })
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
            goto("#!/OrderInfo/" + OrderID + "&&user");
        },

        $Order_Status:{
            "1":"待指派或抢单",
            "2":"已审核",
            "3":" 已发起抢单",
            "4":"抢到单，待审核",
            "5":"已通过抢单审核",
            "6":"已被指派",
            "7":"行程中",
            "8":"订单完成，等待结算",
            "9":"结算完成",
        },

        quickOrder:function () {

        }


    }, base));
    return window[vm.$id] = vm
});