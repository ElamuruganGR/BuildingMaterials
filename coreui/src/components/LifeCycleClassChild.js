import React from 'react'
class LifeCycleClassChild extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        console.log("Inside Child ComponentWillMount");
    }
    componentDidMount(){
        console.log("Inside Child ComponentDidMount");
    }
    componentWillReceiveProps(nextProps){
        console.log("Inside Child componentWillReceiveProps" + nextProps);
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log("Inside Child shouldComponentUpdate" + nextProps +" -- "+nextState);
        return true;
    }
    componentWillUpdate(nextProps, nextState){
        console.log("Inside Child componentWillUpdate" + nextProps +" -- "+nextState);
    }
    componentDidUpdate(prevProps, prevState){
        console.log("Inside Child componentDidUpdate" + prevProps +" -- "+prevState);
    }
    componentWillUnmount(){
        console.log("Inside Child componentWillUnmount");
    }
    // componentWillReceiveProps(){
    //     console.log("Inside Child componentWillReceiveProps");
    // }
    // componentWillUpdate(){
    //     console.log("Inside Child componentWillUpdate");
    // }
    // componentDidUpdate(){
    //     console.log("Inside Child componentDidUpdate");
    // }
    // componentWillUnmount(){
    //     console.log("Inside Child componentWillUnmount");
    // }
    // componentWillMount(){
    //     console.log("Inside Child ComponentWillMount");
    // }
    // componentDidMount(){
    //     console.log("Inside Child ComponentDidMount");
    // }
    render() {
        return (
            <div className="text-white">
                {console.log("Inside Child render")}
                Component Lifecycle child methods
            </div>
        )
    }
}
export default LifeCycleClassChild;