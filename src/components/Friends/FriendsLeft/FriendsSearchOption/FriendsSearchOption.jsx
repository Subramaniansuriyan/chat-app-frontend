import React from 'react';

import "./FriendsSearchOption.scss";
import FriendsAPI from "../../../../services/FriendsAPI";

import axios from 'axios';
class FriendsSearchOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentRequest: props.sentRequest,
      receivedRequest: props.receivedRequest,
      userid: props.theid
    };
  };

  render() {
    return (
      <div
        className="FriendsSearchOption"
      >
        <div className="search-option-wrapper">

          <div className="search-option-img">
          </div>

          <div className="search-option-username">

            {
              this.props.username.length ?
                <div className="search-option-username-span-wrapper">
                  <strong className="search-option-username-span">
                    {this.props.username}
                  </strong>
                  <p>
                    {
                      this.props.useremail.length > 17 ?
                        this.props.useremail.substring(0, 8) + "..." + this.props.useremail.substring(this.props.useremail.length - 10, this.props.useremail.length + 1)
                        :
                        this.props.useremail

                    }
                  </p>
                </div>
                :
                <strong className="search-option-username-span">

                  {
                    this.props.useremail.length > 17 ?
                      this.props.useremail.substring(0, 8) + "..." + this.props.useremail.substring(this.props.useremail.length - 10, this.props.useremail.length + 1)
                      :
                      this.props.useremail
                  }


                </strong>
            }

          </div>

          {
            this.state.sentRequest
              ?
              <div className="search-option-checkmark clickstay">
              </div>
              :
              null
          }

          {
            this.state.sentRequest ?
              <div
                className="search-option-request clickstay"
                onClick={
                  FriendsAPI.cancelRequest.bind(null, this.props.useremail, this.state.userid, this)
                }
              >
                <p className="clickstay">Click to cancel friend request</p>
              </div>
              :
              this.state.receivedRequest ?
                <div className="search-option-requestreceived clickstay">
                  <div className="search-option-requestreceived-flex clickstay">
                    {/* <p>blah has sent you friend request</p> */}
                    <div className="clickstay">
                      <button className="request-button request-button-accept clickstay">Accept friend request</button>
                      <button className="request-button request-button-decline clickstay">Decline</button>
                    </div>
                  </div>


                </div>
                :
                <div
                  className="search-option-not-request clickstay"
                  onClick={
                    FriendsAPI.sendRequest.bind(null, this.props.useremail, this.state.userid, this)
                  }
                >
                  <p className="clickstay">Click to send friend request</p>
                </div>
          }
        </div>
      </div>
    )
  }
};

export default FriendsSearchOption;
