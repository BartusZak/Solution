import React from 'react';
import Filter from '../../../../hocs/filter';

const filterConfig = { search: 'fullName' };

const managers = ({managers, status, t, isLoading, onErrorMessage, refresh, useFilter, title, rowOperation, rowIcon}) => {

  if (isLoading) return <div className="spinner-new form-down-right-spinner" />;

  if (status && useFilter) {
    return (
    <Filter list={managers} config={filterConfig}>
      {
        (filteredList, handleSearching) => (
          <React.Fragment>
            <p className="important-par dcmt-color">{title} ({filteredList.length})</p>

            {filteredList.length === 0 ?
              <div className="empty-list-comunicate">
                <p>{t("EmptyFilterDestinationManagers")}</p>
                <i className="fas fa-users fa-lg"></i>
              </div> :
              <ul>
                {filteredList.map(({id, fullName}) => (
                  <li className="list-element flex-between-c" key={id}>
                    <span>{fullName} ({id})</span>
                    <i onClick={() => rowOperation({id, fullName})} className={`fa fa-${rowIcon} clickable`}></i>
                  </li>
                ))}
              </ul>
            }

            <div className='field-block'>
              <input onChange={handleSearching} placeholder={t("TypePlaceholder")} />
              <div className="field-icon"><i className='fa fa-search' /></div>
            </div>
          </React.Fragment>
        )
      }
    </Filter>
    );
  }

  if (status) {
    return (
      <React.Fragment>
        <p className="important-par dcmt-color">{title} ({managers.length})</p>
        {managers.length === 0 ?
        <div className="empty-list-comunicate">
          <p>{t("EmptyAddedManagers")}</p>
          <i className="fas fa-users fa-lg"></i>
        </div> :
        <ul>
          {managers.map(({id, fullName}) => (
            <li className="list-element flex-between-c" key={id}>
              <span>{fullName} ({id})</span>
              <i onClick={() => rowOperation({id, fullName})} className={`fa fa-${rowIcon} clickable`}></i>
            </li>
          ))}
        </ul>
        }
      </React.Fragment>
    );
  }

  return (
    <div className="empty-list-comunicate on-error-comunicate">
      <p>{onErrorMessage}</p>
      <i onClick={refresh} className="fas fa-sync fa-lg clickable"></i>
    </div>
  )
}

managers.defaultProps = {
  rowIcon: 'arrow-right'
}
export default managers;
