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
In this project, we extracted data for Level 3 tornados from the last 2 months from www.ncdc.noaa.gov. After cleaning, we stored the data in MongoDB and used a Python Flask API to power a web application. We created several visualzations using Leaflet that allow you to interact with the dataset.

### Dataset:

Data was pulled using the below API.   
Some notes on the data:  
- Level 3 tornados have wind speeds between 136 and 165 mph (218 and 266 km/h)
- We retained the following columns:    
            Cell_Type: Type of rotation, TVS indicates torndao  
            Shape: Point (lon, lat)  
            Max_Shear: Change in wind speed and/or direction with height  
            WSR_ID: ID of the data collecting tower/radar  
            MXDV: Maximum Delta-Velocity describes intensity of storm  
            Cell_ID: ID of the storm  
            zTime: measure of time used in meterology  
            Azimuth: Angular irection of storm, in degrees  
            Range: Range of storm's path in nautical miles  
- We added the following columns:  
            Latitude  
            Longitude  
            Primary Key combining Cell_ID and date  
            Date  
            Time  
            Year  
            Month  

https://www.ncdc.noaa.gov/swdiws/


![kansas](imgs/kansas.jpg)