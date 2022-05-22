const fs = require("fs");

export default function handler(req, res) {
  fs.readFile("database/Contacts.json", (err, data) => {
    if (err) throw err;

    const parsedData = JSON.parse(data);
    return res.status(200).json(parsedData);
  });
}
