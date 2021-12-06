import React, {Component} from "react"



class Project extends Component {

    
    removeProject = () => {
        this.props.removeProject(this.props.id, this.props.columnId)
    }

    moveLeft = () => {
        console.log("move left")
        this.props.moveLeft(this.props.id, this.props.columnId)
        //next make project change collumn/parent
    }

    moveRight = () => {
        console.log("move right")
        this.props.moveRight(this.props.id, this.props.columnId)
    }



    render(){



        return (
            <div className="project">
                <h1>{this.props.name}</h1>
                
                <p>{this.props.description}</p>
                <div>
                    <button className="delete-btn" onClick={this.removeProject.bind(this)}>X</button>
                    {this.props.columnId !== "done" && <button className="left-btn" onClick={this.moveLeft.bind(this)}>{String.fromCharCode(8592)}</button>}
                    {this.props.columnId !== "backlog" && <button className="right-btn" onClick={this.moveRight.bind(this)}>{String.fromCharCode(8594)}</button>}

                </div>
            </div>
        );
    }
}

export default Project