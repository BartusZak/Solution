import React from 'react'
import './list.scss';
import _ from 'lodash';
import SmallSpinner from '../../common/spinner/small-spinner.js';
import { validateInput } from '../../../services/validation.js';
import { translate } from 'react-translate';
class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: {value: "", error: ""},
      sortOrder: "asc",
      currentFilteringBy: {value: null, description: this.props.t("Default")},
      showFilterDetails: false
    }

    this.myRef = React.createRef();
  }


    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
      if (
        event.target.className
          .toString()
          .split(" ")
          .indexOf("selected-category") !== -1
      )
        return;
      if (this.myRef && this.state.showFilterDetails && !this.myRef.current.contains(event.target)) {
        this.togleFilterDetails();
      }
    }

    togleFilterDetails = () => {
        const { showFilterDetails } = this.state;
        this.setState({showFilterDetails: !showFilterDetails});
    }

    selectFilterCategory = (e, currentFilteringBy) => {
        e.stopPropagation();
        this.setState({currentFilteringBy});
        this.togleFilterDetails();
    }

    putModifieListOptionsInDom = (functionsToUse, numberOfItems) => {
        const { renderNavigationElement, t } = this.props;
        if(functionsToUse){
            const shouldPutSearchBox = functionsToUse.find(item => item.name === "search");
            const shouldPutSort = functionsToUse.find(item => item.name === "sort");
            const shouldFilter = functionsToUse.find(item => item.name === "filter");
            let filterCategories = null;
            if(shouldFilter)
                filterCategories = [{value: null, description: t("Default")}, ...shouldFilter.posibleValues];

            const { sortOrder, searchInput, currentFilteringBy, showFilterDetails } = this.state;
            return (
                <div className="modifie-list-options">
                    {shouldPutSearchBox &&
                    <div className="search-box">
                        <input value={searchInput.value} type="text" onChange={e => this.searchByKeys(e)}
                        placeholder={t("Search")} />
                        <i className="fa fa-search"></i>
                        {shouldPutSearchBox.count &&
                            <span className="items-counter">{numberOfItems}</span>
                        }
                    </div>
                    }
                    {shouldPutSort &&
                    <div onClick={() => this.setState({sortOrder: sortOrder === "asc" ? "desc" : "asc"})} className="sort-box">
                        {t("Sort")} <i className={`fa fa-${sortOrder === "asc" ? "arrow-down" : "arrow-up"}`}></i>
                    </div>
                    }
                    {shouldFilter &&
                    <div onClick={this.togleFilterDetails} className="filter-box">
                        {t("Filters")} <i className="fa fa-cogs"></i>
                        {shouldFilter.count &&
                            <span className="items-counter">{numberOfItems}</span>
                        }
                        {showFilterDetails &&
                            <div className="filter-sugestions" ref={this.myRef}>
                                {filterCategories.map(category => (
                                    <div onClick={e => this.selectFilterCategory(e, category)} className={currentFilteringBy.description === category.description ? "selected-category" : ""} key={category.value}>{category.description}</div>
                                ))}
                            </div>
                        }
                    </div>
                    }
                    {renderNavigationElement && renderNavigationElement()}
                </div>
            );
        }
        return null;
    }

    modifeList = (originalList, functionsToUse) => {
        if(functionsToUse){
            const shouldPutSearchBox = functionsToUse.find(item => item.name === "search");
            const shouldPutSort = functionsToUse.find(item => item.name === "sort");
            const shouldFilter = functionsToUse.find(item => item.name === "filter");
            let modifiedElements = [];
            const { currentFilteringBy } = this.state;

            if(shouldPutSearchBox){
                const searchInput = {...this.state.searchInput};
                const typedValue = searchInput.value.toUpperCase();
                modifiedElements = originalList.filter(element => {
                    return element[shouldPutSearchBox.searchBy].toUpperCase().search(typedValue) !== -1;
                });
            }
            if(shouldPutSort){
                const { sortOrder } = this.state;
                modifiedElements = _.orderBy(modifiedElements, shouldPutSort.sortBy, sortOrder);
            }

            if(shouldFilter){
                const listToUse = modifiedElements.length > 0 ? modifiedElements : originalList;
                if(currentFilteringBy.value === null)
                    return listToUse;


                modifiedElements = listToUse.filter(element => {
                   return element[shouldFilter.filterBy] === currentFilteringBy.value
               });

            }

            return modifiedElements;
        }

        return originalList;
    }

    searchByKeys = e => {
        this.setState({searchInput: {value: e.target.value, error: ""}})
    }

    putEmptyListComponentInDOM = () => {
        const { noItemsComponent: NoItemsComponent, noItemsComponentProps, t } = this.props;
        if(NoItemsComponent !== undefined){
            return <NoItemsComponent {...noItemsComponentProps} />
        }
        else{
            return (
                <div {...noItemsComponentProps} className="empty-list-content">
                    <span>{t("NoResults")}</span>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )
        }
    }
    stopEventPropagationer = (item, operationName, e) => {
        const { clickItemFunction } = this.props;
        if(e !== undefined){
            e.stopPropagation();
        }
        clickItemFunction(item, operationName);
    }

    render(){
        const { listClass, paginationSettings, component: Component, componentProps,
            listTitle, selectDataOptions, items, functionsToUse, shouldAnimateList, isDoingRequest, setPlanHour } = this.props;

        const { showFilterDetails } = this.state;

        const modifiedItems = this.modifeList(items, functionsToUse);
        const closeFiltersFunction = showFilterDetails ? this.togleFilterDetails : null;
        return (
            <React.Fragment>
                <nav onClick={closeFiltersFunction} className="list-nav">
                    {listTitle &&
                        <div>{listTitle}
                            {isDoingRequest &&
                                <span><SmallSpinner /></span>
                            }
                        </div>
                    }
                    {this.putModifieListOptionsInDom(functionsToUse, modifiedItems.length)}
                </nav>
                <div className={`${listClass} ${shouldAnimateList ? "animated-list" : ""}`}>
                    {modifiedItems.length > 0 ?
                        Component ?
                        modifiedItems.map((item, index) => (
                            <Component setPlanHour={setPlanHour} clickItemFunction={(e, operationName) => this.stopEventPropagationer(item, operationName, e)} index={index} key={index}
                                item={item} {...componentProps}  />
                        )) :
                        modifiedItems.map((item, index) => (
                            <div {...componentProps} key={index} >
                            </div>
                        ))
                        :
                        this.putEmptyListComponentInDOM()
                    }

                </div>
                {paginationSettings &&
                <div className="pagination">

                </div>
                }

            </React.Fragment>

        );
    }
}
List.defaultProps = {
    listClass: "list"
}
export default translate("List")(List);
