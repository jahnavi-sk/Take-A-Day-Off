const dblib = require('./mysqllib');

async function register(userid, email, password, semester, section, dsa, afll, ddco, wt, sds) {
	let retCode = 0;
	await dblib
		.dbWriteRegistrationData(userid, email, password, semester, section, dsa, afll, ddco, wt, sds)
		.then((data) => {
			console.log('dbWriteRegistrationData ret=', data);
			retCode = 1;
		})
		.catch((err) => {
			console.log('dbWriteRegistrationData err=', err);
		});

	console.log('in service register after db');
	return retCode;
}


async function login(userid, password,res) {
	let retCode = 0;
	await dblib
		.dbLoginData(userid,password,res)
		.then((data) => {
			// console.log('dbLoginData success ret=', data);
			retCode = 1;
		})
		.catch((err) => {
			// console.log('dbLoginData failure err=', err);
		});

	// console.log('in service login after db');
	return retCode;
}

async function update(userid,dsa,afll,ddco,wt,sds,res) {
	let retCode = 0;
	await dblib
		.dbUpdateData(userid,dsa,afll,ddco,wt,sds,res)
		.then((data) => {
			console.log('dbUpdateData ret=', data);
			retCode = 1;
		})
		.catch((err) => {
			console.log('dbUpdateData err=', err);
		});

	console.log('in service login after db');
	return retCode;
}

async function attendance_p1(section,classes,res) {
	let retCode = 0;
	await dblib
		.dbAttendance_p1_Data(section,classes,res)
		.then((data) => {
			console.log('dbAttendanceData ret=', data);
			retCode = 1;
		})
		.catch((err) => {
			console.log('dbAttendanceData err=', err);
		});

	console.log('in service attendance after db');
	return retCode;
}

async function info(userid,password,classes,res)
{
	let retCode = 0;
	await dblib
		.getInfo(userid,password,classes,res)
		.then((data) => {
			// console.log('success ret=', data);
			retCode = 1;
		})
		.catch((err) => {
			console.log('success err=', err);
		});

	// console.log('in service attendance after db');
	return retCode;
}

async function attendance(ddco,dsa,wt,sds,afll,section,classes,res){
	let retCode = 0;
	await dblib
		.dbAttendanceData(ddco,dsa,wt,sds,afll,section,classes,res)
		.then((data) => {
			console.log('dbAttendanceData ret=', data);
			retCode = 1;
		})
		.catch((err) => {
			console.log('dbAttendanceData err=', err);
		});

	console.log('in service attendance after db');
	return retCode;
}
module.exports = { register, login, update, attendance,info};
