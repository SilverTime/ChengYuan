/*
 pop 内在灵魂，沉稳坚毅
 生成时间：Fri Mar 11 2016   破门狂人R2-D2为您服务！

 弹出框组件，
 */
define('pop', [
    'avalon',
    'text!../../lib/pop/pop.html',
    'css!../../lib/pop/pop.css'
], function (avalon, html, css) {
    avalon.component('tsy:pop', {
        $template: html,
        id: "",
        /*
         * ***************参数队列区**************************/
        width: "960",//弹出框宽度
        state: 0,//弹出框状态值，0为关闭状态，1，介于开启和关闭的状态,2开启状态
        html:"",

        /*
         * ***************函数空位**************************/
        open: function () {

        },
        close: function () {

        },


        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            //将参数放入对于的地方
            //try {
            //    if(elem.data('lv')!=undefined){
            //        //vm.lv = elem.data('lv')
            //        //todo 改写上方的'lv'为你想要获取到的值
            //    }
            //} catch (err) {
            //}

            //函数加载区

            //开启方法
            vm.open = function (html) {
                vm.html = html
                vm.state = 2
                document.body.style.overflow = "hidden"
                document.body.style.marginRight="17px"
                var audioElement = document.getElementById(vm.id + "open");
                audioElement.volume = 0.2
                audioElement.load;
                audioElement.play();
            }

            //关闭方法
            vm.close = function () {
                if(vm.state==0){
                    return
                }
                vm.state = 1
                var audioElement = document.getElementById(vm.id + "close")
                audioElement.volume = 0.2
                audioElement.load;
                audioElement.play();
                setTimeout(function () {
                    vm.state = 0
                    document.body.style.overflowY = "scroll"
                    document.body.style.marginRight="0px"
                    vm.html = ''
                }, 250)
            }


            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {

        },


    })
})