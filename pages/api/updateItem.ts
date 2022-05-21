const fs = require('fs');
const _ = require('lodash');

export default function handler(req, res) {

	fs.readFile('database/Contacts.json', (err, data) => {
		if (err) throw err;

		const prevData = JSON.parse(data);
		const reqData = req.body;

		let refactoredData = prevData.filter(i => i.type !== reqData.prevType).
										filter(i => i.type !== reqData.type);
		const allData = JSON.stringify([...refactoredData, {type: reqData.type, link: reqData.link}]);

		fs.writeFile('database/Contacts.json', allData, (err) => {
			if (err) throw err;
		});

		res.status(200).json({isSuccess: true});
	});
}