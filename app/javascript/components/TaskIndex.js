import React, { Component } from 'react'
import axios from 'axios'
import classNames from 'classnames'

export default class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      form: {
        title: '',
        description: '',
      },
    }
    this.getIndex = this.getIndex.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
    this.formReset = this.formReset.bind(this)
  }

  componentDidMount () {
    this.getIndex()
  }

  async getIndex () {
    try {
      let gettingUrl = '/api/v1/tasks'
      let res = await axios.get(gettingUrl)
      let tasks = res.data
      this.setState({ tasks: tasks })
    } catch(e) {
      console.log(e)
    }
  }

  async handleDelete (id) {
    try {
      let deletingUrl = `http://localhost:5000/api/v1/tasks/${id}`
      await axios.delete(deletingUrl)
      this.deleteTask(id);
    } catch(e) {
      console.log(e)
    }
  }

  deleteTask (id) {
    let tasks = this.state.tasks.filter((task) => task.id != id)
    this.setState({
      tasks: tasks
    })
  }

  handleChange (e,key) {
    let target = e.target
    let value = target.value
    let form = this.state.form
    form[key] = value

    this.setState({
      form: form
    })
  }

  async handleCreate () {
    let payload = {
      task: {
        title: this.state.form.title,
        description: this.state.form.description,
      }
    }
    let postingUrl = '/api/v1/tasks'
    try {
      let res = await axios.post(postingUrl, payload)
      this.addTask(res.data)
      this.formReset()
    } catch(e) {
      console.log(e)
    }
  }

  addTask (task) {
    this.setState({
      tasks: this.state.tasks.concat(task)
    })
  }

  formReset () {
    this.setState({
      form: {
        title: '',
        description: '',
      }
    })
  }

  render () {
    return (
      <div>
        <table className={classNames('table', 'table-striped')}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>function</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(task.id)}
                      className={classNames('btn', 'btn-danger')}
                    >delete</button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td></td>
              <td><input type="text" value={this.state.form.title} onChange={e => this.handleChange(e, 'title')} /></td>
              <td><input type="text" value={this.state.form.description} onChange={e => this.handleChange(e, 'description')} /></td>
              <td>
                <button
                  onClick={() => this.handleCreate()}
                  className={classNames('btn', 'btn-primary')}
                >add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
