/**
 balalalala
 By 张功

 提示对话框组件
 */
define('hey', [
    'avalon',
    'text!../../lib/hey/hey.html',
    'css!/hey.css',
    'css!../../src/css/font-awesome.min.css',
    'css!/innericon/iconfont.css'
], function (avalon, html, css) {
    avalon.component('tsy:hey', {
        $template: html,
        id: "",

        /*
        * **************使用both或both_double时的必须配置项***********************/
        tipType: '',//不配置、both、both_double

        /*
        * **  both-own 的字体颜色设置配置 ********/
        titleColor: "#ff0000",
        btn1Color: "#777777",
        btn2Color: "#000066",

        /*
         * ***************参数队列区**************************/
        width: "300px",//弹出框宽度
        height: "200px",//弹出框高度
        x: "auto",//左偏移量
        y: "12%",//上偏移量
        state: 0,//弹出框状态值，0为关闭状态，1，介于开启和关闭的状态,2开启状态
        tipState: 1,//三种状态 0：成功，蓝色    1：错误警告，红色    2:失败,橘黄色
        html: "",
        title: "",





        /*
         * ***************函数空位**************************/
        success: function () {
        },
        error: function () {
        },
        fail: function () {
        },

        close: function () {
        },

        //both
        confirm: function () {
        },
        func: function () {
        },

        //both-own
        btn1Text: "",
        btn2Text: "",

        confirmLR: function () {
        },
        func_btn1: function () {
        },
        func_btn2: function () {
        },
        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)

            //开启方法
            vm.success = function (title, html) {
                vm.title = title;
                vm.html = html;
                vm.tipState = 0;
                vm.state = 2;
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = "17px";
            }
            vm.error = function (title, html) {
                vm.title = title;
                vm.html = html;
                vm.tipState = 1;
                vm.state = 2;
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = "17px";
            }
            vm.fail = function (title, html) {
                vm.title = title;
                vm.html = html;
                vm.tipState = 2;
                vm.state = 2;
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = "17px";
            }

            //关闭方法
            vm.close = function () {
                vm.state = 1;
                var audioElement = document.getElementById(vm.id + "close")
                setTimeout(function () {
                    vm.state = 0;
                    document.body.style.overflow = "auto";
                    document.body.style.marginRight = "0";
                    vm.html = ''
                }, 250)
            }


            //可传入回调的取消，确认提示    both
            vm.confirm = function (title, html, callback) {
                vm.title = title;
                vm.html = html;
                vm.tipState = 0;
                vm.state = 2;
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = "17px";
                vm.func = callback;
            };

            //传入两个回调双回调提示    both_double
            vm.confirmLR = function (title, html, btn1Text, callbackLeft, btn2Text, callabackRight) {
                vm.title = title;
                vm.html = html;
                vm.tipState = 0;
                vm.state = 2;
                vm.btn1Text = btn1Text;
                vm.btn2Text = btn2Text;
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = "17px";
                vm.func_btn1 = callbackLeft;
                vm.func_btn2 = callabackRight;
            }


            if (vm.id != "") {
                window[vm.id] = vm
            }
        },
        $ready: function (vm, elem) {

        },


    })
})