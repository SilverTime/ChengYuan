#������� star.js˵���ĵ�
2015��5��19��

---

## ����
* ʵ��������ǵ����۹���

## ����
avalon.js 1.5+


## ʹ�÷�ʽ


1. ���������Լ�star.js
2. �ڲ�������
```javascript
<tsy:select config="$opt"></tsy:select>```
3. ��д���ò�����

```
list:[
                        {
                            name:"������",
                            id:"510703",
                            checked:false
                        }
    ]

```

## ʵ��

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ѡ�������</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
</head>
<body ms-controller="starTest">


<tsy:select config="$opt"></tsy:select>
</body>
<script>
    avalon.ready(function () {
        require(['../../lib/select/select.js'], function () {
            var vm=avalon.define({
                $id:"starTest",
                $opt:{
                    list:[
                        {
                            name:"������",
                            id:"510703",
                            checked:false
                        },
                        {
                            name:"������",
                            id:"510704",
                            checked:false
                        },
                        {
                            name:"��̨��",
                            id:"510722",
                            checked:false
                        },
                        {
                            name:"��ͤ��",
                            id:"510723",
                            checked:false
                        },
                        {
                            name:"����",
                            id:"510724",
                            checked:false
                        },
                        {
                            name:"������",
                            id:"510725",
                            checked:false
                        },
                        {
                            name:"����Ǽ��������",
                            id:"510726",
                            checked:false
                        },
                        {
                            name:"ƽ����",
                            id:"510727",
                            checked:false
                        },
                        {
                            name:"������",
                            id:"510781",
                            checked:false
                        },
                        {
                            name:"������",
                            id:"5107001",
                            checked:false
                        },
                        {
                            name:"�ƴ�԰��",
                            id:"5107002",
                            checked:false
                        },
                        {
                            name:"������",
                            id:"5107003",
                            checked:false
                        },
                        {
                            name:"��ѧ��",
                            id:"5107004",
                            checked:false
                        }
                    ],
//                    lv:2,
                    callback: function (i) {
                        console.log(i)
                    }
                },

            })
            avalon.scan()
        })
    })
</script>

</html>
```


## ���ò���(uploader.js��)

������|˵��|����|��Ҫ��
----|
list
name|ѡ������|string|��Ҫ
id|ѡ��id|string|��Ҫ
checked|�Ƿ�ѡ��,false����ѡ��|bool|��Ҫ

* ע��ҳ���жԱ�Ҫ���������·�����ú�����
