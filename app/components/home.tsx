import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import App from '../state/App';

/**
 * Open Map docs: https://www.npmjs.com/package/react-native-open-maps
 * 
 */

export default class HomeScreen extends Component {
    constructor(props: {}) { super(props) }
    private readonly styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            width: 300,
            height: 75,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
        }
    });
    /**
     * This just switches the state and refreshes the app.
     */
    test() {
        App.setState((App.getState + 1) % 2);
        App.refresh();
    }

    render() { 
        return (
            <View
                style={this.styles.container}
            >
            <TouchableOpacity
                style={this.styles.button}
                onPress={() => this.test()}
                title='Begin Demo'
            ><Text>Test</Text></TouchableOpacity>
            </View>  
            )
    }
}