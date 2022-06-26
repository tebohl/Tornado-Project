function init() {
    // access mondo data via flask route
    d3.json("/api/intensity").then(function(data){
        let ids = data[0].PKID;
        let dates = data[0].Date;
        let ranges = data[0].Range;
        let shears = data[0].Max_Shear;
        //reduces list by the max shear for each pkid
        let reduced_ranges = [];
        let reduced_shears = [];
        let reduced_dates = [];
        let reduced_ids = [];
        let prev_tornado_id = '';
        let prev_tornado_shear = 0;
        for (let i = 0; i<ids.length; i++) {
            current_tornado_id = ids[i];
            current_tornado_shear = shears[i];
            tornado_range = ranges[i];
            if (current_tornado_id === prev_tornado_id) {
                if(current_tornado_shear > prev_tornado_shear){
                    reduced_ranges[reduced_ranges.length-1] = ranges[i]
                    reduced_shears[reduced_shears.length-1] = shears[i]
                    reduced_dates[reduced_dates.length-1] = dates[i]
                    reduced_ids[reduced_ids.length-1] = ids[i]
                }
            } 
            else {
                reduced_ranges.push(ranges[i]);
                reduced_shears.push(shears[i]);
                reduced_dates.push(dates[i]);
                reduced_ids.push(ids[i]);
            }
            prev_tornado_id = current_tornado_id
            prev_tornado_shear = current_tornado_id
            };

        //scatterplot showing tornadoes by date and intensity
        let trace1 = {
            x: reduced_dates,
            y: reduced_shears, 
            mode: 'markers',
            type: 'scatter',
        };
        let data1 = [trace1];
        let layout1 = {
            title: {text:"Date v. Max Shear"},
            yaxis: {title: {text: "Max Wind Shear"}}
        };
        Plotly.newPlot("plot", data1, layout1);


        //scatterplt showing tornadoes by range v. shear: 
        let trace2 = {
            x: reduced_ranges,
            y: reduced_shears, 
            mode: 'markers',
            type: 'scatter',
        };
        let layout2 = {
            title: {text:"Range v. Max Shear"}, 
            xaxis: {title: {text: "Range (in nautical miles)"}}, 
            yaxis: {title: {text: "Max Wind Shear"}}
        };
        let data2 = [trace2];
        Plotly.newPlot("plot2", data2, layout2);

        });
};

init();

