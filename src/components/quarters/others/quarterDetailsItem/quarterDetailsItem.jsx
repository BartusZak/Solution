import React from 'react'
import './quarterDetailsItem.scss';
import Checkbox from '../../../common/checkbox/checkbox.js';

const quarterDetailsItem = ({item, clickItemFunction, markedQuestionsIds}) => (
    <div className="quarter-details-item">
      <p><i className="fa fa-question"></i> {item.question}</p>
      <p><i className="fa fa-comment"></i> {item.answer}</p>

      {markedQuestionsIds &&
        <div className={`toolbox ${markedQuestionsIds[item.id] ? 'expanded-toolbox' : ''}`}>
          <Checkbox checked={markedQuestionsIds[item.id] ? true : false} id={item.id}
          handleChange={e => clickItemFunction(e, 'togleMarkingQuestion')}/>
          <i onClick={e => clickItemFunction(e, 'togleEditQuestionModal')} className="fa fa-edit"></i>
        </div>
      }

    </div>
);

export default quarterDetailsItem;
