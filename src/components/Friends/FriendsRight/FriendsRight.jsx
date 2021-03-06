import React from "react";

import "./FriendsRight.scss";
import { Link } from 'react-router-dom';

import FriendsAPI from "../../../services/FriendsAPI";

class FriendsRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFriends: null
    }
  };

  componentDidMount() {

    let ownId = this.props.match.params.id;
    FriendsAPI.findAllFriends(ownId)
      .then((response) => {
        console.log(response.data.friends)
        this.setState({
          allFriends: response.data.friends
        })
      })
      .catch((error) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="FriendsRight-wrapper">
        {
          this.state.allFriends ?
            this.state.allFriends.length > 0 ?
              <div>
                <h4 className="friendsright-header">Your friends</h4>
                <div className="FriendsRight">
                  {
                    this.state.allFriends.map(user =>
                      <div
                        className="friendsright-each"
                        key={user.useremail}
                      >
                        <Link
                          className="Applinks"
                          to={`/user/${this.props.match.params.id}/message/${user.chatroomid}`}
                        >
                          <div className="friendsright-each-img"
                           key={user.imgurl} >
                             <img src={`http://localhost:5000/Images/${user.imgurl}`}/>
                             </div>
                        </Link>

                        <div className="friendsright-name">
                          {
                            user.username ?
                              <p>{user.username} ({user.useremail?.length > 30 ?
                                user.useremail.substring(0, 14) + "..." + user.useremail.substring(user.useremail?.length - 15, user.useremail?.length) :
                                user.useremail})</p> :

                              user.useremail.length > 30 ?
                                user.useremail.substring(0, 14) + "..." + user.useremail.substring(user.useremail?.length - 15, user.useremail?.length) :
                                user.useremail
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div> :
              <div className="friendsright-add">
                <h4>Add friends to chat</h4>
              </div>
            :
            null
        }
      </div>
    )
  }
};

export default FriendsRight;