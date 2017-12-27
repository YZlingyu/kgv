let Kgv = {};
Kgv.install = function(Vue, options){

    Vue.prototype.$force = (nodes, edges, selector, color)=>{
        id = "#"+selector;
        let width = 500;
        let height = 600;
        let svg = d3.select(id)
            .append("svg")
            .attr("width",width)
            .attr("height",height);

        let force = d3.layout.force()
            .nodes(nodes)
            .links(edges)
            .size([width,height])
            .linkDistance(150)
            .charge(-400);

        force.start();

        let svg_edges = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke","#ccc")
            .style("stroke-width",1);

        let svg_nodes = svg.selectAll("circle")
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

        let svg_texts = svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .style("fill", "black")
            .attr("dx", -30)
            .attr("dy", 40)
            .text(d => d.name);

        let edges_text = svg.selectAll(".linetext")
            .data(edges)
            .enter()
            .append("text")
            .attr("class","linetext")
            .style("fill", "black")
            .text(d => d.relation);

        let marker=
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

        let toolBar = document.createElement("div");
            toolBar.className = "toolBar";
            toolBar.style={
                "text-align": "center",
                "margin-bottom": 10+"px"
            };

        document.getElementById(selector).appendChild(toolBar);

        let tool = "";
        for(let j=0; j<color.length;j++){
            tool += '<div class="circle1" style="width:10px; height: 10px;border-radius: 50px;display: inline-block;background-color:'+color[j].color+';"></div>' +
                '<span class="label2" style="margin-left: 10px;">'+color[j].label+'</span>';
        }
        toolBar.innerHTML=tool;
    };

    Vue.prototype.$tree = (dataset, $selector)=>{

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
