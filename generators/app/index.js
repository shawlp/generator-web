const path = require("path");
const Generator = require("yeoman-generator");
const { getAllFiles } = require("../util");

const templatePathName = path.resolve(__dirname, "./templates/react-h5");
const data = require(`${templatePathName}/package.json`);

module.exports = class extends Generator {
  _initJson() {
    const { name, version, description, main, author, license } = this.answers;
    const packageSettings = {
      ...data,
      name,
      version,
      description,
      main,
      author,
      license
    };
    this.fs.writeJSON(
      this.destinationPath(process.cwd(), "package.json"),
      packageSettings
    );
  }
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      },
      {
        type: "input",
        name: "version",
        message: "Project version",
        default: "1.0.0"
      },
      {
        type: "input",
        name: "description",
        message: "description",
        default: ""
      },
      {
        type: "input",
        name: "main",
        message: "entry point",
        default: "index.js"
      },
      {
        type: "input",
        name: "author",
        message: "author",
        default: ""
      },
      {
        type: "input",
        name: "license",
        message: "license",
        default: "ISC"
      }
    ]).then(answers => {
      this.answers = answers;
    });
  }
  writing() {
    const copyTpl = name => {
      if (path.basename(name) === "package.json") {
        this._initJson();
      } else {
        this.fs.copyTpl(
          this.templatePath(`react-h5/${name}`),
          this.destinationPath(name),
          { title: "react-h5-demo" }
        );
      }
    };
    getAllFiles(
      templatePathName,
      function(pathName) {
        const name = pathName.slice(pathName.indexOf("5/") + 2);
        copyTpl(name);
      },
      () => {
        console.log("finish");
      }
    );
  }
};
