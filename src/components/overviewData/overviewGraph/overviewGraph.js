/*global google*/
import React, { Component } from 'react';
import { css } from 'glamor';
import './overviewGraph.css';

class OverviewGraph extends Component {
  drawAxisTickColors() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', 'Travel time');

    data.addRows(this.props.data);

    var options = {
      curveType: 'function',
      hAxis: {
        title: 'Time',
        textStyle: {
          color: '#01579b',
          fontSize: 10,
          // fontName: 'Arial',
          bold: false,
          italic: false,
        },
        titleTextStyle: {
          color: '#01579b',
          fontSize: 16,
          // fontName: 'Arial',
          bold: false,
          italic: false,
        },
      },
      vAxis: {
        title: 'Time in traffic',
        textStyle: {
          color: '#1a237e',
          fontSize: 10,
          bold: false,
          italic: false,
        },
        titleTextStyle: {
          color: '#1a237e',
          fontSize: 16,
          bold: false,
          italic: false,
        },
      },
      colors: ['#a52714', '#097138'],
    };
    var chart = new google.visualization.LineChart(
      document.getElementById('chart_div')
    );
    chart.draw(data, options);
  }

  render() {
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(this.drawAxisTickColors.bind(this));
    const { height, width } = this.props;

    const graphCss = css({
      height,
      width: '100%',
    });

    return (
      <div {...graphCss} className="overview-graph">
        <div className="graph-container" id="chart_div" />
      </div>
    );
  }
}

export default OverviewGraph;
