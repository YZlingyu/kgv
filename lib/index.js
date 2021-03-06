var Kgv = {};
Kgv.install = function(Vue, options) {

    //force-graph
    Vue.prototype.$force = (title, nodes, edges, selector, colors) => {

        var color = [];
        var type = [];
        var length;

        if (!colors) {
            var color1 = d3.scale.category20();

            for (var i = 0; i < nodes.length; i++) {
                type.push(nodes[i].type);
                type.sort();
                length = type[nodes.length - 1];
                for (var j = 0; j < length; j++) {
                    color.push({ color: color1(j), label: "标签" + (j + 1) });
                }
            }
        } else {
            color = colors;
        }

        if (!selector) {
            var selector = "main";
        }
        var id = "#" + selector;
        var width = 500;
        var height = 600;
        var svg = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var force = d3.layout.force()
            .nodes(nodes)
            .links(edges)
            .size([width, height])
            .linkDistance(150)
            .charge(-400);


        force.start();

        var svg_edges = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);

        var svg_nodes = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .style("fill",
                (d) => {
                    if (d.type == 1) {
                        return color[0].color;
                    } else if (d.type == 2) {
                        return color[1].color;
                    } else if (d.type == 3) {
                        return color[2].color;
                    } else if (d.type == 4) {
                        return color[3].color;
                    } else if (d.type == 5) {
                        return color[4].color;
                    } else if (d.type == 6) {
                        return color[5].color;
                    } else if (d.type == 7) {
                        return color[6].color;
                    } else if (d.type == 8) {
                        return color[7].color;
                    } else if (d.type == 9) {
                        return color[8].color;
                    } else if (d.type == 10) {
                        return color[9].color;
                    } else if (d.type == 11) {
                        return color[10].color;
                    } else if (d.type == 2) {
                        return color[11].color;
                    } else if (d.type == 13) {
                        return color[12].color;
                    } else if (d.type == 14) {
                        return color[13].color;
                    } else if (d.type == 15) {
                        return color[14].color;
                    } else if (d.type == 16) {
                        return color[15].color;
                    } else if (d.type == 17) {
                        return color[16].color;
                    } else if (d.type == 18) {
                        return color[17].color;
                    } else if (d.type == 19) {
                        return color[18].color;
                    } else if (d.type == 20) {
                        return color[19].color;
                    } else if (d.type == 21) {
                        return color[20].color;
                    }
                }
            )
            .on("mouseover", (d, i) => {
                if (nodes.name === d.name) {
                    forceImg.style("fill-opacity", 1.0);
                }
            })
            .on("mouseout", (d, i) => {
                if (nodes.name === d.name) {
                    forceImg.style("fill-opacity", 0.0);
                }
            })
            .call(force.drag);

        var svg_texts = svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .style("fill", "black")
            .attr("dx", -30)
            .attr("dy", 40)
            .text(d => d.name);

        var edges_text = svg.selectAll(".linetext")
            .data(edges)
            .enter()
            .append("text")
            .attr("class", "linetext")
            .style("fill", "black")
            .text(d => d.relation);

        var marker =
            svg.append("marker")
                .attr("id", "resolved")
                .attr("markerUnits", "userSpaceOnUse")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 32)
                .attr("refY", -1)
                .attr("markerWidth", 12)
                .attr("markerHeight", 12)
                .attr("orient", "auto")
                .attr("stroke-width", 2)
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr('fill', '#000000');


        force.on("tick", () => {

            svg_edges.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            svg_nodes.attr("cx", d => d.x)
                .attr("cy", d => d.y);

            svg_texts.attr("x", d => d.x)
                .attr("y", d => d.y);

            edges_text.attr("x", d => (d.source.x + d.target.x) / 2);
            edges_text.attr("y", d => (d.source.y + d.target.y) / 2);
        });

        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
        var toolBar = document.createElement("div");
        toolBar.className = "toolBar";
        toolBar.style.textAlign = "center";
        toolBar.style.marginBottom = 10 + "px";
        toolBar.style.width = 500 + "px";

        document.getElementById(selector).appendChild(toolBar);

        var tool = "";
        for (var j = 0; j < color.length; j++) {
            tool += '<div class="circle1" style="width:10px; height: 10px;border-radius: 50px;display: inline-block;background-color:' + color[j].color + ';"></div>' +
                '<span class="label2" style="margin-right: 10px;">' + color[j].label + '</span>';
        }
        toolBar.innerHTML = tool;
    };

    //tree-graph
    Vue.prototype.$tree = (dataset, selector, title) => {
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }

        var width = 500;
        var height = 500;
        var margin = { top: 20, right: 120, bottom: 20, left: 120 },
            width = width - margin.right - margin.left,
            height = height - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(d => [(d.y + 50), d.x]);

        var svg = d3.select(id).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom);
        //.append("g")

        var g = svg.append("g")
            .attr("class", "gg")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1.5)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        root = dataset[0];
        root.x0 = height / 2;
        root.y0 = 0;

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        root.children.forEach(collapse);
        update(root);


        d3.select(self.frameElement).style("height", "550px");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, d => (d.id || (d.id = ++i)));


            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("cursor", "pointer")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("transform", d => ("translate(" + (source.y0 + 50) + "," + source.x0 + ")"))
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .attr("fill", "#fff")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

            nodeEnter.append("text")
                .attr("x", d => (d.children || d._children ? -10 : 10))
                .attr("dy", ".35em")
                .attr("font", "10px sans-serif")
                .attr("text-anchor", d => (d.children || d._children ? "end" : "start"))
                .text(d => d.name)
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", d => ("translate(" + (d.y + 50) + "," + d.x + ")"));

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", d => ("translate(" + (source.y + 50) + "," + source.x + ")"))
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .attr("font", "10px sans-serif")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("stroke-width", 1.5)
                .data(links, d => d.target.id);


            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("stroke-width", 1.5)
                .attr("d", d => {
                    var o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", d => {
                    var o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$map = (selector, places, title) => {
        var id;
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }

        var width = 700;
        var height = 600;

        var svg = d3.select(id).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");

        var projection = d3.geo.mercator()
            .center([107, 32])
            .scale(550)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);


        var color = d3.scale.category20();


        d3.json("/static/china.json", (error, root) => {

            if (error)
                return console.error(error);

            var groups = svg.append("g");

            groups.selectAll("path")
                .data(root.features)
                .enter()
                .append("path")
                .attr("stroke", "none")
                .attr("fill", (d, i) => color(i))
                .attr("d", path)
                .on("mouseover", function(d, i) {
                    d3.select(this)
                        .attr("fill", "yellow");
                })
                .on("mouseout", function(d, i) {
                    d3.select(this)
                        .attr("fill", color(i));
                });

            function addPlace(places) {
                //插入分组元素
                var location = svg.selectAll(".location")
                    .data(places.location)
                    .enter()
                    .append("g")
                    .attr("class", "location")
                    .attr("transform", d => {
                        //计算标注点的位置
                        var coor = projection([d.log, d.lat]);
                        return "translate(" + coor[0] + "," + coor[1] + ")";
                    });

                //插入一个圆
                location.append("circle")
                    .attr("r", 7)
                    .attr("fill", "steelblue");

                //插入一张图片
                location.append("image")
                    .attr("x", 20)
                    .attr("y", -40)
                    .attr("width", 90)
                    .attr("height", 90)
                    .attr("xlink:href", d => d.img);
            }
            addPlace(places);
        });

        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$line = (title, selector, legend, xAxis, yAxis, data) => {
        var echarts = require('echarts/lib/echarts');
        var id;
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }
        var myChart = echarts.init(document.getElementById(selector));

        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: yAxis
                }
            },
            series: []
        };
        var a;
        for (var i = 0; i < data.length; i++) {
            a = {
                name: legend[i],
                type: 'line',
                data: data[i],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
            option.series.push(a);
        }

        myChart.setOption(option);
        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$bar = (title, selector, dataAxis, data, yMax, color1, color2, fontColor) => {
        var echarts = require('echarts/lib/echarts');
        var id;
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }

        var myChart = echarts.init(document.getElementById(selector));

        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }

        let option = {
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: fontColor
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [{
                type: 'inside'
            }],
            series: [{ // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false
            },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: color1[0] },
                                    { offset: 0.5, color: color1[1] },
                                    { offset: 1, color: color1[2] }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    { offset: 0, color: color2[0] },
                                    { offset: 0.7, color: color2[1] },
                                    { offset: 1, color: color2[2] }
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        };

        myChart.setOption(option);
        // Enable data zoom when user click bar.
        var zoomSize = 6;
        myChart.on('click', function(params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });

        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$pie = (title, data, selector) => {
        var echarts = require('echarts/lib/echarts');
        var id;
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }
        var myChart = echarts.init(document.getElementById(selector));

        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: data[0]
            },
            series: [{
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data[1],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        myChart.setOption(option);
        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$heatmap = (title, selector, data) => {
        var echarts = require('echarts/lib/echarts');
        var id;
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }
        var myChart = echarts.init(document.getElementById(selector));

        var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
            '7a', '8a', '9a', '10a', '11a',
            '12p', '1p', '2p', '3p', '4p', '5p',
            '6p', '7p', '8p', '9p', '10p', '11p'
        ];
        var days = ['Saturday', 'Friday', 'Thursday',
            'Wednesday', 'Tuesday', 'Monday', 'Sunday'
        ];

        data = data.map(function(item) {
            return [item[1], item[0], item[2] || '-'];
        });

        var option = {
            tooltip: {
                position: 'top'
            },
            animation: false,
            grid: {
                height: '50%',
                y: '10%'
            },
            xAxis: {
                type: 'category',
                data: hours,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: days,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: 10,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: 'Punch Card',
                type: 'heatmap',
                data: data,
                label: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        myChart.setOption(option);
        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$radar = (title, selector, indicator, legend, data) => {
        var echarts = require('echarts/lib/echarts');
        var id;
        if (!selector) {
            id = "#main";
        } else {
            id = "#" + selector;
        }
        var myChart = echarts.init(document.getElementById(selector));
        var option = {
            tooltip: {},
            legend: {
                data: legend
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: indicator
            },
            series: [{
                name: '',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: []
            }]
        };

        var b;
        for (var i = 0; i < data.length; i++) {
            b = {
                value: data[i].value,
                name: data[i].name
            };
            option.series[0].data.push(b);
        }

        myChart.setOption(option);
        if (title) {
            var titleName = document.createElement("h1");
            titleName.innerHTML = title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

};

module.exports = Kgv;