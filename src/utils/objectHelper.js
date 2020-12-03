export default {
    // keyvalue数组[{key:'dd',value:'cc'},{key:'dd123',value:'cc433'}]  转Map  {"dd":"cc","dd123":"cc433"}
    toMap (object) {
        let o = {}
        if (object instanceof Array) {
            for (let index = 0; index < object.length; index++) {
                const ele = object[index];
                o[ele.key] = ele.value
            }
        }
        return o
    },
    // Map {"dd":"cc","dd123":"cc433"} 转  keyvalue数组[{key:'dd',value:'cc'},{key:'dd123',value:'cc433'}]
    toKvArray (dic) {
        let arr = [];
        if (dic instanceof Object && !(dic instanceof Array)) {
            for (let key in dic) {
                arr.push({ key: key, value: dic[key] })
            }
        }
        return arr
    }
}

