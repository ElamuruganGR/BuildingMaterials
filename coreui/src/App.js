import React from 'react';
// import './App.css';
// import './css/common.css'
// import BgImage from '../src/images/Background.jpeg'
// import NavigationBarOld from './components/NavigationBarOld'
// import WindowPropertiesContext from './components/WindowPropertiesContext'
// import FunctionalComponent from './components/FunctionalComponent';
// export const windowProperties = React.createContext()
//=======================================================================================
import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import WelcomeOld from './components/WelcomeOld';
import Welcome from './components/Welcome';
import WallCalculation from './components/WallCalculation';
import Plastering from './components/Plastering';
import store from  './redux/wall/Store';
import {Provider} from 'react-redux';
function App() {
  return (
    // <BrowserRouter>
    //   <WindowPropertiesContext.Provider value={{windowHeight :  window.innerHeight, windowWidth :  window.innerWidth}}>
    //       <NavigationBarOld />
    //   <div lg={12} style={{ marginTop: 20 }}>
    //     <Switch>
    //       <Route path="/home" exact component={WelcomeOld}></Route>
    //       <Route path="/test" exact component={Test}></Route>
    //       <Route path="/wallCalculation" exact component={WallCalculation}></Route>
    //       <Route path="/image" exact component={Image}></Route>
    //     </Switch>
    //   </div>
    //   </WindowPropertiesContext.Provider>
    // </BrowserRouter>
    // <LifeCycleClassParent></LifeCycleClassParent>
    //======================================================================================
    <Provider store={store}>
    <BrowserRouter>
      <NavigationBar />
      <Route path="/homeOld" exact component={WelcomeOld} />
      <Route path="/" exact component={Welcome} />
      <Route path="/qcWall" exact component={WallCalculation} />
      <Route path="/qcPlastering" component={Plastering} />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
