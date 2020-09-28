import React from 'react'
import Child from './LifeCycleClassChild'
class LifeCycleClassParent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count : 1
        }
    }
    componentWillReceiveProps(){
        console.log("Inside Parent componentWillReceiveProps");
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log("Inside parent shouldComponentUpdate" + nextProps +" -- "+nextState);
        return true;
    }
    componentWillUpdate(nextProps, nextState){
        console.log("Inside Parent componentWillUpdate");
    }
    componentDidUpdate(prevProps, prevState){
        console.log("Inside Parent componentDidUpdate");
    }
    componentWillUnmount(nextProps, nextState){
        console.log("Inside Parent componentWillUnmount");
    }
    componentWillMount(){
        console.log("Inside Parent ComponentWillMount");
    }
    componentDidMount(){
        console.log("Inside Parent ComponentDidMount")   
       
    }
    handleOnClick = () => {
        this.setState(
            (prevState) => ({count : prevState.count + 1})
        )
    }
    render() {
        return (
            <div className="text-white">
                {console.log("Inside Parent render")}
                {console.log(this.state)}
                <button onClick={this.handleOnClick} >Count{this.state.count}</button>
                Component Lifecycle parent methods
                <Child els='els' />
            </div>
        )
    }
}
export default LifeCycleClassParent;