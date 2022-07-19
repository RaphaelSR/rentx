import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";
import theme from "../../styles/theme";
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateTitle,
  DateValue,
  DateInfo,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal,
} from "./styles";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface Params {
  car: CarDTO;
  dates: string[];
}
interface UnavailableDatesProps {
  unavailable_dates: string[];
}

export function SchedulingDetails() {
  const [loading, SetLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    SetLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const dataUnavailableDates = schedulesByCar.data as UnavailableDatesProps;
    const unavailableDates = dataUnavailableDates.unavailable_dates;

    const unavailable_dates = [...unavailableDates, ...dates];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Carro alugado!",
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
          nextScreenRoute: "Home",
        });
      })
      .catch(() => {
        SetLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.");
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endFormatted: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color="#fff" />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuote>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuote>
            <RentalPriceTotal>{`R$ ${rentTotal}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
