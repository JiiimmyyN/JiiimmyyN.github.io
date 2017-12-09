const React = require("react");


class ProjectsElement extends React.Component { 
	render() {
		let projects = [];

		this.props.data["elements"].map((value, index) => {
			projects.push(<Element key={index} data={value} />);
		});

		return (
			<div className="projects">
				<div className="projects-header">
					<h1>{this.props.data["header"]}</h1>
				</div>
				<div className="projects-body">
					{ projects }
				</div>
			</div>
		);
	}
}

class SingleProjectElement extends React.Component { 
	render() {

		let e = [];
		this.props.data["elements"].map((value, index) => {
			e.push(<Element key={index} data={value}/>);
		});

		return (
			<div className="project">
				<div className="thumbnail">
					<h1>{this.props.data["title"]}</h1>
					<h3>{this.props.data["subtitle"]}</h3>
					<img src={this.props.data["thumbnail"]}></img>
				</div>
				<div className="summary">
					<p>{this.props.data["description"]}</p>
					<div>{ e }</div>
				</div>
			</div>
		);
	}
}

class ExternalElement extends React.Component {
	render() {
		var c = "fa fa-" + this.props.data["site"] ;
		return (
			<span>
				<i className={c} aria-hidden={true}></i>
				<a href={this.props.data["URL"]}> {this.props.data["text"]}</a>
			</span>
		);
	}
}

class Element extends React.Component {
	render() {

		let value = this.props.data;

		let display = "";
		if(this.props.data["display"])
			display = this.props.data["display"];

		if(value.type === "external")
			return (<p className={display}><ExternalElement data={value} /></p>);
		else if(value.type === "text")
			return (<p>{value.text}</p>);
		else if(value.type === "img")
			return (<img src={value.URL} width={value.width}></img>);
		else if(value.type === "h1")
			return (<h1>{value.text}</h1>);
		else if(value.type === "h2")
			return (<h2>{value.text}</h2>);
		else if(value.type === "projects")
			return <ProjectsElement data={value}/>;
		else if(value.type === "project")
			return <SingleProjectElement data={value}/>;
		else
			return;
	}
}

exports.Element = Element;