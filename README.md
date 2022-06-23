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
In this project, we extracted data for Level 3 tornadoes from the last 2 months from www.ncdc.noaa.gov. After cleaning, we stored the data in MongoDB and used a Python Flask API to power a web application. We created several visualizations using Leaflet that allow you to interact with the dataset.

### Dataset:

Data was pulled using the below API. 

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

![kansas](imgs/kansas.jpg)