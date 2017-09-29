/*
 订单详情 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
 */
define('OrderInfo', [
    'avalon',
    'text!../../package/OrderInfo/OrderInfo.html',
    'css!../../package/OrderInfo/OrderInfo.css',
    '../../plugins/isIt/isIt',
    '../../lib/hey/hey'
], function (avalon, html, css) {
    var vm = avalon.define({
            $id: "OrderInfo",
            ready: function (i) {
                var obj = '';
                if (obj != "") {
                    require(['../../obj/Management/' + obj + '.js'], function () {
                        start()
                    })
                } else {
                    start()
                }
                vm.ID = i;
                function start() {
                    var params = String(i).split('&&')
                    vm.reset(params);
                    vm.UserStatus = params[1];
                    index.html = html
                    //以及其他方法
                    vm.getOrder(params[0])
                }


            },


            OrderID: "",
            reset: function (i) {
                var date = new Date();
                var d = date.getTime();
                avalon.mix(vm, {
                    OrderID: i[0],
                    show_status: false,
                    endTime: T2IS(d),     //初始化为当前时间
                    spendTime: "",

                    Routers: [],
                    beginAddress: {
                        TypeID: "1",
                        Address: ""
                    },
                    endAddress: {
                        TypeID: "3",
                        Address: ""
                    },
                    otherAddress: [],
                    editAddressFlag: false,


                    info: {
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        FromID: '',//订单来源 微信、电话; tinyint(1) 必填: 默认值:,
                        Longitude: '',//下单纬度  double(15,3) 必填: 默认值:,
                        Latitude: '',//下单经度  double(15,3) 必填: 默认值:,
                        CTime: '',//下单时间  int(10) 必填:1 默认值:,
                        CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                        CUID: '',//下单人编号  int(11) 必填:1 默认值:,
                        Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                        Name: '',//用车人 默认为下单人姓名 char(50) 必填:1 默认值:,
                        Time: '',//用车时间  int(10) 必填:1 默认值:,
                        CarAmount: '',//需求数量  int(11) 必填:1 默认值:,
                        CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
                        Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
                        SnapSendTime: '',//抢单发布时间  int(10) 必填:1 默认值:,
                        Status: '',//订单状态 已下单，待抢单;已下单，待派单;抢单成功，等待审核;审核成功;指派成功; tinyint(1) 必填: 默认值:,
                        SnapDriverID: '',//抢单司机编号  int(11) 必填:1 默认值:,
                        SnapTime: '',//抢单时间  int(10) 必填:1 默认值:,
                        SnapJudgeUID: '',//抢单审核人  int(11) 必填:1 默认值:,
                        SnapJudgeTime: '',//抢单审核时间  int(10) 必填:1 默认值:,
                        SnapJudteResult: '',//抢单审核结果  tinyint(1) 必填: 默认值:,
                        AssignUID: '',//指派人  int(11) 必填:1 默认值:,
                        AssignTime: '',//指派时间  int(10) 必填:1 默认值:,
                        AssignDriverID: '',//指派司机编号  int(11) 必填:1 默认值:,
                        StartTime: '',//行程开始时间  int(10) 必填:1 默认值:,
                        EndTime: '',//行程结束时间  int(10) 必填:1 默认值:,
                        Money: '',//行程费用  double(10,2) 必填: 默认值:,
                        Evaluate: '',//服务评价  varchar(1000) 必填: 默认值:,
                        Mileage: '',//里程数  double(10,2) 必填: 默认值:,
                        PayTime: '',//订单结算时间  int(10) 必填:1 默认值:,
                        Reason: '',//出行原因  varchar(1000) 必填: 默认值:,
                        Type: '',//订单类型：1短途、2长途、3接机、4包车 tinyint(1) 必填:1 默认值:,
                        Push: '',//发送推送 0不发送，1发送 tinyint(1) 必填:1 默认值:1,
                        OtherMemo: '',//其他要求  varchar(1000) 必填: 默认值:,
                        Billings: [
                            {
                                BillingID: '',//计价编号  int(11) 必填:1 默认值:,
                                OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                                Type: '',//计价类型  tinyint(1) 必填:1 默认值:,
                                Money: '',//计价值  double(10,2) 必填:1 默认值:,
                                Memo: '',//计价说明  char(250) 必填:1 默认值:,
                                CTime: '',//计价时间  int(10) 必填:1 默认值:
                            }
                        ],
                        Routers: [
                            {
                                RouteID: '',//行程编号  int(11) 必填:1 默认值:,
                                OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                                Address: '',//行程点  char(50) 必填:1 默认值:,
                                Time: '',//预期时间  int(10) 必填:1 默认值:,
                                TypeID: '',//行程类型 起点，中转，终点 tinyint(1) 必填:1 默认值:
                            }
                        ],
                        Statuses: [
                            {
                                StatusID: '',//状态编号  int(11) 必填:1 默认值:,
                                OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                                Status: '',//状态码  tinyint(1) 必填:1 默认值:,
                                Memo: '',//状态备注  varchar(1000) 必填:1 默认值:,
                                CTime: '',//状态时间  int(10) 必填:1 默认值:,
                                CUID: '',//状态人  int(11) 必填:1 默认值:
                            }
                        ],
                        Company: {
                            CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                            Address: '',//企业地址  char(250) 必填:1 默认值:,
                            Contactor: '',//结算联系人  char(50) 必填:1 默认值:,
                            Title: '',//企业名称  char(50) 必填:1 默认值:,
                            CTime: '',//企业添加时间  int(10) 必填:1 默认值:,
                            Sum: '',//企业总计消费  double(10,2) 必填:1 默认值:,
                            Debt: '',//企业欠款  double(10,2) 必填:1 默认值:,
                            CUID: '',//企业添加人  int(11) 必填:1 默认值:,
                            Type: '',//企业类型  tinyint(1) 必填:1 默认值:1,
                            PerMileage: '',//里程单价  double(10,2) 必填: 默认值:,
                            PerHour: '',//时长单价  double(10,2) 必填: 默认值:,
                            Phone: '',//联系人电话  char(50) 必填: 默认值:
                        },
                        Creator: {
                            UID: '',//用户编号  int(11) 必填:1 默认值:,
                            Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                            Account: '',//账户名  char(50) 必填:1 默认值:,
                            PWD: '',//账户密码  char(250) 必填:1 默认值:,
                            CTime: '',//注册时间  int(10) 必填:1 默认值:,
                            CIP: '',//注册地址  int(11) 必填:1 默认值:,
                            CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                            Name: '',//姓名  char(50) 必填: 默认值:,
                            CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                            Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                            Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                            OpenID: '',//微信openid  char(50) 必填: 默认值:,
                            BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                        },
                        SnapJudgeUser: {
                            UID: '',//用户编号  int(11) 必填:1 默认值:,
                            Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                            Account: '',//账户名  char(50) 必填:1 默认值:,
                            PWD: '',//账户密码  char(250) 必填:1 默认值:,
                            CTime: '',//注册时间  int(10) 必填:1 默认值:,
                            CIP: '',//注册地址  int(11) 必填:1 默认值:,
                            CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                            Name: '',//姓名  char(50) 必填: 默认值:,
                            CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                            Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                            Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                            OpenID: '',//微信openid  char(50) 必填: 默认值:,
                            BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                        },
                        Assignor: {
                            UID: '',//用户编号  int(11) 必填:1 默认值:,
                            Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                            Account: '',//账户名  char(50) 必填:1 默认值:,
                            PWD: '',//账户密码  char(250) 必填:1 默认值:,
                            CTime: '',//注册时间  int(10) 必填:1 默认值:,
                            CIP: '',//注册地址  int(11) 必填:1 默认值:,
                            CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                            Name: '',//姓名  char(50) 必填: 默认值:,
                            CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                            Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                            Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                            OpenID: '',//微信openid  char(50) 必填: 默认值:,
                            BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                        },
                    },
                })
            },
            $carDic: {1: 'A级车', 2: "B级车", 3: "商务车"},        //    车型字典
            $TypeDic: {1: '短途', 2: '长途', 3: '接机', 4: '包车'},        //    行程字典
            UserStatus: "driver", //Driver:0,User:1
            spendTime: "",
            DriverName: "",
            DriverPhone: "",
            DriverInfo: {},
            DriverID: cache.go("UID"),
            //获取订单
            info: {
                OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                FromID: '',//订单来源 微信、电话; tinyint(1) 必填: 默认值:,
                Longitude: '',//下单纬度  double(15,3) 必填: 默认值:,
                Latitude: '',//下单经度  double(15,3) 必填: 默认值:,
                CTime: '',//下单时间  int(10) 必填:1 默认值:,
                CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                CUID: '',//下单人编号  int(11) 必填:1 默认值:,
                Phone: '',//用车人电话 默认为下单人电话 char(50) 必填:1 默认值:,
                Name: '',//用车人 默认为下单人姓名 char(50) 必填:1 默认值:,
                Time: '',//用车时间  int(10) 必填:1 默认值:,
                CarAmount: '',//需求数量  int(11) 必填:1 默认值:,
                CarType: '',//需求车型  tinyint(1) 必填: 默认值:,
                Memo: '',//其他需求描述  varchar(1000) 必填: 默认值:,
                SnapSendTime: '',//抢单发布时间  int(10) 必填:1 默认值:,
                Status: '',//订单状态 已下单，待抢单;已下单，待派单;抢单成功，等待审核;审核成功;指派成功; tinyint(1) 必填: 默认值:,
                SnapDriverID: '',//抢单司机编号  int(11) 必填:1 默认值:,
                SnapTime: '',//抢单时间  int(10) 必填:1 默认值:,
                SnapJudgeUID: '',//抢单审核人  int(11) 必填:1 默认值:,
                SnapJudgeTime: '',//抢单审核时间  int(10) 必填:1 默认值:,
                SnapJudteResult: '',//抢单审核结果  tinyint(1) 必填: 默认值:,
                AssignUID: '',//指派人  int(11) 必填:1 默认值:,
                AssignTime: '',//指派时间  int(10) 必填:1 默认值:,
                AssignDriverID: '',//指派司机编号  int(11) 必填:1 默认值:,
                StartTime: '',//行程开始时间  int(10) 必填:1 默认值:,
                EndTime: '',//行程结束时间  int(10) 必填:1 默认值:,
                Money: '',//行程费用  double(10,2) 必填: 默认值:,
                Evaluate: '',//服务评价  varchar(1000) 必填: 默认值:,
                Mileage: '',//里程数  double(10,2) 必填: 默认值:,
                PayTime: '',//订单结算时间  int(10) 必填:1 默认值:,
                Reason: '',//出行原因  varchar(1000) 必填: 默认值:,
                Type: '',//订单类型：1短途、2长途、3接机、4包车 tinyint(1) 必填:1 默认值:,
                Push: '',//发送推送 0不发送，1发送 tinyint(1) 必填:1 默认值:1,
                OtherMemo: '',//其他要求  varchar(1000) 必填: 默认值:,
                Billings: [
                    {
                        BillingID: '',//计价编号  int(11) 必填:1 默认值:,
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        Type: '',//计价类型  tinyint(1) 必填:1 默认值:,
                        Money: '',//计价值  double(10,2) 必填:1 默认值:,
                        Memo: '',//计价说明  char(250) 必填:1 默认值:,
                        CTime: '',//计价时间  int(10) 必填:1 默认值:
                    }
                ],
                Routers: [
                    {
                        RouteID: '',//行程编号  int(11) 必填:1 默认值:,
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        Address: '',//行程点  char(50) 必填:1 默认值:,
                        Time: '',//预期时间  int(10) 必填:1 默认值:,
                        TypeID: '',//行程类型 起点，中转，终点 tinyint(1) 必填:1 默认值:
                    }
                ],
                Statuses: [
                    {
                        StatusID: '',//状态编号  int(11) 必填:1 默认值:,
                        OrderID: '',//订单编号  int(11) 必填:1 默认值:,
                        Status: '',//状态码  tinyint(1) 必填:1 默认值:,
                        Memo: '',//状态备注  varchar(1000) 必填:1 默认值:,
                        CTime: '',//状态时间  int(10) 必填:1 默认值:,
                        CUID: '',//状态人  int(11) 必填:1 默认值:
                    }
                ],
                Company: {
                    CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                    Address: '',//企业地址  char(250) 必填:1 默认值:,
                    Contactor: '',//结算联系人  char(50) 必填:1 默认值:,
                    Title: '',//企业名称  char(50) 必填:1 默认值:,
                    CTime: '',//企业添加时间  int(10) 必填:1 默认值:,
                    Sum: '',//企业总计消费  double(10,2) 必填:1 默认值:,
                    Debt: '',//企业欠款  double(10,2) 必填:1 默认值:,
                    CUID: '',//企业添加人  int(11) 必填:1 默认值:,
                    Type: '',//企业类型  tinyint(1) 必填:1 默认值:1,
                    PerMileage: '',//里程单价  double(10,2) 必填: 默认值:,
                    PerHour: '',//时长单价  double(10,2) 必填: 默认值:,
                    Phone: '',//联系人电话  char(50) 必填: 默认值:
                }
                ,
                Creator: {
                    UID: '',//用户编号  int(11) 必填:1 默认值:,
                    Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                    Account: '',//账户名  char(50) 必填:1 默认值:,
                    PWD: '',//账户密码  char(250) 必填:1 默认值:,
                    CTime: '',//注册时间  int(10) 必填:1 默认值:,
                    CIP: '',//注册地址  int(11) 必填:1 默认值:,
                    CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                    Name: '',//姓名  char(50) 必填: 默认值:,
                    CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                    Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                    Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                    OpenID: '',//微信openid  char(50) 必填: 默认值:,
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                }
                ,
                SnapJudgeUser: {
                    UID: '',//用户编号  int(11) 必填:1 默认值:,
                    Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                    Account: '',//账户名  char(50) 必填:1 默认值:,
                    PWD: '',//账户密码  char(250) 必填:1 默认值:,
                    CTime: '',//注册时间  int(10) 必填:1 默认值:,
                    CIP: '',//注册地址  int(11) 必填:1 默认值:,
                    CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                    Name: '',//姓名  char(50) 必填: 默认值:,
                    CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                    Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                    Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                    OpenID: '',//微信openid  char(50) 必填: 默认值:,
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                }
                ,
                Assignor: {
                    UID: '',//用户编号  int(11) 必填:1 默认值:,
                    Phone: '',//账户手机号  char(50) 必填:1 默认值:,
                    Account: '',//账户名  char(50) 必填:1 默认值:,
                    PWD: '',//账户密码  char(250) 必填:1 默认值:,
                    CTime: '',//注册时间  int(10) 必填:1 默认值:,
                    CIP: '',//注册地址  int(11) 必填:1 默认值:,
                    CType: '',//注册方式  tinyint(1) 必填:1 默认值:,
                    Name: '',//姓名  char(50) 必填: 默认值:,
                    CompanyID: '',//企业编号  int(11) 必填:1 默认值:,
                    Status: '',//账户状态  tinyint(1) 必填:1 默认值:1,
                    Sex: '',//性别  tinyint(1) 必填:1 默认值:,
                    OpenID: '',//微信openid  char(50) 必填: 默认值:,
                    BirthDay: '',//出生日期  int(11) 必填:1 默认值:
                }
                ,
            }
            ,
            getOrder: function (i) {
                require(['../../obj/bridge/Order'], function (obj) {
                    obj.get(i, function (res) {
                        vm.info = res;
                        vm.getAddress(vm.info);
                        vm.renderAddress();
                        if (JSON.stringify(res.Driver) != "{}") {
                            if (res.Driver.User != undefined) {
                                vm.DriverPhone = res.Driver.User.Phone;
                                if (res.Driver.User.Name) {
                                    vm.DriverName = res.Driver.User.Name;
                                }
                            }

                            if( res.Driver.Cars!=undefined){
                                res.Driver.Cars.forEach(function (el) {
                                    if (el.CarID == res.AssignCarID) {
                                        vm.DriverInfo = el;
                                    }
                                })
                            }

                        }


                    })
                })
            }
            ,
            getAddress: function (el) {     //根据类型判断获取路径点的函数
                console.info(el)
                el.beginAddress = el.endAddress = el.otherAddress = "";     //新增的本地变量，当路径为空，为渲染时不将表达式渲染出来
                el.Routers.forEach(function (al) {
                    if (al.TypeID == 1 && al.Address) {
                        el.beginAddress += al.Address;
                    } else if (al.TypeID == 2 && al.Address) {
                        // if (el.otherAddress === "") {
                        //     el.otherAddress += "-";
                        // }
                        el.otherAddress += al.Address + "-"
                    } else if (al.TypeID == 3 && al.Address) {
                        el.endAddress += al.Address
                    }
                    // console.info("address:"+el.beginAddress);
                    // console.info("address:"+el.endAddress);
                })
            },

            Routers: [],
            beginAddress: {
                TypeID: "1",
                Address: ""
            },
            endAddress: {
                TypeID: "3",
                Address: ""
            },
            otherAddress: [],
            editAddressFlag: false,
            //渲染获取到的路径点，成为字符串
            changeAddress: function () {
                if (vm.editAddressFlag === false) {
                    vm.editAddressFlag = true;
                } else {
                    vm.editAddressFlag = false
                }
            },
            renderAddress: function () {
                vm.info.Routers.forEach(function (el) {
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
            },
            addWayPoints: function () {
                vm.otherAddress.push({
                    TypeID: "2",
                    Address: ''//行程点
                })
            },
            delWayPoints: function (id) {
                vm.otherAddress.splice(id, 1)
            },

            //为订单添加路径点
            saveAddress: function (OrderID, Time) {
                vm.Routers = [];
                vm.Routers.push(vm.beginAddress);
                vm.Routers.push(vm.endAddress);
                vm.Routers = vm.Routers.concat(vm.otherAddress);
                var obj = "Router";
                //发送数据
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    //删除
                    vm.info.Routers.forEach(function (el) {
                        if (el.TypeID == '2') {
                            obj.del(el.RouteID, function (res) {
                                console.log("路径点" + el.RouteID + "删除成功");
                            }, function (err) {
                                console.warn(err);
                                tip.on("路径点修改失败");
                                return
                            })
                        }
                    });
                    //添加
                    for (var i = 0; i < vm.Routers.length; i++) {
                        var data = {
                            OrderID: OrderID,
                            // Time: Time,
                            TypeID: vm.Routers[i].TypeID,
                            Address: vm.Routers[i].Address
                        };
                        if (el.TypeID != '2') {
                            obj.add(data, {
                                success: function (res) {
                                    console.log('路径点保存成功');
                                    vm.ready(vm.ID);
                                },
                                error: function (err) {
                                    console.warn(err);
                                    tip.on("路径点修改失败")
                                    return false;
                                }
                            })
                        }
                    }
                })
            },


            show_status: false,
            ShowHide: function () {
                vm.show_status = !vm.show_status;
                document.getElementById('here').scrollIntoView();
            },
            $opthey: {
                id: 'hey',
                tipType: 'both',//仅当参数为both时，显示为确定和取消
            },
            mileage: "",
            endTime: "",

            finishIt: function () {

                if (vm.editAddressFlag === true) {
                    if (vm.beginAddress.Address === "") {
                        document.getElementById('beginaddress').focus();
                        tip.on("请选择填入用车起点");
                        return false
                    }

                    if (vm.endAddress.Address === "") {
                        document.getElementById('beginaddress').focus();
                        tip.on("请选择填入用车终点");
                        return false
                    }
                }

                if (isIt.number(vm.mileage, '您输入的公里数') === false) {
                    return false;
                }
                if (vm.endTime < vm.info.StartTime) {
                    tip.on("小于订单开始时间，请重新输入");
                    return false;
                }

                vm.endTime = newDateAndTime(vm.endTime);
                var data = {
                    OrderID: vm.info.OrderID,
                    Mileage: vm.mileage,
                    EndTime: timeLengthFormat(vm.endTime, 's')
                };
                hey.confirm("确认信息", "确定输入了准确的公里数和订单结束时刻了吗？", function () {
                    vm.saveAddress(vm.info.OrderID)
                    require(['../../obj/bridge/Order'], function (Order) {
                        Order.finish(data.OrderID, data.Mileage, data.EndTime, function (res) {
                            tip.on("恭喜您，订单已完成！", 1, 3000);
                            hey.close()
                            vm.ready(vm.OrderID)
                        })
                    })
                })

            }

            ,
            //开始订单
            beginBill: function () {
                var date = new Date();
                var startTime = date.getTime();
                var data = {
                    OrderID: vm.info.OrderID,
                    StartTime: timeLengthFormat(startTime, 's')
                };
                hey.confirm("确认信息", "确认行程开始？", function () {
                    require(['../../obj/bridge/Order'], function (Order) {
                        Order.begin(data.OrderID, data.StartTime, function (res) {
                            tip.on("行程进行中", 1, 3000);
                            hey.close()
                            vm.ready(vm.OrderID)
                        })
                    })
                })
            }
            ,
            $Order_Type: {
                "1": "短途",
                "2": "长途",
                "3": "接机",
                "4": "包车"
            }
            ,
            $Car_Type: {
                "1": "商务",
                "2": "经济",
                "3": "舒适",
            }
            ,
            $OrderStatus: {
                "1": "待指派或抢单",
                "2": "已审核",
                "3": " 已发起抢单",
                "4": "抢到单，待审核",
                "5": "已通过抢单审核",
                "6": "已被指派",
                "7": "订单完成，等待结算",
                "8": "结算完成"
            }
        })
        ;
    return window[vm.$id] = vm
});