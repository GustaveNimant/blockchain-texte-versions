import * as jsSHA from 'jssha';
import * as M from './management-outils';

export function createSha (str:string, typeSha:string, formatInput: string, formatOutput: string) {
    let here = M.functionName ();
//  this.hash_512 = this.createSha('This is a test', 'SHA-512', 'TEXT', 'HEX');

    const TS = typeSha.toUpperCase();
    const FI = formatInput.toUpperCase();
    const FO = formatOutput.toUpperCase();
    
    switch (TS) {
	case "SHA-1":
	case "SHA-224":
	case "SHA3-224":
	case "SHA-256":
	case "SHA3-256":
	case "SHA-384":
	case "SHA3-384":
	case "SHA-512":
	case "SHA3-512":
	case "SHAKE128":
	case "SHAKE256":
	    break;
	default:
	    console.log('Dans',here,'le type de SHA illégal',TS);
	    break;
    }
    
    switch (FI) {
	case "TEXT":
	    break;
	default:
	    console.log('Dans',here,'le format d\'Input de SHA illégal',FI);
	    break;
    }
    
    switch (FO) {
	case "HEX":
	    break;
	default:
	    console.log('Dans',here,'le format d\'Output de SHA illégal',FO);
	    break;
    }

    const shaObj = new jsSHA(typeSha, formatInput);
    shaObj.update(str);
    const hash = shaObj.getHash(formatOutput);

    return hash;
    
}
