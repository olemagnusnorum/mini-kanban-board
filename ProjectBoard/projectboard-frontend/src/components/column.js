
import Project from "./project"
import ProjectForm from "./projectForm"
import React, {Component} from "react"


class Column extends Component {

    

    render(){
        
        return (
            <div className="column">
                <div className="columnHeader">
                    <h1>{this.props.name}</h1>
                    {this.props.id == "backlog" &&
                        <button className="create-btn" onClick={this.props.addProjects}>+</button>
                    }
                </div>
                <div className="projectContainer"> 
                    {this.props.projects.map(project => <Project columnId={this.props.id} id={project.projectId} name={project.projectName} description={project.projectDescription} removeProject={this.props.removeProjectReal.bind(this)} moveLeft={this.props.moveLeft} moveRight={this.props.moveRight}/>)}
                </div>
                {this.props.inputBox && <ProjectForm saveProject={this.props.saveProject.bind(this)} cancelProject={this.props.cancelProject}/>}
            </div>
        );
    }

}



export default Column