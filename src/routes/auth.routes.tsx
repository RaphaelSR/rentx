import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash } from "../screens/Splash";
import { Confirmation } from "../screens/Confirmation";
import { Signin } from "../screens/Signin";
import { SignupFirstStep } from "../screens/Signup/SignupFirstStep";
import { SignupSecondStep } from "../screens/Signup/SignupSecondStep";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Signin" component={Signin} />
      <Screen name="SignUpFirstStep" component={SignupFirstStep} />
      <Screen name="SignUpSecondStep" component={SignupSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
