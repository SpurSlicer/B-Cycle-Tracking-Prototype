import { Component } from "react";
import HomeScreen from "../components/home";
import MapScreen from "../components/map";
import { State } from "../types/app_types";


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