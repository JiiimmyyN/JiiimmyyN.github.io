const React = require("react");
var Element = require("./element").Element;

class Collumn extends React.Component {
	render() {
		let c = this.props["class"];
		let elements = [];

		this.props.data["elements"].map((value, index) => {
			elements.push(<Element key={index} data={value}/>);
		});

		return (
			<div className={c}>
				{ elements }
			</div>
		);
	}
}

exports.Collumn = Collumn;