/*
 后台订单费用详情 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('OrderBillAdmin', [
    'avalon',
    'text!../../package/OrderBillAdmin/OrderBillAdmin.html',
    'css!../../package/OrderBillAdmin/OrderBillAdmin.css',
    '../../obj/bridge/Billing'
], function (avalon, html, css, obj) {
    var vm = avalon.define({
        $id: "OrderBillAdmin",
        ready: function (i) {
            var obj = 'Billing'
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset()
                pop.open(html)

                //以及其他方法
                vm.ID = i;
                vm.getInfo(i)
            }


        },
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                details: {},
                beginAddress: {
                    TypeID: "1",
                    Address: "未知"
                },
                endAddress: {
                    TypeID: "3",
                    Address: "未知"
                },
                otherAddress: [],
                Billings: [],
                editBox: [],
                billing: {
                    BillingID: '默认生成',//计价编号  int(11) 必填:1 默认值:,
                    OrderID: vm.ID,//订单编号  int(11) 必填:1 默认值:,
                    Type: '2',//计价类型  tinyint(1) 必填:1 默认值:,计价类型：1时间，2里程，3次
                    Money: '0',//计价值  double(10,2) 必填:1 默认值:,计价说明中填写该价格的备注，
                    Memo: '每公里费用0.00,共计0公里',//计价说明  char(250) 必填:1 默认值:,
                    CTime: new Date().getTime() / 1000 | 0,//计价时间  int(10) 必填:1 默认值:
                },

            })
        },
        ID: "",
        details: {},
        Billings: [],
        beginAddress: {
            TypeID: "1",
            Address: "未知"
        },
        endAddress: {
            TypeID: "3",
            Address: "未知"
        },
        otherAddress: [],
        editBox: [],
        getInfo: function (i) {
            var obj = "Order"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(i, {
                    success: function (res) {
                        vm.details = res;
                        vm.otherAddress = [];
                        vm.getAddress();
                        vm.Billings = res.Billings
                        vm.Billings.forEach(function (el, index) {
                            vm.editBox[index] = false;
                        })
                        console.table(vm.editBox)
                    }
                })
            })
        },
        billing: {
            BillingID: '默认生成',//计价编号  int(11) 必填:1 默认值:,
            OrderID: "",//订单编号  int(11) 必填:1 默认值:,
            Type: '2',//计价类型  tinyint(1) 必填:1 默认值:,计价类型：1时间，2里程，3次
            Money: '',//计价值  double(10,2) 必填:1 默认值:,计价说明中填写该价格的备注，
            Memo: '每公里费用0.00,共计0公里',//计价说明  char(250) 必填:1 默认值:,
            CTime: new Date().getTime() / 1000 | 0,//计价时间  int(10) 必填:1 默认值:
        },
        addBill: function () {
            vm.Billings.push(vm.billing);
            vm.editBox.push(true);
        },
        editBill: function (BillingID, index) {
            vm.editBox[index] = true;
            vm.editBox.push(true);
            vm.editBox.pop();
        },
        saveBill: function (BillingID, index,Type, Money, Memo) {
            vm.editBox[index] = false;

            if (!parseInt(BillingID)) {
                //    添加
                var data = {
                    UID:cache.go('UID'),
                    OrderID: vm.ID,//订单编号  int(11) 必填:1 默认值:,
                    Type:Type,//计价类型  tinyint(1) 必填:1 默认值:,计价类型：1时间，2里程，3次
                    Money: Money,//计价值  double(10,2) 必填:1 默认值:,计价说明中填写该价格的备注，
                    Memo: Memo,//计价说明  char(250) 必填:1 默认值:,
                    CTime: new Date().getTime() / 1000 | 0,//计价时间  int(10) 必填:1 默认值:
                };
                obj.add(data, function (res) {
                    tip.on("添加成功", 1, 3000);
                    vm.ready(vm.ID);
                }, function (err) {
                    console.error(err);
                })
            } else {
                //    保存
                data = {
                    UID:cache.go('UID'),
                    OrderID: vm.ID,//订单编号  int(11) 必填:1 默认值:,
                    Type: Type,//计价类型  tinyint(1) 必填:1 默认值:,计价类型：1时间，2里程，3次
                    Money: Money,//计价值  double(10,2) 必填:1 默认值:,计价说明中填写该价格的备注，
                    Memo: Memo,//计价说明  char(250) 必填:1 默认值:,
                    // CTime: new Date().getTime() / 1000 | 0,//计价时间  int(10) 必填:1 默认值:
                };
                obj.save(BillingID,data, function (res) {
                    tip.on("保存成功", 1, 3000);
                    vm.ready(vm.ID);
                }, function (err) {
                    console.error(err);
                })
            }
        },
        cancelIt: function (index, BillingID) {
            if (!parseInt(BillingID)) {
                vm.Billings.splice(index, 1);
                vm.editBox.splice(index, 1);
            } else {
                vm.editBox[index] = false;
                vm.editBox.push(true);
                vm.editBox.pop();
            }

        },
        delBill: function (BillingID) {
            var ensure = confirm("确认删除本条订单信息？");
            if (ensure) {
                obj.del(BillingID, function (res) {
                    tip.on("删除成功", 1, 3000);
                    vm.ready(vm.ID);
                }, function (err) {
                    console.error(err)
                })
            }
        },
        $computeType:{
            "1":"时间",
            "2":"里程",
            "3":"次",
        },
        toInfo: function () {
            pop.close(html)
        },
        getAddress: function () { //渲染路径点，填入数组
            vm.details.Routers.forEach(function (el) {
                if (el.TypeID === '1') {
                    vm.beginAddress = {
                        TypeID: "1",
                        Address: el.Address//行程点
                    }
                } else if (el.TypeID === '3') {
                    vm.endAddress = {
                        TypeID: "3",
                        Address: el.Address//行程点
                    }
                } else {
                    vm.otherAddress.push({
                        TypeID: "2",
                        Address: el.Address//行程点
                    })
                }
            })
            if (vm.otherAddress.length === 0) {
                vm.otherAddress.push({
                    TypeID: "2",
                    Address: "未填写途径点"//行程点
                })
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
    })
    return window[vm.$id] = vm
})