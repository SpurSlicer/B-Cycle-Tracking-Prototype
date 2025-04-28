import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import App from '../state/App';
import MapView, { Marker } from 'react-native-maps';
import { isNullish } from '../util/general';

const marker_icons = new Map([
    [0, require('../../assets/images/bcycle_marker_0.png')],
    [1, require('../../assets/images/bcycle_marker_1.png')],
    [2, require('../../assets/images/bcycle_marker_2.png')],
    [4, require('../../assets/images/bcycle_marker_4.png')],
    [5, require('../../assets/images/bcycle_marker_5.png')],
    [9, require('../../assets/images/bcycle_marker_9.png')],
    [10, require('../../assets/images/bcycle_marker_10.png')],
    [11, require('../../assets/images/bcycle_marker_11.png')],
    [15, require('../../assets/images/bcycle_marker_15.png')]
]);

const tray_styles = StyleSheet.create({
    popup_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "65%",
        backgroundColor: "red",
    },
    scrollable_container: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "80%",
        backgroundColor: "green",
        marginTop: 15
    },
    outer_container: {
        width: "100%",
        height: 80,
        marginTop: 10,
        backgroundColor: "blue",
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text_container: {
        display: "flex",
        flexDirection: "column",
        height: 60,
        width: "auto",
        padding: 10,
    },
    image_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        height: 80,
        width: 70,
        paddingTop: 20,
        paddingBottom: 20
    },
    text_line_container: {
        display: "flex",
        flexDirection: "row"
    },
    header: {
        fontSize: 20,
        fontWeight: 900
    },
    normal: {
        fontSize: 12
    },
    normal_bold: {
        fontSize: 12,
        fontWeight: "bold"
    },
    green: {
        fontSize: 12,
        fontWeight: 900,
        color: "green"
    },
    red: {
        fontSize: 12,
        fontWeight: 900,
        color: "red"
    },
    small: {
        fontSize: 8,
        fontWeight: 800,
    }

});

export class BCycle_Station { 
    private name: string;
    private description: string;
    private station_id: number;
    private available_bikes: number;
    private open_docks: number;
    private latitude: number;
    private longitude: number;
    private distance: number = 0.2;
    public static station_list_ref: Map<number, BCycle_Station>;
    public static selected_station: (number | null) = null;
    public get getMarker(): React.JSX.Element {
        return (<Marker
                    key={this.station_id}
                    coordinate={{
                        latitude: this.latitude,
                        longitude: this.longitude
                    }}
                    onPress={ () => {
                            if (BCycle_Station.selected_station == this.station_id) BCycle_Station.selected_station = null;
                            else BCycle_Station.selected_station = this.station_id;
                            console.log(`Station "${this.name}" of id ${this.station_id} was pressed. Click status: ${BCycle_Station.selected_station}`);
                            App.refresh();
                        }
                    }
                    title={this.name}
                    description={this.description}
                    icon={marker_icons.get(this.available_bikes)}
            />);
    };
    private get getAvailableBikeStyle() {
        if (this.available_bikes == 0) return tray_styles.red;
        else return tray_styles.green;
    }
    private get getOpenDocksStyle() {
        if (this.open_docks == 0) return tray_styles.red;
        else return tray_styles.green;
    }
    public get getPopup() {
        return (
            <View key={this.station_id} style={tray_styles.outer_container}>
                <View key={0} style={tray_styles.text_container}>
                    <Text key={0} style={tray_styles.header}>{this.name}</Text>
                    <View key={1} style={tray_styles.text_line_container}>
                        <Text key={0} style={tray_styles.normal}>Available Bikes: </Text>
                        <Text key={1} style={this.getAvailableBikeStyle}>{this.available_bikes}</Text>
                    </View>
                    <View key={2} style={tray_styles.text_line_container}>
                        <Text key={0} style={tray_styles.normal}>Open Docs: </Text>
                        <Text key={1} style={this.getOpenDocksStyle}>{this.open_docks}</Text>
                    </View>
                </View>
                <View key={1} style={tray_styles.image_container}>
                    <Image key={0} source={require('../../assets/images/bcycle_travel_icon.png')} />
                    <Text key={1} style={tray_styles.small}>{`${this.distance} miles`}</Text>
                </View>
            </View>
        )
    }
    private get getPopups() {
        const popups = [];
        for (const [key, value] of BCycle_Station.station_list_ref) {
            if (key == this.station_id) continue;
            else popups.push(value.getPopup);
        }
        return popups;
    }

    public get getPopupMenu() {
        return (
            <View
                style={tray_styles.popup_container}
            >
                <Text style={tray_styles.header}>{this.name}</Text>
                <View style={tray_styles.text_line_container}>
                    <Text style={this.getAvailableBikeStyle}>{`${this.available_bikes} Sufficiently Charged Bikes`}</Text>
                    <Text style={tray_styles.normal}>{` - ${this.open_docks} Open Docks`}</Text>
                </View>
                <Text style={tray_styles.normal}>{`Updated ${Math.floor((Math.random()*12)+1)}:${Math.floor(Math.random()*60)} ${(Math.floor(Math.random()*2) % 2 == 0) ? 'AM' : 'PM'}`}</Text>
                <Text style={tray_styles.header}>Select your destination dock:</Text>
                <ScrollView style={tray_styles.scrollable_container}>
                    {this.getPopups}
                </ScrollView>
            </View>);
    }

    constructor(name: string, available_bikes: number, 
                open_docks: number, station_id: number,
                latitude: number, longitude: number) {
        this.name = name;
        this.station_id = station_id;
        this.available_bikes = available_bikes;
        this.open_docks = open_docks;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = `Station id ${this.station_id}`;
    }
}

export default class BCycle_Map extends Component {
    private get mapHeight() { return Dimensions.get("screen").height - 200 }
    private get mapWidth() { return Dimensions.get("screen").width }

    private get getMapMarkers() {
        const markers = [];
        for (const station of BCycle_Station.station_list_ref.values()) {
            markers.push(station.getMarker);
        }
        return markers;
    }

    private readonly styles = StyleSheet.create({
        map_container: {
            height: "100%",
            width: "100%",
            backgroundColor: "blue",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        map: {
            height: "100%",
        },
        map_with_popup: {
            height: "35%",
        } 

    });

    private get getPopupMenu() {
        console.log(`THING: ${BCycle_Station.selected_station}`)
        if (isNullish(BCycle_Station.selected_station)) return <></>
        else {
            console.log(BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number))
            return BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number)?.getPopupMenu;
        }
    }
    private get getMapStyle() {
        if (isNullish(BCycle_Station.selected_station)) return this.styles.map;
        else return this.styles.map_with_popup;
    }

    render() { 
        return (
            <View style={this.styles.map_container}>
                <MapView 
                    onPress={() => {
                        if (!isNullish(BCycle_Station.selected_station)) {
                            BCycle_Station.selected_station = null;
                            App.refresh();
                        }
                    }}
                    style={this.getMapStyle}
                    initialRegion={{
                        latitude: 40.00421094247513,
                        longitude: -105.26386911357382,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}>
                    {this.getMapMarkers}
                </MapView>
                {this.getPopupMenu}
            </View>
        )
    }
}