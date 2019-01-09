import React from 'react';
import './drag-and-drop.scss';
import { runSingleValidation } from '../../common/fancy-form/index';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { addAlert } from '../../../actions/alertsActions';
import Dropzone from 'react-dropzone';
class DragAndDrop extends React.Component {
  state = {
    showOnDropLayout: false
  };
  dragOverListener; dropListener;

  componentDidMount() {
    this.dragOverListener = window.addEventListener("dragover", function(e){
      e.preventDefault();
    },false);
    this.dropListener = window.addEventListener("drop", function(e){
      e.preventDefault();
    },false);
  }

  componentWillUnmount() {
    removeEventListener('dragover', this.dragOverListener);
    removeEventListener('drop', this.dropListener);
  }

  validateDroppedFiles = files => {
    const { addAlert, validators, limit, comunicatesTime } = this.props;
    let isFilesOk = true;

    if (files.length > limit) {
      addAlert({id: 'too many files', content: `Too many files dropped. Limit is ${limit} files`, type: 'err', time: comunicatesTime});
      isFilesOk = false;
    }
    else {
      for(let key in files) {
        const {type, name, size} = files[key];
        const error = runSingleValidation(type, validators, name);
        if (error) {
          addAlert({id: name + size, content: error, type: 'err', time: comunicatesTime});
          isFilesOk = false;
        }
      }
    }
    return isFilesOk;
  }

  handleDrop = files => {
    const isFilesOk = this.validateDroppedFiles(files);
    if (isFilesOk) {
      this.setState({showOnDropLayout: true});
      setTimeout(() => this.setState({showOnDropLayout: false}), 1000);
    }
  }

  render() {
    const { showOnDropLayout } = this.state;
    const { t, renderContent } = this.props;
    return(
      <React.Fragment>
        <Dropzone onDrop={this.handleDrop} disableClick style={{width: '100%', height: '100%'}}>

          {({isDragActive}) => {
            return (
              <div className={`not-drag-over ${isDragActive ? 'drag-over' : ''}`}>
                {renderContent()}
              </div>
            )
          }}

        </Dropzone>
        {showOnDropLayout &&
          <div className="on-drop-layout">
            {t("DroppedMessage")}
          </div>
        }
      </React.Fragment>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: alert => dispatch(addAlert(alert))
  };
};

DragAndDrop.defaultProps = {
  limit: 10, comunicatesTime: 8000
};

export default connect(null, mapDispatchToProps)(translate("DragAndDrop")(DragAndDrop));

