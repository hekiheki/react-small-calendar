// 格式化日期
export const dateFormat = (date,format) => {
    var o = { 
        "M+" : date.getMonth()+1,                 //月份 
        "d+" : date.getDate(),                    //日 
        "h+" : date.getHours(),                   //小时 
        "m+" : date.getMinutes(),                 //分 
        "s+" : date.getSeconds(),                 //秒 
        "q+" : Math.floor((date.getMonth()+3)/3), //季度 
        "S"  : date.getMilliseconds()             //毫秒 
    };
    if(/(y+)/.test(format)) {
        format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }   
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)){
            format = format.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return format;
}
// 返回日期列表
export const getDateList = (y,m) => {
    const year = y;
    const month = m;
    const now = new Date(year+'-'+month);
    const monthEnd = new Date(year, month, 0);
    const mEDate = monthEnd.getDate(); // 当月最后一天日期
    const firstDay = now.getDay(); //获取当月第一天星期几

    let list = [];
    // 需补齐的空格
    for(let i=0;i<firstDay;i++){
        const tempD = "";
        list.unshift(tempD);
    }
    // 当月
    for(let i=1;i<=mEDate;i++){
        list.push(i);
    }
    return list;
}
// 生成二维数组，日期和星期对应
export const convertDyadicArray = (arr,row) => {
    let dyadicArray = [];
    const col = arr.length/row;
    for (let i = 0; i < col; i++) {
        dyadicArray.push(arr.slice(i * row, (i + 1) * row));
    }
    return dyadicArray;
}