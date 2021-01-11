import {saveUser} from "../store";
import {Component} from "react";
import {connect} from "react-redux";
import {giveAuthentication} from "../store/stateActions";
const mapStateToProps = (storeData) => ({
    model : storeData.modelData
})

const mapDispatchToProps = {
    giveAuth : giveAuthentication,
    saveUse : saveUser
}

const connectFunction = connect(mapStateToProps,mapDispatchToProps);

export const Test = connectFunction(
    class extends Component{
       
        render = () => {

            console.log(JSON.stringify(this.props));

            return <div>
                Something not working    
                
                <span>{JSON.stringify(this.props.model)} </span>
                <button onClick = {() => this.props.giveAuth({id:"arnoldschwagnzer@gmail.com",role: "user"})}>Click Me</button>
                <button onClick = {()=> this.props.saveUse({firstname: "Sivasankar",lastname : "S"})}>Click me</button>
            </div>
        }
    }
)
