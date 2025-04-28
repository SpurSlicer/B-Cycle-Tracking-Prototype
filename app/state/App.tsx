import { Component } from "react";
import HomeScreen from "../components/home";
import MapScreen from "../components/map";
import { State } from "../types/app_types";
import { BCycle_Station } from "../components/map_element";


export default class App {
    // Static stuff for refreshing the app screen
        private static update: boolean = false;
        private static refreshFunction = (update: boolean) => { };
        public static setRefreshFunction(fun: (update: boolean) => void) { App.refreshFunction = fun; }
        public static refresh = () => { 
            console.log(`App updating to ${State[App.getState]} with val ${App.getState} and update ${App.update}`);
            App.update = !App.update;
            App.refreshFunction(App.update);
        };
    // App state management stuff & screens list
        private static state: State = State.HOME;
        private screens: Map<State, Component> = new Map();
        public static setState(state: State) { App.state = state };
        public static get getState(): State { return App.state };

    constructor() { 
        this.screens.set(State.HOME, new HomeScreen({}));
        this.screens.set(State.MAP, new MapScreen({}));
        BCycle_Station.station_list_ref = new Map();
        BCycle_Station.station_list_ref.set(0, new BCycle_Station(
                'Broadway and Baseline', 10, 5, 0, 40.00037682435091, -105.26252643013333,
                'description')
            );
            BCycle_Station.station_list_ref.set(1, new BCycle_Station(
                'Timber Ridge', 2, 5, 1, 40.005709156797764, -105.25487049885186,
                'description')
            );
            BCycle_Station.station_list_ref.set(2, new BCycle_Station(
                'Center for Community', 15, 7, 2, 40.00432756784085, -105.26380275753245,
                'description')
            );
            BCycle_Station.station_list_ref.set(3, new BCycle_Station(
                'Williams Village', 0, 17, 3, 39.99925184532494, -105.25278058646582,
                'description')
            );
            BCycle_Station.station_list_ref.set(4, new BCycle_Station(
                'Stearns East', 9, 0, 4, 39.998795904251516, -105.25091821152749,
                'description')
            );
    }

    /**
     * This is called on every app update and is the main 'refresh the screen'
     * method. Every render method returns a react component, and we can
     * nest or encapsulate that component with more styling, a menu bar,
     * any other thing with this.
     */
    getScreen(): React.ReactNode {
        return (this.screens.get(App.state) as Component).render();
    }
}