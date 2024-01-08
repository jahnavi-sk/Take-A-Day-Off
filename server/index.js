// API Codes
const express = require('express');
const cors = require('cors');





const app = express();
app.use(express.json());
app.use(cors());
const service = require('./service');

app.post('/register', (req, res) => {
	let r = 0;
	let retCode = service.register(
		req.body.userid,
		req.body.email,
		req.body.password,
		req.body.semester,
		req.body.section,
		req.body.DSA,
		req.body.AFLL,
		req.body.DDCO,
		req.body.WT,
		req.body.SDS
	);
	retCode
		.then((data) => {
			console.log('dbWriteRegistrationData ret=', data);
			r = JSON.stringify(data);
		})
		.catch((err) => {
			console.log('dbWriteRegistrationData err=', err);
		});
	setTimeout(() => {
		console.log('between fn, retCode=', retCode, '::r=', r);
		// console.log('between fn, retCode=', retCode);
		let respMessage = { code: r, text: 'retMsg' };
		console.log('respmsg=', respMessage);
		res.json(respMessage);
	}, 10);
});

app.post('/login', async (req, res) => {
    try {
        await service.login(req.body.userid, req.body.password, res);

    } catch (err) {
        console.log('dbLoginData err=', err);
        res.status(500).json({ code: 500, text: 'Internal Server Error' });
    }
});

app.post('/update', async (req, res) => {
    try {
        await service.update(req.body.userid, req.body.DSA,req.body.AFLL,req.body.DDCO,req.body.WT,req.body.SDS, res);
        // No need for further processing here since response is handled in dbLoginData
    } catch (err) {
        console.log('dbLoginData err=', err);
        res.status(500).json({ code: 500, text: 'Internal Server Error' });
    }
});

app.post('/info', async (req, res) => {
    try {
        await service.info(req.body.userid,req.body.password,req.body.classes, res);

    } catch (err) {
        console.log('dbLoginData err=', err);
        res.status(500).json({ code: 500, text: 'Internal Server Error' });
    }
});
app.post('/attendance', async (req, res) => {
    try {
        await service.attendance(req.body.DDCO,req.body.DSA,req.body.SDS,req.body.AFLL,req.body.WT,req.body.section, req.body.classes, res);

    } catch (err) {
        console.log('Part2Attend err=', err);
        res.status(500).json({ code: 500, text: 'Internal Server Error' });
    }
});



app.listen(3001, () => {
	console.log('server is running');
});
