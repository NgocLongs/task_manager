import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

    componentWillMount() {
        if(this.props.isEdit) {
            this.setState({
                id : this.props.isEdit.id,
                name : this.props.isEdit.name,
                status : this.props.isEdit.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.isEdit) {
            this.setState({
                id : nextProps.isEdit.id,
                name : nextProps.isEdit.name,
                status : nextProps.isEdit.status
            });
        } else if (nextProps && nextProps.isEdit === null) {
            this.setState({
                id : '',
                name : '',
                status : false
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm()
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === "status") {
            value = target.value === "true" ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

    render() {

        var { id } = this.state;

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== "" ? "Cập nhật công việc" : "Thêm công việc" }
                        <span 
                            className="fa fa-times-circle float-right"
                            onClick={ this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                placeholder="Input field" 
                                value={ this.state.name }
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái :</label>
                            <select 
                                name="status" 
                                className="form-control"
                                value={ this.state.status }
                                onChange={ this.onChange }
                            >
                                <option value={ true }>Kích hoạt</option>
                                <option value={ false }>Ẩn</option>
                            </select>
                        </div>
                        <button type="submit" id="mg-btnw" className="btn btn-warning">
                            <i className="fa fa-plus"> Lưu lại</i>
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={ this.onClear }
                        >
                            <i className="fa fa-times" aria-hidden="true"></i> Hủy bỏ
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
