function functionNameJS () {
    var stack = new Error().stack;
    var caller = (stack.split('at ')[2]).split(' ')[0];
    return caller;
}

function isValidEmail (email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var result = (re.test(String(email).toLowerCase()));
	console.log('result',result);
	return result;
    }

module.exports.isValidEmail = isValidEmail;
module.exports.functionNameJS = functionNameJS;



