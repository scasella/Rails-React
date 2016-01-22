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
render: function() {
  console.log(this.state.records)
  return (<div className='records'>
  <h2 className='title'>Records</h2>
  <table className='table table-bordered'>
    <thead>
      <tr>
      <th>Date</th>
      <th>Title</th>
      <th>Amount</th>
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
      <Record key={item.id} record={item} />
    )
  })
},
})
