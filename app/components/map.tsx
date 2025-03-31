import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import App from '../state/App';
import MapView from 'react-native-maps';

/**
 * Map module docs: https://www.npmjs.com/package/react-native-maps
 */

export default class MapScreen extends Component {
    constructor(props: {}) { super(props) }
    private readonly styles = StyleSheet.create({
        container: {
            flex: 1
        },
        map: {
            width: "100%",
            height: "95%"
        }
    });

    test() {
        App.setState((App.getState + 1) % 2);
        App.refresh();
    }
    render() { 
        return (
            <View style={this.styles.container}>                
                <Button
                    onPress={() => this.test()}
                    title='Test maps'
                    color="red"
                />
                <MapView style={this.styles.map} />
            </View>
        )
    }
}