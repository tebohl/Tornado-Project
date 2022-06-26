//Use the D3 library to read in samples.json from the URL

function init() {
    d3.json("/api/intensity").then(function(data){
    let x = data[0].Date;
    let y = data[0].Max_Shear;
    // for (let i = 0; i<data[0].length; i++) {
    //     let tornado = data[i];
    //     x.push(tornado.Date);
    //     y.push(tornado.Max_Shear);
    // }
    let trace1 = {
        x: x,
        y: y, 
        mode: 'markers',
        type: 'scatter',
        hovertext: data[0].Cell_ID
    };
    console.log(data[0].Cell_ID)
    let data1 = [trace1];
    Plotly.newPlot("plot", data1);
});
};

init();

