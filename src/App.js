import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Interface from './components/Interface';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm: false,
            isEdit : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            })
        }
    }

    onGenerateData = () => {
        var tasks = [
            {
                id : 1,
                name : 'Khóa lập trình PHP',
                status : true
            },
            {
                id : 2,
                name : 'Khóa lập trình Java',
                status : false
            },
            {
                id : 3,
                name : 'Khóa lập trình React',
                status : true
            }
        ];
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm = () => {
        if(this.state.isDisplayForm === true && this.state.isEdit !== null) {
            this.setState({
                isDisplayForm : true,
                isEdit : null
            })
        } else {
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                isEdit : null
            })
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        })
    }

    onSubmit = (data) => {
        var { tasks } = this.state;
        if(data.id === '') {
            data.id = Math.random(100);
            tasks.push(data);
        }  else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        
        this.setState({
            tasks : tasks,
            isEdit : null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            this.onCloseForm();
        }
    }

    onEdit = (id) => {
        var { tasks} = this.state;
        var index = this.findIndex(id);
        var indexEditing = tasks[index];
        if(index !== -1) {
            this.setState({
                isDisplayForm : true,
                isEdit : indexEditing
            });
        }
        
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        })
    }

    render() {

        var { tasks, isDisplayForm, isEdit, filter, keyword, sortBy, sortValue } = this.state;
        if (filter) {
            if(filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }

            if(filter.status) { // !== null, !== undefined, !== 0
                ///
            }

            tasks = tasks.filter((task) => {
                if(filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false );
                }
            })
        };

        if(keyword) {
            console.log(filter);
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }
        
        if(sortBy === 'name') {
            tasks.sort((a, b) => {
                if(a.name > b.name) {
                    return sortValue;
                } else if(a.name < b.name) {
                    return -sortValue;
                } else {
                    return 0;
                }
            })
        } else {
            tasks.sort((a, b) => {
                if(a.status > b.status) {
                    return -sortValue;
                } else if(a.status < b.status) {
                    return sortValue;
                } else {
                    return 0;
                }
            })
        }

        var elmTaskForm = isDisplayForm === true ? < TaskForm 
                                                        onSubmit={this.onSubmit } 
                                                        onCloseForm={ this.onCloseForm } 
                                                        isEdit={ isEdit }
                                                    /> : '';

        return (
            <div className="container">
                <div className="text-center">
                    <h2>Quản lý Công việc</h2>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        
                        { elmTaskForm }  
                        
                    </div>
                    
                    <div className={ isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={ this.onToggleForm }
                        >
                            <span className="fa fa-plus"> Thêm công việc</span>
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-warning ml-5"
                            onClick={ this.onGenerateData }
                        >
                            Generate Data
                        </button>

                        < Interface 
                            onSearch={ this.onSearch } 
                            onSort={ this.onSort }
                            sortBy={ sortBy }
                            sortValue={ sortValue }
                        />

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                < TaskList 
                                    tasks={ tasks }  
                                    onUpdateStatus={ this.onUpdateStatus } 
                                    onDelete={ this.onDelete }
                                    onEdit={ this.onEdit }
                                    onFilter={ this.onFilter }
                                />
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

export default App;
