import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";
import api from "../../../services/api";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignupSecondStep() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação.");
    }
    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais.");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Conta criada!",
          message: `Agora é só fazer login\ne aproveitar.`,
          nextScreenRoute: "Signin",
        });
      })
      .catch(() => {
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet active={false} />
            </Steps>
          </Header>

          <Title>Crie{"\n"}sua conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma rápida e fácil.</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
