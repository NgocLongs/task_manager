import React, { Component } from 'react';

class Sort extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
    }

    render() {

        var { sortBy, sortValue } = this.props;

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button 
                        className="btn btn-primary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="true"
                    >
                        <span className="fa fa-caret-square-o-down"> Sắp xếp</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li onClick={ () => this.onClick('name', 1) } >
                            <a 
                                role="button" 
                                className={ sortBy === 'name' && sortValue === 1 ? "sort_selected" : ''}
                            >
                                <span className="fa fa-sort-alpha-asc"> Tên A-Z</span>
                            </a>
                        </li>
                        <li onClick={ () => this.onClick('name', -1) }>
                            <a 
                                role="button"
                                className={ sortBy === 'name' && sortValue === -1 ? "sort_selected" : ''}
                            >
                                <span className="fa fa-sort-alpha-desc"> Tên Z-A</span>
                            </a>
                        </li>
                        <li role="separator" className="devider"></li>
                        <li onClick={ () => this.onClick('status', 1) }>
                            <a 
                                role="button"
                                className={ sortBy === 'status' && sortValue === 1 ? "sort_selected" : ''}
                            >
                                Trạng thái Kích hoạt
                            </a>
                        </li>
                        <li onClick={ () => this.onClick('status', -1) }>
                            <a 
                                role="button"
                                className={ sortBy === 'status' && sortValue === -1 ? "sort_selected" : ''}
                            >
                                Trạng thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;
