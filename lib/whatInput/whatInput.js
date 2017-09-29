/**
 * Created by Chris Chang on 2016/4/27.
 */
define('whatInput', [
    'avalon',
    'text!../../lib/whatInput/whatInput.html',
    'css!../../lib/whatInput/whatInput.css',
    'css!../../src/css/font-awesome.min.css'
], function (avalon, html, css) {

    avalon.component("tsy:input", {
        id: "itip",
        $init: function (vm, elem) {
            //获取将要构建为组件的元素
            //vmodel = this

            elem = avalon(elem);
            //抓取<tsy:whatinput ms-data-id="whatinput">元素内的配置ms-data-id的值
            try {
                if (elem.data('id') != undefined) {
                    vm.id = elem.data('id')
                }
            } catch (err) {
            }


            //加载组件的方法（所有需要调用VM内部属性的方法，都要在VM上先设置方法例如第56行，然后再这里来加载具体的函数逻辑）

            //判断时间，还原状态

            function setState(i, tip) {
                avalon.mix(vm, {
                    state: i,
                    state_icon: i,
                    tip: tip,
                    state_last: i
                })
            }

            function default_time(timeout) {

                clearTimeout(vm.timeout)
                var time = 0;
                if (timeout != null) {
                    time = timeout
                }
                else {
                    time = 5000
                }
                vm.timeout = setTimeout(function () {
                    vm.state = 0;
                }, time);
            }

            vm.default = function () {
                setState(0, '')
            }
            vm.info = function (tip, timeout) {
                //信息（蓝色）
                setState(3, tip)
                default_time(timeout);
            };
            vm.warning = function (tip, timeout) {
                //警告（橙棕色）
                setState(2, tip)
                default_time(timeout);
            };
            vm.error = function (tip, timeout) {
                //警告（红色）
                setState(1, tip)
                default_time(timeout);
            };
            vm.success = function () {
                vm.state_last = 0;
                vm.state = 0;
                vm.state_icon = 4;
            };


            //本处监听focus事件

            vm.addEventHandler = function (oTarget, sEventType, fnHandler) {
                if (oTarget.addEventListener) {
                    oTarget.addEventListener(sEventType, fnHandler, false);
                } else if (oTarget.attachEvent) {
                    oTarget.attachEvent("on" + sEventType, fnHandler);
                } else {
                    oTarget["on" + sEventType] = fnHandler;
                }
            };
            vm.addEventHandler(elem.element.lastElementChild, 'focus', function () {
                vm.state_focus = 1;
                setTimeout(vm.tip_not, 2000)
            });
            vm.addEventHandler(elem.element.lastElementChild, 'blur', function () {
                vm.state_focus = 0;
            }, false);


            vm.addFocus = function () {
                if (vm.click_whether === false) {
                    vm.click_whether = true;
                }
                else {
                    vm.click_whether = false;
                }
                elem.element.lastElementChild.getElementsByTagName('input')[0].focus();
                vm.state = vm.state_icon;
            };


            //state_again方法用来设置vm.state的状态
            function set_state(willing_state) {
                vm.state = willing_state;
            };

            //鼠标over时触发本事件
            vm.move_on = function () {
                setTimeout(function () {
                    if (vm.state_focus != 1) {
                        vm.tip_again();
                    }
                }, 5000)
            };


            //设置state的值，用以重新显示tip
            vm.tip_again = function () {
                var temp = vm.state_icon;
                if (vm.state_icon == 4) {
                    temp = 0;
                }
                //非focus状态悬浮才可以显示
                set_state(temp);
            };
            //tip的消失
            vm.tip_not = function () {
                //clearTimeout(vm.not_settime)
                vm.not_settime = setTimeout(function () {
                    if (vm.state > 0 && vm.state < 4) {
                        set_state(0)
                    }
                    else if (vm.state == 0 && vm.click_whether == false) {
                        set_state(0)
                    }
                }, 250)
            };


            //将VM暴露到全局以供调用
            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {
        },
        $template: html,
        core: "",//从外部进来的input
        label: "",
        sign: "",
        //提示文本的内容
        tip: "",

        timeout: '',

        state: 0,
        state_last: 0,//保存上一个状态的值，进行持续错误的判断
        state_icon: 0,//图标的状态，将保持上一个的状态
        state_focus: 0,
        click_whether: false,

        /*输入框状态：
         * 0 —— 默认状态
         * 1 —— 失败
         * 2 —— 警告
         * 3 —— 信息
         * 4 —— 成功
         * */

        //提示弹出的方法
        default: function () {

        },
        info: function () {
            //提示(这里是占位的函数，在$init中编写函数用于加载相关的方法)
        },
        warning: function () {
            //警告(这里是占位的函数，在$init中编写函数用于加载相关的方法)
        },
        error: function () {
            //错误(这里是占位的函数，在$init中编写函数用于加载相关的方法)
        },
        //设置为成功的方法
        success: function () {
            //成功，
        },

        //
        tip_again: function () {
            //持续错误
        },
        tip_not: function () {
            //鼠标移开错误
        },

        addEventHandler: function () {

        },
        addFocus: function () {

        },
        move_on: function () {

        }

    })
});