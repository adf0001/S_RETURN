// global, for html page
S_RETURN = require("../S_RETURN.js");
assert = require("assert");

module.exports = {

	"S_RETURN()": function (done) {

		assert(S_RETURN.ok("aa") === "1 aa");		// .ok()
		assert(S_RETURN.ok("200 ok") === "1 200 ok");
		assert(S_RETURN.ok(100) === "1 100");
		assert(S_RETURN.ok(0) === "1 0");
		assert(S_RETURN.ok("") === "1");
		assert(S_RETURN.ok() === "1");

		assert(S_RETURN.ok("1 a") === "1 a");	//already ok, unchanged
		assert(S_RETURN.ok("1 ") === "1 ");
		assert(S_RETURN.ok("1\t") === "1\t");
		assert(S_RETURN.ok("1 \t  \t a") === "1 \t  \t a");

		assert(S_RETURN.ok("1\n") === "1 1\n");		//check only space and \t

		assert(S_RETURN.fail("aa") === "0 aa");		// .fail()
		assert(S_RETURN.fail(0) === "0 0");
		assert(S_RETURN.fail("") === "0");
		assert(S_RETURN.fail() === "0");

		assert(S_RETURN.fail("0 a") === "0 a");	//already fail, unchanged
		assert(S_RETURN.fail("0 ") === "0 ");
		assert(S_RETURN.fail("0\t") === "0\t");
		assert(S_RETURN.fail("0 \t  \t a") === "0 \t  \t a");

		assert(S_RETURN.fail("0\n") === "0 0\n");


		assert(S_RETURN.convert("aa") === "1 aa");		// .convert()
		assert(S_RETURN("aa") === "1 aa");		// .convert() / default

		assert(S_RETURN(false) === "0 false");
		assert(S_RETURN() === "0");
		assert(S_RETURN("") === "0");
		assert(S_RETURN(0) === "0 0");		// 0 is a value for fail

		assert(S_RETURN(Error("err1")) === "0 err1");		// Error for fail

		assert(S_RETURN({ a: 1 }) === '1 {"a":1}');		// json for ok

		assert(S_RETURN.isOk("1 a") === true);		// .isOk()
		assert(S_RETURN.isOk("1 0") === true);
		assert(S_RETURN.isOk("1 ") === true);
		assert(S_RETURN.isOk("1") === true);
		assert(S_RETURN.isOk("1\ta") === true);

		assert(S_RETURN.isOk("0") === false);
		assert(S_RETURN.isOk("") === false);
		assert(S_RETURN.isOk() === false);

		assert(S_RETURN.isOk("1\na") === false);		//check only space and \t
		
		assert(S_RETURN.isOk(true) === false);	//not string
		assert(S_RETURN.isOk(1) === false);
		assert(S_RETURN.isOk({ a: 1 }) === false);

		done(false);
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
