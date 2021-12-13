import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import { Container, Header, TotalCars, HeaderContent } from "./styles";

export const Home = () => {
  const carData = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: {
      period: "AO DIA",
      price: 120
    },
    thumbnail: "https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png"
}

const carDataTwo = {
  brand: "porsche",
  name: "Porsche 911",
  rent: {
    period: "AO DIA",
    price: 340
  },
  thumbnail: "https://e7.pngegg.com/pngimages/622/224/png-clipart-porsche-911-gt3-2017-porsche-911-geneva-motor-show-car-white-porsche-911-r-car-compact-car-car.png"
}
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carData} />
      <Car data={carDataTwo} />
    </Container>
  );
};
