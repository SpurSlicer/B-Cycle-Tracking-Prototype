import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Image } from 'react-native';
import App from '../state/App';
import MapView, { Marker } from 'react-native-maps';
import BCycle_Map from './map_element';

/**
 * Map module docs: https://www.npmjs.com/package/react-native-maps
 */

export default class MapScreen extends Component {
    constructor(props: {}) { super(props) }
    private get screenHeight() { return Dimensions.get("screen").height }
    private get screenWidth() { return Dimensions.get("screen").width }
    private readonly styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
        },
        header: {
            height: 50,
            backgroundColor: "white"
        },
        header_image: {
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
        },
        map_container: {
            height: this.screenHeight - 200,
            backgroundColor: "red"
        },
        navbar_container: {
            height: 75,
            backgroundColor: "white"
        },
        navbar_image: {
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
        }
    });

    test() {
        App.setState((App.getState + 1) % 2);
        App.refresh();
    }
    render() { 
        return (
            <View style={this.styles.container}>                
                <View style={this.styles.header}>                
                    <Image style={this.styles.header_image} source={require('../../assets/images/bcycle_logo.png')} />
                </View>
                <View style={this.styles.map_container}>
                    <BCycle_Map />
                </View>
                <View style={this.styles.navbar_container}>
                    <Image style={this.styles.navbar_image} source={require('../../assets/images/bcycle_navbar.png')} />
                </View>
            </View>
        )
    }
}