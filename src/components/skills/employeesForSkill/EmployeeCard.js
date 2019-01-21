import React, { Component } from "react";
import { translate } from "react-translate";
import './EmployeesForSkill.scss';
import { API_ENDPOINT } from '../../../api';

class EmployeeCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      openedPhone: false,
      openedMail: false,
      openedSkype: false
    };

    this.phoneRef = React.createRef();
    this.mailRef = React.createRef();
    this.skypeRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const { openedMail, openedPhone, openedSkype } = this.state;

    if(openedMail && this.mailRef && !this.mailRef.current.contains(event.target)) {
      this.closeAllContainers();
    }

    if(openedPhone && this.phoneRef && !this.phoneRef.current.contains(event.target)) {
      this.closeAllContainers();
    }

    if(openedSkype && this.skypeRef && !this.skypeRef.current.contains(event.target)) {
      this.closeAllContainers();
    }
  }

  openPhone = () => {
    if(this.state.openedPhone) {
      this.closeAllContainers()
    } else {
    this.setState({
      openedPhone: true,
      openedMail: false,
      openedSkype: false
    })}
  }

  openMail = () => {
    if(this.state.openedMail) {
      this.closeAllContainers()
    } else {
      this.setState({
        openedPhone: false,
        openedMail: true,
        openedSkype: false
      })}

  }

  openSkype = () => {
    if(this.state.openedSkype) {
      this.closeAllContainers()
    } else {
      this.setState({
        openedPhone: false,
        openedMail: false,
        openedSkype: true
      })}
  }

  closeAllContainers = () => {
    this.setState({
      openedPhone: false,
      openedMail: false,
      openedSkype: false
    })
  }

  redirectToUser = (userId) => {
    const { history } = this.props;

    const url = `/main/employees/${userId}`;
    history.push(url);
  }

  generateExpMessage = (numberOfYears) => {
    const { language } = this.props;

    if( language === "pl" )
    {
      if (numberOfYears === 1) {
        return "rok doświadczenia"
      }

      if ((numberOfYears < 10 || numberOfYears > 20 ) && (numberOfYears % 10 === 2 || numberOfYears % 10 === 3 || numberOfYears % 10 === 4)) {
        return "lata doświadczenia"
      }

      if(numberOfYears < 20) {
        return "lat doświadczenia"
      }

      return "lat doświadczenia"
    }

    if( language === "en")
    {
      if (numberOfYears === 1) {
        return "year of experience"
      } else {
        return "years of experience"
      }

    }
  }

  render() {
    const { employee, t } = this.props;
    const { openedMail, openedPhone, openedSkype } = this.state;

    const profilePhoto =
      API_ENDPOINT + "/ProfilePhotos/" + employee.id + ".jpg";
    const imgContent = employee.profilePhoto ? (
      <img alt={"avatar"} src={profilePhoto} className="photo-container no-border"/>
    ) : (
      <figure className="photo-container">
        <i className="fa fa-user" />
      </figure>
    );
    return (
      <div className="employee-card-container">
        <div className="localization">{employee.localization}</div>

        <div className="employee-name-photo-container">
          {imgContent}
          <div>
            <div className="name">{employee.firstName}</div>
            <div className="surname">{employee.lastName}</div>
          </div>
        </div>

        <div className="contact-container">
          <div className="icons-container">
            <div className="icon" onClick={() => this.openPhone()}><i className="fa fa-phone" ref={this.phoneRef}></i></div>
            {openedPhone && <div className="phone-number-container">{employee.phoneNumber ? employee.phoneNumber : 'Nie podano'}</div>}
            <div className="icon" onClick={() => this.openMail()}><i className="fa fa-envelope" ref={this.mailRef}></i></div>
            {openedMail && <div className="email-address-container">{employee.email ? employee.email : 'Nie podano'}</div>}
          </div>
          <div className="skype-id" onClick={() => this.openSkype()} ref={this.skypeRef}>
            skype.id
          </div>
          {openedSkype && <div className="skype-id-container">{employee.skypeId ? employee.skypeId : 'Nie podano'}</div>}
        </div>

        <div className="experience">{employee.experience} {this.generateExpMessage(employee.experience)}</div>
        <div className="level">{employee.skillLevel}/5 {t("KnowledgeLvl")}</div>
        <div className="company-seniority">{employee.seniority} {t("In")} <span className="company-name">Billennium</span></div>

        <div className="more-btn" onClick={() => this.redirectToUser(employee.id)}>{t("More")}</div>

      </div>
    )
  }
}

export default translate("EmployeeCard")(EmployeeCard);
