import App from "./state/App";
import { useEffect, useState } from "react";

/** https://reactnative.dev/docs/components-and-apis
 * COMPONENT STUFF:
 *  - View: used for fundamental component building and UI
 *  - Text: For displaying text
 *  - Image: Displaying images
 *  - TextInput: getting text
 *  - ScrollView: provides a scrolling container
 *  - StyleSheet: for stylinggg
 * 
 * UI:
 *  - Button: Used for handling touches (kinda sucks)
 *  - Switch: Renders a switch (on/off)
 * 
 * LIST VIEWS:
 *  - FlatList: For rendering scrollable lists
 *  - SectionList: Like flat list but with categories
 * 
 * OTHER:
 *  - Alert: Launches an alert dialog with the specified title and message
 * 
 * 
 * NOTE: TouchableOpacity is WAY more customizable than Button in react native
 *       I'll work on switching to that.
 * NOTE: 
 */

const app = new App();

export default function Index() {
  // Setup updater (only runs once and binds the setter of the use state to the app class)
    const [unused, refreshApp] = useState(false);
    useEffect(() => {
      App.setRefreshFunction(refreshApp);
    }, []);
  
  return ( app.getScreen() );
}

/**
 * TODO:
 *  - Start looking into BCycle API
 *  - Iron out a mockup of what screens should look like
 *  - Verify this works on IOS
 *  - Look into GPS tracking/location services
 *  - Setup bind functions for auto update
 *  - Look into interface stuff with components
 */