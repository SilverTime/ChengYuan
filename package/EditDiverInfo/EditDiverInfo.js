/*
编辑司机信息 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
*/
define('EditDiverInfo',[
    'avalon',
    'text!../../package/EditDiverInfo/EditDiverInfo.html',
    'css!../../package/EditDiverInfo/EditDiverInfo.css',
    'dic',
    '../../obj/bridge/User'
], function (avalon, html, css,dic,User) {

    //构建基础字段
    var base = {}
    avalon.mix(base, dic)
    base.info = User.obj

    var vm=avalon.define(avalon.mix({
        $id:"EditDiverInfo",
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
                vm.reset(i)
                index.html=html

                //以及其他方法
                vm.getOldInfo(i)

            }


        },
        reset: function (i) {
            avalon.mix(vm,{
                //要重置的东西最后都放回到这里
                UID:i
            })
        },
        UID:0,

        //获取司机信息
        getOldInfo: function (DID) {
            User.get(DID, function (res) {
                vm.info=res
            })
        },

        //提交编辑
        save: function () {
            var data={
                Name:vm.info.Name,
                Phone:vm.info.Phone,
                Sex:vm.info.Sex
            }

            if(data.Name==""){
                tip.on('姓名不能为空')
                return
            }

            User.save(vm.UID,data, function (res) {
                goto('#!/DriverInfo/'+res.UID)
            })
        }

    },base))
    return window[vm.$id]=vm
})