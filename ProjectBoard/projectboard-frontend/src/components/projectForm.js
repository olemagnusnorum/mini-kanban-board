import React, {Component} from "react"

class ProjectForm extends Component{

    state = {
        projectName: "",
        projectDescription: ""
    }

    handleChangeName = event => {
        this.setState({
            projectName: event.target.value
        })
    }

    handleChangeDescription = event => {
        this.setState({
            projectDescription: event.target.value
        })
    }

    async saveProject() {
        var info = {projectName: this.state.projectName, projectDescription: this.state.projectDescription}
        await this.props.saveProject(info)
    }

    
    render(){
        return(
            <div className="projectform">
                <div>
                    <h1>New Project</h1>
                </div>
                <input type="text" value={this.state.projectName} onChange={this.handleChangeName} />
                <textarea value={this.state.projectDescription} onChange={this.handleChangeDescription} cols="30" rows="10"></textarea>
                <div className="cancelsave">
                    <button className="cancel-btn" onClick={this.props.cancelProject}>Cancel</button>
                    <button className="save-btn" onClick={this.saveProject.bind(this)}>Save</button>
                </div>
            </div>
        );
    }
}


export default ProjectForm