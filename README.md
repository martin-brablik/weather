# Weather Forecast

A simple web application forecasting weather for five days ahead.

## Installation

Install the dependencies

```bash
npm i
```

Build the project (you can find the compiled files in `/dist` directory)

```bash
npm run build
```

Serve the project

```bash
npm run start
```

The built project will be available at: `http://localhost:5500`

## Application Structure

The application is made using typescript and compiled using the webapck bundler.  

It consits of the following parts:

### Forecast Component
The main component responsible for reading the input data and proving it to the other components

### Table Component

A generic component for displaying data in a table. The data it displays is provided by the forecast module. A change in the input data is automatically reflected in the table.

### Whisperer Component

A simple input component with a submit button capable of making suggestions for the user input. The suggestions are provided by the forecast component. When a new input value is submitted an event is emitted for the forecast component so it can update the data for the table component based on the submitted value

## Models representing the data

- City
- Coord
- Forecast
- TableColumn
- Temperature
- WeatherDataFormatted
- WeatherData
- Weather