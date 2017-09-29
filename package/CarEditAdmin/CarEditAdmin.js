/**
 * Created by Chris Chang on 2016/11/1.
 */

define('DriverCarEditAdmin', [
    'avalon',
    'text!../../package/CarEditAdmin/CarEditAdmin.html',
    'css!../../package/CarEditAdmin/CarEditAdmin.css',
    '../../lib/find/find',
    '../../lib/switch/switch'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "CarEditAdmin",
        ready: function (i, DriverJudge) {
            var obj = 'Cars';
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset();
                pop.open(html);

                //为编辑
                if (i > 0) {
                    vm.PopPanelName = "修改车辆";
                    vm.status = 1;
                    vm.ID = i;
                    if (DriverJudge === undefined) {
                        vm.DriverJudge = -1;
                    } else {
                        vm.DriverJudge = DriverJudge;
                    }
                    vm.getDetails(i);
                } else {
                    vm.PopPanelName = "添加车辆";
                    vm.status = 0;
                }


            }
        },
        reset: function () {
            avalon.mix(vm, {
                DriverJudge: -1,
                status: '',
                ID: "",
                PopPanelName: "",
                details: {
                    CarID: 0,
                    Number: "",
                    Title: "",
                    Status: "",
                    Color: "",
                    MotTime:"",
                    CarInsuranceTime:"",
                    Upkeep:"",
                }
            });
            vm.cars = []
        },
        DriverJudge: -1,
        status: '',
        ID: "",
        PopPanelName: "",
        getDetails: function (id) {
            var obj = "Cars"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(id, {
                    success: function (res) {
                        vm.details = res

                        //DEACInput.Keywords = res.Company.Title

                        vm.bindedCars = res.Cars

                        CS_switch.toggle(res.Status)

                    }
                })
            })
        },
        details: {
            CarID: 0,
            Number: "",
            Title: "",
            Status: 1,
            Color: "",
            MotTime:"",
            CarInsuranceTime:"",
            Upkeep:"",
        },


        add: function () {
            //todo 整合数据
            var data = {
                CarID: 0,
                Number: "",
                Title: "",
                Status: 1,
                Color: "",
                Upkeep:"",
            };

            ForEach(data,function (val, key) {
                data[key]=vm.details[key]
            })

            if(vm.details.MotTime>0){
                data.MotTime=vm.details.MotTime
            }
            if(vm.details.CarInsuranceTime>0){
                data.CarInsuranceTime=vm.details.CarInsuranceTime
            }
            //加载基础数据
            // avalon.mix(data, vm.details)

            //todo 验证数据
            //if (data.Target == "") {
            //    tip.on("食谱类型选择错误")
            //    return
            //}
            var obj = "Cars";


            if (vm.status == 1) {
                //调用保存方法
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.save(vm.ID, data, {
                        success: function (res) {
                            tip.on('保存成功', 1);
                            pop.close();
                            //更新条目
                            if (vm.DriverJudge < 0) {
                                pop.close();
                                vm.ready(vm.ID);

                                require(['../../package/CarListAdmin/CarListAdmin'], function (pack) {
                                    //车辆管理导航下的刷新
                                    ForEach(pack.list, function (el, index) {
                                        if (el.CarID == res.CarID) {
                                            avalon.mix(el, res)
                                        }
                                    })
                                })
                            } else {
                                // window.location.reload();
                                pop.close();
                                require(['../../package/CarInfoAdmin/CarInfoAdmin'], function (pack) {
                                    pack.ready(vm.DriverJudge);
                                })
                            }

                        }
                    })
                })

                return
            }

            //发送数据
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.add(data, {
                    success: function (res) {
                        tip.on('创建成功', 1);
                        pop.close();
                        vm.ready(vm.ID);
                        require(['../../package/CarListAdmin/CarListAdmin'], function (pack) {
                            pack.search(pack.P);
                        })
                    }
                })
            })
        },
        del: function () {
            if (confirm('删除该车车辆信息后，将不可恢复，确定删除？')) {
                var obj = "Cars"
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.del(vm.ID, {
                        success: function (res) {
                            tip.on('删除成功', 1)
                            pop.close()

                            //重新获取列表
                            require(['../../package/CarListAdmin/CarListAdmin'], function (pack) {
                                pack.search(pack.P)
                            })
                        }
                    })
                })
            }
        },

        $optCarStatus: {
            id:"CS_switch",
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
                vm.details.Status = value
            }
        },

    })
    return window[vm.$id] = vm
})