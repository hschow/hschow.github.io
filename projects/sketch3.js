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

    const g = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    r64 = [6, 6.03125, 5.3125, 6.65625, 5.59375, 5.9375, 6.5625]
    r32 = [3,5.125,4.0625,3.0625,3.6875,4.4375, 5.875]
    s16 =[2.25,3.25,3.125,1.5,2,3,4.625]
    e8 = [2.75,1.75,3,3.75,2.5,4.5, 3.75]

    let xScale = d3.scaleLinear()
        .domain([1, 4])
        .range([50, width - 20]);
    ticks = ['R64', 'R32', 'S16', 'E8']
    let xAxisGenerator = d3.axisBottom(xScale)
        .ticks(4)
        .tickFormat((d,i) =>ticks[i])
        .tickSize(-570)
    let xAxis = svg.append("g")
        .call(xAxisGenerator)
        .attr("transform", `translate(${0},${height - 20})`);
    let yScale = d3.scaleLinear()
        .domain([7, 0])
        .range([30, height - 20]);
    tks = [7,6,5,4,3,2,1,0]
    let yAxisGenerator = d3.axisLeft(yScale)
        .ticks(8)
        .tickFormat((d,i) =>tks[i])
    let yAxis = svg.append('g')
        .call(yAxisGenerator)
        .attr("transform", `translate(${50},${0})`);
    lines = g.selectAll('polyline')
        .data(r64)
        .enter()
        .append('polyline')
        .attr('fill', 'none')
        .attr('stroke', function (d){
            if (d==6.5625){
                return 'red'
            }
            return 'black';
        })
        .attr('points', function (d, i){
            arr = []
            arr.push(xScale(1)-20)
            arr.push(yScale(r64[i]))
            arr.push(xScale(2)-20)
            arr.push(yScale(r32[i]))
            arr.push(xScale(3)-20)
            arr.push(yScale(s16[i]))
            arr.push(xScale(4)-20)
            arr.push(yScale(e8[i]))
            return arr;
        })

}

main()