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
        return (
            <View style={this.styles.container}>                
                <View style={this.styles.header}>                
                    <Image style={this.styles.header_image} source={require('../../assets/images/bcycle_logo.png')} />
                </View>
                <BCycle_Map />
                <Image style={this.styles.navbar_image} source={require('../../assets/images/bcycle_navbar.png')} />
            </View>
        )
    }
}