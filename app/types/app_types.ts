enum State {
    HOME = 0,
    MAP = 1
}

enum PopupState {
    CHOOSE_MARKER = 0,
    CHOOSE_STATION = 1,
    CHOOSE_BIKE = 2,
    CHECKOUT = 3,
    CYCLING = 4
}

enum BikeState {
    DOCKED = 0,
    ABSENT = 1
}

export {
    State,
    PopupState,
    BikeState
}