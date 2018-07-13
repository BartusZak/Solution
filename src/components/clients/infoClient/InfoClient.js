import React from "react";
import Aux from "services/auxilary";
import "./infoClient.scss";
import BilleniumPleaceholder from "assets/img/small-logo.png";
import Icon from "../../common/Icon";

const InfoClient = ({ client, t }) => {
  const clientClouds = client.clouds.map((cloud, index) => {
    return (
      <div key={index} className="cloud">
        <div className="cloud-circle" />
        <div className="cloud-name">
          <span>{cloud.name}</span>
        </div>
        <div className="cloud-options">
          <button>
            <Icon icon="times" iconType="fa" additionalClass="icon-danger" />
          </button>
        </div>
      </div>
    );
  });
  if (!client.description) {
    client.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices, ante eget dapibus euismod, velit ipsum posuere quam, vel gravida justo metus sed nisi. Praesent semper mi non mi aliquam porttitor.";
  }
  if (!client.img) {
    client.img = BilleniumPleaceholder;
  }
  return (
    <Aux>
      <div className="client-info-header">
        <div className="client-info-logo">
          <img src={client.img} title={`${client.name} logo`} />
        </div>
        <div className="client-info-details">
          <div className="client-info-details-more">
            <h1>{client.name}</h1>
            <p>{client.description}</p>
          </div>
          <hr />
          <div className="client-info-options">
            <span>{t("EditClient")}</span> | <span>{t("DeleteClient")}</span>
          </div>
        </div>
      </div>

      <div className="client-clouds-container">
        <div className="client-clouds-header">
          <h2>{t("ClientCloudsList")}</h2>
        </div>
        <div className="client-clouds">
          {clientClouds}
          {clientClouds.length === 0 && (
            <span className="clouds-not-found">{t("CloudsNotFound")}</span>
          )}
        </div>

        <div className="client-cloud-add">
          <button onClick={() => handleAddCloud()}>
            <Icon icon="plus" iconType="fa" />
            {t("AddCloud").toUpperCase()}
          </button>
        </div>
      </div>
    </Aux>
  );
};
export default InfoClient;
