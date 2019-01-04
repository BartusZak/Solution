import React from 'react';

class Alert extends React.PureComponent {
  state = {
    currentTime: this.props.alert.time / 1000,
    animateAlert: true
  };

  alertTypes = {
    ok: {alertClass: 'ok', icon: 'far fa-check-circle'},
    err: {alertClass: 'err', icon: 'fas fa-exclamation-circle' },
    warn: {alertClass: 'warn', icon: 'fas fa-exclamation-triangle'}
  };

  timer;

  componentDidMount() {
    const { alert, removeAlert } = this.props;
    if (alert.time) {
      this.setTimer(alert.time, alert.id);
      setTimeout(() => this.setState({animateAlert: false}), 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (prevProps.alert !== alert) {
      clearInterval(this.timer);
      this.setState({currentTime: alert.time / 1000, animateAlert: true}, () => this.setTimer(alert.time, alert.id));
      this.timeOut = setTimeout(() => this.setState({animateAlert: false}), 1000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setTimer = (time, id) => {
    this.timer = setInterval(() => {
      this.setState(prevState => ({ currentTime: prevState.currentTime - 1 }), () => {
        if (this.state.currentTime === 0) {
          this.props.removeAlert(id);
        }
      });
    }, 1000);
  }

  render() {
    const { currentTime, animateAlert } = this.state;
    const { alert, removeAlert } = this.props;
    const { icon, alertClass } = this.alertTypes[alert.type];
    return (
      <div className={`alert-item ${alertClass} ${animateAlert ? 'alert-in' : ''}`}>
        <div>
          <i className={icon}></i>
          <span>{currentTime}</span>
          <i className="fa fa-times" onClick={() => removeAlert(alert.id)}></i>
        </div>
        <article>
          {alert.content}
        </article>
      </div>
    );
  }
}
export default Alert;
