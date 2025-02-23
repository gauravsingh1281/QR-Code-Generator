import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";

const createQR = (url, index) => {
  let qr_png = qr.image(url);
  const filePath = path.join("images", `qr_${url}_${index}.png`);
  qr_png.pipe(fs.createWriteStream(filePath));
  console.log(`QR code for URL_${url}_${index} successfully generated.`);
};

inquirer
  .prompt([
    {
      type: "input",
      name: "URLs",
      message: "Enter URLs separated by commas:",
    },
  ])
  .then((answers) => {
    const urls = answers.URLs.split(",").map((url) => url.trim());
    if (!fs.existsSync("images")) {
      fs.mkdirSync("images");
    }
    urls.forEach((url, index) => {
      createQR(url, index + 1);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong", error);
    }
  });
