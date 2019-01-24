import React from 'react';
import './fancy-modal.scss';

const FancyModal = ({positionClass, isLoading, children, close, backdropClass}) => {
  return (
    <React.Fragment>
      <div className={`fancy-modal ${positionClass}`}>

        <div className={isLoading ? 'scaled-content' : 'not-scaled-content'}>{children}</div>

        {isLoading &&
          <React.Fragment>
            <div className="fancy-modal-backdrop"/>
            <div className="spinner-new spinner-new-big spinner-new-center" />
          </React.Fragment>
        }

      </div>

      <div onClick={close} className={`fancy-backdrop ${backdropClass}`} />
    </React.Fragment>
  );
}

FancyModal.defaultProps = {
  positionClass: 'm-w-h-center',
  backdropClass: ''
};

export default FancyModal;
