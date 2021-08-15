// 公共方法

export const newGuid = () => {
  var guid = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
  }
  return guid;
};

// 是否是一个 json 字符串
export const isJsonString = (string) => {
	if (!string) return ""
	if (typeof string == 'object') {
		return false
	}
	let val
	try {
		val = JSON.parse(string)
		if (typeof val == 'object') {
			return true
		}
	} catch (e) {
		return false
		//TODO handle the exception
	}
};

//  解析对象 如果解析失败 将返回一个 {key:string}
export const jsonObjParse = (string, key) => {
	key = key || 'itemName'
	let val
	try {
		if (isJsonString(string)) {
			val = JSON.parse(string)
			return val
		} else {
			return {
				[key]: string
			}
		}
	} catch (e) {
		return {
			[key]: string
		}
		//TODO handle the exception
	}
};

 /**
 * @desc 防抖函数(可用于防止重复提交)
 * 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
 * 如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户一直触发这个函数，
 * 且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param immediate 立即执行
 */
export const  debounce = (fn, wait, immediate) =>{
    let timer;
    return function() {
        if (timer) clearTimeout(timer);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) {
                fn.apply(this, arguments)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait);
        }
    }
}
/**
 * @desc 节流函数
 * 当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发
 * 小于既定值，函数节流会每隔这个时间调用一次
 * 用一句话总结防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行
 * 实现函数节流我们主要有两种方法：时间戳和定时器
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param options 立即执行
 * options中  leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调
 */
export const throttle = (fn, wait, options = {}) =>{
    let timer;
    let previous = 0;
    let throttled = function() {
        let now = +new Date();
        // remaining 不触发下一次函数的剩余时间
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        if (remaining < 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            fn.apply(this, arguments)
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                previous = options.leading === false ? 0 : new Date().getTime();
                timer = null;
                fn.apply(this, arguments);
            }, remaining);
        }
    }
    return throttled;
}

//  解析数组 如果解析失败 将返回一个 [string]
export const jsonArrParse = (string, key) => {
	let val
	try {
		if (isJsonString(string)) {
			val = JSON.parse(string)
			return val
		} else {
			return [string]
		}
	} catch (e) {
		return [string]
		//TODO handle the exception
	}
};

// 设置页面title
export const setTitleName = (title) => {
	// H5平台
	//#ifdef  H5
	console.log('setTitle==>' + title);
	if (window.AlipayJSBridge && AlipayJSBridge) {
		AlipayJSBridge.call("setTitle", {
			title: title
		});
	} else {
		document.title = title;
	}
	// #endif 
	// 除了 H5 平台，其它平台均存在的代码
	// #ifndef H5
	uni.setNavigationBarTitle({
		title: title
	})
	// #endif
};
export const toolGetLocalImg = (name, type = "png") => {
	const url = require(`@/static/img/${name}.${type}`);
	return url;
};

export const GoToUrl = (url,type=1) => {
	//#ifdef  H5
	if(url!=""){
		if(type==1){
			window.location.href = url;
		}else{
			uni.navigateTo({
				url: url,
				animationType: 'pop-in',
				animationDuration: 200
			});
		}
	}
	//#endif
	//#ifdef MP
	if(url!=""){
		uni.navigateTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 200
		});
	}
	//#endif
}

export const toolGoUrl = (url,type=1) => {
	//#ifdef  H5
	if(url!=""){
		if(type==1){
			window.location.href = url;
		}else{
			uni.navigateTo({
				url: url,
				animationType: 'pop-in',
				animationDuration: 200
			});
		}
	}else{
		uni.showToast({
			title: '功能未开放，建设中',
			icon: 'none',
			duration: 2500
		});
	}
	//#endif
	//#ifdef MP
	if(url!=""){
		uni.navigateTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 200
		});
	}else{
		uni.showToast({
			title: '功能未开放，建设中',
			icon: 'none',
			duration: 2500
		});
	}
	//#endif
};
/**
 * @desc 检查线上的图片地址是否有效
 * @param { String } value
 * @return { Bloolean } 
 */
export const toolForMatImgUrl = (value) => {
	var ImgObj = new Image();
	ImgObj.src = value;
	ImgObj.onload = function() {
		if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
			return true;
		} else {
			return false;
		}
	};
};

export const toolOs = () => {
	//判断浏览器
	var u = navigator.userAgent,
	    app = navigator.appVersion;
	return { //移动终端浏览器版本信息
	    trident: u.indexOf('Trident')> -1, //IE内核
	    presto: u.indexOf('Presto') > -1, //opera内核
	    webKit: u.indexOf('AppleWebKit')> -1, //苹果、谷歌内核
	    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	    iPad: u.indexOf('iPad') > -1, //是否iPad
	    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
	    YiXin: u.indexOf('YiXin') > -1, //是否YiXin手机开户
	    weixin: u.toLowerCase().indexOf("micromessenger") > -1,
		dingTalk: u.indexOf("DingTalk")!=-1?true:false
	};
};

export const navigateToMiniProgram = ({ appId,path="",extraData="",success,fail,complete }) =>{
	if(!appId){
	  throw new Error('appId 不能为空！')
	}
	uni.navigateToMiniProgram({
	  appId,
	  path,
	  extraData,
	  success(result) {
	    success&&success(result)
	  },
	  fail:(err)=>{
	  	fail&&fail(err)
	  },
	  complete:(res)=>{
	  	complete&&complete(res)
	  }
	})
}
  
export const updataProperty = (name, color) => {
  window.document.documentElement.style.setProperty(name, color)
}


export default {
	newGuid,
	debounce,
	GoToUrl,
	throttle,
	isJsonString,
	jsonObjParse,
	jsonArrParse,
	setTitleName,
	toolGetLocalImg,
	toolGoUrl,
	toolForMatImgUrl,
	toolOs,
	navigateToMiniProgram,
	updataProperty
}
