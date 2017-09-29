/**
 * Created by mooshroom on 2016/4/15.
 */
mui.plusReady(function () {
    var vm={
        wsMuiUrl:'',
        init: function (url) {
            vm.waitList=[]
            vm.wsMuiUrl=url
            window.addEventListener('wsCall',function(evt){
                //ͨ��event.detail�ɻ�ô��ݹ����Ĳ�������
                var res = evt.detail

                var mmid = "m" + res.m
                //����s
                if(res.c=='m'||res.c=="p"){
                    try{
                        cache.go({
                            sid:res.s
                        })
                    }catch(err){
                        console.log(err)
                    }

                }


                //�жϻص�
                if (res.c == "t") {
                    //�������������mid��
                    //��mid�Ļص�����
                    try {
                        vm.mF[mmid] = vm.tF[res.t]
                        vm.tF[res.t] = null
                    }
                    catch (err) {
                        console.log(err)
                    }

                }
                else if (res.c == "m") {
                    //����Ƿ��������������ݵ�
                    if (typeof vm.mF[mmid] == "function") {
                        //ִ�лص�
                        var data = res.d
                        if(data==null){
                            data={}
                        }
                        if (data.err && data.code == 1) {
                            //TODO ������ʾ
                            //tip.on(data.err);
                            console.log("���ӿڵ��ô���" + res.i + ":" + data.err)
                        }
                        vm.mF[mmid](data)
//                        console.log(res.d)
                        //һ����֮������ص�����,�ڳ��ڴ�ռ�
                        setTimeout(function () {
                            vm.mF[mmid] = null
                        }, 60000)
                    }
                    else {
                        console.log("mid��ʧ:" + res)
                    }
                }
                else if (res.c == "p") {
                    //����Ƿ�����ֱ�����͵�
                    if (typeof vm.todo[res.i] == "function") {
                        vm.todo[res.i](res.d)
                    }
                    else {
                        console.log('û�г�ֵ�׼����Ӧ�Է�������δָ֪��')
                    }

                }
                else {
                    //����֪����һ������������
                    console.log("δ֪��c:" + res.c)
                }

                if (vm.debug) {
                    console.log(res)
                }
            });
        },
        tF: {},//����Ļص�����
        mF: {},//׼��ִ�еĻص�����
        waitList:[],
        call: function (obj) {
            //����Ƿ񴴽�ͨ��ר��webview
            var Bridge=plus.webview.getWebviewById('wsView');
            if(Bridge===null){

                //���汾�����󣬴������֮���������
                // ���ô���
                return
            }

            //��ȡ��ǰҳ��
            var thisView=plus.webview.currentWebview().id;

            //����ticket
            function guid() {
                var now = new Date().getTime()

                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return ("t" + (S4() + S4() + now));
            }

            var t = guid()
            //��������
            mui.fire(Bridge,'wsCall',{
                from:thisView,
                i:obj.i,
                t:t,
                data:obj.data,
                success: opt.success
            });

            //����ص�����
            if (typeof opt.success == "function") {

                vm.tF[t] = opt.success
            }
            else {
                console.log('û����ȷ����ص�����')
            }
            //����opt
            console.log("done!!")
        },
        buildBridge: function () {
            //������
            plus.webview.create({
                url:vm.wsMuiUrl,
                id:"wsView"
            });
            //���֮��waitList�е����󷢳�ȥ
            for(var i=0;i<vm.waitList.length;i++){
                vm.call(vm.waitList[i])
            }
        }
    }
    window.ws=vm
})