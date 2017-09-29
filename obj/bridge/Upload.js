//Management/Upload

define('',
    ['avalon'],
    function () {
        var obj = {
            obj: {},

            upload: function (success, error) {
                var configFn = {
                    success: success ? success : function () {
                    },
                    error: error ? error : function (err) {
                        tip.on(err)
                    }
                }

                $$.call({
                    i: "Management/Upload/upload",
                    data: {},
                    success: configFn.success,
                    error: configFn.error
                })
            }
        }
        return window['obj_Management_Upload'] = obj
    })