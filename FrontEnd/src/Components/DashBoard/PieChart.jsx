import React, { Component } from 'react';
import Chart from 'react-google-charts';

const pieData = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
]
const pieOptions = {
  title: 'My Daily Activities',
  pieHole: 0.3,
}
class PieChart extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>ANALYTICS</h2>
        <Chart
          width={'600px'}
          height={'320px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ 'data-testid': '3' }}
        />
      </div>
    )
  }
}
export default PieChart