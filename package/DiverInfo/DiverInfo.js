/*
 订单详情 内在灵魂，沉稳坚毅
 生成时间：Fri Nov 11 2016   破门狂人R2-D2为您服务！
 */
define('DiverInfo',[
    'avalon',
    'text!../../package/DiverInfo/DiverInfo.html',
    'css!../../package/DiverInfo/DiverInfo.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"DiverInfo",
        //    传入的i为用户编号UID！！
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
                vm.reset()
                index.html=html

                //以及其他方法
                //    传入的i为用户编号UID！！
            }


        },
        reset: function () {
            avalon.mix(vm,{
                tab_which:"left",
            })
        },
        tab_which:"left",
        orderList:function(){
            vm.tab_which='left';
        },
        orderChase:function(){
            vm.tab_which='right';
        },


        //获取司机信息



    })
    return window[vm.$id]=vm
})