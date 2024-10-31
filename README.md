# BLE Connection and IoT Device Interaction Project

This project is a React-based application that uses the Capacitor library for Bluetooth Low Energy (BLE) connection with IoT devices. It allows users to search for nearby BLE devices, connect to a specific device, send messages, and receive data via BLE characteristics, such as temperature, humidity, and other sensor data.

## Key Features

### 1. Device Search
The application enables users to search for nearby BLE devices. During the scan, basic information for each device, such as name, ID, and signal strength (RSSI), is displayed, allowing users to select which device to connect to.

### 2. Device Connection
After selecting the desired device, the application allows users to connect to it, enabling message exchange and notifications, as well as control over specific characteristics of the IoT device.

### 3. Sending Messages
The application includes features to send data to the connected device, such as commands and messages, which are sent to specific BLE characteristics. This functionality is useful for remote control interactions or command sending.

### 4. Receiving Messages
Once connected, the app allows real-time data reception from the IoT device. This data is read and displayed on the screen, allowing users to continuously monitor device information, such as integrated sensors.

## Supported Platforms

- **Android**: Fully supported for scanning, connecting, and message exchange via BLE.
- **iOS**: BLE support is available, but specific permissions must be configured in Xcode to enable BLE device connection.

## Next Steps

1. **Password Authentication**: Add a password system on the IoT device (UE) and adjust the app to request the password when attempting to connect.
2. **Temperature Sensing**: Incorporate a temperature sensor into the IoT device and enable the app to receive this data and display it in the user interface.
3. **Frontend Completion**: Improve the user interface, including a more intuitive and responsive design for BLE device interaction.


# ionic_react
Ionic React Studies

## O que é Ionic?

O Ionic é um framework de desenvolvimento de aplicativos móveis que permite criar aplicações híbridas, ou seja, que rodam tanto em Android quanto em iOS a partir de uma única base de código. Ele utiliza tecnologias web como HTML, CSS, e JavaScript (ou Typescript), e com o Ionic React, você pode usar o React como framework JavaScript para a interface e lógica de seus aplicativos.

## Requisitos Básicos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados:

1- Node.js (versão 16 ou superior) - Download
2- NPM (que já vem com o Node.js) ou Yarn
3- Ionic CLI - para instalar o CLI do Ionic, basta rodar:

```
npm install -g @ionic/cli
```

## Criando seu Primeiro Projeto Ionic com React

1- Iniciar um projeto Ionic com React: Abra seu terminal e execute o seguinte comando para criar um novo projeto com o template em branco:

```
ionic start myApp blank --type=react

```

Esse comando cria um aplicativo chamado myApp com o template "blank", que é o mais simples para iniciarmos. O parâmetro --type=react especifica que o projeto será feito com React.

2- Executar o projeto: Navegue até o diretório do projeto e inicie o servidor de desenvolvimento:

```
cd myApp
ionic serve
```

Isso abrirá seu projeto no navegador com live-reload (ou seja, qualquer alteração no código será refletida automaticamente).
