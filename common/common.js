function StringBuffer() {
	this._strings_ = new Array();
}
StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
};
StringBuffer.prototype.toString = function() {
	return this._strings_.join("");
};
String.prototype.trim = function() {
	let reExtraSpace = /^\s*(.*?)\s*$/;
	return this.replace(reExtraSpace, "$1");
};
//非不捕获性分组
//去掉html标签
String.prototype.stripHTML = function() {
	let regTag = /<(?:.|\s)*?>/g;
	return this.replace(regTag, "");
};
//验证日期 5/12/2016
function isValidDate(sText) {
	let reDate = /(?:0[1-9]|[12][0-9]|3[0,1])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;
	return reDate.test(sText);
};
//验证信用卡号
function isValidMasterCard(sText) {
	let reMasterCard = /^(5|[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\s{4})$/;
	if (reMasterCard.test(sText)) {
		let sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;
		return luhnCheckSum(sCardNum);
	} else {
		return false;
	}
};
//visa
function isValidVisa(sText) {
	let reVisa = /^(4\d{12}(?:\d{3})?)$/;
	if (reVisa.test(sText)) {
		return luhnCheckSum(RegExp.$1);
	} else {
		return false;
	}
};
//luhn算法
function luhnCheckSum(sCardNum) {
	let iOddSum = 0;
	let bIsOdd = true;
	let iEvenSum = 0;
	for (let i = sCardNum.length; i >= 0; i--) {
		let iNum = parseInt(sCardNum.chartAt(i));
		if (bIsOdd) {
			iOddSum += iNum;
		} else {
			iNum = iNum * 2;
			if (iNum > 9) {
				iNum = eval(iNum.toString().split("").join("+"));
			}
			iEvenSum += iNum;
		}
		bIsOdd = !bIsOdd;
	}
	return ((iEvenSum + iOddSum) % 10 == 0);
};
//Email
function isValidEmail(sText) {
	let reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;
	return reEmail.test(sText);
};
function toArray(s){
  try{
    return Array.prototype.slice.call(s);
  } catch(e){
      var arr = [];
      for(var i = 0,len = s.length; i < len; i++){
        //arr.push(s[i]);
        arr[i] = s[i]; //据说这样比push快
      }
       return arr;
  }
}
