var $ = function(id) {
	return document.getElementById(id);
};
var $$ = function(cls) {
	return getElementsByClassName(cls);
};

function getElementsByClassName(cls) {
	try {
		return document.getElementsByClassName(cls);
	} catch (e) {
		var nodes = document.getElementsByTagName("*"),
			ret = [],
			node;
		for (var i = 0, len = nodes.length; i < len; i++) {
			node = nodes[i];
			if (hasClass(node, cls)) ret.push(node);
		};
		return ret;
	}
};
var XHR = function() {
	try {
		return new XMLHttpRequest();
	} catch (e) {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		} catch (e) {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP.3.0');
			} catch (e) {
				try {
					return new ActiveXObject('Micrsoft.XMLHTTP');
				} catch (e) {
					throw new Error('No XMLHttpRequest');
				};
			};
		};
	};
};
var r_trim = /^\s*(\S*)\s*$/;
// js
var codemirrors = $$('codemirror');
if (codemirrors.length) {
	for (var i = 0, l = codemirrors.length; i < l; i++) {
		CodeMirror.fromTextArea(codemirrors[i], {
			lineNumbers: true,
			mode: "javascript"
		});
	};
};

function hasClass(ele, cls) {
	var _cls = ele.className,
		reg = new RegExp('\\s*\\b' + cls + '\\b\\s*', 'ig');
	if (reg.exec(_cls)) return true;
	return false;
};

function addClass(ele, cls) {
	var _cls = ele.className,
		reg = new RegExp('\\s*\\b' + cls + '\\b\\s*', 'ig');
	if (!reg.exec(_cls)) {
		ele.className = (_cls + ' ' + cls).replace(r_trim, '$1');
	};
};

function removeClass(ele, cls) {
	var _cls = ele.className,
		reg = new RegExp('\\s*\\b' + cls + '\\b\\s*', 'ig');
	if (_cls && reg.exec(_cls)) {
		ele.className = _cls.replace(reg, '');
	};
};

function addEventListener(ele, type, fn) {
	if (ele.addEventListener) {
		ele.addEventListener(type, fn, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + type, fn);
	};
};

function removeEventListener(ele, type, fn) {
	if (ele.removeEventListener) {
		ele.removeEventListener(type, fn, false);
	} else if (ele.detachEvent) {
		ele.detachEvent('on' + type, fn);
	};
};