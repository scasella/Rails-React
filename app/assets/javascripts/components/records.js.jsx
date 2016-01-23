var Records = React.createClass({
getInitialState: function() {
  return {
    records: this.props.data
  }
},
getDefaultProps: function() {
  return {
    records: []
  }
},
addRecord: function(record) {
  records = React.addons.update(this.state.records, { $push: [record] })
  this.setState({ records: records })
},
updateRecord: function(record, data) {
  index = this.state.records.indexOf(record)
  records = React.addons.update(this.state.records, { $splice: [[index, 1, data]] })
  this.replaceState({ records: records })
},
deleteRecord: function(record) {
  index = this.state.records.indexOf(record)
  records = React.addons.update(this.state.records, { $splice: [[index, 1]] })
  this.replaceState({ records: records })
},
render: function() {
  return (<div className='records'>
  <h2 className='title'>Records</h2>
  <div className="row">
    <AmountBox type="success" amount={this.credits()} text="Credit" />
    <AmountBox type="danger" amount={this.debits()} text="Debit" />
    <AmountBox type="info" amount={this.balance()} text="Baance" />
  </div>
  <RecordForm handleNewRecord={this.addRecord} />
  <hr />
  <table className='table table-bordered'>
    <thead>
      <tr>
      <th>Date</th>
      <th>Title</th>
      <th>Amount</th>
      <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {this.renderRecords()}
    </tbody>
  </table>
  </div>)
},
renderRecords: function() {
  return this.state.records.map((item) => {
    return (
      <Record key={item.id} record={item} handleEditRecord={this.updateRecord} handleDeleteRecord={this.deleteRecord} />
    )
  })
},
credits: function() {
  var credits = this.state.records.filter(function(val) {
     return val.amount >= 0
  })

  var formCredits = 0
  for (item in credits) {
    formCredits += credits[item].amount
  }

  return formCredits
},
debits: function() {
  var debits = this.state.records.filter(function(val) {
     return val.amount < 0
  })

  var formDebits = 0
  for (item in debits) {
    formDebits += debits[item].amount
  }

  return formDebits
},
balance: function() {
  return this.debits() + this.credits()
}
})
