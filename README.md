## How to Run the App

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Info
```
.
└── app/
    ├── index.tsx
    ├── _layout.tsx
    ├── components/
    │   ├── home.tsx
    │   ├── map.tsx
    │   └── ...
    ├── state/
    │   └── App.tsx
    ├── types/
    │   ├── app_types.ts
    │   └── ...
    └── util/
        ├── general.ts
        └── ...
```

- **index.tsx**: The `Index()` function is the first thing react native loads.
Right now, it just sets up the updater. Shouldn't need to be messed with much
if at all. 
- **layout.tsx**: We don't need to worry about this. That's where the 'index'
header thing is coming from. I'll disable it soon or y'all can--just look
up how to. 
- **componenents/**: These are simply all the screens and composite elements (like a nav bar or something) that will be used in the app. 
- **state/**: This contains the app class and nothing more. This class
is basically just a state machine that keeps track of which screen the user is on. It's also used by components to update the screen. Basically every method/attribute is static except the actual screen map and render function. 
Whenever you add a new screen, add it to the map in the constructor (and add
the new type in the enum in `./app/types/app_types.ts`). 
- **types/**: Just an organized area to keep defined types for typescript. 
- **util/**: Mostly for general purpose methods. The only one there is 
`isNullish(x)` right now which just returns whether the parameter is equal
to null or undefined (`x == null || x == undefined`).
\
\
And that's it! The *to-do list* and general *resources on react native* are in `app/index.tsx`, and the maps module documentation link is in `app/components/map.tsx`. I'll probably move those here soon. 