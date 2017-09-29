/**
 * Created by mooshroom on 2016/9/7.
 */
/*………………………………………………………………………………………………全局配置………………………………………………………………………………………………*/
var apiURL = 'http://mychengyuan.dev.tansuyun.cn/index.php?i='


/*………………………………………………………………………………………………index的视图模型………………………………………………………………………………………………*/
require([
    'avalon',
    'mmRequest',
    'text!../../nav.json',
    '../../lib/pop/popAlert.js',
    '../../plugins/cache/cloudCache.js',
    '../../plugins/Gate/Gate.js',
    //'../../lib/picChange/picChange.js'
], function (avalon, mmRequest, nav, popAlert, cc) {
    //定义顶级视图模型
    var vm = avalon.define({
        $id: "index",
        ready: function () {

            require(['../../plugins/Gate/Gate'], function () {
                //window.cc = new cc('CY')
                //导航获取
                //window.cc.Get('nav', function (res) {
                //    vm.NavF = res
                //
                //})
                start();
            })


            function start() {

                //门禁系统的配置
                window.Gate = newGate({
                    autoLoginAPI: "User/autoLogin",
                    haveLogin: function (res) {
                        if (res.d.Company.CompanyID !== '1') {
                            tip.on('请使用管理员账户登录')
                            require(['../../obj/bridge/User'],function (User) {
                                User.logout(function () {
                                    goto('#!/adminLogin/0');
                                })
                            })
                            Gate.reset()

                            return
                        }

                        goto('#!/OrderListAdmin/0');
                    },
                    notLogin: function (err) {
                        goto('#!/adminLogin/0');
                    }
                });


                //构建路由
                require([
                    "mmRouter",
                ], function () {
                    avalon.router.get("/", function () {
                        goto('#!/adminLogin/0')
                    });
                    avalon.router.error(function () {
                        try {
                            //配置404页面
                            window.location.href = 'admin.html';
                        } catch (err) {
                        }
                    })
                    var navList = JSON.parse(nav).nav;
                    //构建导航的路由
                    getMap(navList);
                    console.log("路由构建完毕");
                    //开始监听
                    avalon.history.start();
                    //vm.toggleSide(0)
                    avalon.scan();
                    vm.uid = cache.go('UID');
                    vm.un = cache.go('UN');
                    vm.G = addUp(String(cache.go('G')).split(','))
                })
            }


        },

        //当前用户的信息
        admin: false,
        uid: "",
        un: "",
        G: "",
        g: "", //用户切换页面标记
        //登出
        logout: function () {
            $$.call({
                    i: 'User/logout',
                    data: {},
                    success: function (res) {
                        window.location.href = "#!/Login/0";
                        Gate.reset()
                        index.uid = ""
                    },
                    err: function (err) {
                        tip.on(err, 1)
                    }
                }
            )
        },


        html: '',
        nowTop: '',
        showNav: true,
        //导航条
        nav: [
            {
                name: "订单列表",
                en: "OrderListAdmin",
                href: "#!/OrderListAdmin/0"
            },
            // {
            //     name: "订单审核",
            //     en: "OrderCheckAdmin",
            //     href: "#!/OrderCheckAdmin/0"
            //
            // },
            {
                name: "企业管理",
                en: "CompanyListAdmin",
                href: "#!/CompanyListAdmin/0"
            },

            {
                name: "客户管理",
                en: "UserListAdmin",
                href: "#!/UserListAdmin/0"
            },
            {
                name: "司机管理",
                en: "DriverListAdmin",
                href: "#!/DriverListAdmin/0"
            },
            {
                name: "车辆管理",
                en: "CarListAdmin",
                href: "#!/CarListAdmin/0"
            },
        ],


        //组件配置
        //提示框配置
        $opta: {
            id: "tip"
        },

        //进度条配置
        $optd: {
            id: "pb"
        },
        //返回顶部
        //$optTop: {
        //    id: "toTop"
        //},
        //弹出框
        $optpop: {
            id: 'pop',
            width: "800",
        },
        $optpop2: {
            id: 'pop2',
            width: "560",
        },


    })

    //执行开始
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
        n.vm = '../../package/' + en + "/" + en + '.js'
        avalon.router.get('/' + en + '/:i', function (i) {

            //检查权限
            if (n.only > 0) {
                Gate.comeIn({
                    haveLogin: function (res) {
                        if (res.d.Company.CompanyID !== '1') {
                            tip.on('请使用管理员账户登录')
                            require(['../../obj/bridge/User'],function (User) {
                                User.logout(function () {
                                    goto('#!/adminLogin/0');
                                })
                            })
                            Gate.reset()
                            return
                        }
                        //做权限判断
                        loadVM()
                    },
                    notLogin: function () {
                        goto('#!/adminLogin/0')
                    }
                })
            } else {
                loadVM()
            }

            function loadVM() {
                //开启进度条
                try {
                    pb.startT()
                    pop.close()
                    pop2.close()
                } catch (err) {

                }


                //tip.on("正在加载……",1)
                if (n.vm) {
                    require([n.vm], function () {
                        try {
                            avalon.vmodels[en].ready(i)
                        } catch (err) {
                        }

                        index.nowTop = n.bePartOf
                        if (n.front) {
                            vm.nav = vm.NavF
                            vm.g = 1
                        } else {
                            vm.nav = vm.NavB
                            vm.g = 2
                        }
                        //tip.off("正在加载……",1)
                        if (pop.state != 0) {
                            pop.close()
                        }
                        //结束进度条
                        try {
                            pb.endT()
                        } catch (err) {
                        }

                        if (en == 'adminLogin') {
                            vm.showNav = false
                        } else {
                            vm.showNav = true
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

                document.getElementById("title").innerText = n.name
                console.log(n.name + "模块加载完毕")
            }

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

EventUtil.getEvent = function () {
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
    r = r.getTime()
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
function nowTimeTamp(date) {
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    date = date.getTime();
    return date;
}

//将日期转换为可填入input的格式
function T2I(Timestamp) {
    return new Date(+Timestamp + 8 * 3600 * 1000).toISOString().replace(/.[0-9]{3}Z$/, '')
}

//示例："2017-01-04T08:18"
function T2IS(Timestamp) {
    // 中国标准时间
    return new Date(+Timestamp + 8 * 3600 * 1000).toISOString().replace(/:[0-9]{2}.[0-9]{3}Z$/, '')
}

//转换为10为时间戳发送给后端
/*
 * s 要进行转换的时间戳
 * u 转换后的时间单位 字符串 'ms' 毫秒 's' 秒
 * */
function timeLengthFormat(s, u) {
    switch (u) {
        case 'ms':
            return Math.ceil(s * 1000)
            break
        case 's':
            return Math.ceil(s / 1000)
            break
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
function safeMix(to, from) {
    ForEach(from, function (el, key) {
        try {
            to[key] = from[key]
        } catch (err) {
            console.log(err)
        }
    })

    return to
}
/*
 * 如果原型中没有forEach函数，做不兼容处理，添加forEach函数
 * 这种方法是一个JavaScript扩展到ECMA-262标准;因此它可能不存在在标准的其他实现。
 *
 * */
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function myForEach(callBack, context) {
        typeof context === "undefined" ? context = window : null;
        //->不兼容处理
        for (var i = 0; i < this.length; i++) {
            typeof callBack === "function" ? callBack.call(context, this[i], i, this) : null;
        }

    };
}
