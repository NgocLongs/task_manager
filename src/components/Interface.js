import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Interface extends Component {

    render() {
        return (
            <div className="row mt-20">
                {/* Search */}
                < Search onSearch={ this.props.onSearch } />
                {/* End - Search */}
                
                {/* Sort */}
                < Sort 
                    onSort={ this.props.onSort } 
                    sortBy={ this.props.sortBy }
                    sortValue={ this.props.sortValue }
                />
                
            </div>
        );
    }
}

export default Interface;
