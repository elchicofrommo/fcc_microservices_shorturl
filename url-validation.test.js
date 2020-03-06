const validateURL = require("./url-validation.js").validateURL;

test("Obtained the refernece to the function", ()=>{
	expect(validateURL).toBeTruthy();
});

test("testing invalid string url", (done)=>{

	validateURL("junk", (status, result)=>{
		try{
			expect(result).toBeFalsy();
			done();
		}catch(err){
			done(err)
		}
	});
		
});
/*
test("testing invalid int as url", (done)=>{
try{
	validateURL(1, (status, result)=>{
		try{
		//	expect(result).toBeFalsy();
			done();
		}catch(err){
			done(" couldn't make connection: " + err)
		}
	});
	}catch(err ){

		done("outer wrap couldn't make connectoin " + err)
	}	
});
*/
test("testing http://www.google.com", (done) =>{


	function callback(status, result){
		try{
			console.log(`status:${status} result:${result}`)
			expect(result).toBeTruthy();
			done();
		}catch(error){
			done(" a time out possibly? " + error);
		}
	}
	validateURL("http://www.google.com", callback );
})

test("testing https://www.google.com", (done) =>{


	function callback(status, result){
		try{
			console.log(`status:${status} result:${result}`)
			expect(result).toBeTruthy();
			done();
		}catch(error){
			done(" a time out possibly? " + error);
		}
	}
	validateURL("https://www.google.com", callback );
})

test("testing https://www.nytimes.com/section/world", (done) =>{


	function callback(status, result){
		try{
			console.log(`status:${status} result:${result}`)
			expect(result).toBeTruthy();
			done();
		}catch(error){
			done(" a time out possibly? " + error);
		}
	}
	validateURL("https://www.nytimes.com/section/world", callback );
})

