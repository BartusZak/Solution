import React from 'react';

class ProgressMarker extends React.PureComponent {
  state = {
    value: this.props.initialValue ? this.props.initialValue : 50
  }

  changeValue = (e, value, shouldIncrease) => {
    e.stopPropagation();
    const { jump } = this.props;
    if (shouldIncrease) {
      const nextValue = value + jump;
      this.setState({value: nextValue > 100 ? 0 : nextValue});
    }
    else {
      const nextValue = value - jump;
      this.setState({value: nextValue < 0 ? 100 : nextValue});
    }
  }

  increase = e => {
    e.stopPropagation();
    const nextValue = this.state.value + this.props.jump;
    this.setState({value: nextValue > 100 ? 0 : nextValue});
    this.props.emitChange(nextValue);
  }

  decrease = e => {
    e.stopPropagation();
    const nextValue = this.state.value - this.props.jump;
    this.setState({value: nextValue < 0 ? 100 : nextValue});
    this.props.emitChange(nextValue);
  }

  render() {
    const { value } = this.state;
    const { label } = this.props;
    return (
      <div onClick={this.increase} className="progress-marker clickable">
        <div onClick={this.decrease} className="progress-value" style={{width: `${value}%`}}>
          <span className="progress-title dcmt-light-color">{label}</span>
          <span className="progress-number-value">{value}%</span>
        </div>
      </div>
    );
  }
}

export default ProgressMarker;
