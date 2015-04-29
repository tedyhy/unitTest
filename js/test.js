// 在ie5/6中模拟XMLHttpRequest()构造函数
function xhr() {
	try {
		return new XMLHttpRequest();
	} catch (e) {
		try {
			// 使用ActiveX对象最新版本
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		} catch (e) {
			try {
				// 使用旧版本ActiveX对象
				return new ActiveXObject('Msxml.XMLHTTP.3.0');
			} catch (e) {
				try {
					// 使用较旧版本ActiveX对象
					return new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					// 否则抛出错误
					throw new Error("XMLHttpRequest is not supported");
				};
			};
		};
	};
};
var codemirrors = $$('codemirror');
if (codemirrors.length) {
	for (var i = 0, l = codemirrors.length; i < l; i++) {
		CodeMirror.fromTextArea(codemirrors[i], {
			lineNumbers: true,
			mode: "javascript"
		});
	};
};

function timedGetText(url, timeout, callback) {
	var xhr = XHR(),
		timedout = false,
		timer = setTimeout(function() {
			timedout = true;
			xhr.abort();
		}, timeout);
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) return;
		if (timedout) return;
		clearTimeout(timer);
		if (xhr.status === 200) {
			callback(xhr.responseText);
		};
	};
	xhr.send(null);
}

// 使用script元素发送JSONP请求
function getJSONP(url, callback) {
	var cbnum = "cb" + getJSONP.counter++, // callback num
		cbname = "getJSONP." + cbnum, // callback name
		script;

	if (url.indexOf('?') === -1)
		url += '?jsonp=' + cbname;
	else
		url += '&jsonp=' + cbname;

	script = document.createElement('script');
	getJSONP[cbnum] = function(res) {
		try {
			callback(res);
		} finally {
			delete getJSONP[cbnum];
			script.parentNode.removeChild(script);
		};
	};

	script.src = url;
	document.body.appendChild(script);
};
getJSONP.counter = 0;

getJSONP('http://127.0.0.1:81/jsonp.json', function(res) {
	console.log(JSON.stringify(res))
});