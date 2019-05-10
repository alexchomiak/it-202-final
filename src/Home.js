import React, { Component } from 'react'
import Map from './Map'
import axios from 'axios'
import Button from '@material/react-button';
import {
    Body1,
    Body2,
    Caption,
    Headline1,
    Headline2,
    Headline3,
    Headline4,
    Headline5,
    Headline6,
    Overline,
    Subtitle1,
    Subtitle2,
  } from '@material/react-typography';
export default class Home extends Component {
    state = {
        lat: -1,
        long: -1,
        stations: [],
        loadMap : false
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({lat: position.coords.latitude, long: position.coords.longitude })
        }, () => {
            
        });
        axios.get('https://data.cityofchicago.org/resource/9rg7-mz9y.json').then((res) => {
            let newStations = []

            res.data.forEach(station => {
                console.log(station)
                newStations.push({lat: station.latitude, lng: station.longitude, address: station.address, name: station.district_name})
            });
            console.log(newStations)
            this.setState({stations: newStations})
        })
    }
  render() {
    return (
      <div>
          <Headline4> Alex Chomiak IT202 Final</Headline4>
          {!this.state.loadMap &&
          <Button onClick={() =>{this.setState({loadMap:true})}}>
        Click Me to load a map of Chicago Police Stations
      </Button>
          }
          { this.state.loadMap &&
        <Map stations={this.state.stations} lat={this.state.lat} long={this.state.long}/>
          }
      </div>
    )
  }
}
