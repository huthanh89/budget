//-----------------------------------------------------------------------------//
// Import
//-----------------------------------------------------------------------------//

import _          from 'lodash';
import moment     from 'moment';
import Highcharts from 'highcharts/highstock'
import React      from 'react';
import store      from 'store';

import 'lib/highcharts/theme.js'

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
  
  seriesType(type) {

    let expenses = store.get('expenses');
    let series   = []

    // Iterate through expenses and generate any recurrence to
    // the series array.

    _.forEach(expenses, function(expense){

      if(type=='total' | expense.type==type){
        series.push({
          type: 'column',
          name:  expense.name,
          data:  recurrence(expense)
        });
        return;
      }
      else{
        return;
      }

    })

    if(type=='total'){
      return [{
        type: 'line',
        name: 'Total Expenses',
        data:  sumExpense(series),
        marker: {
          enabled: true,
          radius:  4,
          symbol: 'diamond'
        }
      }];
    }else{
      return series;
    }

  }
  
  createChart() {

    const Type = {
      0: 'total',
      1: 'expense',
      2: 'income'
    }

    let series = this.seriesType(Type[this.props.viewIndex]);

    Highcharts.stockChart('display-chart', {
      chart: {
        marginTop: 30,
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
      yAxis: [{
        title: {
            text: null
        },
        opposite: false
      }],
      legend: {
        enabled: true
      },

      series: series,

      plotOptions: {
        series: {
          connectNulls: true
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
