import React from 'react';
import { orderBy } from '../services/transform-data-service';
class Filter extends React.Component {
    constructor(props) {
        super(props);
        const { sort } = props.config;
        const list = sort ? sort.order ? orderBy(this.props.list, sort.key, sort.order) : [...this.props.list] : [...this.props.list];
        this.state = {
            list,
            searchVal: '',
            sortOrder: sort ? sort.order ? sort.order : '' : '',
            filters: {}
        }
    }

    cache = {};

    addToCache = (key, values) => {
        if (!this.cache[key]) {
            this.cache[key] = values;
        }
        return this.cache[key];
    }

    applyFilters = () => {
        const { search } = this.props.config;
        const { list } = this.state;
        if (search) {
            if (!this.cache[this.state.searchVal]) {
                const result = list.filter(el => el[search].toUpperCase().search(this.state.searchVal.toUpperCase()) !== -1);
                return this.addToCache(this.state.searchVal, result);
            }
            return this.cache[this.state.searchVal];
        }
        return list;
    }

    handleSearching = e => {
        this.setState({searchVal: e.target.value.replace(/\\+/g, '')});
    }

    handleSorting = () => {
        const sortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
        const list = orderBy(this.state.list, this.props.config.sort.key, sortOrder);
        this.cache = {};
        this.setState({sortOrder, list});
    }

    render() {
      console.log(this.props.list)
      return this.props.children(this.applyFilters(), this.handleSearching, this.handleSorting);
    }
}
export default Filter;
