/*
 后台企业详情 内在灵魂，沉稳坚毅
 生成时间：Sat Oct 08 2016   破门狂人R2-D2为您服务！
 */
define('CompanyInfoAdmin',[
    'avalon',
    'text!../../package/CompanyInfoAdmin/CompanyInfoAdmin.html',
    'css!../../package/CompanyInfoAdmin/CompanyInfoAdmin.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"CompanyInfoAdmin",
        ready: function (i) {

            var obj='Company'
            if(obj!=""){
                require(['../../obj/Management/'+obj+'.js'], function () {
                    start()
                })
            }else{
                start()
            }

            function start(){
                vm.reset()
                index.html=html

                //以及其他方法
                /*
                 * 如果i为0则为添加
                 * 如果i为1则为编辑，并第二个参数为ID
                 * */
                vm.wayf = i

                var whereAreYouFrom = String(i).split("&&")
                vm.status = whereAreYouFrom[0]
                switch (Number(whereAreYouFrom[0])) {
                    case 0:
                        vm.addInit()
                        break
                    case 1:
                        //获取原来食谱的东西放进去，提交的时候用save
                        avalon.mix(vm, {
                            ID: whereAreYouFrom[1]
                        })
                        vm.getDetails(vm.ID)
                        break

                    default :
                        window.location.href = '#!/CompanyInfoAdmin/0'
                        return
                        break
                }
            }


        },
        reset: function () {
            avalon.mix(vm,{
                status: '',
                ID: "",
                //todo 要重置的东西最后都放回到这里
            })
        },
        addInit: function () {
            //todo 添加重置新增后台企业详情的操作
        },
        status: '',
        ID: "",
        getDetails: function (id) {
            var obj="Company"
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.get(id,{
                    success: function (res) {
                        vm.details=res
                    }
                })
            })
        },
        details:{},
        add: function () {
            //todo 整合数据
            var data = {}
            //加载基础数据
            avalon.mix(data,vm.details)

            //todo 验证数据
            //if (data.Target == "") {
            //    tip.on("食谱类型选择错误")
            //    return
            //}
            var obj="Company"


            if (vm.status == 1) {
                //调用保存方法
                require(['../../obj/Management/'+obj+'.js'],function (obj){
                    obj.save(vm.ID, data, {
                        success: function (res) {
                            tip.on('后台企业详情保存成功', 1)
                            goto('#!/CompanyInfoAdmin/' + res[obj+'ID'])
                        }
                    })
                })

                return
            }

            //发送数据
            require(['../../obj/Management/'+obj+'.js'],function (obj){
                obj.add(data, {
                    success: function (res) {
                        tip.on('后台企业详情创建成功', 1)
                        goto('#!/CompanyInfoAdmin/' + res[obj+'ID'])

                    }
                })
            })


        },

    })
    return window[vm.$id]=vm
})