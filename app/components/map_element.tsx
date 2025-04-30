import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import App from '../state/App';
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import { isNullish } from '../util/general';
import { BikeState, PopupState } from '../types/app_types';

const bcycle_blue = '#04a2eb';
const bcycle_gray = '#d9d9d9';
const bcycle_dark_Gray = '#b6b6b6';

const marker_icons = new Map([
    [0, require('../../assets/images/bcycle_marker_0.png')],
    [1, require('../../assets/images/bcycle_marker_1.png')],
    [2, require('../../assets/images/bcycle_marker_2.png')],
    [3, require('../../assets/images/bcycle_marker_3.png')],
    [4, require('../../assets/images/bcycle_marker_4.png')],
    [5, require('../../assets/images/bcycle_marker_5.png')],
    [6, require('../../assets/images/bcycle_marker_6.png')],
    [7, require('../../assets/images/bcycle_marker_7.png')],
    [8, require('../../assets/images/bcycle_marker_8.png')],
    [9, require('../../assets/images/bcycle_marker_9.png')],
    [10, require('../../assets/images/bcycle_marker_10.png')],
    [11, require('../../assets/images/bcycle_marker_11.png')],
    [12, require('../../assets/images/bcycle_marker_12.png')],
    [13, require('../../assets/images/bcycle_marker_13.png')],
    [14, require('../../assets/images/bcycle_marker_14.png')],
    [15, require('../../assets/images/bcycle_marker_15.png')],
    [16, require('../../assets/images/bcycle_marker_16.png')],
    [17, require('../../assets/images/bcycle_marker_17.png')],
    [18, require('../../assets/images/bcycle_marker_18.png')],
    [19, require('../../assets/images/bcycle_marker_19.png')],
    [20, require('../../assets/images/bcycle_marker_20.png')],
    [21, require('../../assets/images/bcycle_marker_21.png')],
    [22, require('../../assets/images/bcycle_marker_22.png')]
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
        backgroundColor: "white",
    },
    popup_container_big: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "75%",
        backgroundColor: "white",
    },
    popup_container_small: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "55%",
        backgroundColor: "white",
    },
    div: {
        height: 20
    },
    scrollable_container_col: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "80%",
        backgroundColor: "white"
    },
    scrollable_container_col_w_margin: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "80%",
        backgroundColor: "white",
        marginTop: 7
    },
    scrollable_container_row: {
        display: "flex",
        flexDirection: "row",
        width: "80%",
        backgroundColor: "white",
        marginTop: 15
    },
    outer_container: {
        width: "100%",
        height: 90,
        marginTop: 10,
        backgroundColor: bcycle_gray,
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text_container: {
        display: "flex",
        flexDirection: "column",
        height: "auto",
        width: "auto",
        padding: 10
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
        flexDirection: "row",
        alignContent: "center"
    },
    header: {
        fontSize: 25,
        fontWeight: 900,
        margin: 10
    },
    header_no_margin: {
        fontSize: 25,
        fontWeight: 900,
        marginTop: 20
    },
    subheader: {
        fontSize: 20,
        fontWeight: 900,
        margin: 7
    },
    subheader_no_margin: {
        fontSize: 20,
        fontWeight: 900
    },
    normal: {
        fontSize: 15
    },
    normal_bold: {
        fontSize: 15,
        fontWeight: "bold"
    },
    normal_bold_white: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'white'
    },
    green: {
        fontSize: 15,
        fontWeight: 900,
        color: "green"
    },
    yellow: {
        fontSize: 15,
        fontWeight: 900,
        color: "#e3d12e"
    },
    red: {
        fontSize: 15,
        fontWeight: 900,
        color: "red"
    },
    small: {
        fontSize: 12,
        fontWeight: 800,
    },
    image_list: {
        width: "40%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    bike_list_container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        marginLeft: "20%",
        marginRight: "20%",
        marginBottom: 20
    },
    bike_image_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        margin: 7,
    },
    horizontal_spacer: {
        backgroundColor: bcycle_dark_Gray,
        borderRadius: 20,
        width: "100%",
        height: 12
    },
    vertical_spacer: {
        width: 30,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: "black",
        borderRadius: 20,
        height: "100%"
    },
    bike_arrival_container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: bcycle_blue,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "15%"
    },
    estimated_ride_time_container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: bcycle_blue,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "15%"
    },    
    estimated_ride_time_button: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: bcycle_blue,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "10%"
    },
    estimated_ride_time_text: {
        fontSize: 20,
        fontWeight: 900,
        color: "White"
    },
    checkout_button: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: bcycle_blue,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: "80%",
        height: 70,
        marginTop: 20,
        marginBottom: 20
    },
    checkout_text: {
        fontSize: 25,
        fontWeight: 900,
        color: "white"
    },
    cancel_button: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: bcycle_gray,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: "80%",
        height: 70
    },
    cancel_text: {
        fontSize: 25,
        fontWeight: 900,
        color: "black"
    },
    small_image: {
        width: 25,
        height: 25,
        resizeMode: "stretch"
    }
});

class BCycle_Bike {
    public charge: number;
    public bike_state: BikeState;
    public readonly bike_number: number;
    constructor(bike_number: number, bike_state: BikeState) {
        this.charge = Math.floor(Math.random() * 101);
        this.bike_number = bike_number;
        this.bike_state = bike_state;
    }
}

export class BCycle_Station { 
    private name: string;
    private description: string;
    private station_id: number;
    public getNumAvailableBikes(charge?: number) {
        let num_available_bikes = 0;
        if (isNullish(charge)) {
            for (const [key, value] of this.bikes) {
                if (value.bike_state == BikeState.DOCKED) num_available_bikes++;
            }    
        } else {
            for (const [key, value] of this.bikes) {
                if (value.bike_state == BikeState.DOCKED && value.charge >= (charge as number)) num_available_bikes++;
            }    
        }
        return num_available_bikes;
    };
    public get getNumOpenDocks() {
        let num_open_docks = 0;
        for (const [key, value] of this.bikes) {
            if (value.bike_state == BikeState.ABSENT) num_open_docks++;
        }
        return num_open_docks;
    };    
    private latitude: number;
    private longitude: number;
    private distance: number =  Number((Math.random() * 2).toFixed(1));
    private bikes: Map<number, BCycle_Bike>
    public undockAllBikes() {
        for (const [key, value] of this.bikes) {
            value.bike_state = BikeState.ABSENT;
        }
    }
    private estimated_ride_time: number = 0;
    public get getCoords() { return { latitude: this.latitude, longitude: this.longitude }; };
    public static station_list_ref: Map<number, BCycle_Station>;
    public static selected_station: (number | null) = null;
    public static destination_station: (number | null) = null;    
    public static unlocked_bike: (number | null) = null;
    public static popup_state: (PopupState) = PopupState.CHOOSE_MARKER;
    public get getMarker(): React.JSX.Element {
        const num_available_bikes = this.getNumAvailableBikes();
        console.log(`BIKE STUFF: ${this.latitude},  ${this.longitude}`);
        return (<Marker
                    key={this.station_id}
                    coordinate={{
                        latitude: this.latitude,
                        longitude: this.longitude
                    }}
                    onPress={ () => {
                            BCycle_Station.destination_station = null;
                            if (BCycle_Station.selected_station == this.station_id) {
                                BCycle_Station.popup_state = PopupState.CHOOSE_MARKER;
                                BCycle_Station.selected_station = null;
                                BCycle_Station.unlocked_bike = null;
                            } else {
                                BCycle_Station.popup_state = PopupState.CHOOSE_STATION;
                                BCycle_Station.selected_station = this.station_id;
                            }
                            console.log(`Station "${this.name}" of id ${this.station_id} was pressed. Click status: ${BCycle_Station.selected_station}`);
                            App.refresh();
                        }
                    }
                    title={this.name}
                    description={this.description}
                    icon={marker_icons.get(num_available_bikes)}
            />);
    };
    private getAvailableBikeStyle(charge?: number) {
        if (this.getNumAvailableBikes(charge) == 0) return tray_styles.red;
        else return tray_styles.green;
    }
    private get getOpenDocksStyle() {
        if (this.getNumOpenDocks == 0) return tray_styles.red;
        else return tray_styles.green;
    }
    public get getPopup() {
        return (
            <TouchableOpacity 
                key={this.station_id} 
                style={tray_styles.outer_container}
                onPress={() => {
                    console.log(`Station named ${this.name} of id ${this.station_id} was pressed`);
                    BCycle_Station.popup_state = PopupState.CHOOSE_BIKE;
                    BCycle_Station.destination_station = this.station_id;
                    App.refresh();
            }}>
                <View key={0} style={tray_styles.text_container}>
                    <Text key={0} style={tray_styles.subheader_no_margin}>{this.name}</Text>
                    <View key={1} style={tray_styles.text_line_container}>
                        <Text key={0} style={tray_styles.normal}>Available Bikes: </Text>
                        <Text key={1} style={this.getAvailableBikeStyle()}>{this.getNumAvailableBikes()}</Text>
                    </View>
                    <View key={2} style={tray_styles.text_line_container}>
                        <Text key={0} style={tray_styles.normal}>Open Docs: </Text>
                        <Text key={1} style={this.getOpenDocksStyle}>{this.getNumOpenDocks}</Text>
                    </View>
                </View>
                <View key={1} style={tray_styles.image_container}>
                    <Image key={0} source={require('../../assets/images/bcycle_travel_icon.png')} />
                    <Text key={1} style={tray_styles.small}>{`${this.distance} miles`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    private get getPopups() {
        const popups = [];
        for (const [key, value] of BCycle_Station.station_list_ref) {
            if (key == this.station_id) continue;
            else popups.push(value.getPopup);
        }
        popups.push(<View key={`div`} style={tray_styles.div}></View>)
        return popups;
    }

    private getSpacer(key: number) {
        return (<View 
            key={`s_${key}`}
            style={tray_styles.horizontal_spacer}
        />)
    }

    public get getPopupMenu() {
        return (
            <View
                style={tray_styles.popup_container}
            >
                <Text key={0} style={tray_styles.header}>{this.name}</Text>
                <View key={1} style={tray_styles.text_line_container}>
                    <Text key={0} style={this.getAvailableBikeStyle(50)}>{`${this.getNumAvailableBikes(50)} Sufficiently Charged Bikes`}</Text>
                    <Text key={1} style={tray_styles.normal}>{` - ${this.getNumOpenDocks} Open Docks`}</Text>
                </View>
                <Text key={2} style={tray_styles.small}>{`Updated ${Math.floor((Math.random()*12)+1)}:${Math.floor(Math.random()*50)+10} ${(Math.floor(Math.random()*2) % 2 == 0) ? 'AM' : 'PM'}`}</Text>
                <Text key={3} style={tray_styles.subheader}>Select your destination dock:</Text>
                <ScrollView key={4} style={tray_styles.scrollable_container_col}>
                    {this.getPopups}
                </ScrollView>
            </View>);
    }

    private getDockImage(bike_number: number) {
        if ((this.bikes.get(bike_number) as BCycle_Bike).bike_state as any == BikeState.ABSENT)
            return require('../../assets/images/bcycle_absent.png');
        else {
            if (this.bikes.get(bike_number)?.charge as number >= 50)
                return require('../../assets/images/bcycle_charged.png');
            else if (this.bikes.get(bike_number)?.charge as number >= 25)
                return require('../../assets/images/bcycle_partial_charged.png');
            else 
                return require('../../assets/images/bcycle_low_charged.png');
        }
}


    public getBikeSelectionPopup(bike_number: number) {
        const image = this.getDockImage(bike_number);
        return (
            <TouchableOpacity 
                key={bike_number} 
                style={tray_styles.bike_image_container}
                onPress={() => {
                    if (this.bikes.get(bike_number)?.bike_state == BikeState.ABSENT) return;
                    console.log(`Bike ${bike_number} was pressed`);
                    BCycle_Station.popup_state = PopupState.CHECKOUT;
                    BCycle_Station.unlocked_bike = bike_number;
                    App.refresh();
            }}>
                <Image key={0} source={image} />
            </TouchableOpacity>
        )
    }

    private get getBikeSelectionPopups() {
        const popups_even = [this.getSpacer(0)];
        const popups_odd = [this.getSpacer(0)];
        for (let i = 1; i <= this.bikes.size; i++) {
            if (i % 2 == 1) {
                popups_odd.push(this.getBikeSelectionPopup(i));
                if (i < (this.bikes.size - 1)) {
                    popups_odd.push(this.getSpacer(i))
                }    
            } else {
                popups_even.push(this.getBikeSelectionPopup(i));
                if (i < (this.bikes.size - 1)) {
                    popups_even.push(this.getSpacer(i))
                }  
            }
        }
        popups_odd.push(this.getSpacer(this.bikes.size + 1))
        popups_even.push(this.getSpacer(this.bikes.size + 1))
        return [popups_odd, popups_even];
    }

    public get getBikesInProgress() {
        const bikes_on_the_way = Math.floor(Math.random() * (this.getNumOpenDocks + 1));
        const nearest_arrival_time = (bikes_on_the_way == 0) ? '∞' : Math.floor((Math.random() * 6) + 1);
        return (<View style={tray_styles.bike_arrival_container}>
            <View key={0} style={tray_styles.text_line_container}>
                <Text key={0} style={tray_styles.normal_bold}>{`BIKES ON THE WAY: `}</Text>
                <Text key={1} style={tray_styles.normal_bold_white}>{bikes_on_the_way}</Text>
            </View>
            <View key={1} style={tray_styles.text_line_container}>
                <Text key={0} style={tray_styles.normal_bold}>{`NEAREST ARRIVAL: `}</Text>
                <Text key={1} style={tray_styles.normal_bold_white}>{`${nearest_arrival_time} min`}</Text>
            </View>
        </View>);
    }

    public get getBikeSelectionPopupMenu() {
        const [popups_odd, popups_even] = this.getBikeSelectionPopups;
        const bikes_list = (<ScrollView style={tray_styles.scrollable_container_col_w_margin}>
                <View style={tray_styles.bike_list_container}>
                    <View key={0} style={tray_styles.image_list}>
                        {popups_odd}
                    </View>
                    <View key={1} style={tray_styles.vertical_spacer} />
                    <View key={2} style={tray_styles.image_list}>
                        {popups_even}
                    </View>
                </View>
            </ScrollView>)
        return (
            <View
                style={tray_styles.popup_container_big}
            >   
                {this.getBikesInProgress}
                <Text key={`t_${0}`} style={tray_styles.header}>{this.name}</Text>
                <View style={tray_styles.text_line_container}>
                    <Text key={0} style={this.getAvailableBikeStyle(50)}>{`${this.getNumAvailableBikes(50)} Sufficiently Charged Bikes`}</Text>
                    <Text key={1} style={tray_styles.normal}>{` - ${this.getNumOpenDocks} Open Docks`}</Text>
                </View>
                <Text key={`t_${1}`} style={tray_styles.small}>{`Updated ${Math.floor((Math.random()*12)+1)}:${Math.floor(Math.random()*60)} ${(Math.floor(Math.random()*2) % 2 == 0) ? 'AM' : 'PM'}`}</Text>
                <Text key={`t_${2}`} style={tray_styles.subheader}>Tap dock number to start checkout</Text>
                {bikes_list}
            </View>);
    }

    private getBatteryStyle(charge: number) {
        if (charge >= 50) return tray_styles.green;
        else if (charge >= 25) return tray_styles.yellow;
        else return tray_styles.red;
    }

    public get getCheckoutPopup() {
        this.estimated_ride_time = Math.floor((Math.random() * 10) + 1);
        const charge: number = this.bikes.get(BCycle_Station.unlocked_bike as number)?.charge as number;
        return (<View style={tray_styles.popup_container_small}>
            <View key={0} style={tray_styles.estimated_ride_time_container}>
                <Text style={tray_styles.estimated_ride_time_text}>
                {`Estimated Ride Time: ${this.estimated_ride_time} min`}
                </Text>
            </View>
            <Text key={1} style={tray_styles.header}>{this.name}</Text>
            <View key={2} style={tray_styles.text_line_container}>
                <Text key={0} style={tray_styles.normal}>{`Unlocking bike `}</Text>
                <Image style={tray_styles.small_image} key={1} source={this.getDockImage(BCycle_Station.unlocked_bike as number)} />
                <Text key={2} style={tray_styles.normal}>{` of battery `}</Text>
                <Text key={3} style={this.getBatteryStyle(charge)}>{`${charge}%`}</Text>
            </View>
            <View key={3} style={tray_styles.text_line_container}>
                <Text key={0} style={tray_styles.normal}>{`Destination Dock: `}</Text>
                <Text key={1} style={tray_styles.normal_bold}>{BCycle_Station.station_list_ref.get(BCycle_Station.destination_station as number)?.name}</Text>
            </View>
            <TouchableOpacity key={4} style={tray_styles.checkout_button}
                onPress={() => {
                    BCycle_Station.popup_state = PopupState.CYCLING;
                    (this.bikes.get(BCycle_Station.unlocked_bike as number) as BCycle_Bike).bike_state = BikeState.ABSENT;
                    App.refresh();
                }}>
                <Text style={tray_styles.checkout_text}>Unlock Bike</Text>
            </TouchableOpacity>
            <TouchableOpacity key={5} style={tray_styles.cancel_button}
                onPress={ () => {
                    BCycle_Station.selected_station = null;
                    BCycle_Station.destination_station = null;
                    BCycle_Station.unlocked_bike = null;
                    BCycle_Station.popup_state = PopupState.CHOOSE_MARKER;
                    App.refresh();
                }
            }>
                <Text style={tray_styles.cancel_text}>Cancel</Text>
            </TouchableOpacity>
        </View>)
    }

    public get getCyclingPopup() {
        return (
            <TouchableOpacity
                style={tray_styles.estimated_ride_time_button}
                onPress={ () => {
                    BCycle_Station.selected_station = null;
                    BCycle_Station.destination_station = null;
                    BCycle_Station.unlocked_bike = null;
                    this.estimated_ride_time = 0;
                    BCycle_Station.popup_state = PopupState.CHOOSE_MARKER;
                    App.refresh();
                }
            }>
                <Text style={tray_styles.estimated_ride_time_text}>
                    {`Estimated Ride Time: ${this.estimated_ride_time} min`}
                </Text>
            </TouchableOpacity>
        )
    }

    constructor(name: string, station_id: number,
            latitude: number, longitude: number) {
        this.name = name;
        this.station_id = station_id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = `Station id ${this.station_id}`;
        this.bikes = new Map();
        const rand_bike_count = Math.floor((Math.random() * 6) + 14);
        console.log(`---------- Bike station ${this.name} of id ${this.station_id} ----------`);
        for (let i = 1; i <= rand_bike_count; i++) {
            const new_bike = new BCycle_Bike(i, (Math.floor(Math.random() * BCycle_Bike.length)));
            this.bikes.set(i, new_bike);
            console.log(`SET BIKE ${new_bike.bike_number} with charge ${new_bike.charge} in state ${BikeState[new_bike.bike_state]}`);
        }
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

    private get getPolyLine() {
        if (BCycle_Station.popup_state < PopupState.CHECKOUT) return <></>;
        else {
            return <Polyline 
                coordinates={[
                    BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number)?.getCoords as LatLng,
                    BCycle_Station.station_list_ref.get(BCycle_Station.destination_station as number)?.getCoords as LatLng,
                ]}
                strokeColor={bcycle_blue}
                strokeWidth={3}
            />
        }
    }

    private readonly styles = StyleSheet.create({
        map_container: {
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        map: {
            height: "100%",
        },
        map_with_popup: {
            height: "35%",
        },
        map_with_bike_select_popup: {
            height: "25%",
        },
        map_with_checkout_popup: {
            height: "45%",
        },
        map_with_cycling_popup: {
            height: "90%",
        } 
    });

    private get getPopupMenu() {
        console.log(`STATE: ${BCycle_Station.popup_state}`);
        switch (BCycle_Station.popup_state) {
            case PopupState.CHOOSE_MARKER:
                return <></>;
            case PopupState.CHOOSE_STATION:
                return BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number)?.getPopupMenu;
            case PopupState.CHOOSE_BIKE:
                return BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number)?.getBikeSelectionPopupMenu;
            case PopupState.CHECKOUT:
                return BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number)?.getCheckoutPopup;
            case PopupState.CYCLING:
                return BCycle_Station.station_list_ref.get(BCycle_Station.selected_station as number)?.getCyclingPopup;
            default:
                throw new Error(`Weird state found "getPopupMenu": ${BCycle_Station.popup_state}`);
        }
    }
    private get getMapStyle() {
        console.log(`At state ${BCycle_Station.popup_state}`)
        switch (BCycle_Station.popup_state) {
            case PopupState.CHOOSE_MARKER:
                return this.styles.map;
            case PopupState.CHOOSE_STATION:
                return this.styles.map_with_popup;
            case PopupState.CHOOSE_BIKE:
                return this.styles.map_with_bike_select_popup;
            case PopupState.CHECKOUT:
                return this.styles.map_with_checkout_popup;   
            case PopupState.CYCLING:
                return this.styles.map_with_cycling_popup;         
            default:
                throw new Error(`Weird state found in "getMapStyle": ${BCycle_Station.popup_state}`);    
        }
    }

    render() { 
        return (
            <View style={this.styles.map_container}>
                <MapView 
                    onPress={() => {
                        if (BCycle_Station.popup_state < PopupState.CYCLING) {
                            BCycle_Station.selected_station = null;
                            BCycle_Station.destination_station = null;
                            BCycle_Station.unlocked_bike = null;
                            BCycle_Station.popup_state = PopupState.CHOOSE_MARKER;
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
                    {this.getPolyLine}
                </MapView>
                {this.getPopupMenu}
            </View>
        )
    }
}