const React = require("react");
const Collumn = require("./collumn").Collumn;

class App extends React.Component {
	render() { 
		return (
			<div>
				<Collumn class="left" data={this.props.data["col-left"]} />
				<Collumn class="right" data={this.props.data["col-right"]} />
			</div>
		);
	}
}

exports.App = App;