/**
 * Created by Chris Chang on 2016/11/2.
 */

define('ShowDriversInfo', [
    'avalon',
    'text!../../package/ShowDriversInfo/ShowDriversInfo.html',
    'css!../../package/ShowDriversInfo/ShowDriversInfo.css',
    '../../lib/find/find'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "ShowDriversInfo",
        ready: function (i) {

            var obj = 'Drivers'
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
                //index.html=html

                //以及其他方法
                /*
                 * 如果i为0则为添加
                 * 如果i大于0为编辑，i为id
                 * */

                if (i > 0) {
                    //为编辑
                    vm.PopPanelName="编辑司机";
                    vm.status = 1
                    vm.ID = i
                    vm.getDetails(i)
                    return
                }

                //否则为add
                vm.PopPanelName="添加司机"
                vm.status = 0
                vm.addInit()
            }
        },
        reset: function () {
            avalon.mix(vm, {
                status: '',
                ID: "",
                PopPanelName:"",
            })
            vm.cars = []
        },
        addInit: function () {
            vm.addCarInput(1)
        },
        status: '',
        ID: "",
        PopPanelName:"",
        getDetails: function (id) {
            var obj = "Drivers"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(id, {
                    success: function (res) {
                        vm.details = res

                        //DEACInput.Keywords = res.Company.Title

                        vm.bindedCars=res.Cars
                    }
                })
            })
        },
        details: {
            User: {
                Phone: "",
                Account: "",
                PWD: "",
                Name: "",
                CompanyID: 2,
                Status: "",
                Sex: "1",

            },
            SumMoney: "",
            Debt: "",
        },
        $optUserStatus: {
            nowVal: '1',
            left: {
                label: "启用",
                value: "1"
            },
            right: {
                label: "禁用",
                value: "-1"
            },
            callback: function (value) {
                vm.details.User.Status = value
            }
        },

        add: function () {
            //todo 整合数据
            var data = {}
            //加载基础数据
            avalon.mix(data, vm.details)
            data.User = avalon.mix({}, vm.details.User)

            //todo 验证数据
            //if (data.Target == "") {
            //    tip.on("食谱类型选择错误")
            //    return
            //}
            var obj = "Drivers"


            if (vm.status == 1) {
                //调用保存方法
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.save(vm.ID, data, {
                        success: function (res) {
                            tip.on('保存成功', 1)
                            vm.ready(vm.ID)
                            //更新条目
                            require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                                ForEach(pack.list, function (el, index) {
                                    if(el.UID==res.UID){
                                        avalon.mix(el,res)
                                    }
                                })
                            })
                        }
                    })
                })

                return
            }

            //发送数据
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.add(data, {
                    success: function (res) {
                        tip.on('创建成功', 1)
                        vm.ready(vm.ID)
                        require(['../../package/DriverListAdmin/DriverListAdmin'], function (pack) {
                            pack.search(pack.P)
                        })
                    }
                })
            })


        },


        //车辆数据
        $car: {
            CarID: "",
            Title: "",
            Number: "",
            Color: "",
            Status: '',//1空闲、-1维修、2出行、-2不可用
        },
        carStatus: {
            '1': '空闲',
            '-1': '维修',
            '2': '出行中',
            '-2': '禁用',
        },
        bindedCars:[],
        cars: [],


        //增加列表项
        addCarInput: function (n) {
            function add() {
                vm.cars.push(vm.$car)
            }

            for (var i = 0; i < n; i++) {
                add()
            }
        },

        //车辆动态搜索
        $optCar: {
            callback: function (res, id) {
                //获得行数
                var row = id.split("DEACarInput")[1]
                //填入
                avalon.mix(vm.cars[row], {
                    CarID: res.CarID,
                    Title: res.Title,
                    Number: res.Number,
                    Color: res.Color,
                    Status: res.Status//1空闲、-1维修、2出行、-2不可用
                })

            },
            onInput: function (cvm) {
                var row = cvm.id.split("DEACarInput")[1]
                avalon.mix(vm.cars[row], vm.$car)
            },
            target: "Cars",
            keyName: 'Number',
            placeholder: "输入车牌号码"
        },

        //删除列表项：
        delCarInput: function (i) {
            vm.cars.splice(i, 1)
        },

        //绑定车辆
        bindCar: function () {
            require(['../../obj/Management/Cars'], function (obj) {
                var oldCars = []
                var newCars = []
                var errCars = []
                var adding = 0
                var addErr=0
                var empty=0

                ForEach(vm.cars, function (el, index) {

                    if (el.CarID > 0) {
                        //添加到老车列表中
                        oldCars.push({
                            CarID: el.CarID
                        })

                        bind()
                    } else {
                        //抓取要判断的东西
                        var Title = el.Title,
                            Number = window['DEACarInput' + index].Keywords,
                            Color = el.Color,
                            Status = el.Status

                        //忽略掉空白的条目
                        if (Title == "" && Number == '' && Color == "") {
                            empty++
                            return
                        }


                        //抓出数据不完整的东西
                        if (Title == "" || Number == '' || Color == "") {
                            errCars.push(index)
                            return
                        }

                        //需要新添加的车辆
                        addCar({
                            Title: Title,
                            Number: Number,
                            Color: Color,
                            Status: Status,
                        })


                    }


                    function addCar(data) {
                        adding++
                        obj.add(data,{
                            success: function (res) {

                                oldCars.push({
                                    CarID: res.CarID
                                })
                                vm.cars[index]=res
                                addOver(true)
                            },
                            error: function (err) {
                                addOver(false)
                                tip.on(err)
                            }
                        })
                    }

                    //添加完毕之后的统一操作
                    function addOver(success){
                        adding--
                        if(!success){
                            addErr++
                        }

                        bind()
                    }

                    //全部整理完毕之后的绑定操作
                    function bind(){
                        //判断是否真的完毕了
                        if(adding>0||addErr>0){
                            return
                        }

                        if(errCars.length>0){
                            //todo 提示
                            return
                        }

                        if(oldCars.length<vm.cars.length-empty){
                            //还没有统计完
                            return
                        }

                        //开始绑定

                        $$.call({
                            i:"Management/Drivers/bind",
                            data:{
                                Property:"Cars",
                                Data:oldCars,
                                DriverID:vm.ID
                            },
                            success: function (res) {
                                tip.on('保存成功',1)
                                vm.ready(vm.ID)
                            }
                        })
                    }
                })
            })
        },

        //接触绑定
        unbindCar: function (id) {
            $$.call({
                i:"Management/Drivers/unbind",
                data:{
                    Property:"Cars",
                    Data:[{CarID:id}],
                    DriverID:vm.ID
                },
                success: function (res) {
                    tip.on('保存成功',1)
                    vm.ready(vm.ID)
                }
            })
        },


        //企业动态搜索
        $optFindCompany: {
            callback: function (res) {
                vm.details.User.CompanyID = res.CompanyID
            },
            onInput: function () {
                vm.details.User.CompanyID = ''
            },
            target: "Company",
            keyName: 'Title',
            placeholder: "搜索企业"
        },


    })
    return window[vm.$id] = vm
})