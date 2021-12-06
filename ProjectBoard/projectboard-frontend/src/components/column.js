
import Project from "./project"
import ProjectForm from "./projectForm"
import React, {Component} from "react"


class Column extends Component {

    
    /* 
    state = {
        projects: [],
        inputBox: false
    }
    async componentDidMount() {
       
        var arr = []
        if (this.props.id == "backlog"){
            console.log("inif")
            var data = await this.fetchProjects()
            console.log(data[0].id)
            data.map(d => {
                const project = {projectId: d.id, projectName: d.name, projectDescription: d.description}
                arr.push(project)
            })
            console.log(arr)
            
        }
        this.setState({projects: [...this.state.projects, ...arr]})

    }
    
    
    removeProject = (id) => {
        console.log(id)
        const newProjectList = this.state.projects.filter((item) => item.projectId !== id );
        this.setState({
            projects: newProjectList
        })
    }

    //må bruke DELETE fetch
    async removeProjectReal(id) {
        const response = await this.deleteProject(id)
        console.log(response)
        const newProjectList = this.state.projects.filter((item) => item.projectId !== id );
        this.setState({
            projects: newProjectList
        })

    }
    
     
    addProjects = () => {
        this.setState({
            inputBox: true
        })
        console.log(this.state.inputBox)
    }
    
    
    //her må vi poste til backend
    async saveProject(newProject) {
        const body = { Name: newProject.projectName, Description: newProject.projectDescription}
        const data = await this.postProject(body)
        console.log(data)
        //need to have data on right format
        const project = {projectId: data.id, projectName: data.name, projectDescription: data.description}
        this.setState({
            projects: [...this.state.projects, project],
            inputBox: false
    })
    }

    cancelProject = () => {
        this.setState({
            inputBox: false
        })
    }


    moveToInProgress = (id) => {
        var inProgress = 
        console.log(inProgress)
        var project = this.state.projects.filter((item) => item.projectId !== id );
        inProgress.setState({
            projects: [...inProgress.state.projects, project]
        });
    }
*/
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
/*
    async fetchProjects() {
        console.log("in fetch")
        const response = await fetch('http://localhost:5000/api/projects');
        return response.json();
        
    }

    async postProject(body){
        console.log("in save")
        const response = await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        })
        return response.json()
        
    }

    async deleteProject(id){
        const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
            method: 'DELETE',
            mode: 'cors',
        })
        return response
    }

*/
}



export default Column