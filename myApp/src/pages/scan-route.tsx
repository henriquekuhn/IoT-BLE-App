import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonFooter, IonLabel, IonSpinner, IonIcon, IonGrid, IonRow, IonCol, IonSearchbar } from '@ionic/react';
import { BleClient, ScanResult, BleService  } from '@capacitor-community/bluetooth-le';
import { refreshCircleOutline, trashBin } from 'ionicons/icons'; // Import the refresh icon
import { useHistory } from "react-router-dom";

import "./scan-route.css"


const ScanPage: React.FC = () => {
  const [devices, setDevices] = useState<ScanResult[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('Touch to Scan');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const history = useHistory();

  const scan = async () => {
    setStatusMessage('Scanning BLE Endpoints...');
    setDevices([]); // Clear the previous devices list
    setIsScanning(true);

    try {
      await BleClient.initialize(); // Initialize BLE Client

      // Start BLE scan for 5 seconds
      await BleClient.requestLEScan({}, (result: ScanResult) => {
        console.log('Discovered device:', result);
        // Update the devices list with discovered devices
        setDevices((prevDevices) => {
          const isDeviceAlreadyFound = prevDevices.some((device) => device.device.deviceId === result.device.deviceId);
          return isDeviceAlreadyFound ? prevDevices : [...prevDevices, result];
        });
      });

      setStatusMessage('Scan completed');
    } catch (error) {
      console.error('Error during scan:', error);
      setStatusMessage('Error scanning devices');
    } finally {
      setTimeout(() => {
        BleClient.stopLEScan(); // Stop the scan after timeout
        setIsScanning(false);
      }, 5000);
    }
  };

  const handleSearch = (e: any) => {
    setSearchText(e.detail.value);
  };

  const filteredDevices = searchText
    ? devices.filter((device) => {
        const deviceName = device.device.name?.toLowerCase() || 'Unnamed';
        return deviceName.includes(searchText.toLowerCase());
      })
    : devices;

  const connect_device = async (device: ScanResult) => {
    setStatusMessage(`Connecting to: ${device.device.name || 'Unnamed'}`);

    const onDisconnect = (id: string) => {
      setStatusMessage(`Disconnected from ${id}`);
      onDeviceDisconnected(id);
    };

    try {
      // Connect to the device and listen for disconnection event
      await BleClient.connect(device.device.deviceId, onDisconnect);
      setStatusMessage("Connected!");

      // Fetch services after connection
      const services = await BleClient.getServices(device.device.deviceId);
      //const uuids = services.map(service => service.uuid).join(', ');

      // Call the connected callback
      onConnected(device, services);
    } catch (error) {
      console.error("Connection error:", error);
      setStatusMessage('Connection Failed');
      onDeviceDisconnected(device.device.deviceId);
    }
  };

  const onConnected = (device: ScanResult, services: BleService[]) => {
    setStatusMessage(`Connected to device: ${device.device.name}`);
    history.push({
      pathname: '/device_connected',
      state: {
        name: device.device.name,
        id: device.device.deviceId,
        rssi: device.rssi,
        services
      }
    });
  };

  const onDeviceDisconnected = (device_name: string) => {
    setStatusMessage(`Disconnected from device: ${device_name}`);
  };

  useEffect(() => {
    scan();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BLE Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {isScanning ? (
          <IonItem>
            <IonLabel>Scanning for device...</IonLabel>
            <IonSpinner name='lines-sharp' />
          </IonItem>
        ) : (
          <IonGrid>
            <IonRow>
              <IonSearchbar
                color="light"
                showCancelButton="always"
                clearIcon={trashBin}
                placeholder="Enter device name"
                value={searchText}
                onIonInput={handleSearch}
              />
            </IonRow>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonButton onClick={scan}>
                  <IonIcon className="ion-icon-config" icon={refreshCircleOutline} slot="start" />
                  Refresh
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              {filteredDevices.map((device, index) => (
                <IonCol size="12" key={index}>
                  <IonItem>
                    <IonLabel>
                      <h2>{device.device.name || 'Unnamed'}</h2>
                      <p>ID: {device.device.deviceId}</p>
                      <p>RSSI: {device.rssi}</p>
                    </IonLabel>
                    <IonButton onClick={() => connect_device(device)}>
                      Connect
                    </IonButton>
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>

      <IonFooter className="ion-text-center">
        <p>{statusMessage}</p>
      </IonFooter>
    </IonPage>
  );
};

export default ScanPage;
