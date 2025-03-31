import { Stack } from "expo-router";
import App from "./state/App";
import { State } from "./types/app_types";

export default function RootLayout() {
  return <Stack>
      <Stack.Screen name={State[App.getState]} />
    </Stack>;
}
