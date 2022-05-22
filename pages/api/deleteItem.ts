const fs = require("fs");
const _ = require("lodash");

export default function handler(req, res) {
  fs.readFile("database/Contacts.json", (err, data) => {
    if (err) throw err;

    const prevData = JSON.parse(data);
    const reqData = req.body;

    const allData = JSON.stringify(
      prevData.filter((i) => i.type !== reqData.type)
    );

    fs.writeFile("database/Contacts.json", allData, (err) => {
      if (err) throw err;
    });

    res.status(200).json({ isSuccess: true });
  });
}
