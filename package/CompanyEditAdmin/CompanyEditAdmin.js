/*
 后台企业编辑 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('CompanyEditAdmin', [
    'avalon',
    'text!../../package/CompanyEditAdmin/CompanyEditAdmin.html',
    'css!../../package/CompanyEditAdmin/CompanyEditAdmin.css',
    '../../plugins/isIt/isIt'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "CompanyEditAdmin",
        ready: function (i) {

            var obj = 'Company';
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
                    vm.PopPanelName = "编辑企业"
                    vm.status = 1
                    vm.ID = i
                    vm.getDetails(i)
                    return
                }
                vm.PopPanelName = "添加企业"
                //否则为add
                vm.status = 0
                vm.addInit()

            }


        },
        reset: function () {
            avalon.mix(vm, {
                status: '',
                ID: "",
                PopPanelName: "",
                details: {
                    Type: "",
                    Title: "",
                    Address: '',
                    Contactor: "",
                    // PerMileage:"",
                    // PerHour:"",
                    Phone: "",
                    Discount: ""
                },
            })
        },
        addInit: function () {
        },
        status: '',
        ID: "",
        PopPanelName: "",
        getDetails: function (id) {
            var obj = "Company"
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.get(id, {
                    success: function (res) {
                        vm.details = res
                    }
                })
            })
        },
        details: {
            Type: "",
            Title: "",
            Address: '',
            Contactor: "",
            // PerMileage:"",
            // PerHour:"",
            Phone: "",
            Discount: ""
        },
        add: function () {
            //非空判断，获取焦点,根据name进行查找

            if (!vm.details.Title) {
                // document.querySelector("[name='CompanyTitle']").setAttribute("class","form-control danger")
                document.querySelector("[name='CompanyTitle']").focus();
                tip.on("请填写公司名称");
                return
            }
            if (!vm.details.Contactor) {
                document.querySelector("[name='CompanyContactor']").focus();
                tip.on("请填写企业联系人");
                return
            }
            if (!vm.details.Discount) {
                document.querySelector("[name='CompanyDiscount']").focus();
                tip.on("请填写折扣区间");
                return
            }
            if (!vm.details.Type) {
                document.querySelector("[name='CompanyType']").focus();
                tip.on("请选择企业类型");
                return
            }
            if (!vm.details.Phone || /(^\s+)|(\s+$)/.test(vm.details.Phone)) {
                document.querySelector("[name='CompanyPhone']").focus();
                tip.on("请填写企业联系电话");
                return
            }
            if (!vm.details.Address) {
                document.querySelector("[name='CompanyAddress']").focus();
                tip.on("请填写企业地址");
                return
            }


            if (vm.details.Discount > 100 || vm.details.Discount < 0) {
                tip.on("不合法的折扣区间", 0, 3000);
                vm.details.Discount = 0;
                return
            }
            if (isIt.number(vm.details.Discount, "") === false) {
                return
            }
            if (isIt.mobile(vm.details.Phone, "") === false) {
                return
            }
            var data = {
                Title:vm.details.Title,
                Contactor:vm.details.Contactor,
                Discount:vm.details.Discount,
                Type:vm.details.Type,
                Phone:vm.details.Phone,
                Address:vm.details.Address
            };
            //加载基础数据
            var obj = "Company";
            if (vm.status == 1) {
                //调用保存方法
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.save(vm.ID, data, {
                        success: function (res) {
                            tip.on('企业保存成功', 1);
                            pop.close();


                            //更新条目
                            require(['../../package/CompanyListAdmin/CompanyListAdmin'], function (pack) {
                                ForEach(pack.list, function (el, index) {
                                    if (el.CompanyID == res.CompanyID) {
                                        avalon.mix(el, res)
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
                        tip.on('企业创建成功', 1)
                        pop.close()

                        //重新获取列表
                        require(['../../package/CompanyListAdmin/CompanyListAdmin'], function (pack) {
                            pack.search(pack.P);
                        })
                    }
                })
            })


        },

        del: function () {
            if (confirm('删除企业后，企业下的用户将全部删除，并且不可恢复，确定删除？')) {
                var obj = "Company"
                require(['../../obj/Management/' + obj + '.js'], function (obj) {
                    obj.del(vm.ID, {
                        success: function (res) {
                            tip.on('删除成功', 1)
                            pop.close()

                            //重新获取列表
                            require(['../../package/CompanyListAdmin/CompanyListAdmin'], function (pack) {
                                pack.search(pack.P)
                            })
                        }
                    })
                })
            }
        }

    })
    return window[vm.$id] = vm
})