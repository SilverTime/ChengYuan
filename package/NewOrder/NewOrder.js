/*
 下单 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
 */
define('NewOrder', [
    'avalon',
    'text!../../package/NewOrder/NewOrder.html',
    'css!../../package/NewOrder/NewOrder.css',
    '../../plugins/isIt/isIt'
], function (avalon, html, css, isIt) {
    var vm = avalon.define({
        $id: "NewOrder",
        ready: function (i) {
            var obj = ''
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset()
                index.html = html

                //以及其他方法

                if (i > 0) {
                    //本人用车，填入本人信息
                    vm.getUser(i)
                }
            }


        },
        reset: function () {
            var date = new Date();
            var d = date.getTime();
            vm.details.Time=vm.NowTime = T2IS(d);
            avalon.mix(vm, {
                //要重置的东西最后都放回到这里
                UID:"",
            })
        },
        //    获取用户信息
        UID:"",
        getUser: function (UID) {
            require(['../../obj/bridge/User.js'], function (obj) {
                obj.get(UID, function (res) {
                    vm.details.Name = res.Name
                    vm.details.Phone = res.Phone
                    vm.beginAddress.Address = res.Company.Address;
                    vm.UID=res.UID
                })
            })
        },

        //    添加路径点
        addRoute: function () {
            vm.otherAddress.push({
                TypeID: "2",
                Address: ""
            })
        },
        //    删除路径点
        delRoute: function (index) {
            vm.otherAddress.splice(index, 1)
        },

        //    车型字典
        $carDic: {1: 'A级车', 2: "B级车", 3: "商务车"},
        //    行程字典
        $TypeDic: {1: '短途', 2: '长途', 3: '接机', 4: '包车'},
        details: {
            // CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
            // CUID: '',//下单人编号  int(11) 必填:1 默认值:,
            Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
            Name: '',//用车人 默认为下单人姓名 char(50) 必填:1 默认值:,
            Time: '',//用车时间  int(10) 必填:1 默认值:,
            CarAmount: 1,//需求数量  int(11) 必填:1 默认值:,
            CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
            Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
            Type: ''//订单类型：1短途、2长途、3接机、4包车 tinyint(1) 必填:1 默认值:,
        },
        beginAddress: {
            TypeID: "1",
            Address: ""
        },
        endAddress: {
            TypeID: "3",
            Address: ""
        },
        otherAddress: [
            {
                TypeID: "2",
                Address: ""
            }
        ],

        add: function () {
            //先添加订单，成功之后添加路径点
            var data = {
                Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                Name: '',//用车人 默认为下单人姓名 char(50) 必填:1 默认值:,
                Time: '',//用车时间  int(10) 必填:1 默认值:,
                CarAmount: 1,//需求数量  int(11) 必填:1 默认值:,
                Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
            };

            ForEach(data,function (el,key) {
                data[key]=vm.details[key]
            })
            // avalon.mix(data, vm.details);


            //转换用车时间
            data.Time = timeLengthFormat(newDateAndTime(data.Time), 's');
            //填入下单人信息
            // data.CUID=cache.go('UID');
            // data.CompanyID=cache.go('CompanyID');

            //路径点检查去空
            if (vm.beginAddress.Address == '') {
                tip.on('尚未输入起点');
                return false;
            }
            // if (vm.endAddress.Address == '') {
            //     tip.on('尚未输入终点');
            //     return false;
            // }


            //其他检查
            var checkList = {
                // CompanyID: '未正常获取企业编号',//企业编号  int(11) 必填:1 默认值:,
                //CUID: '',//下单人编号  int(11) 必填:1 默认值:,
                Phone: '未填写联系人的手机号',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                Name: '未填写用车人姓名',//用车人 默认为下单人姓名 char(50) 必填:1 默认值:,
                Time: '未选择用车时间',//用车时间  int(10) 必填:1 默认值:,
                // CarAmount: '需求数量必须大于0',//需求数量  int(11) 必填:1 默认值:,
                // CarType: '未选择需求车型',//需求车型  tinyint(1) 必填: 默认值:,
                //Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
                // Type: '未选择订单类型',//订单类型：1短途、2长途、3接机、4包车 tinyint(1) 必填:1 默认值:,
            }
            for (var x in checkList) {
                if (data[x] == '') {
                    tip.on(checkList[x])
                    return
                }
            }
            if (vm.details.Time === "") {
                document.getElementById('time').focus();
                tip.on("请选择填入用车时间点");
                return false
            }
            if (vm.details.Time < vm.NowTime) {
                vm.details.Time = vm.NowTime;
                tip.on("小于当前时间，请重新输入");
                return false;
            }

            // if(!isIt.phone(data.Phone)||data.Phone.length!=11){
            //     tip.on('电话号码错误');
            //     return
            // }
            if(isIt.mobile(data.Phone, '手机号码')===false){
                return
            };

            if(vm.details.CarType!=''){
                data.CarType=vm.details.CarType
            }
            if(vm.details.Type!=''){
                data.Type=vm.details.Type
            }


            require(['../../obj/bridge/Order.js'], function (obj, obj2) {
                obj.add(data, function (res) {
                    tip.on("已添加订单",1,3000);
                    vm.addAddress(res.OrderID, res.Time);
                }, function (err) {
                    console.warn(err);
                })
            })

        },
        addAddress: function (OrderID, Time) {
            vm.Routers = [];
            vm.Routers.push(vm.beginAddress);
            vm.Routers.push(vm.endAddress);
            vm.Routers = vm.Routers.concat(vm.otherAddress);
            var obj = "Router";
            //发送数据
            require(['../../obj/bridge/' + obj + '.js'], function (obj) {
                for (var i = 0; i < vm.Routers.length; i++) {
                    var data = {
                        OrderID: OrderID,
                        Time: Time,
                        TypeID: vm.Routers[i].TypeID,
                        Address: vm.Routers[i].Address
                    };
                    obj.add(data, function (res) {
                            console.log('路径点保存成功');
                        goto("#!/OrderInfo/"+res.OrderID+"&&user");
                    },function (err) {
                            console.warn(err);
                            tip.on("路径点添加失败");
                            return false;
                    })
                }
            })
        },


    })
    return window[vm.$id] = vm
})