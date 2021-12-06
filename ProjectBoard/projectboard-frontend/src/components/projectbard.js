import Column from "./column"
import React, {Component} from "react"





class ProjectBoard extends Component {

    state = {
        backlogProjects: [],
        inProgressProjects: [],
        doneProjects: [],
        inputBox: false
    }


    async componentDidMount() {
       
        var backlog = []
        var inProgress = []
        var done = []
        
        console.log("inif")
        var data = await this.fetchProjects()
        data.map(d => {
            const project = {projectId: d.id, projectName: d.name, projectDescription: d.description, projectStage: d.stage}
            if (d.stage == "backlog"){
                backlog.push(project)
            }
            if (d.stage == "in-progress"){
                inProgress.push(project)
            }
            if (d.stage == "done"){
                console.log("if done")
                done.push(project)
            }
        })
        
        this.setState({backlogProjects: [...this.state.backlogProjects, ...backlog],
                    inProgressProjects: [...this.state.inProgressProjects, ...inProgress],
                    doneProjects: [...this.state.doneProjects, ...done]})

    }
    
    

    
    async removeProjectReal(id, column) {
        if (column == "backlog"){
            const response = await this.deleteProject(id)
            const newProjectList = this.state.backlogProjects.filter((item) => item.projectId !== id );
            this.setState({
                backlogProjects: newProjectList
            })
        }
        if (column == "in-progress"){
            const response = await this.deleteProject(id)
            const newProjectList = this.state.inProgressProjects.filter((item) => item.projectId !== id );
            this.setState({
                inProgressProjects: newProjectList
            })
        }
        if (column == "done"){
            const response = await this.deleteProject(id)
            const newProjectList = this.state.doneProjects.filter((item) => item.projectId !== id );
            this.setState({
                doneProjects: newProjectList
            })
        }


    }
    
     
    addProjects = () => {
        this.setState({
            inputBox: true
        })
        console.log(this.state.inputBox)
    }
    
    
    
    async saveProject(newProject) {
        const body = { Name: newProject.projectName, Description: newProject.projectDescription, Stage: "backlog"}
        const data = await this.postProject(body)
        //need to have data on right format
        const project = {projectId: data.id, projectName: data.name, projectDescription: data.description, projectStage: data.stage}
        this.setState({
            backlogProjects: [...this.state.backlogProjects, project],
            inputBox: false
    })
    }

    cancelProject = () => {
        this.setState({
            inputBox: false
        })
    }

    async moveLeft(id, fromColumn){
        var project;
        var body;
        if (fromColumn == "backlog"){
            project = this.state.backlogProjects.filter((item) => item.projectId == id )[0];
            body = {Name: project.projectName, Description: project.projectDescription, Stage: "in-progress"}
            const data = await this.putProject(id, body)
            project = {projectId: data.id, projectName: data.name, projectDescription: data.description, projectStage: data.stage}
            const newProjectList = this.state.backlogProjects.filter((item) => item.projectId !== id );
            this.setState({
                backlogProjects: newProjectList,
                inProgressProjects: [...this.state.inProgressProjects, project]
            })
        }
        if (fromColumn == "in-progress"){
            project = this.state.inProgressProjects.filter((item) => item.projectId == id )[0];
            body = {Name: project.projectName, Description: project.projectDescription, Stage: "done"}
            const data = await this.putProject(id, body)
            project = {projectId: data.id, projectName: data.name, projectDescription: data.description, projectStage: data.stage}
            const newProjectList = this.state.inProgressProjects.filter((item) => item.projectId !== id );
            this.setState({
                inProgressProjects: newProjectList,
                doneProjects: [...this.state.doneProjects, project]
            })
        }
    }

    async moveRight(id, fromColumn){
        var project;
        var body;
        if (fromColumn == "in-progress"){
            project = this.state.inProgressProjects.filter((item) => item.projectId == id )[0];
            body = {Name: project.projectName, Description: project.projectDescription, Stage: "backlog"}
            const data = await this.putProject(id, body)
            project = {projectId: data.id, projectName: data.name, projectDescription: data.description, projectStage: data.stage}
            const newProjectList = this.state.inProgressProjects.filter((item) => item.projectId !== id );
            this.setState({
                inProgressProjects: newProjectList,
                backlogProjects: [...this.state.backlogProjects, project]
            })
        }
        if (fromColumn == "done"){
            project = this.state.doneProjects.filter((item) => item.projectId == id )[0];
            body = {Name: project.projectName, Description: project.projectDescription, Stage: "in-progress"}
            const data = await this.putProject(id, body)
            project = {projectId: data.id, projectName: data.name, projectDescription: data.description, projectStage: data.stage}
            const newProjectList = this.state.doneProjects.filter((item) => item.projectId !== id );
            this.setState({
                doneProjects: newProjectList,
                inProgressProjects: [...this.state.inProgressProjects, project]
            })
        }


    }



    render(){
        return(
            <div className="projectboard">
                <Column id="done" name="Done"
                    inputBox={this.state.inputBox}
                    projects={this.state.doneProjects}
                    removeProjectReal={this.removeProjectReal.bind(this)}
                    addProjects={this.addProjects}
                    saveProject={this.saveProject.bind(this)}
                    cancelProject={this.cancelProject}
                    moveLeft={this.moveLeft.bind(this)}
                    moveRight={this.moveRight.bind(this)}/>
                
                <Column id="in-progress" name="In Progress"
                    inputBox={this.state.inputBox}
                    projects={this.state.inProgressProjects}
                    removeProjectReal={this.removeProjectReal.bind(this)}
                    addProjects={this.addProjects}
                    saveProject={this.saveProject.bind(this)}
                    cancelProject={this.cancelProject}
                    moveLeft={this.moveLeft.bind(this)}
                    moveRight={this.moveRight.bind(this)}/>
                
                <Column id="backlog" name="Backlog"
                    inputBox={this.state.inputBox}
                    projects={this.state.backlogProjects}
                    removeProjectReal={this.removeProjectReal.bind(this)}
                    addProjects={this.addProjects}
                    saveProject={this.saveProject.bind(this)}
                    cancelProject={this.cancelProject}
                    moveLeft={this.moveLeft.bind(this)}
                    moveRight={this.moveRight.bind(this)}/>
                    
            </div> 
        );
    }




    async fetchProjects() {
        const response = await fetch('http://localhost:5000/api/projects');
        return response.json();
        
    }

    async postProject(body){
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

    async putProject(id, body){
        const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)

        })
        return response.json();

    }


}



export default ProjectBoard