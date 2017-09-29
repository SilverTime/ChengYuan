/**
 * Created by mooshroom on 2016/11/29.
 *
 * 对象中，key为存储值，val为渲染值；
 * 计算及存储使用key，
 * 页面显示使用val
 */

define('dic', [], function () {
    return {
        //    车型字典
        $carDic: {1: 'A级车', 2: "B级车", 3: "商务车"},
        //    行程字典
        $TypeDic: {1: '短途', 2: '长途', 3: '接机', 4: '包车'},
    //    性别
        $SexDic:{0:'女',1:'男'}
    }
})
