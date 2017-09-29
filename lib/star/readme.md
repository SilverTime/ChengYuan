#星星组件 star.js说明文档
2015年5月19日

---

## 功能
* 实现五颗星星的评价功能

## 依赖
avalon.js 1.5+

cache.js

## 使用方式


1. 引入依赖以及star.js
2. 在插入点插入
```javascript
<tsy:star ms-data-lv="4"></tsy:star>
或者

<tsy:star config="$opt"></tsy:star>```
3. 编写配置参数，

```
$opt:{
                    id:"cStar",
//                    lv:2,//控制星星初始个数
                    callback: function (i) {
                        cStar.lv=i
                        cStar.build()
                    }
                }

```

## 实例

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>星级组件</title>
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


## 配置参数(uploader.js中)

参数名|说明|类型|必要性
----|
id|组件名称|string|必要
lv|初始被选中星星的个数，默认为零|string|可选
callback|监控星星选择个数的变化|function|必要

* 注意页面中对必要的依赖项的路径配置和引入
