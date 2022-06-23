#Importing Dependencies
import pandas as pd
import requests
import datetime 

def pull():

    #Start Dates
    start_date = datetime.date(2010, 1, 1)
    end_date = datetime.date(2020, 12, 1)
    delta = datetime.timedelta(days=25)

    start_list =[]

    while start_date <= end_date:
        start_list.append(start_date)
        start_date += delta

    #End Dates
    start_date = datetime.date(2010, 1, 26)
    end_date = datetime.date(2021, 12, 1)
    delta = datetime.timedelta(days=25)

    end_list =[]

    while start_date <= end_date:
        end_list.append(start_date)
        start_date += delta

    #Converting lists to strings 
    end_str_list = []
    for i in range(0,len(end_list)):
        end_str_list.append(end_list[i].strftime('%Y%m%d'))
        
    start_str_list =[]
    for i in range(0,len(start_list)):
        start_str_list.append(start_list[i].strftime('%Y%m%d'))

    #List of endpoints for API
    complete_endpoints = []
    for i in range(0,len(start_str_list)):
        complete_endpoints.append(f"{start_str_list[i]}:{end_str_list[i]}")


    #Base URL setup
    base_url = "https://www.ncdc.noaa.gov/swdiws/json/nx3tvs/"

    #List of all URLs
    all_urls = []
    for dates in complete_endpoints:
        complete_url = base_url + dates
        all_urls.append(complete_url)


    #List/Variables setup
    cell_type =[]
    shape =[]
    max_shear = []
    wsr_id =[]
    mxdv = []
    cell_id =[]
    ztime = []
    azimuth = []
    range_ = []
    lat = []
    lon = []



    #----BEGIN Loop----
    # Looping through urls and appending data to lists
    for url in all_urls:
        response = requests.get(url).json()
        for i in range(len(response["result"])):
            cell_type.append(response["result"][i]["CELL_TYPE"])
            shape.append(response["result"][i]["SHAPE"])
            max_shear.append(response["result"][i]["MAX_SHEAR"])
            wsr_id.append(response["result"][i]["WSR_ID"])
            mxdv.append(response["result"][i]["MXDV"])
            cell_id.append(response["result"][i]["CELL_ID"])
            ztime.append(response["result"][i]["ZTIME"])
            azimuth.append(response["result"][i]["AZIMUTH"])
            range_.append(response["result"][i]["RANGE"])
            lon.append(response["result"][i]["SHAPE"].split()[1:][0].split('(')[1])
            lat.append(response["result"][i]["SHAPE"].split()[1:][1].split(')')[0])
    #----END Loop----

    #Creating dataframe of all records
    dict = {"Cell_Type": cell_type,
            "Shape": shape,
            "Max_Shear": max_shear,
            "WSR_ID": wsr_id,
            "MXDV": mxdv,
            "Cell_ID": cell_id,
            "zTime": ztime,
            "Azimuth": azimuth,
            "Range": range_,
            "Lat": lat,
            "Lon": lon
        }

    df = pd.DataFrame(dict)

    df['Date']=pd.to_datetime(df['zTime']).dt.date
    df['Time']=pd.to_datetime(df['zTime']).dt.time
    df['Year']=pd.to_datetime(df['zTime']).dt.year
    df['Month']=pd.to_datetime(df['zTime']).dt.month


    df['PKID']=df['Cell_ID']+df['Year'].astype(str)+df['Month'].astype(str)

    #convert df back to dictionary for app.py
    tornado_dict = df.to_dict()

    return dict