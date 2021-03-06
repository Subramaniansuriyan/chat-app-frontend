import React from "react";
import FriendsSearchOption from "./FriendsSearchOption/FriendsSearchOption";
import FriendsAPI from "../../../services/FriendsAPI";

import "./FriendsLeft.scss";
import Tooltip from '@material-ui/core/Tooltip';

class FriendsLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      requestSentUsers: null,
      requestReceivedUsers: null,
      friends: null,
      recommendedUsers: null,
      pendingUsers: null
    };
    this.searchInputRef = React.createRef();
    this.searchResultRef = React.createRef();
  };

  componentDidMount() {
    document.addEventListener("mousedown", event => {
      if (
        event.target != this.searchInputRef.current &&
        !event.target.className.includes("clickstay") &&
        this.state.users.length != 0
      ) {
        this.setState({
          filteredUsers: []
        });
      }
    });

    FriendsAPI.allOtherUsers(this);
  };

  sendRequest = (useremail) => {

    FriendsAPI.sendRequest(useremail, this.props.location.pathname.split("/")[2]).then(() => {

      let requestSentUsers = this.state.requestSentUsers;
      requestSentUsers.add(useremail);

      let friendIndex = this.state.recommendedUsers.findIndex(user => user["useremail"] == useremail)
      if (friendIndex != -1) {
        let recommendedUsers = this.state.recommendedUsers;
        recommendedUsers.splice(friendIndex, 1);
        this.setState({
          requestSentUsers,
          recommendedUsers
        });
      } else {
        this.setState({
          requestSentUsers
        })
      }
    })
  };

  cancelRequest = (useremail) => {
    FriendsAPI.cancelRequest(useremail, this.props.location.pathname.split("/")[2]).then(() => {
      let requestSentUsers = this.state.requestSentUsers;
      requestSentUsers.delete(useremail);
      this.setState({
        requestSentUsers
      })
    })
  }

  render() {
    let filteredUsers = [];

    return (
      <div className="FriendsLeft">
        <div className="friends-search-wrapper">
          <input
            className="friends-search"
            type="text"
            placeholder="Search for people to add"
            onClick={FriendsAPI.findAllUsers.bind(this)}
            onChange={event => {
              filteredUsers = [...this.state.users].filter(
                user =>
                  user.username
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase()) ||
                  user.useremail
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
              );
              this.setState({ filteredUsers });
            }}
            ref={this.searchInputRef}
          />
          <div className="friends-search-button-wrapper">
            <img
              src="https://img.icons8.com/android/50/000000/search.png"
              className="friends-search-button"
            />
          </div>

          {this.state.filteredUsers.length ? (
            <div className="friends-search-results">
              {this.state.filteredUsers.map(user => (
                <FriendsSearchOption
                  key={user.useremail}
                  theid={this.props.location.pathname.split("/")[2]}
                  useremail={user.useremail}
                  username={user.username}
                  sentRequest={this.state.requestSentUsers.has(user.useremail)}
                  receivedRequest={this.state.requestReceivedUsers.has(
                    user.useremail
                  )}
                  isFriends={this.state.friends.has(user.useremail)}
                  sendRequest={this.sendRequest.bind(this, user.useremail)}
                  cancelRequest={this.cancelRequest.bind(this, user.useremail)}
                />
              ))}
            </div>
          ) : null}
        </div>

        {this.state.recommendedUsers ? (
          <div className="friends-recommend-pending-wrapper">
            <p className="friends-recommend-pending-header">
              People you may know
            </p>
            <div className="friends-recommend-pending">
              {this.state.recommendedUsers.map((user, index) => {
                if (index < 3) {
                  return (
                    <div
                      className="friends-recommend-pending-each"
                      key={user.useremail}
                    >
                      <Tooltip title="Add" placement="top" arrow>
                        <div
                          className="friends-recommend-pending-img"
                          onClick={
                            FriendsAPI.sendRequest.bind(this, user.useremail, this.props.location.pathname.split("/")[2], index)
                          }
                        />
                      </Tooltip>
                      <div className="friends-recommend-pending-texts">
                        {user.username ? (
                          <p>
                            {user.username}(
                            {user.useremail?.length > 27
                              ? user.useremail.substring(10) +
                              "..." +
                              user.useremail.substring(
                                user.useremail?.length - 12,
                                user.useremail?.length
                              )
                              : user.useremail}
                            )
                          </p>
                        ) : (
                            <p>
                              {user.useremail?.length > 27
                                ? user.useremail.substring(0, 10) +
                                "..." +
                                user.useremail.substring(
                                  user.useremail?.length - 12,
                                  user.useremail?.length
                                )
                                : user.useremail}
                            </p>
                          )}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : null}

        {this.state.pendingUsers && this.state.pendingUsers.length > 0 ? (
          <div className="friends-recommend-pending-wrapper">
            <p className="friends-recommend-pending-header">Requests pending</p>
            <div className="friends-recommend-pending">
              {this.state.pendingUsers.map((user, index) => {
                return (
                  <div
                    className="friends-recommend-pending-each"
                    key={user.useremail}
                  >
                    <div
                      className="friends-recommend-pending-img"
                      onClick={FriendsAPI.acceptRequest.bind(this, user.useremail, this.props.location.pathname.split("/")[2], index)}
                    />
                    <div className="friends-recommend-pending-texts">
                      {user.username ? (
                        <p>
                          {user.username}(
                          {user.useremail.length > 27
                            ? user.useremail.substring(10) +
                            "..." +
                            user.useremail.substring(
                              user.useremail.length - 12,
                              user.useremail.length
                            )
                            : user.useremail}
                          )
                        </p>
                      ) : (
                          <p>
                            {user.useremail.length > 27
                              ? user.useremail.substring(0, 10) +
                              "..." +
                              user.useremail.substring(
                                user.useremail.length - 12,
                                user.useremail.length
                              )
                              : user.useremail}
                          </p>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FriendsLeft;
