import fs from "node:fs";
import path from "node:path";

const CLASSES_SOURCE =
	"https://raw.githubusercontent.com/SyndiShanX/Update-Classes/refs/heads/main/Changes.txt";
const SRC_DIR = "src";

const classes = (await (await fetch(CLASSES_SOURCE)).text()).split("\n");
const files = fs
	.readdirSync(SRC_DIR, { recursive: true })
	.map((e) => path.join(SRC_DIR, e))
	.filter((e) => fs.lstatSync(e).isFile());

for (const file of files) {
	let text = fs.readFileSync(file).toString();
	for (let i = 0; i < classes.length; i += 2) {
		const class1 = classes[i];
		const class2 = classes[i + 1];

		text = text.replaceAll(class1, class2);
	}

	fs.writeFileSync(file, text);
	console.log("Wrote %o", file);
}
