/*
编辑车辆信息 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
*/
define('EditCarInfo',[
    'avalon',
    'text!../../package/EditCarInfo/EditCarInfo.html',
    'css!../../package/EditCarInfo/EditCarInfo.css',
    'dic',
    '../../obj/bridge/Cars.js'
], function (avalon, html, css,dic,Cars) {
    //构建基础字段
    var base = {}
    avalon.mix(base, dic)
    base.info = Cars.obj

    var vm=avalon.define(avalon.mix({
        $id:"EditCarInfo",

        //传入的i 为 :CarID&&DriverID
        //如果是添加：0&&DriverID
        ready: function (i) {
            var obj=''
            if(obj!=""){
                require(['../../obj/Management/'+obj+'.js'], function () {
                    start()
                })
            }else{
                start()
            }

            function start(){
                var params=String(i).split('&&')
                vm.reset(params)
                index.html=html

                //以及其他方法
                vm.getCarInfo(params[0])
            }


        },
        reset: function (params) {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                CarID:params[0],
                DriverID:params[1]
            })
        },

        //获取车辆信息
        getCarInfo: function (id) {
            Cars.get(id, function (res) {
                vm.info=res
            })
        },

        //保存车辆信息
        save: function () {
            var data={
                Title:  vm.info.Title ,//车型  char(50) 必填:1 默认值:,
                Number: vm.info.Number,//车牌号  char(50) 必填:1 默认值:,
                Color:  vm.info.Color,//颜色  char(50) 必填:1 默认值:,
            }

            if(vm.CarID>0){
                //保存
                Cars.save(vm.CarID,data, function (res) {
                    window.history.go(-1)
                })
                return
            }

            //不然就是添加
            Cars.add(data, function (res) {
                //绑定到司机身上
                $$.call({
                    i:"Management/Drivers/bind",
                    data:{
                        Property:"Cars",
                        Data:[{CarID:res.CarID}],
                        DriverID:vm.DriverID
                    },
                    success: function (res) {
                        tip.on('保存成功',1)
                        window.history.go(-1)
                    }
                })
            })

        }

    },base))
    return window[vm.$id]=vm
})