import React from 'react';
import "./Dashboard.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Authenticate from '../../services/Authenticate';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //  userdata:'',
    //  userid: this.props.location.pathname.split("/")[2]
    };
  };
  // componentDidMount() {

  //   let userid = this.props.location.pathname.split("/")[2];
  //   console.log(userid)
  //   Authenticate.find_users(userid)
  //   .then((response) => {
  //     console.log(response.data.user[0])
  //     this.setState({
  //       userdata: response.data.user[0]
  //     })
  //   })
  // }

  render() {
    return (
      <div className="Dashboard">

        <div className="dashboard-img-div-wrapper">
          <div className="dashboard-img-div">
          </div>
          <p>
            {/* User Name: {this.state.userdata.username} */}
          </p>
          <p>
            {/* Email: {this.state.userdata.useremail} */}
          </p>
        </div>
      </div>

    )
  }

};

export default Dashboard;
