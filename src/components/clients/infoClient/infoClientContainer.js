import React, { Component } from "react";
import InfoClient from "./InfoClient";
import "./infoClient.scss";

export default class infoClientContainer extends Component {
  state = {
    shouldAnimate: true
  };

  componentDidMount() {
      this.setState({ shouldAnimate: true });
      this.changeAnimation()
    }
  

  changeAnimation = () => {
    setTimeout(() => {
      this.setState({ shouldAnimate: false });
    }, 800);
  };

  render() {
    const { shouldAnimate } = this.state;
    const {
      client,
      t,
      resultBlockCloud,
      handleTimesClick,
      handleSyncClick,
      onEditClient,
      resultBlockAddClient,
      handleAddCloud,
      handleEditCloud,
      handleDeleteCloud,
      handleReactivateCloud,
      handleAddResponsiblePerson,
      handleEditResponsiblePerson,
      handleDeleteResponsiblePerson,
      handleReactivateResponsiblePerson,
      resultBlockResponsiblePerson,
      clientsActions
    } = this.props;

    if (shouldAnimate) {
      this.changeAnimation();
    }

    return (
      <div
        className={`client-info-container ${shouldAnimate ? "anim-in" : null}`}
      >
        <InfoClient
          t={t}
          client={client}
          onEditClient={onEditClient}
          resultBlockAddClient={resultBlockAddClient}
          loading={false}
          handleTimesClick={handleTimesClick}
          handleSyncClick={handleSyncClick}
          handleAddCloud={handleAddCloud}
          handleEditCloud={handleEditCloud}
          handleDeleteCloud={handleDeleteCloud}
          handleReactivateCloud={handleReactivateCloud}
          resultBlockCloud={resultBlockCloud}
          handleAddResponsiblePerson={handleAddResponsiblePerson}
          handleEditResponsiblePerson={handleEditResponsiblePerson}
          handleDeleteResponsiblePerson={handleDeleteResponsiblePerson}
          handleReactivateResponsiblePerson={handleReactivateResponsiblePerson}
          resultBlockResponsiblePerson={resultBlockResponsiblePerson}
          clientsActions={clientsActions}
        />
      </div>
    );
  }
}
