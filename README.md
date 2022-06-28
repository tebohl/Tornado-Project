# Tornado-Project

### Group Members:

- Taylor Bohl
- Harish Korrapati
- Corey Lawson-Enos
- Rhiana Schafer
- Ishanjit Sidhu

### Methods:
* Python
* HTML
* Javascript
* Leaflet
* MongoDB

### Description:
In this project, we extracted data for Level 3 tornadoes from the last 2 months from www.ncdc.noaa.gov. After cleaning, we stored the data in MongoDB and used a Python Flask API to power a web application (See file app.py). We then created several visualizations using Leaflet and Plotly that allow you to interact with the data set.

### Dataset:

Data was retrieved using the below API. 

https://www.ncdc.noaa.gov/swdiws/

Some notes on the data:  
- Level 3 tornadoes have wind speeds between 136 and 165 mph (218 and 266 km/h)
- We retained the following columns:  
&nbsp;&nbsp;&nbsp;&nbsp;Cell_Type: Type of rotation, TVS indicates tornado  
&nbsp;&nbsp;&nbsp;&nbsp;Shape: Point (lon, lat)  
&nbsp;&nbsp;&nbsp;&nbsp;Max_Shear: Change in wind speed and/or direction with height  
&nbsp;&nbsp;&nbsp;&nbsp;WSR_ID: ID of the data collecting tower/radar  
&nbsp;&nbsp;&nbsp;&nbsp;MXDV: Maximum Delta-Velocity describes intensity of storm  
&nbsp;&nbsp;&nbsp;&nbsp;Cell_ID: ID of the storm  
&nbsp;&nbsp;&nbsp;&nbsp;zTime: Measure of time used in meterology  
&nbsp;&nbsp;&nbsp;&nbsp;Azimuth: Angular direction of storm, in degrees  
&nbsp;&nbsp;&nbsp;&nbsp;Range: Range of storm's path in nautical miles  

- We added the following columns:  
&nbsp;&nbsp;&nbsp;&nbsp;Latitude  
&nbsp;&nbsp;&nbsp;&nbsp;Longitude  
&nbsp;&nbsp;&nbsp;&nbsp;Primary Key combining Cell_ID and date  
&nbsp;&nbsp;&nbsp;&nbsp;Date  
&nbsp;&nbsp;&nbsp;&nbsp;Time  
&nbsp;&nbsp;&nbsp;&nbsp;Year  
&nbsp;&nbsp;&nbsp;&nbsp;Month  


## Visuals:

### Landing page:
![homepage](imgs/homepage.png)

#### Storm Tracking:
On the Cell Tracking page, you can view tornado instances based on date, as well as their movement throughout the day using the slider.

![tracking](imgs/tracking.png)

#### Heat Map:
On the Heat Map page, you'll see all of the data points plotted to show the density of the storms in particular areas.

![heatmap](imgs/heatmap.png)

#### Intensity Plots:
On the Intensity page, you'll discover how Max Shear relates to Date and Range of the storms.

![image](imgs/image.png)

![image2](imgs/image2.png)

