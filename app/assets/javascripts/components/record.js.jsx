var Record = React.createClass({
getInitialState: function() {
  return {
    edit: false
  }
},
handleToggle: function(e) {
  e.preventDefault()
  this.setState({ edit: !this.state.edit })
},
recordRow: function() {
  return (
    <tr>
    <td>{this.props.record.date}</td>
    <td>{this.props.record.title}</td>
    <td>{this.amountFormat(this.props.record.amount)}</td>
    <td>
      <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
      <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
    </td>
    </tr>
  )
},
recordForm: function() {
  return (
    <tr>
    <td>
      <input className="form-control" type="text" defaultValue={this.props.record.date} ref="date"></input>
    </td>
    <td>
      <input className="form-control" type="text" defaultValue={this.props.record.title} ref="title"></input>
    </td>
    <td>
      <input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount"></input>
    </td>
    <td>
      <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
      <a className="btn btn-danger" onClick={this.handleDelete}>Cancel</a>
    </td>
    </tr>
  )
},
render: function() {
  if (this.state.edit) {
    return this.recordForm()
  } else {
    return this.recordRow()
  }
},
handleEdit: function(e) {
  let url = "/records/" + `${this.props.record.id}`
  
  e.preventDefault()

  data = {
    title: this.refs.title.value,
    date: this.refs.date.value,
    amount: this.refs.amount.value
  }

  $.ajax({
      type: 'PUT',
      url: url,
      data: { record: data },
      success: function(data) {
        this.setState({ edit: false })
        this.props.handleEditRecord(this.props.record, data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error")
      }.bind(this)
    });

},
handleDelete: function(e) {
  let url = "/records/" + `${this.props.record.id}`
  e.preventDefault()
  $.ajax({
      type: 'DELETE',
      url: url,
      success: function() {
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error")
      }.bind(this)
    });
},
amountFormat: function(amount) {
 return '$ ' + Number(amount).toLocaleString()
}
})
