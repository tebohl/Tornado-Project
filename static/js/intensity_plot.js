//Use the D3 library to read in samples.json from the URL
const tornado_data = "../../static/data/tornadoes.json" //change this to reference the mongo_db
d3.json(tornado_data).then(init(tornado_data));

function init(data) {
    let x = [];
    let y = [];
    for (let i = 0; i<data.length; i++) {
        let tornado = data[i];
        x.push(tornado.Date);
        y.push(tornado.Max_Shear);
    }
    let trace1 = {
        x: x,
        y: y, 
        mode: 'markers',
        type: 'scatter'
    };
    
    let data = [trace1];
    Plotly.newPlot("plot", data);
};

init(); 