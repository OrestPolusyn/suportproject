"use strict";

var _vars = _interopRequireDefault(require("../_vars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chartBox = _vars["default"].chart;

if (chartBox) {
  var options = {
    chart: {
      width: 460,
      type: 'donut'
    },
    colors: ['#3262c0', '#2250ab', '#103887', '#092a6b', '#072560'],
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
              formatter: function formatter() {
                return '< $ 100 000';
              }
            },
            value: {
              show: false,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function formatter() {
                return '< $ 100 000';
              }
            },
            total: {
              show: true,
              showAlways: false,
              label: '< $ 100 000',
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#373d3f',
              formatter: function formatter() {
                return '< $ 100 000';
              }
            }
          }
        }
      }
    },
    series: [76, 67, 61, 45, 90],
    legend: {
      formatter: function formatter(label, opts) {
        return label + ' - ' + opts.w.globals.series[opts.seriesindex];
      },
      onItemClick: {
        toggleDataSeries: true,
        highlightDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: false,
        toggleDataSeries: true
      },
      markers: {
        width: 23,
        height: 23,
        strokeWidth: 0,
        strokeColor: '#fff',
        radius: 3
      }
    }
  };
  var chart = new ApexCharts(chartBox, options);
  chart.render();
}