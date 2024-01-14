---
layout: default
title: "About Drafty"
class: page--about
---
# About Drafty

## What is Drafty?
Drafty attempts to answer the question: "Just how drafty is it in that drafty room of the house?" A Raspberry Pi is installed in a poorly insulated enclosed porch and periodically takes readings of the ambient temperature, humidity, and light levels. For comparison with outdoor conditions, local weather data is retrieved from the National Weather Service.

## About this site
This site is built with [Jekyll](https://jekyllrb.com/). The homepage provides the most recently collected data, while the history page provides a running log of all data collected so far.

## About the data
### Indoor data collection
Indoor data is collected using the following hardware:
- [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
- [Adafruit AHT20 Temperature & Humidity Sensor](https://learn.adafruit.com/adafruit-aht20)
- [Adafruit APDS-9960 Light, Color, Proximity, and Gesture Sensor](https://learn.adafruit.com/adafruit-apds9960-breakout)

and the following software:
- [Adafruit AHTx0 CircuitPython Driver](https://docs.circuitpython.org/projects/ahtx0/en/latest/)
- [Adafruit APDS-9960 CircuitPython Driver](https://docs.circuitpython.org/projects/apds9960/en/latest/)
- [Adafruit Blinka](https://pypi.org/project/Adafruit-Blinka/) (provides support for the drivers by emulating CircuitPython API on machines that run CPython or MicroPython)

### Local weather 
Local weather data is retrieved from the [National Weather Service's API Web Service](https://www.weather.gov/documentation/services-web-api).

### Data format and contents
Data is stored in two CSV files:
- `most-recent.csv` contains the most recently collected data in comma-separated format.
- `all.csv` contains a running log of all data in comma-separated format. Each row represents a separate reading and has an associated timestamp.

The following data is available, both in `most-recent.csv` and in `all.csv`:

| Property | Name in CSV header | Notes |
|-- |-- |-- |
| Time | time | Date and time at which the corresponding data was collected, reported as an ISO-style datetime string |
| Air temperature, &deg;C | temp_c | The AHT20 reports temperature in degrees Celsius | 
| Air temperature, &deg;F | temp_f  | For convenience, the Celsius reading is converted to Fahrenheit |
| Humidity | humidity | The AHT20 reports relative humidity as a % |
| Ambient light | lux | Lux value is calculated (using adafruit_apds9960.colorutility) based on red/green/blue light levels reported by the APDS-9960 |
| Color temperature, &deg;K | color_temp | The color temperature of the ambient light is reported in degrees Kelvin (similar to what you might find in the specs for a household lightbulb). Like lux, color temperature is calculated based on the red/green/blue values reported by the APDS-9960. |
| Red light | red | Red light value reported by the APDS-9960 |
| Green light | green | Green light value reported by the APDS-9960 |
| Blue light | blue | Blue light value reported by the APDS-9960 |
| Clear light | clear | Clear light value reported by the APDS-9960 |
| Outdoor temperature, &deg;C | nws_temp_c | Local temperature as reported (in Celsius) by the nearest NWS station |
| Outdoor temperature, &deg;F | nws_temp_f | For convenience, the local temperature is converted to Fahrenheit |
| Outdoor humidity | nws_humidity | Relative humidity (%) as reported by the nearest NWS station |
| Local weather conditions | nws_conditions | Summary of current weather conditions as reported by the nearest NWS station |

## Limitations
The ideal site for collecting temperature, humidity, and light data does not include access to an electrical outlet. Therefore, Drafty runs on battery power and must periodically be taken offline for recharging. 
