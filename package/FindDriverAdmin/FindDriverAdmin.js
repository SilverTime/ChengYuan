/**
 * Created by Chris Chang on 2016/11/6.
 */
define('FindDriverAdmin', [
    'avalon',
    'text!../../package/FindDriverAdmin/FindDriverAdmin.html',
    'css!../../package/FindDriverAdmin/FindDriverAdmin.css'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "FindDriverAdmin",
        ready: function (i) {

            var obj = 'DriverCarLink'
            if (obj != "") {
                require(['../../obj/Management/' + obj + '.js'], function () {
                    start()
                })
            } else {
                start()
            }

            function start() {
                vm.reset()
                pop.open(html)
                vm.PopPanelName = "查看司机";
                vm.getDetails(i)
            }
        },
        reset: function () {
            avalon.mix(vm, {
                PopPanelName: "",
                drivers_num:false,
            })
        },
        list:[],
        drivers_num:false,
        PopPanelName: "",
        getDetails: function (id) {
            var obj = "DriverCarLink";
            var data={
               W:{
                   CarID:id
               }
            }
            require(['../../obj/Management/' + obj + '.js'], function (obj) {
                obj.search(data, {
                    success: function (res) {
                        vm.list= res.L
                        if(res.L.length!==0){
                            vm.drivers_num=true;
                        }
                    }
                })
            })
        },
        myCarsInfo:function(UID){
            require(["../../package/CarInfoAdmin/CarInfoAdmin"],function(pack){
                pack.ready(UID);
                pop.close();
            })
        },
        admit: function () {
            require(["../../lib/pop/popAlert"],function(){
                pop.close(html)
            })
        }
    });
    return window[vm.$id] = vm
});