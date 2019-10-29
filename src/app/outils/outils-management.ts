import * as jsSHA from 'jssha';
import * as process from 'process';

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function constructorLog(here) {
    if (here != 'constructor') {
	console.log('%cEntrée dans','color:#00aa00','constructor',here);
    } else {
	console.log('%cEntrée dans','color:#00aa00', here);
    }
}
    
export function errorStack () {
    var stack = new Error().stack;
    return stack;
}

export function functionNameByIndex (i:number) {
    var stack = new Error().stack,
	caller = (stack.split('\n')[i].trim()).split('@')[0];
    return caller;
}

export function functionName () {
    var stack = new Error().stack,
	caller = (stack.split('\n')[1].trim()).split('@')[0];
    return caller;
}

export function functionNameJS () {
    var stack = new Error().stack;
    var caller = (stack.split('at')[2]).split(' ')[1];
    return caller;
}

export function functionNameForbidden () {
    var ownName = arguments.callee.toString();
    ownName = ownName.substr('function '.length);        // trim off "function "
    ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
    return ownName;
}

export function entering_in_function (str_fun: string) {
    console.log ("entering in function " + str_fun + "()");
};

export function exiting_from_function (str_fun: string ) {
    console.log("exiting from function " + str_fun + "()");
};

export function exiting_from_function_with_what (str_fun: string, str_with:string, what: string ) {
    console.log("exiting from function " + str_fun + "() with "+str_with+" >"+what+"<");
};

export function unsubscribeLog (here:string, what:string) {
    return console.log('%cDans '+here+' %c'+what+' %cunsubscribe','color:#00aa00','color:#aa0000','color:#00aa00')
}

export function uriGet(here) {
    
    let port = process.env.PORT_DB || '3000';
    let server = process.env.SERVER_DB || 'localhost';
    //    let port = '3010';
    //    let server = '51.75.143.86';
    let uri = 'http://'+server+':'+port;
    console.log('uriGet: Dans',here,'uri',uri);
    return uri;
}
