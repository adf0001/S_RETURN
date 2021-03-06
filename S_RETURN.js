
// s_return @ npm
// S_RETURN, string return convention

var ok = function (s) {
	var ts;
	if ((ts = typeof s) === "undefined" || s === "") return "1";
	if (ts !== "string") s = "" + s;

	return s.match(/^1 /) ? s : ("1 " + s);
}

var fail = function (s) {
	var ts;
	if ((ts = typeof s) === "undefined" || s === "") return "0";
	if (ts !== "string") s = "" + s;

	return s.match(/^0 /) ? s : ("0 " + s);
}

var convert = function (o) {
	if (!o) return fail(o);
	else if (o instanceof Error) return fail(o.message);
	else if (typeof o === "object") return ok(JSON.stringify(o));
	else if (typeof o === "string" && o.match(/^[01]( |$)/)) return o;		//already S_RETURN
	else return ok(o);
}

var isOk = function (s) {
	return !!(typeof s === "string" && s.match(/^1( |$)/));
}

//module

module.exports = exports = convert;

exports.ok = ok;
exports.fail = fail;
exports.convert = convert;
exports.isOk = isOk;
