const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./components/app").App;

var json = require("./data");
require("./style.styl");

ReactDOM.render(
	<App data={json}/>, 
	document.getElementById("root")
);