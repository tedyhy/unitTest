var $ = function(id) {
	return document.getElementById(id);
};
var $$ = function(cs) {
	return document.getElementsByClassName(cs);
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