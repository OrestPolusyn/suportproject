"use strict";

var _vars = _interopRequireDefault(require("../_vars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var chartBtn = _toConsumableArray(_vars["default"].graphRadio);

var graphBox = _vars["default"].graph;

if (graphBox) {
  var optionsArea = {
    chart: {
      type: 'area'
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: [0, 1, 2],
      top: -10,
      left: 0,
      blur: 20,
      color: '#fbcab7',
      opacity: 0.35
    },
    borderColor: '#406aff'
  };
  var optionsBar = {
    chart: {
      type: 'bar'
    },
    fill: {
      type: 'solid',
      gradient: {
        opacityFrom: 1,
        opacityTo: 1
      }
    },
    borderColor: '#5d73ca'
  };
  var options = {
    chart: {
      height: 310,
      width: '100%',
      zoom: {
        enabled: false
      },
      type: 'area',
      toolbar: {
        show: false
      }
    },
    plotOptions: {},
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        enabled: true,
        shadeIntensity: 0.4,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [30, 100, 110]
      },
      colors: ['#b3c3ff', 'rgba(64, 106, 255, 0)']
    },
    stroke: {
      show: true,
      curve: 'smooth',
      colors: ['#406aff'],
      width: 1,
      dashArray: 0
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    grid: {
      padding: {
        left: 10,
        top: 0,
        bottom: 0
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        formatter: function formatter(value) {
          return value.toFixed(0) + '%';
        }
      }
    },
    series: [{
      name: 'graph',
      data: [0, -10 - 20, 30, 50, 50]
    }],
    xaxis: {
      categories: ['1 Dec', '8 Dec', '16 Dec', '31 Dec', '05 Jan', '14 Jan', '21 Jan', '28 Jan', '05 Feb'],
      axisTicks: {
        show: false
      }
    },
    borderColor: '#406aff'
  };
  var chart = new ApexCharts(graphBox, options);
  chart.render(); // if (chartBtn.length > 0) {
  //   chartBtn.forEach((element) => {
  //     element.addEventListener('click', (e) => {
  //       const graphSwitch = e.currentTarget
  //     })
  //   })
  // }
}