# BLE Connection and IoT Device Interaction Project

This project is a React-based application that utilizes the Capacitor library for Bluetooth Low Energy (BLE) connections with IoT devices. The app provides users with functionalities to search for nearby BLE devices, connect to a specific device, send messages, and receive data from various BLE characteristics, such as temperature, humidity, and other sensor data.

## Table of Contents
- [Key Features](#key-features)
  - [1. Device Search](#1-device-search)
  - [2. Device Connection](#2-device-connection)
  - [3. Sending Messages](#3-sending-messages)
  - [4. Receiving Messages](#4-receiving-messages)
- [Supported Platforms](#supported-platforms)
- [Next Steps](#next-steps)
- [Ionic React Integration](#ionic-react-integration)
  - [What is Ionic?](#what-is-ionic)
  - [Basic Requirements](#basic-requirements)
  - [Creating Your First Ionic Project with React](#creating-your-first-ionic-project-with-react)

## Key Features

### 1. Device Search
The application enables users to search for nearby BLE devices. During the scan, basic information for each device—such as name, ID, and signal strength (RSSI)—is displayed, allowing users to select which device to connect to.

### 2. Device Connection
After selecting the desired device, users can establish a connection, enabling message exchange and notifications, as well as control over specific characteristics of the IoT device.

### 3. Sending Messages
The application includes functionality to send data to the connected device, such as commands and messages sent to specific BLE characteristics. This feature is useful for remote control interactions or command sending.

### 4. Receiving Messages
Once connected, the app allows real-time data reception from the IoT device. This data is read and displayed on the screen, allowing users to continuously monitor device information, including readings from integrated sensors.

## Supported Platforms

- **Android**: Fully supported for scanning, connecting, and message exchange via BLE.
- **iOS**: BLE support is available, but specific permissions must be configured in Xcode to enable BLE device connections.

## Next Steps

1. **Password Authentication**: Implement a password system on the IoT device (UE) and adjust the app to request the password when attempting to connect.
2. **Temperature Sensing**: Integrate a temperature sensor into the IoT device and enable the app to receive this data and display it in the user interface.
3. **Frontend Completion**: Enhance the user interface to provide a more intuitive and responsive design for BLE device interactions.

---

# Ionic React Integration

## What is Ionic?

Ionic is a mobile app development framework that enables the creation of hybrid applications, allowing them to run on both Android and iOS from a single codebase. It employs web technologies like HTML, CSS, and JavaScript (or TypeScript). With Ionic React, developers can utilize React as the JavaScript framework to build the interface and logic of their applications.

## Basic Requirements

Before getting started, ensure you have the following prerequisites installed:

1. **Node.js** (version 16 or higher) - [Download here](https://nodejs.org)
2. **NPM** (comes with Node.js) or **Yarn**
3. **Ionic CLI** - To install the Ionic CLI, run the following command:

    ```bash
    npm install -g @ionic/cli
    ```

## Creating Your First Ionic Project with React

1. **Initialize an Ionic Project with React**: Open your terminal and run the following command to create a new project with the blank template:

    ```bash
    ionic start myApp blank --type=react
    ```

    This command creates an app called `myApp` using the "blank" template, which is the simplest for getting started. The `--type=react` parameter specifies that the project will be built with React.

2. **Run the Project**: Navigate to the project directory and start the development server:

    ```bash
    cd myApp
    ionic serve
    ```

    This will open your project in the browser with live-reload enabled, meaning any code changes will automatically be reflected in the app.
