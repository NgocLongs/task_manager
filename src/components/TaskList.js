import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1 // all: -1, ẩn: 0, kích hoạt: 1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState({
            [name] : value
        });
    }
    render() {

        var { tasks } = this.props; // var tasks = this.props.tasks;
        var { filterName, filterStatus } = this.state;
        var elmTasks = tasks.map((task, index) => {
            return < TaskItem 
                        task={ task } 
                        key={ index } 
                        index={ index } 
                        onUpdateStatus={ this.props.onUpdateStatus }
                        onDelete={ this.props.onDelete }
                        onEdit={ this.props.onEdit }
                    />
        });

        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td width="10%"></td>
                        <td width="40%">
                            <input 
                                type="text" 
                                name="filterName" 
                                className="form-control" 
                                value={ filterName} 
                                onChange={ this.onChange }
                            />
                        </td>
                        <td width="20%">
                            <select 
                                name="filterStatus" 
                                className="form-control"
                                value={ filterStatus} 
                                onChange={ this.onChange }
                            >
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td width="30%"></td>
                    </tr>

                    { elmTasks }

                </tbody>
            </table>
        );
    }
}

export default TaskList;
