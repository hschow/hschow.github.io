function main(){
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    }

    var width = 650;
    var height = 600;

    let svg = d3.select("body")
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .attr('style',"background-color: white")
        .attr('transform','translate(415, 0)')

    const g = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    let xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([50, width - 20]);
    let histoTicks = ['','1-9', '10-19', '20-29', '30-39', '40-49','50-59', '60-69', '70-79', '80-89', '90-99']
    let xAxisGenerator = d3.axisBottom(xScale)
        .tickFormat((d,i) => histoTicks[i])
    let xAxis = svg.append("g")
        .call(xAxisGenerator)
        .attr("transform", `translate(${0},${height - 20})`);
    let yScale = d3.scaleLinear()
        .domain([0, 5])
        .range([30, height - 20]);
    let ticks = [5,4,3,2,1]
    let yAxisGenerator = d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat((d,i) =>ticks[i]);
    let yAxis = svg.append('g')
        .call(yAxisGenerator)
        .attr("transform", `translate(${50},${0})`);

    percentiles = [20, 53, 47, 77, 66, 35, 44, 49, 44, 39, 13, 30, 35, 13, 3, 22, 79, 5, 10, 72, 74, 23, 28, 58, 66]
    counts = [2, 3, 3, 4, 3, 3, 3, 2, 2]

    g.selectAll('rect')
        .data(counts)
        .enter()
        .append('rect')
        .attr('x', function (d, i){
            return xScale(i*10) + 10
        })
        .attr('y', function (d){
            return height - yScale(d) - 10;
        })
        .attr('width', 50)
        .attr('height', function (d){
            return yScale(d) - 30;
        })
        .attr('fill', 'rgb(0, 140, 210)')
        .append('title')
        .text(function (d){
            return d;
        })

    svg.append('text')
        .attr('x', 0)
        .attr('y', 599)
        .attr('font-size', '10pt')
        .text('Percentiles')
    svg.append('text')
        .attr('x', 22)
        .attr('y', 20)
        .attr('font-size', '10pt')
        .text('Count')
    svg.append('text')
        .attr('x', 200)
        .attr('y', 50)
        .attr('font-size', '14pt')
        .text('ESPN percentile scores of my Brackets')



}

main()
