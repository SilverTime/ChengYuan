#������� star.js˵���ĵ�
2015��5��19��

---

## ����
* ʵ��������ǵ����۹���

## ����
avalon.js 1.5+

cache.js

## ʹ�÷�ʽ


1. ���������Լ�star.js
2. �ڲ�������
```javascript
<tsy:star ms-data-lv="4"></tsy:star>
����

<tsy:star config="$opt"></tsy:star>```
3. ��д���ò�����

```
$opt:{
                    id:"cStar",
//                    lv:2,//�������ǳ�ʼ����
                    callback: function (i) {
                        cStar.lv=i
                        cStar.build()
                    }
                }

```

## ʵ��

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>�Ǽ����</title>
    <script src="../../src/js/avalon.modern.1.5.min.js"></script>
</head>
<body ms-controller="starTest">

<tsy:star ms-data-lv="4"></tsy:star>

<tsy:star config="$opt"></tsy:star>

</body>
<script>
    avalon.ready(function () {
        require(['../../lib/star/star.js'], function () {
            var vm=avalon.define({
                $id:"starTest",
                $opt:{
                    id:"cStar",
//                    lv:2,
                    callback: function (i) {
                        cStar.lv=i
                        cStar.build()
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
id|�������|string|��Ҫ
lv|��ʼ��ѡ�����ǵĸ�����Ĭ��Ϊ��|string|��ѡ
callback|�������ѡ������ı仯|function|��Ҫ

* ע��ҳ���жԱ�Ҫ���������·�����ú�����
