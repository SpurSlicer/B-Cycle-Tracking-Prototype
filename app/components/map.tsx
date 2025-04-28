import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Image } from 'react-native';
import App from '../state/App';
import MapView, { Marker } from 'react-native-maps';

/**
 * Map module docs: https://www.npmjs.com/package/react-native-maps
 */

export default class MapScreen extends Component {
    constructor(props: {}) { super(props) }
    private get screenHeight() { return Dimensions.get("screen").height - 75 }
    private get screenWidth() { return Dimensions.get("screen").width }
    private readonly styles = StyleSheet.create({
        container: {
            flex: 1
        },
        header: {
            flex: 1,
            maxHeight: 50,
            backgroundColor: "white"
        },
        map: {
            width: "100%",
            height: this.screenHeight - 125
        },
        header_image: {
            flex: 1,
            width: null,
            height: null,
            maxHeight: 50,
            resizeMode: 'contain'
        },
        navbar_image: {
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
        },
        image: {
            flex: 1,
            width: null,
            height: null,
            maxHeight: 50,
            resizeMode: 'contain'
        }

    });

    test() {
        App.setState((App.getState + 1) % 2);
        App.refresh();
    }
    render() { 
        console.log(fetch('https://portal.bcycle.com/1/subscriptiontypes'))
        return (
            <View style={this.styles.container}>                
                <View style={this.styles.header}>                
                    <Image style={this.styles.header_image} source={require('../../assets/our_images/logo.png')} />
                </View>
                <MapView style={this.styles.map} 
                    initialRegion={{
                        latitude: 40.00421094247513,
                        longitude: -105.26386911357382,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                ><Marker
                    coordinate={{
                        latitude: 40.00421094247513,
                        longitude: -105.26386911357382
                    }}
                    title="Station 1"
                    description="Initial test place"
                    icon={require('../../assets/our_images/bcycle_marker_1.png')}
                    /></MapView>
                <Image style={this.styles.navbar_image} source={require('../../assets/our_images/navbar.png')} />
            </View>
        )
    }
}