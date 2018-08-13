import React from "react";
import "./reportsContent.scss";
import Spinner from '../../common/spinner/spinner';
const reportsContent = ({spinner, loadTeamsResult, baseList, addTeamToResultList, loadTeamsErrors}) => (
  <React.Fragment>
    {spinner ? 
      <Spinner />
      :
        <div className="reports-content-container">
          <div className="caffels-container">
            {baseList.length > 0 ? 
              baseList.map(i => {
                return (
                  <div
                    onClick={() => addTeamToResultList(i.name)}
                    key={i.name}
                    className="caffel"
                  >
                    {i.name}
                  </div>
                );
              })
             : 
              <p className="server-error">Nie znaleziono wyników </p>
            }
          </div>
        </div>
    }

      {loadTeamsResult === false && 
        <p className="server-error">{loadTeamsErrors[0]}</p>
      }
  </React.Fragment>
);

export default reportsContent;
