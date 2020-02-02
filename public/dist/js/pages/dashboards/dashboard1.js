$(function () {

    // ==============================================================
    // Campaign
    // ==============================================================

    var chart1 = c3.generate({
        bindto: '#campaign-v2',
        data: {
            columns: [
                ['Direct Sales', 25],
                ['Referral Sales', 15],
                ['Afilliate Sales', 10],
                ['Indirect Sales', 15]
            ],

            type: 'donut',
            tooltip: {
                show: true
            }
        },
        donut: {
            label: {
                show: false
            },
            title: 'Sales',
            width: 18
        },

        legend: {
            hide: true
        },
        color: {
            pattern: [
                '#edf2f6',
                '#5f76e8',
                '#ff4f70',
                '#01caf1'
            ]
        }
    });

    d3.select('#campaign-v2 .c3-chart-arcs-title').style('font-family', 'Rubik');


    // ==============================================================
    // Earning Stastics Chart
    // ==============================================================
    var chart = new Chartist.Line('#stats', {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            [22, 5, 15, 21, 14, 23, 12]
        ]
    }, {
        low: 0,
        high: 28,
        showArea: true,
        fullWidth: true,
        plugins: [
            Chartist.plugins.tooltip()
        ],
        axisY: {
            onlyInteger: true,
            scaleMinSpace: 40,
            offset: 20,
            labelInterpolationFnc: function (value) {
                return (value / 1) + 'k';
            }
        },
    });

    // Offset x1 a tiny amount so that the straight stroke gets a bounding box
    chart.on('draw', function (ctx) {
        if (ctx.type === 'area') {
            ctx.element.attr({
                x1: ctx.x1 + 0.001
            });
        }
    });

    // // Create the gradient definition on created event (always after chart re-render)
    chart.on('created', function (ctx) {
        var defs = ctx.svg.elem('defs');
        defs.elem('linearGradient', {
            id: 'gradient',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': 'rgba(255, 255, 255, 1)'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(80, 153, 255, 1)'
        });
    });

    $(window).on('resize', function () {
        chart.update();
    });

    $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#clientTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
})