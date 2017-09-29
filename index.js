/**
 * Created by mooshroom on 2015/12/11.
 */
/*………………………………………………………………………………………………全局配置………………………………………………………………………………………………*/
//var apiURL = './index.php?i=';
var apiURL='http://mychengyuan.dev.tansuyun.cn/index.php?i='
//alert("开始请求3" + apiURL);
// $$.call({
//     i: 'Wechat/getJSTicket',
//     data: {},
//     success: function (res) {
//         //console.log(res)
//         //alert(res)
//         //try{
//         wxgetReady(res.ticket);
//         //}catch(err){err.message}
//     }
// })
/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
wx.ready(function () {
    //tip.on("微信SDK接入成功",1,700)
})
wx.error(function (res) {
    tip.on(JSON.stringify(res));
});
cache.go({
    tsy:""
})
doorWX.getCode();

/*………………………………………………………………………………………………index的视图模型………………………………………………………………………………………………*/
require([
    'avalon',
    'mmRequest',
    '../../plugins/Gate/Gate.wechat.js',
], function (avalon,mmRequest,newGate) {
    var vm = avalon.define({
        $id: "index",
        ready: function () {
            require([
                "mmRouter",
            ], function () {

                //构建导航的路由
                getMap(vm.nav);

                console.log("路由构建完毕")
                //发起请求获取用户信息
                vm.getUser(function () {
                    //开始监听

                    window.Gate = newGate({
                        autoLoginAPI: "Management/User/loginByWechat",//进行验证的接口编号
                        haveLogin: function (res) {
                            console.log("成功登录");

                        },
                        notLogin: function (res) {
                            // console.log("成功登录");

                        }
                    });
                    avalon.history.start();
                    avalon.scan();
                })

            })

        },
        reset: function () {

        },

        html: '',
        //路由
        nav: [

            {
                name: '用户绑定',
                en: 'WSLogin',
                href: '#!/WSLogin/0',
                vm: "../../package/WSLogin/WSLogin.js"
            },
            {
                name: '司机订单列表',
                en: 'DriverCenter',
                href: '#!/DriverCenter/0',
                vm: "../../package/DriverCenter/DriverCenter.js"
            },
            {
                name: '客户订单列表',//我的信息
                en: 'CusCenter',
                href: '#!/CusCenter/0',
                vm: "../../package/CusCenter/CusCenter.js"
            },
            {
                name: '下单',
                en: 'NewOrder',
                href: '#!/NewOrder/0',
                vm: "../../package/NewOrder/NewOrder.js"
            },
            {
                name: '订单详情',
                en: 'OrderInfo',
                href: '#!/OrderInfo/0',
                vm: "../../package/OrderInfo/OrderInfo.js"
            },
            {
                name: '司机信息',//司机的信息,包含我的信息和我的车辆
                en: 'DiverInfo',
                href: '#!/DiverInfo/0',
                vm: "../../package/DiverInfo/DiverInfo.js"
            },
            {
                name: '编辑司机信息',
                en: 'EditDiverInfo',
                href: '#!/EditDiverInfo/0',
                vm: "../../package/EditDiverInfo/EditDiverInfo.js"
            },
            {
                name: '编辑车辆信息',
                en: 'EditCarInfo',
                href: '#!/EditCarInfo/0',
                vm: "../../package/EditCarInfo/EditCarInfo.js"
            },
        ],

        getUser: function (callback) {
            var config={
                success: function (res) {
                    callback()
                    cache.go(res)
                },
                error: function (err) {
                    console.error('用户信息获取失败:'+err)
                }
            }
            avalon.ajax({
                url:location.protocol + '//r.tansuyun.cn/w.php?i=Js/getLogined',
                type:'post',
                data:{},
                success: function (res) {
                    //如果自动转换失败则手动转换一次json
                    if (typeof res == "string") {
                        res = JSON.parse(res)
                    }

                    if (!res.err && res.d !== false) {
                        //执行成功
                        config.success(res.d, res)
                    }
                    else {
                        //执行失败

                        config.error(res.err)

                        console.log('服务端执行错误：' + res.m)
                        console.log(res)
                    }

                    //缓存tsy
                    if (res.tsy) {
                        cache.go({tsy: res.tsy})
                    }

                    //缓存用户登录信息
                    if (res.UID > 0) {
                        //已登录状态
                        cache.go({
                            uid: res.UID,
                            un: res.UN
                        })
                        try {
                            Gate.logined = true
                        } catch (err) {
                        }
                    } else {
                        //未登录或登陆已失效
                        try {
                            Gate.reset()
                        } catch (err) {
                        }
                        index.uid = 0
                    }
                }
            })
        },

        //组件配置
        //提示框配置
        $opta: {
            id: "tip"
        },
//                模态框配置
//        $optb: {
//            id: "modal"
//        },
        //websocket配置
//        $optc: {
//            id: "ws",
//            server: "ws://180.97.81.190:46032",//线上版本
////                    server: "ws://my.s.tansuyun.cn:46080",//测试版本
//            debug: false
//        },
        $optd: {
            id: "pb"
        },
        //$optTop: {
        //    id: "toTop"
        //},
    })
    require([
        '../../lib/tip/tip.js',
        '../../lib/progressbar/progressbar.js'
    ], function () {
        avalon.scan();
        vm.ready()
    })

    window.index = vm

    /*………………………………………………………………………………………………路由处理函数………………………………………………………………………………………………*/

    //这个函数用来对用户进行权限控制，未来可能会添加多种限制条件
    function checkLimit(fn, limit) {


        if (cache.go("UnitID") == 23) {
            fn()
        } else {
            tip.on("您的账户没有访问改模块的权限")
            //history.go(-1)
        }

    }

    /*路由*/
    function newRouter(n) {
        var en = n.en;

        avalon.router.get('/' + en + '/:i', function (i) {
            //开启进度条
            try {
                pb.startT()
            } catch (err) {
            }
            if (!n.modal) {
                //关闭模态框
                try {
                    modal.mustOut()
                }
                catch (err) {
                }
            }







            //tip.on("正在加载……",1)
            if (n.vm) {
                require([n.vm], function () {
                    //检查权限
                    //todo 开发需要，暂时关闭验证
                    if(en!='WSLogin'){
                        Gate.comeIn({
                            haveLogin: function () {
                                avalon.vmodels[en].ready(i)
                                //tip.off("正在加载……",1)
                                //结束进度条
                                try {
                                    pb.endT()
                                } catch (err) {
                                }
                            },
                            notLogin: function () {
                                goto('#!/WSLogin/0')
                                //结束进度条
                                try {
                                    pb.endT()
                                } catch (err) {
                                }
                            }
                        })
                        return
                    }
                    //如果是wslogin页面，则不检查权限
                    avalon.vmodels[en].ready(i)
                    //tip.off("正在加载……",1)

                    //结束进度条
                    try {
                        pb.endT()
                    } catch (err) {
                    }

                })
            }
            if (n.fn) {
                n.fn(i)

                //结束进度条
                try {
                    pb.endT()
                } catch (err) {
                }
            }

            document.getElementById("title").innerText = n.name;
            console.log(n.name + "模块加载完毕")
        });
        console.log(n.name + "路由创建完毕")


    }

    function getMap(nav) {
        console.log("开始构建路由")
        var l = nav
        var ll = l.length
        var lsl;
        for (var i = 0; i < ll; ++i) {
            if (l[i].sub) {
                //有第二级导航
                lsl = l[i].sub.length
                for (var o = 0; o < lsl; ++o) {
                    newRouter(l[i].sub[o])
                }
            }
            else {
                //直接渲染项目
                newRouter(l[i])

            }
        }

    }


})


/*………………………………………………………………………………………………全局函数………………………………………………………………………………………………*/
//跨浏览器事件对象方法
var EventUtil = new Object;
EventUtil.addEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};

EventUtil.removeEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
};

EventUtil.formatEvent = function (oEvent) {
    if (isIE && isWin) {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
        oEvent.pageY = oEvent.clientY + document.body.scrollTop;
        oEvent.preventDefault = function () {
            this.returnValue = false;
        };

        if (oEvent.type == "mouseout") {
            oEvent.relatedTarget = oEvent.toElement;
        } else if (oEvent.type == "mouseover") {
            oEvent.relatedTarget = oEvent.fromElement;
        }

        oEvent.stopPropagation = function () {
            this.cancelBubble = true;
        };

        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date).getTime();
    }
    return oEvent;
};

EventUtil.getEvent = function() {
    if (window.event) {
        return this.formatEvent(window.event);
    } else {
        return EventUtil.getEvent.caller.arguments[0];
    }
}


//批量绑定快捷键
function bindK(obj) {
    require(['../../plugins/shortcut/shortcut.js'], function () {
        /*快捷键设置*/

        var x
        for (x in obj) {
            if (x.charAt(0) != "$") {
                if (obj.$opt != undefined) {
                    shortcut.add(x, obj[x], obj.$opt)
                } else {
                    shortcut.add(x, obj[x])
                }

                //console.log(x + "快捷键绑定成功")
            }

        }
    })
}

//批量删除快捷键
function removeK(obj) {
    require(['../../plugins/shortcut/shortcut.js'], function () {
        /*快捷键设置*/

        var x
        for (x in obj) {
            if (x.charAt(0) != "$") {
                shortcut.remove(x)
                //console.log(x + "已解除绑定")
            }

        }
    })
}

//安全相加 把所传入的数组的每一项转化为数值然后相加，返回加的结果
function addUp(arr) {
    var result = 0
    for (var i = 0; i < arr.length; i++) {
        result += Number(arr[i])
    }
    return result
}

//输入框输入限制
function minNumber(el) {
    if (el.value == "" || el.value < 0) {
        el.value = ""
    }
}

/*根据时间戳获取字符串*/
function getDateFromTimestamp(Timestamp) {
    for (var i = Timestamp.length; i < 13; i++) {
        Timestamp += '0';
    }
    var date = new Date();
    date.setTime(Timestamp);

    var month = (date.getMonth() + 1) + ''
    for (var o = month.length; o < 2; o++) {
        month = '0' + month
    }
    var day = date.getDate() + ''
    for (var p = day.length; p < 2; p++) {
        day = '0' + day
    }
    return date.getFullYear() + "-" + month + "-" + day
}


//根据字符串获取时间戳
function newDateAndTime(Str) {
    var dateStr = Str.replace("T", " ")
    var ds = dateStr.split(" ")[0].split("-");
    var ts = dateStr.split(" ")[1] ? dateStr.split(" ")[1].split(":") : ['00', '00', '00'];
    if (ts.length < 3) {
        for (var i = ts.length; i < 3; i++) {
            ts.push('00')
        }
    }
    var r = new Date();
    r.setFullYear(ds[0], ds[1] - 1, ds[2]);
    r.setHours(ts[0], ts[1], ts[2], 0);
    r=r.getTime();
    return r;
}

/*
 * 根据字符串获取时间戳(毫秒)
 * @example:
 * var date="2016-11-16 15:12:12"//"2016-11-16"
 *undefined
 *date = new Date(Date.parse(date.replace(/-/g, "/")));
 *date = date.getTime();
 *1479280332000
 * */
function nowTimeTamp(date){
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    date = date.getTime();
    return date;
}

//将日期转换为可填入input的格式
function T2I(Timestamp) {
    return new Date(+Timestamp+8*3600*1000).toISOString().replace(/.[0-9]{3}Z$/,'')
}

//示例："2017-01-04T08:18"
function T2IS(Timestamp) {
   // 中国标准时间
   return new Date(+Timestamp+8*3600*1000).toISOString().replace(/:[0-9]{2}.[0-9]{3}Z$/,'')
}

//转换为10为时间戳发送给后端
/*
 * s 要进行转换的时间戳
 * u 转换后的时间单位 字符串 'ms' 毫秒 's' 秒
 * */
function timeLengthFormat(s,u){
    switch (u){
        case 'ms':
            return Math.ceil(s*1000)
            break;
        case 's':
            return Math.ceil(s/1000)
            break;
    }
}


//遍历数组和对象
/*
 * for each 语句，
 * 实现for 和for(var i in y)的功能
 * 调用时
 ForEach(obj,function(i){
 })
 * */
function ForEach(obj, func) {
    if (typeof obj == "object") {
        if (obj.length == undefined) {
            for (var x in obj) {
                //传入（每一项，每一项的序列号）
                func(obj[x], x);
            }
        } else {
            for (var i = 0; i < obj.length; i++) {
                //传入（每一项，每一项的序列号）
                func(obj[i], i);
            }
        }
    } else {
        console.log('类型错误:' + JSON.stringify(obj))
    }
}


//界面跳转的封装函数
function goto(href) {
    window.location.href = href
}

//列表类页面的参数构建
function buildListParams(p, k, t) {
    var params = []
    params.push(p)
    params.push(k)
    params.push(t.join("_"))
    return params.join("&&")
}


//安全赋值，用于解决服务端在字段为空时返回的空数组无法复制给原本设计为对象格式的字段问题
function safeMix(to,from){
    ForEach(from, function (el, key) {
        try{
            to[key]=from[key]
        }catch (err){
            console.log(err)
        }
    })

    return to
}