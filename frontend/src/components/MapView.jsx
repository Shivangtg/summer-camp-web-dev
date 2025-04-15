import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

import { useMapEvents } from "react-leaflet"

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      console.log(e)
      const { lat, lng } = e.latlng
      onClick([lat, lng])
    },
  })

  return null // this component doesn't render anything
}

function ZoomHandler({}){
  useMapEvents(
    {
      zoom
    }
  )

  return null
}

const MapView = (props) => {
  return (
    <>
    <MapContainer
    center={props.center || [51.505, -0.09]}
    zoom={13} 
    style={{ height: "100vh", width: "100vw" }}
    maxBounds={[[26.520960, 80.220346], [26.500954, 80.247109]]}
    maxBoundsViscosity={1.0}   
    worldCopyJump={false}  
    minZoom={3}         // 👈 this is the max zoom-out level
    maxZoom={18}        // 👈 this is the max zoom-in level 
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}

      />

        {props.changeMarker?<ClickHandler onClick={(coords) => props.setCenter(coords)} />:null}

      <Marker position={props.center || [51.505, -0.09]}>
        <Popup>
          latitude:{props.center[0]}
          <br/>
          longitude:{props.center[1]}
        </Popup>
      </Marker>
      
    </MapContainer>
    </>
  );
};

export default MapView