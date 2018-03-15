import React, { Component } from "react";
import Detail from "../common/Detail";
const emptyField = "<brak>";

class UserDetailsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }

  parseRoles = () => {
    return this.props.user.roles.length !== 0
      ? this.props.user.roles.join(", ")
      : emptyField;
  };

  parsePhoneNumber = () => {
    return this.props.user.phoneNumber.length !== 0
      ? this.props.user.phoneNumber
      : emptyField;
  };

  render() {
    return (
      <div className="user-details-container">
        <Detail
          type="text"
          editable={this.state.editable}
          pretty="Imię"
          user={this.props.user.firstName}
        />

        <Detail
          type="text"
          editable={this.state.editable}
          pretty="Nazwisko"
          user={this.props.user.lastName}
        />

        <Detail
          type="text"
          editable={this.state.editable}
          pretty="Email"
          user={this.props.user.email}
        />

        <Detail
          type="text"
          editable={this.state.editable}
          pretty="Telefon"
          user={this.parsePhoneNumber()}
        />

        <Detail
          type="text"
          editable={false}
          pretty="Role"
          user={this.parseRoles()}
        />
      </div>
    );
  }
}

export default UserDetailsBlock;
