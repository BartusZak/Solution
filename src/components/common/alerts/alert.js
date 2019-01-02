import React from 'react';

class Alert extends React.PureComponent {
  alertTypes = {
    ok: {alertClass: 'ok', icon: 'far fa-check-circle'},
    err: {alertClass: 'err', icon: 'fas fa-exclamation-circle' },
    warn: {alertClass: 'warn', icon: 'fas fa-exclamation-triangle'}
  };

  timer;

  componentDidMount() {
    const { alert, removeAlert } = this.props;
    if (alert.time) {
      this.setDelay(alert.time, alert.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (prevProps.alert !== alert) {
      clearTimeout(this.timer);
      this.setDelay(alert.time, alert.id);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  setDelay = (time, id) => {
    this.timer = setTimeout(() => {
      this.props.removeAlert(id);
    }, time)
  }

  render() {
    const { alert, removeAlert } = this.props;
    const { icon, alertClass } = this.alertTypes[alert.type];
    return (
      <div className={`alert-item alert-in ${alertClass}`}>
        <div>
          <i className={icon}></i>
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
