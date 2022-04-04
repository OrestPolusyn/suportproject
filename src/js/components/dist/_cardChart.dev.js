"use strict";

var chartsTrades = Array.from(document.querySelectorAll('.card-chart'));

if (chartsTrades.length > 0) {
  chartsTrades.forEach(function (element) {
    var options = {
      chart: {
        height: 80,
        type: "line",
        foreColor: '#6d6d6d',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 3,
        dashArray: 0
      },
      series: [{
        data: [4, 2, 4, 3, 5, 6, 7, 8]
      }],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 0.01,
          opacityTo: 1,
          colorStops: [{
            offset: 0,
            color: "#c1f793",
            opacity: 0.01
          }, {
            offset: 30,
            color: "#36bbff",
            opacity: 46
          }, {
            offset: 100,
            color: "#63c178",
            opacity: 1
          }]
        }
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      xaxis: {
        tooltip: {
          enabled: false
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tooltip: {
          enabled: false
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        enabled: false
      },
      colors: ['#63c178', '#36bbff', '#c1f793'],
      dataLabels: {
        enabled: false
      },
      noData: {
        align: 'center',
        verticalAlign: 'middle'
      }
    };
    var chart = new ApexCharts(element, options);
    chart.render();
  });
}