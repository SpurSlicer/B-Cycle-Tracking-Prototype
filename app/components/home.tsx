import React, { Component } from 'react';
import { Text, View, Button } from "react-native";
import App from '../state/App';

/**
 * Open Map docs: https://www.npmjs.com/package/react-native-open-maps
 * 
 */

export default class HomeScreen extends Component {
    constructor(props: {}) { super(props) }

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
                style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                }}
            >
            <Button
                color={'red'}
                onPress={() => this.test()}
                title='Test maps'
            />
            <Text>Testing testing 123</Text>
            </View>  
            )
    }
}