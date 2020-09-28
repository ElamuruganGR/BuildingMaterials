import React from 'react'
import TodaysCostOld from './TodaysCostOld'
import UpdatedSuccessfully from './UpdatedSuccessfully'
import TechnicalDifficulties from './TechnicalDifficulties'
class WelcomeOld extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todaysCostUpdated: null
    }
  }
  updateSuccess = (value) => {
    this.setState({ todaysCostUpdated: value })
  }
  render() {
    return (
      <div className="text-white" style={{position:"absolute"}}>

        {console.log("Welcome.return(): todaysCostUpdated :" + this.state.todaysCostUpdated)}

        <h1>Welcome to Construction Cost Predictor</h1>
        <p>Here you can calculate your home construction cost by providing some inputs.</p>
        {(this.state.todaysCostUpdated !== null) ? ((this.state.todaysCostUpdated === 'Y') ? <UpdatedSuccessfully /> : <TechnicalDifficulties />) : <TodaysCostOld showComponent={this.updateSuccess} />}

      </div>

    )
  }
}
export default WelcomeOld;