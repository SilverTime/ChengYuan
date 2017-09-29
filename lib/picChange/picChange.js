/**
 * Created by Chris Chang on 2016/9/9.
 */
define('picChange', [
    'avalon',
    'text!../../lib/picChange/picChange.html',
    'css!../../lib/picChange/picChange.css'
], function (avalon, html, css) {
    avalon.component('tsy:picchange', {
        $template: html,
        id: "",
        /*
         * ***************参数队列区**************************/
        //图片盒子的大小
        box_width:"100",
        box_height:"auto",
        //左右切换箭头
        arrowLorR:{
            left:{src:''},
            right:{src:''}
        },
        images: [],

        //焦点的位置
        cir_posx:"600px",
        cir_posy:"0",



        moving: false,
        now: 0,
        last: 0,
        direction: '',
        //定时播放
        autoshow: false,
        /*
         * ***************函数空位**************************/
        changeNow: function () {
        },
        clickShow: function () {
        },
        timeShow: function () {
        },
        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            try {
                if (elem.data('id') != undefined) {
                    vm.id = elem.data('id')
                }
            } catch (err) {
            }
            //加载函数
            avalon.mix(vm, {
                changeNow: function (index) {
                    if (vm.moving) {
                        return
                    }
                    if (index >= vm.images.length) {
                        index = 0
                    }
                    if (index < 0) {
                        index = vm.images.length - 1
                    }
                    if (vm.last < index) {
                        vm.direction = 'right'
                    } else {
                        vm.direction = 'left'
                    }
                    vm.last = index
                    vm.now = index
                    vm.moving = true
                    setTimeout(function () {
                        vm.moving = false
                    }, 1000)
                },
                //点击切换
                clickShow: function (x) {
                    vm.autoshow = false;
                    vm.changeNow(x);
                    clearTimeout(vm.timeis)
                    vm.timeShow();
                },
                //自动轮播
                timeShow: function () {
                    clearTimeout(vm.timeis)
                    vm.timeis = setTimeout(
                        function () {
                            vm.autoshow = true;
                            vm.changeNow(vm.now + 1)
                            vm.timeShow()
                        }
                        , 7000)
                }
            });
            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {
            vm.timeShow()
        },


    })
})