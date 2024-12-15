import * as React from "react";
import { Html, Tailwind, Head, Body, Container, Section, Text, Button, Heading, Img } from "@react-email/components";

interface IConfirmationTemplateProps {
  domain: string;
  token: string;
}
export function ConfirmationTemplate({ domain, token }: IConfirmationTemplateProps) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <Container className="max-w-[600px] mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
            <Section className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6">
              <Img
                src="https://avatars.mds.yandex.net/get-yablogs/6208973/file_1723104265603/w1000"
                alt="Welcome Banner"
                className="w-full h-[150px] object-cover"
              />
            </Section>

            <Section className="text-center p-8">
              <Text className="text-3xl font-extrabold text-gray-900">Добро пожаловать!</Text>
              <Text className="text-md text-gray-700 mt-4 leading-relaxed">
                Мы рады видеть вас на борту <span className="font-bold text-purple-600">Strife</span>! Завершите свою регистрацию,
                подтвердив адрес электронной почты.
              </Text>
            </Section>

            <Section className="text-center my-6">
              <Button
                href={confirmLink}
                style={{
                  backgroundColor: "#6a5acd",
                  color: "white",
                  padding: "12px 24px",
                  fontSize: "18px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Подтвердить почту
              </Button>
            </Section>

            <Section className="px-6 py-4">
              <Text className="text-md text-gray-600 leading-relaxed">
                После подтверждения вы сможете наслаждаться всеми преимуществами нашего сервиса. Если у вас возникнут вопросы, напишите в
                службу поддержки.
              </Text>
            </Section>

            <Section className="bg-gray-100 py-4 text-center">
              <Text className="text-sm text-gray-500">
                Если вы не регистрировались на {domain}, проигнорируйте это письмо. Этот email был отправлен автоматически.
              </Text>
            </Section>

            <Section className="bg-gradient-to-r from-gray-700 to-gray-900 py-4 text-center">
              <Text className="text-xs text-gray-300">© 2024 {domain}. Все права защищены.</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
