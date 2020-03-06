

const dns = require('dns');
const http = require('http');
const https = require('https');

function validateURL(url, done){

	let request = http;
	if(url && typeof url == "string"){
		url = url.toLowerCase();
		if(url.startsWith("https"))
			request = https;
	}
	try{
		request.get(url, (res)=> {
			const { statusCode } = res;

			let bReturn = true;
			if(statusCode !== 200){
				bReturn = false;
			//	console.log("found a problem with the url statusCode=" + statusCode);
			}
			done(statusCode, bReturn);

		})
	}catch(err){
	//	console.log("caught exceptoin in url validation " + err);
		done(err, false)
	}
}

exports.validateURL = validateURL;