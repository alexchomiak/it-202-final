import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function distance(lat, lng, lat0, lng0){
let deglen = 110.25
let x = lat - lat0
let y = (lng - lng0)*Math.cos(lat0)
return deglen*Math.sqrt(x*x + y*y)
}

export class MapContainer extends Component {
    constructor(props) {
        super(props)
       
    }
    state = {
        selectedPlace: 'Hello',
        lat: -1,
        long: -1,
  
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
   
    }


    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
          });
        }
      
    onClose = props => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
        }
    };
    
  render() {
      if(this.props.lat === -1 || this.props.long === -1) return (
          <p> Getting current location...</p>
      )
    return (
        <div className="map">
        
      <Map google={this.props.google} zoom={14}
      
      initialCenter={{
        lat: this.props.lat,
        lng: this.props.long
      }}
      style = {{
        width: '100%',
        height: '82%'
      }}
      >
         {this.props.stations.map((station,index) => {
             let dist = distance(this.props.lat,this.props.long,station.lat,station.lng)
             dist = dist.toFixed(2)
            return (
            <Marker onClick={this.onMarkerClick} name={"Chicago Police Station"}key = {index} position={{lat: station.lat, lng: station.lng}} address={station.address} distance={dist}/>
            )
        })}
        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                
                />

        <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
              <p>{this.state.selectedPlace.address}</p>
              <p>Distance from you: {this.state.selectedPlace.distance} km</p>
            </div>
        </InfoWindow>

       
      </Map>
    
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAfEJrEHo2NUcoajXDz6yNj9xOVWRKRlhI')
})(MapContainer)