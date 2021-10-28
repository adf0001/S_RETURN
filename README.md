# S_RETURN
S_RETURN, string return convention

# Convention

string for ok
* "1" or "1 " ( space only, 0x20 )
* "1 " + other-string

string for fail
* "0" or "0 "
* "0 " + other-string
* any other string no started with "1"
* not-string object

# Install
```
npm install s_return
```

# Usage
```javascript
var s_return = require("s_return");

assert(S_RETURN.ok("aa") === "1 aa");		// .ok()
assert(S_RETURN.ok("200 ok") === "1 200 ok");
assert(S_RETURN.ok(100) === "1 100");
assert(S_RETURN.ok(0) === "1 0");
assert(S_RETURN.ok("") === "1");
assert(S_RETURN.ok() === "1");

assert(S_RETURN.ok("1 a") === "1 a");	//already ok, unchanged
assert(S_RETURN.ok("1 ") === "1 ");
assert(S_RETURN.ok("1   a") === "1   a");

assert(S_RETURN.ok("1\t") === "1 1\t");		//check only space
assert(S_RETURN.ok("1\n") === "1 1\n");

assert(S_RETURN.fail("aa") === "0 aa");		// .fail()
assert(S_RETURN.fail(0) === "0 0");
assert(S_RETURN.fail("") === "0");
assert(S_RETURN.fail() === "0");

assert(S_RETURN.fail("0 a") === "0 a");	//already fail, unchanged
assert(S_RETURN.fail("0 ") === "0 ");
assert(S_RETURN.fail("0   a") === "0   a");

assert(S_RETURN.fail("0\t") === "0 0\t");
assert(S_RETURN.fail("0\n") === "0 0\n");


assert(S_RETURN.convert("aa") === "1 aa");		// .convert()
assert(S_RETURN("aa") === "1 aa");		// .convert() / default

assert(S_RETURN(false) === "0 false");
assert(S_RETURN() === "0");
assert(S_RETURN("") === "0");
assert(S_RETURN(0) === "0 0");		// 0 is a value for fail

assert(S_RETURN(Error("err1")) === "0 err1");		// Error for fail

assert(S_RETURN({ a: 1 }) === '1 {"a":1}');		// json for ok

assert(S_RETURN("0") === "0");		// already S_RETURN, unchanged
assert(S_RETURN("1") === "1");
assert(S_RETURN("0 ") === "0 ");
assert(S_RETURN("1 ") === "1 ");
assert(S_RETURN("0 a") === "0 a");
assert(S_RETURN("1 a") === "1 a");

assert(S_RETURN.isOk("1 a") === true);		// .isOk()
assert(S_RETURN.isOk("1 0") === true);
assert(S_RETURN.isOk("1 ") === true);
assert(S_RETURN.isOk("1") === true);

assert(S_RETURN.isOk("0") === false);
assert(S_RETURN.isOk("") === false);
assert(S_RETURN.isOk() === false);

assert(S_RETURN.isOk("1\ta") === false);		//check only space
assert(S_RETURN.isOk("1\na") === false);

assert(S_RETURN.isOk(true) === false);	//not string
assert(S_RETURN.isOk(1) === false);
assert(S_RETURN.isOk({ a: 1 }) === false);

```
