//Use the D3 library to read in samples.json from the URL
const query_url = "../../static/data/tornadoes.json" //change this to reference the mongo_db
d3.json(query_url).then(init(query_url));

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