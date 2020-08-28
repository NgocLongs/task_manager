import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onEdit = () => {
        this.props.onEdit(this.props.task.id);
    }

    render() {

        var { task,index } = this.props;

        return (
            <tr>
                <td width="10%" className="text-center">{ index + 1 }</td>
                <td width="40%">
                    { task.name }
                </td>
                <td width="20%" className="text-center">
                    <span 
                        className={ task.status === false ? "label label-danger" : "label label-success" }
                        onClick={ this.onUpdateStatus }
                    >
                        { task.status === true ? "Kích hoạt" : "Ẩn" }
                    </span>
                </td>
                <td width="30%">
                    <button 
                        type="button" 
                        className="btn btn-warning ml-5"
                        onClick={ this.onEdit }
                    >
                        <span className="fa fa-pencil"> Sửa</span>
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger ml-5"
                        onClick={ this.onDelete }
                    >
                    <span className="fa fa-trash"> Xóa</span>
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
