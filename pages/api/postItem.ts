const fs = require("fs");
const _ = require("lodash");

export default function handler(req, res) {
  fs.readFile("database/Contacts.json", (err, data) => {
    if (err) throw err;

    const prevData = JSON.parse(data);
    const reqData = req.body;

    let isAllowed = true;
    prevData.map((i) => {
      if (reqData.type == i.type) {
        isAllowed = false;
      }
    });

    if (isAllowed) {
      let allData;

      if (_.isEmpty(prevData)) {
        allData = JSON.stringify([reqData], null, 2);
      } else {
        allData = JSON.stringify([...prevData, reqData], null, 2);
      }

      fs.writeFile("database/Contacts.json", allData, (err) => {
        if (err) throw err;
      });

      res.status(200).json({ isSuccess: true });
    } else {
      res.status(400).json({ isSuccess: false });
    }
  });
}
