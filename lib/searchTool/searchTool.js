/*
 searchTool 内在灵魂，沉稳坚毅
 生成时间：Wed Sep 28 2016   破门狂人R2-D2为您服务！
 */
define('searchTool',[
    'avalon',
    'text!../../lib/searchTool/searchTool.html',
    'css!../../lib/searchTool/searchTool.css',
    '../../lib/switch/switch'
], function (avalon, html, css) {
    avalon.component('tsy:searchtool', {
        $template: html,
        id:"",
        /*
        * ***************参数队列区**************************/

        Columns:[],
        callback: function (W) {

        },
        adding:{
            key:"",
            name:"",
            exp:"",
            val:"",
            exps:[]
        },

        expNames:{
            "EQ":"等于",
            "NEQ":"不等于",
            "GT":"大于",
            "EGT":"大于等于",
            "LT":"小于",
            "ELT":"小于等于",
            "LIKE":"含有",
            //"BETWEEN":"",
            //"NOT BETWEEN":"",
            //"IN":"",
            //"NOT IN":""
        },

        keys:[],
        _logic:"",

        $opt_switch:{
            nowVal:'and',
            height:'30px',
            left:{
                label:"全部满足",
                value:"and"
            },
            right: {
                label:"满足任意",
                value:"or"
            },
            callback: function (value) {

            }
        },
        /*
         * ***************函数空位**************************/
        selectKey: function () {

        },
        add: function () {

        },
        del: function () {

        },
        buildW: function () {

        },


        /*
         * ***************自启动项目**************************/
        $init: function (vm, elem) {
            //主动读取配置
            //var elem = avalon(elem)
            ////将参数放入对于的地方
            //try {
            //    if(elem.data('lv')!=undefined){
            //        //vm.lv = elem.data('lv')
            //        //todo 改写上方的'lv'为你想要获取到的值
            //    }
            //} catch (err) {
            //}
            vm.$opt_switch.callback= function (value) {
                vm._logic=value
                console.log(vm._logic)
            }

            //选中属性之后构建条件
            vm.selectKey= function (that) {
                var key=that.value
                for(var i=0;i<vm.Columns.length;i++){
                    var el=vm.Columns[i]
                    if(key==el.Code){
                        vm.adding.exps=el.QureyExp
                        vm.adding.name=el.Name
                        vm.adding.exp=vm.adding.exps[0]
                        break
                    }
                }

                for(var o=0;o<vm.adding.exps.length;o++){
                    var al=vm.adding.exps[o]
                    if(vm.expNames[al]==undefined){
                        vm.adding.exps.splice(o,1)
                        o--
                    }
                }
            }

            //添加条件
            vm.add= function () {

                //验证数据 todo 补充提示
                if(vm.adding.key==''){
                    return
                }
                if(vm.adding.exp==''){
                    return
                }
                if(vm.adding.val==''){
                    return
                }
                //填充
                var d={}
                d.key=vm.adding.key
                d.exp=vm.adding.exp
                d.val=vm.adding.val
                d.name=vm.adding.name



                //检查是否有同字段的筛选条件，有则剔除
                for(var i= 0,L=vm.keys;i< L.length;i++){
                    var el=L[i]

                    if(el.key== d.key){
                        avalon.mix(el,d)
                        avalon.mix(vm.adding,{
                            key:"",
                            name:"",
                            exp:"",
                            val:"",
                            exps:[]
                        })
                        vm.buildW()
                        return
                    }
                }

                //存储
                vm.keys.push(d)
                avalon.mix(vm.adding,{
                    key:"",
                    name:"",
                    exp:"",
                    val:"",
                    exps:[]
                })
                vm.buildW()
            }

            //删除条件
            vm.del= function (index) {
                vm.keys.splice(index,1)
                vm.buildW()
            }

            //构建输出
            vm.buildW= function () {
                var W={}
                for(var i= 0,L=vm.keys;i< L.length;i++){
                    var el=L[i]
                    W[el.key]=[el.exp,el.val]
                }

                if(vm.keys.length==0){
                    return vm.callback(W)
                }

                W._logic=vm._logic
                vm.callback(W)
            }


            if(vm.id!=""){
                window[vm.id]=vm
            }
        },
        $ready: function (vm, elem) {
            //vm.build()
        },


    })
})