import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Image } from 'react-native';
import App from '../state/App';
import MapView, { Marker } from 'react-native-maps';

const marker_icons = new Map([
    [0, require('../../assets/images/bcycle_marker_0.png')],
    [1, require('../../assets/images/bcycle_marker_1.png')],
    [4, require('../../assets/images/bcycle_marker_4.png')],
    [5, require('../../assets/images/bcycle_marker_5.png')],
    [9, require('../../assets/images/bcycle_marker_9.png')],
    [11, require('../../assets/images/bcycle_marker_11.png')]
])


class BCycle_Marker {
    private readonly latitude: number;
    private readonly longitude: number;
    private readonly image_src: any;
    private readonly title: string;
    private readonly description: string;

    constructor(latitude: number, longitude: number, image_src: number, title: string, description: string, callback?: () => void) {
        this.latitude = latitude;
        this.longitude = longitude;
        // const new_image_src = `../../assets/images/${image_src}`;
        this.image_src = marker_icons.get(image_src);
        this.title = title;
        this.description = description;
    }

    render() {
        return (
            <Marker
                key={this.latitude + this.longitude}
                coordinate={{
                    latitude: this.latitude,
                    longitude: this.longitude
                }}
                onPress={ () => {console.log("hi") }}
                title={this.title}
                description={this.description}
                icon={this.image_src}
            />
        )
    }
}

export default class BCycle_Map extends Component {
    constructor(props: {}) { super(props) }
    private get mapHeight() { return Dimensions.get("screen").height - 200 }
    private get mapWidth() { return Dimensions.get("screen").width }
    private markers = [
        new BCycle_Marker(40.00421094247513, -105.26386911357382,
                          4, 'Station 1', 'test station'),
        new BCycle_Marker(40.00826659088459, -105.26399383635585,
                          0, 'Station 2', 'test station'),
        new BCycle_Marker(40.00824186410088, -105.2690783169515,
                          1, 'Station 3', 'test station'),
        new BCycle_Marker(40.00673484899261, -105.2725510507568,
                          11, 'Station 4', 'test station'),
        new BCycle_Marker(40.00054039374443, -105.26231515995303,
                          9, 'Station 5', 'test station')
  
    ];
    private get getMapMarkers() {
        const markers = [];
        for (const marker of this.markers) {
            markers.push(marker.render());
        }
        return markers;
    }

    private readonly styles = StyleSheet.create({
        map: {
            width: this.mapWidth,
            height: this.mapHeight
        },
    });

    render() { 
        return (
                <MapView style={this.styles.map} 
                    initialRegion={{
                        latitude: 40.00421094247513,
                        longitude: -105.26386911357382,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}>
                    {this.getMapMarkers}
                </MapView>
        )
    }
}