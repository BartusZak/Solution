import React from 'react'
import './quarterDetailsItem.scss';

const quarterDetailsItem = ({item, clickItemFunction, markedQuestionsIds}) => (
    <div className="quarter-details-item">
      <p><i className="fa fa-question"></i> {item.question}</p>
      <p><i className="fa fa-comment"></i> {item.answer}</p>

      <div className={`toolbox ${markedQuestionsIds[item.id] ? 'expanded-toolbox' : ''}`}>
        <input type="checkbox" checked={markedQuestionsIds[item.id] ? true : false} onChange={e => clickItemFunction(e, 'togleMarkingQuestion')}/>
        <i className="fa fa-edit"></i>
      </div>

    </div>
);

export default quarterDetailsItem;
