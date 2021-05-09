function main(){
    let espnP = [97.4, 96.9, 96.6, 96.3, 95.2, 94.9, 94.2, 93.9, 92.1, 91.8, 91.4, 89.1, 87.5, 84.6, 84.3, 78.7, 78.4, 76.8, 76.1, 73.1, 72.3, 65.8, 65.2, 64.4, 58.2, 57.5, 57.2, 57.1, 56.4, 56.1, 53.6, 53.4, 46.6, 46.4, 43.9, 43.6, 42.9, 42.9, 42.5, 41.8, 35.6, 34.8, 34.2, 27.7, 26.9, 23.9, 23.2, 21.6, 21.3, 15.7, 15.4, 12.5, 10.9, 8.6, 8.2, 7.9, 6.1, 5.8, 5.1, 4.8, 3.7, 3.4, 3.1, 2.7]

    let myP = [1,1,1,1,1,1,1,1,0.76,0.48,0.52, 0.76,0.72,0.96,0.6,0.2,0.64,0.76,0.44,0.36,0.8,0.52,0.72,0.88,0.32,0.64,0.64,0.96,0.4,0.48,0.44,0.52,0.48,0.56,0.52,0.6,0.04,0.36,0.36,0.68, 0.12, 0.28, 0.48, 0.2, 0.64, 0.56, 0.24, 0.36, 0.8,0.4,0.04,0.28,0.24,0.48,0.52,0.24,0,0,0,0,0,0,0,0]

    let teams = ["	Gonzaga	",
        "	Michigan	",
        "	Baylor	",
        "	Illinois	",
        "	Ohio State	",
        "	Houston	",
        "	Iowa	",
        "	Alabama	",
        "	Kansas	",
        "	West Virginia	",
        "	Texas	",
        "	Florida State	",
        "	Purdue	",
        "	Arkansas	",
        "	Oklahoma State	",
        "	USC	",
        "	Tennessee	",
        "	Virginia	",
        "	Texas Tech	",
        "	Villanova	",
        "	Creighton	",
        "	BYU	",
        "	Oregon	",
        "	LSU	",
        "	San Diego State	",
        "	Clemson	",
        "	Oklahoma	",
        "	Colorado	",
        "	UConn	",
        "	Loyola Chicago	",
        "	North Carolina	",
        "	Florida	",
        "	Virginia Tech	",
        "	Wisconsin	",
        "	Georgia Tech	",
        "	Maryland	",
        "	Georgetown	",
        "	Missouri	",
        "	Rutgers	",
        "	Syracuse	",
        "	St. Bonaventure	",
        "	VCU	",
        "	UCLA	",
        "	UCSB	",
        "	Winthrop	",
        "	Utah State	",
        "	Ohio	",
        "	Oregon State	",
        "	Drake	",
        "	Liberty	",
        "	Colgate	",
        "	North Texas	",
        "	UNC Greensboro	",
        "	Abil Christian	",
        "	Morehead State	",
        "	E Washington	",
        "	Iona	",
        "	Grand Canyon	",
        "	Cleveland State	",
        "	Oral Roberts	",
        "	Drexel	",
        "	Hartford	",
        "	Texas Southern	",
        "	Norfolk St	"]

    let winners = [1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,0,1,1,1,0,1,1,0,0,1,1,0,1,0,1]

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


    svg.append('line')
        .attr('x1', 50)
        .attr('y1', height-20)
        .attr('x2', width-20)
        .attr('y2', 30)
        .attr('stroke', 'rgb(220, 220, 220)')
    svg.append('line')
        .attr('x1', 50)
        .attr('y1', height/2 + 5)
        .attr('x2', width-20)
        .attr('y2', height/2 + 5)
        .attr('stroke', 'rgb(220, 220, 220)')
    svg.append('line')
        .attr('x1', width/2 + 15)
        .attr('y1', height-20)
        .attr('x2', width/2 + 15)
        .attr('y2', 30)
        .attr('stroke', 'rgb(220, 220, 220)')

    let xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([50, width - 20]);
    let xAxisGenerator = d3.axisBottom(xScale)
        .ticks(5);
    let xAxis = svg.append("g")
        .call(xAxisGenerator)
        .attr("transform", `translate(${0},${height - 20})`);
    let yScale = d3.scaleLinear()
        .domain([100, 0])
        .range([30, height - 20]);
    ticks = [1,.8,.6,.4,.2,0]
    let yAxisGenerator = d3.axisLeft(yScale)
        .ticks(6)
        .tickFormat((d,i) =>ticks[i])
    let yAxis = svg.append('g')
        .call(yAxisGenerator)
        .attr("transform", `translate(${50},${0})`);

    dots = g.selectAll('circle')
        .data(winners)
        .enter()
        .append('circle')
        .attr('cy', function (d, i){
            return yScale(espnP[i])-10;
        })
        .attr('cx', function (d, i){
            return xScale(myP[i])-20;
        })
        .attr('r', 3)
        .attr('fill', function (d){
            if (d==1){
                return'red'
            }
            return 'blue'
        })
        .append('title')
        .text(function (d, i){
            return ("favorite: ",teams[i])
        })

    svg.append('rect')
        .attr('x', 542)
        .attr('y', 510)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', 'blue')
    svg.append('rect')
        .attr('x', 542)
        .attr('y', 530)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', 'red')
    svg.append('text')
        .attr('x', 560)
        .attr('y', 520)
        .text('the underdog won')
        .attr('font-size', '8pt')
    svg.append('text')
        .attr('x', 560)
        .attr('y', 540)
        .text('the favorite won')
        .attr('font-size', '8pt')
    svg.append('text')
        .attr('x', 560)
        .attr('y', 575)
        .attr('font-size', '10pt')
        .text('My game odds')
    svg.append('text')
        .attr('x', 22)
        .attr('y', 20)
        .attr('font-size', '10pt')
        .text("the people's odds")

    svg.append('text')
        .attr('x', 262)
        .attr('y', 14)
        .attr('font-size', '12pt')
        .text('Predictions')


}

main()

