var Kgv = {};
Kgv.install = function(Vue, options){

    //force-graph
    Vue.prototype.$force = (title, nodes, edges, selector, colors)=>{

        var color = [];
        var type=[];
        var length;

        if(!colors){
            var color1 = d3.scale.category20();

            for(var i =0; i<nodes.length; i++){
                type.push(nodes[i].type);
                type.sort();
                length = type[nodes.length-1];
                for(var j=0; j<length; j++){
                    color.push({color:color1(j), label:"标签"+(j+1)});
                }
            }
        }
        else{
            color=colors;
        }

        if(!selector){
            var selector = "main";
        }
        var id = "#"+selector;
        var width = 500;
        var height = 600;
        var svg = d3.select(id)
            .append("svg")
            .attr("width",width)
            .attr("height",height);

        var force = d3.layout.force()
            .nodes(nodes)
            .links(edges)
            .size([width,height])
            .linkDistance(150)
            .charge(-400);


        force.start();

        var svg_edges = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke","#ccc")
            .style("stroke-width",1);

        var svg_nodes = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r",20)
            .style("fill",
                (d)=>{
                    if(d.type==1){
                        return color[0].color;
                    }else if(d.type==2){
                        return color[1].color;
                    }else if(d.type==3){
                        return color[2].color;
                    }else if(d.type==4){
                        return color[3].color;
                    }else if(d.type==5){
                        return color[4].color;
                    }else if(d.type==6){
                        return color[5].color;
                    }else if(d.type==7){
                        return color[6].color;
                    }else if(d.type==8){
                        return color[7].color;
                    }else if(d.type==9){
                        return color[8].color;
                    }else if(d.type==10){
                        return color[9].color;
                    }else if(d.type==11){
                        return color[10].color;
                    }else if(d.type==2){
                        return color[11].color;
                    }else if(d.type==13){
                        return color[12].color;
                    }else if(d.type==14){
                        return color[13].color;
                    }else if(d.type==15){
                        return color[14].color;
                    }else if(d.type==16){
                        return color[15].color;
                    }else if(d.type==17){
                        return color[16].color;
                    }else if(d.type==18){
                        return color[17].color;
                    }else if(d.type==19){
                        return color[18].color;
                    }else if(d.type==20){
                        return color[19].color;
                    }else if(d.type==21){
                        return color[20].color;
                    }
                }
            )
            .on("mouseover", (d, i)=>{
                if(nodes.name === d.name){
                    forceImg.style("fill-opacity",1.0);
                }
            })
            .on("mouseout",(d,i) => {
                if(nodes.name === d.name){
                    forceImg.style("fill-opacity",0.0);
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
            .attr("class","linetext")
            .style("fill", "black")
            .text(d => d.relation);

        var marker=
            svg.append("marker")
                .attr("id", "resolved")
                .attr("markerUnits","userSpaceOnUse")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX",32)
                .attr("refY", -1)
                .attr("markerWidth", 12)
                .attr("markerHeight", 12)
                .attr("orient", "auto")
                .attr("stroke-width",2)
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr('fill','#000000');


        force.on("tick", () => {

            svg_edges.attr("x1",d => d.source.x)
                .attr("y1",d => d.source.y)
                .attr("x2",d => d.target.x)
                .attr("y2",d => d.target.y);

            svg_nodes.attr("cx",d => d.x)
                .attr("cy",d => d.y);

            svg_texts.attr("x", d => d.x)
                .attr("y", d => d.y);

            edges_text.attr("x",d => (d.source.x + d.target.x) / 2);
            edges_text.attr("y",d => (d.source.y + d.target.y) / 2);
        });

        var titleName = document.createElement("h1");
        titleName.innerHTML=title;
        var s = document.getElementById(selector).childNodes[0];
        document.getElementById(selector).insertBefore(titleName, s);

        var toolBar = document.createElement("div");
        toolBar.className = "toolBar";
        toolBar.style.textAlign="center";
        toolBar.style.marginBottom=10+"px";
        toolBar.style.width= 500+"px";

        document.getElementById(selector).appendChild(toolBar);

        var tool = "";
        for(var j=0; j<color.length;j++){
            tool += '<div class="circle1" style="width:10px; height: 10px;border-radius: 50px;display: inline-block;background-color:'+color[j].color+';"></div>' +
                '<span class="label2" style="margin-right: 10px;">'+color[j].label+'</span>';
        }
        toolBar.innerHTML=tool;
    };

    //tree-graph
    Vue.prototype.$tree = (dataset, selector,title)=>{
        if(!selector){
            id = "#main";
        }else{
            id = "#"+selector;
        }

        var width = 500;
        var height = 500;
        var margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = width - margin.right - margin.left,
            height = height - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(d =>[(d.y+50), d.x]);

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
                .data(nodes, d =>(d.id || (d.id = ++i)));


            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("cursor", "pointer")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("transform", d => ("translate(" + (source.y0+50) + "," + source.x0 + ")"))
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
                .attr("transform", d => ("translate(" + (d.y+50) + "," + d.x + ")"));

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", d => ("translate(" + (source.y+50) + "," + source.x + ")"))
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
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", d => {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
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

        if(title){
            var titleName = document.createElement("h1");
            titleName.innerHTML=title;
            var s = document.getElementById(selector).childNodes[0];
            document.getElementById(selector).insertBefore(titleName, s);
        }
    };

    Vue.prototype.$map = (dataset, $selector)=>{

    };

    Vue.prototype.$line = (dataset, $selector)=>{

    };

    Vue.prototype.$bar = (dataset, $selector)=>{

    };

    Vue.prototype.$pie = (dataset, $selector)=>{

    };

    Vue.prototype.$heatmap = (dataset, $selector)=>{

    };

    Vue.prototype.$radar = (dataset, $selector)=>{

    };

}

module.exports = Kgv;
