import React from 'react';
import './fancy-modal.scss';
import Button from '../../common/button/button';
import { translate } from 'react-translate';

const FancyModal = ({positionClass, renderHeader, handleClick, phases, currentPhase, title, isLoading, children, close, t, backdropClass}) => {
  const phasesArray = phases ? Object.keys(phases) : [];
  return (
    <React.Fragment>
      <div className={`fancy-modal ${positionClass}`}>
        {renderHeader ? renderHeader() :
          <React.Fragment>
            {phasesArray.length > 0 &&
              <div className="fancy-modal-header">
                {phasesArray.map((phase, index) => (
                  <Button key={phase} title={`${t("Step")} ${index+1}`} onClick={() => handleClick(phase)}
                    mainClass={`label-btn ${phase === currentPhase ? 'dcmt-btn-light' : ''}`}
                  />
                ))}
              </div>
            }

            { title && <h3 className={`fancy-modal-title ${phases ? 'title-no-padding' : 'title-padding'}`}>{title}</h3> }

          </React.Fragment>
        }
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
  phases: {},
  backdropClass: ''
};

export default translate("FancyModal")(FancyModal);
