function main(){
    let svg = d3.select("body")
        .append('svg')
        .attr('height', 600)
        .attr('width', 1015)
        .attr('style',"background-color: white")
        .attr('transform','translate(255, 0)')

    let myPicks = [36, 24, 20, 20, 0]
    let mNames = ['Illinois', 'Gonzaga', 'Michigan', 'Houston', 'Other']
    let peoplesPicks = [34.4, 15.2, 10.4, 7.8, 3.7, 3.5, 3.3]
    let pNames = ['Gonzaga','Illinois','Baylor','Michigan','Iowa','OSU', 'Houston']
    let pColrs = [20, 5, 25, 10, 5, 0, 15]
    let mColrs = [5, 20, 10, 15]
    let bars = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7]

    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    }

    var width = 1000;
    var height = 600;

    const g = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    let xScale1 = d3.scaleLinear()
        .domain([0, 7])
        .range([50, width/2 + 50]);
    let xAxisGenerator1 = d3.axisBottom(xScale1)
        .ticks(7)
        .tickValues([1,2,3,4,5,6,7])
        .tickFormat((d,i) =>pNames[i])
    let xAxis1 = svg.append("g")
        .call(xAxisGenerator1)
        .attr("transform", `translate(${0},${height - 20})`);
    let xScale2 = d3.scaleLinear()
        .domain([0, 5])
        .range([50, width/2 - 75]);
    let xAxisGenerator2 = d3.axisBottom(xScale2)
        .ticks(7)
        .tickValues([1,2,3,4,5])
        .tickFormat((d,i) => mNames[i])
    let xAxis2 = svg.append('g')
        .call(xAxisGenerator2)
        .attr('transform', `translate(${width/2 + 75}, ${height-20})`);
    let yScale = d3.scaleLinear()
        .domain([0, 40])
        .range([30, height - 20]);
    let ticks = [40, 35, 30, 25, 20, 15, 10, 5, 0];
    let yAxisGenerator1 = d3.axisLeft(yScale)
        .ticks(9)
        .tickSize(-540)
        .tickFormat((d,i) =>ticks[i])
    let yAxisGenerator2 = d3.axisLeft(yScale)
        .ticks(9)
        .tickSize(-370)
        .tickFormat((d,i) =>ticks[i])
    let yAxis1 = svg.append('g')
        .call(yAxisGenerator1)
        .attr("transform", `translate(${50},${0})`);
    let yAxis2 = svg.append('g')
        .call(yAxisGenerator2)
        .attr('transform', `translate(${width/2 + 125}, ${0})`);

    svg.selectAll('rect')
        .data(bars)
        .enter()
        .append('rect')
        .attr('x', function (d){
            if (d<0){
                return ((width/2) + 135 + xScale2(d+5));
            }
            else {
                return xScale1(d)-15;
            }
        })
        .attr('y', function (d){
            if (d<0){
                if (myPicks[d+5] == 0){
                    return height-25;
                }
                return height - yScale(myPicks[d+5]) + 5;
            }
            else{
                return height - yScale(peoplesPicks[d-1]) + 5;
            }
        })
        .attr('width', 30)
        .attr('height', function (d){
            if (d<0){
                if (myPicks[d+5] == 0){
                    return 5;
                }
                return yScale(myPicks[d+5]) - 25;
            }
            else {
                return yScale(peoplesPicks[d-1]) - 25;
            }
        })
        .attr('fill', function (d){
            if (d<0){
                if (mColrs[d+5]==20){
                    return '#a6d854'
                }
                else if ( mColrs[d+5] == 10){
                    return '#8da0cb'
                }
                else if(mColrs[d+5] == 15){
                    return '#e78ac3'
                }
                else {
                    return '#fc8d62'
                }
            }
            if (pColrs[d-1]==20){
                return '#a6d854'
            }
            else if ( pColrs[d-1] == 10){
                return '#8da0cb'
            }
            else if(pColrs[d-1] == 15){
                return '#e78ac3'
            }
            else if (pColrs[d-1]==5){
                return '#fc8d62'
            }
            else if (pColrs[d-1] == 25){
                return '#ffd92f'
            }
            else {
                return '#66c2a5'
            }
        })
        .append('title')
        .text(function (d){
            if (d<0){
                return myPicks[d+5];
            }
            return peoplesPicks[d-1];
        })

    svg.append('circle')
        .attr('cx', 460)
        .attr('cy', 120)
        .attr('r', 3)
        .attr('fill', '#66c2a5')
    svg.append('circle')
        .attr('cx', 460)
        .attr('cy', 105)
        .attr('r', 3)
        .attr('fill', '#fc8d62')
    svg.append('circle')
        .attr('cx', 460)
        .attr('cy', 85)
        .attr('r', 3)
        .attr('fill', '#8da0cb')
    svg.append('circle')
        .attr('cx', 460)
        .attr('cy', 70)
        .attr('r', 3)
        .attr('fill', '#e78ac3')
    svg.append('circle')
        .attr('cx', 460)
        .attr('cy', 55)
        .attr('r', 3)
        .attr('fill', '#a6d854')
    svg.append('circle')
        .attr('cx', 460)
        .attr('cy', 40)
        .attr('r', 3)
        .attr('fill', '#ffd92f')
    svg.append('text')
        .attr('x', 465)
        .attr('y', 123)
        .attr('font-size', '8pt')
        .text('first round')
    svg.append('text')
        .attr('x', 465)
        .attr('y', 108)
        .attr('font-size', '8pt')
        .text('second round')
    svg.append('text')
        .attr('x', 465)
        .attr('y', 88)
        .attr('font-size', '8pt')
        .text('Elite Eight')
    svg.append('text')
        .attr('x', 465)
        .attr('y', 73)
        .attr('font-size', '8pt')
        .text('Final Four')
    svg.append('text')
        .attr('x', 465)
        .attr('y', 58)
        .attr('font-size', '8pt')
        .text('Runner Up')
    svg.append('text')
        .attr('x', 465)
        .attr('y', 43)
        .attr('font-size', '8pt')
        .text('Champion')
    svg.append('text')
        .attr('x', 573)
        .attr('y', 20)
        .attr('font-size', '11pt')
        .text('Championship odds')
    svg.append('text')
        .attr('x', 20)
        .attr('y', 20)
        .attr('font-size', '11pt')
        .text('Championship odds based on ESPN brackets')


}

main()
