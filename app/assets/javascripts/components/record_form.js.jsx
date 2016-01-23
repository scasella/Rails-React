var RecordForm = React.createClass({
getInitialState: function() {
  return {
    title: '',
    date: '',
    amount: ''
  }
},
render: function() {
  return (
    <form className="form-inline" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Date" name="date" onChange={this.handleChange}></input>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Title" name="title" onChange={this.handleChange}></input>
      </div>
      <div className="form-group">
        <input type="number" className="form-control" placeholder="Amount" name="amount" onChange={this.handleChange}></input>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create record</button>
    </form>
  )
},
handleChange: function(e) {
  var dict = {}
  dict[e.target.name] = e.target.value

  this.setState(dict);
  console.log(dict)

},
valid: function() {
  if (this.state.title && this.state.date && this.state.amount) {
    return true
  }
},
handleSubmit: function(e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        data: { record: this.state },
        success: function(data) {
          console.log(data)
          this.props.handleNewRecord(data);
          this.getInitialState;

        }.bind(this),
        error: function(xhr, status, err) {
          console.log("Error")
        }.bind(this)
      });
}
})
