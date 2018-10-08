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

function recurrence(expense, viewType) {

  let cost     = parseFloat(expense.cost);
  let end      = moment(expense.date).add(1, 'y').add(1, 'd');
  let date     = moment(expense.date);
  let result   = [];
  let addValue = recur[expense.recurrence];

  if(viewType=='total' && expense.type=='expense'){
    cost *= -1;
  }

  let total = 0;

  do{

    total += cost;

    result.push({
      x: date.valueOf(),
      y: total
    });
    date.add(1, addValue).month(); 
  }
  while(date.isBefore(end))

  return result;

}

function totalSeries(series) {

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
  
  seriesType(viewType) {

    let expenses = store.get('expenses');
    let series   = []

    // Iterate through expenses and generate any recurrence to
    // the series array.

    _.forEach(expenses, function(expense){

      if(viewType=='total' | expense.type==viewType){
        series.push({
          type: 'line',
          name:  expense.name,
          data:  recurrence(expense, viewType)
        });
        return;
      }
      else{
        return;
      }

    })

    if(viewType=='total'){
      return [{
        type: 'line',
        name: 'Net',
        data:  totalSeries(series),
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
  
      credits: {
        enabled: false
      },
  
      tooltip: {
        valuePrefix:  "$",
        valueDecimals: 0,
        shared:        true,
      },
  
      plotOptions: {
        series: {
          connectNulls: true
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
