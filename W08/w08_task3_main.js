d3.csv("https://harumiyomiyo.github.io/InfoVisualization2022/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 512,
            height: config.height || 256
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.radius = Math.min( self.config.width, self.config.height ) / 2;
        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);
    }

    update() {
        let self = this;

        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()    
            .append('path')
            .attr('d', self.arc)
            .attr('fill', 'green')
            .attr('stroke', 'gray')
            .style('stroke-width', '2px');

        self.svg.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append("text")
            .attr("fill", "white")
            .attr("transform", function(d) { return "translate(" + self.text.centroid(d) + ")"; })
            .attr("dy", "5px")
            .attr("font", "10px")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.data.label; });
    }
}