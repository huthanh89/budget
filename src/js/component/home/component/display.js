//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import _          from 'lodash';
import moment     from 'moment';
import Highcharts from 'highcharts'
import React      from 'react';
import store      from 'store';

//-----------------------------------------------------------------------------//

const recur = {
  daily:   'd',
  weekly:  'w',
  monthly: 'M',
  yearly:  'y'
};

function recurrence(expense) {

  let cost     = parseFloat(expense.cost);
  let end      = moment(expense.date).add(1, 'y').add(1, 'd');
  let date     = moment(expense.date);
  let result   = [];
  let addValue = recur[expense.recurrence];

  do{
    result.push({
      x: date.valueOf(),
      y: cost
    });
    date.add(1, addValue).month(); 
  }
  while(date.isBefore(end))

  return result;

}

function sumExpense(series) {

  let total  = 0;
  let result = [];

  _.chain(series)
    .map(function(serie){
      return serie.data;
    })
    .flatten()
    .sortBy('x')
    .forEach(function(data){
      total += data.y;
      result.push({
        x: data.x,
        y: total
      });
    })
    .value();

  return result;
}

//-----------------------------------------------------------------------------//
// Component
//-----------------------------------------------------------------------------//

class Component extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  createChart() {

    let expenses = store.get('expenses');
    let series   = []
    
    // Iterate through expenses and generate any recurrence to
    // the series array.

    _.forEach(expenses, function(expense){

      series.push({
        type: 'column',
        name:  expense.name,
        data:  recurrence(expense)
      });

      return;
    })


    series.push({
      type: 'line',
      name: 'Total Expenses',
      data: sumExpense(series)
    });

    Highcharts.chart('display-chart', {
      chart: {
        zoomType: 'x',
        resetZoomButton: {
            position: {
                x: 0,
                y: 10
            }
        }
      },
      title:{
        text: null
      },
      xAxis: {
        title: {
          text: 'Date'
        },
        type: 'datetime'
      },
      yAxis: {
        title: {
            text: 'Cost'
        }
      },
      legend: {
        enabled: true
      },

      series: series,

      plotOptions: {
        series:{
          turboThreshold:5000,
        },
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
      }

    });

  }

  // Life cycle called once after render().

  componentDidMount () {
    this.createChart();
  }

  // Life cycle called every time after render() is updated.

  componentDidUpdate() {
    this.createChart();
  }

  render() {
    return (
      <div id="display-chart">
      </div>
    );
  }

}

//-----------------------------------------------------------------------------//
// Export
//-----------------------------------------------------------------------------//

export default Component;

//-----------------------------------------------------------------------------//
