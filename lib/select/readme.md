#星星组件 star.js说明文档
2015年5月19日

---

## 功能
* 实现五颗星星的评价功能

## 依赖
avalon.js 1.5+


## 使用方式


1. 引入依赖以及star.js
2. 在插入点插入
```javascript
<tsy:select config="$opt"></tsy:select>```
3. 编写配置参数，

```
list:[
                        {
                            name:"涪城区",
                            id:"510703",
                            checked:false
                        }
    ]

```

## 实例

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>选择器组件</title>
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
                            name:"涪城区",
                            id:"510703",
                            checked:false
                        },
                        {
                            name:"游仙区",
                            id:"510704",
                            checked:false
                        },
                        {
                            name:"三台县",
                            id:"510722",
                            checked:false
                        },
                        {
                            name:"盐亭县",
                            id:"510723",
                            checked:false
                        },
                        {
                            name:"安县",
                            id:"510724",
                            checked:false
                        },
                        {
                            name:"梓潼县",
                            id:"510725",
                            checked:false
                        },
                        {
                            name:"北川羌族自治县",
                            id:"510726",
                            checked:false
                        },
                        {
                            name:"平武县",
                            id:"510727",
                            checked:false
                        },
                        {
                            name:"江油市",
                            id:"510781",
                            checked:false
                        },
                        {
                            name:"高新区",
                            id:"5107001",
                            checked:false
                        },
                        {
                            name:"科创园区",
                            id:"5107002",
                            checked:false
                        },
                        {
                            name:"经开区",
                            id:"5107003",
                            checked:false
                        },
                        {
                            name:"科学城",
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


## 配置参数(uploader.js中)

参数名|说明|类型|必要性
----|
list
name|选项名称|string|必要
id|选项id|string|必要
checked|是否被选中,false不被选中|bool|必要

* 注意页面中对必要的依赖项的路径配置和引入
