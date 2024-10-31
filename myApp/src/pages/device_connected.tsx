import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { BleClient, BleService } from '@capacitor-community/bluetooth-le';
import "./device_connected.css";

interface DeviceInfo {
    name: string;
    id: string;
    rssi: string;
    services: BleService[];
}

const DeviceConnected: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const { name, id, rssi, services } = location.state as DeviceInfo;
    const [statusMessage, setStatusMessage] = useState<string>('Buscando serviços...');
    const [readValues, setReadValues] = useState<{ [key: string]: string }>({}); // Estado para armazenar dados lidos

    // Atualiza a mensagem de status com base no comprimento dos serviços
    useEffect(() => {
        if (services && services.length > 0) {
            setStatusMessage('Serviços obtidos com sucesso.');
        } else {
            setStatusMessage('Nenhum serviço disponível.');
        }
    }, [services]);

    function stringToDataView(str: string): DataView {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(str);
        return new DataView(encoded.buffer);
    }

    function dataViewToString(dataView: DataView): string {
        console.log('Converting data')
        const decoder = new TextDecoder();
        const uint8Array = new Uint8Array(dataView.buffer);
        return decoder.decode(uint8Array);
    }

    const write_data = async (service_uuid: any, characteristic_uuid: any) => {
        try {
            if (!services || services.length < 3 || !services[2]?.characteristics?.[0]) {
                setStatusMessage('Serviço ou característica não encontrados.');
                console.error('Serviço ou característica inválidos');
                return;
            }

            const serviceUUID = service_uuid;
            const characteristicUUID = characteristic_uuid;
            console.log('UUID do Serviço:', serviceUUID);
            console.log('UUID da Característica:', characteristic_uuid);

            const value = stringToDataView("oi");
            console.log('Valor DataView:', value);

            await BleClient.write(id, serviceUUID, characteristicUUID, value);
            setStatusMessage('Dados enviados com sucesso!');
            console.log('Dados enviados com sucesso');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setStatusMessage('Erro ao enviar dados');
        }
    };

    const read_data = async (service_uuid: any, characteristic_uuid: any) => {
        try {
            if (!services || services.length < 3 || !services[2]?.characteristics?.[0]) {
                setStatusMessage('Serviço ou característica não encontrados.');
                console.error('Serviço ou característica inválidos');
                return;
            }

            const serviceUUID = service_uuid;
            const characteristicUUID = characteristic_uuid;
            console.log('UUID do Serviço:', serviceUUID);
            console.log('UUID da Característica:', characteristic_uuid);

            await BleClient.startNotifications(
                id,
                serviceUUID,
                characteristicUUID,
                (value) => {
                    const stringValue = dataViewToString(value);
                    console.log("DATA READ:", stringValue);

                    // Atualiza o estado com o valor lido para a característica correspondente
                    setReadValues(prevValues => ({
                        ...prevValues,
                        [characteristic_uuid]: stringValue // Salva o valor lido para o UUID da característica
                    }));
                }
            );
            setStatusMessage('Notificações iniciadas.');
        } catch (error) {
            console.error('Erro ao receber dados:', error);
            setStatusMessage('Erro ao receber dados');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dispositivo Conectado: {name || 'Sem Nome'}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel>
                                    <h2>Nome do Dispositivo: {name || 'Sem Nome'}</h2>
                                    <p>ID: {id}</p>
                                    <p>RSSI: {rssi}</p>
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    {/* Renderiza serviços e características */}
                    {services && services.length > 0 ? (
                        <IonRow>
                            <IonCol size="12">
                                <IonList>
                                    {services.map((service, index) => (
                                        <IonItem key={index}>
                                            <IonLabel>
                                                <p>UUID do Serviço: {service.uuid}</p>
                                                <p>Características:</p>
                                                <IonList>
                                                    {service.characteristics.map((characteristic, charIndex) => (
                                                        <IonItem key={charIndex}>
                                                            <IonLabel>
                                                                <p>UUID da Característica: {characteristic.uuid}</p>
                                                                <p>
                                                                    {/* Exibir as propriedades da característica */}
                                                                    Propriedades: {
                                                                        Object.keys(characteristic.properties)
                                                                            .filter((key) => characteristic.properties[key as keyof typeof characteristic.properties] === true)
                                                                            .join(', ')
                                                                    }
                                                                </p>
                                                                {/* Renderiza botão para escrever dados se a característica tiver a propriedade 'write' */}
                                                                {characteristic.properties.write && (
                                                                    <IonButton className="buttons-border" onClick={() => write_data(service.uuid, characteristic.uuid)}>
                                                                        Enviar Dados
                                                                    </IonButton>
                                                                )}
                                                                {/* Exemplo de leitura, se suportado */}
                                                                {characteristic.properties.read && (
                                                                    <IonButton className="buttons-border" onClick={() => read_data(service.uuid, characteristic.uuid)}>
                                                                        Ler Dados
                                                                    </IonButton>
                                                                )}
                                                                {/* Exemplo de leitura, se suportado */}
                                                                {characteristic.properties.notify && (
                                                                    <IonButton className="buttons-border" onClick={() => read_data(service.uuid, characteristic.uuid)}>
                                                                        Notify
                                                                    </IonButton>
                                                                )}

                                                                {/* Exibe o valor lido abaixo do botão correspondente */}
                                                                {readValues[characteristic.uuid] && (
                                                                    <p>Valor lido: {readValues[characteristic.uuid]}</p>
                                                                )}
                                                            </IonLabel>
                                                        </IonItem>
                                                    ))}
                                                </IonList>
                                            </IonLabel>
                                        </IonItem>
                                    ))}
                                </IonList>
                            </IonCol>
                        </IonRow>
                    ) : (
                        <IonRow>
                            <IonCol size="12">
                                <p>Nenhum serviço disponível.</p>
                            </IonCol>
                        </IonRow>
                    )}

                    <IonRow>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel>
                                    <p>{statusMessage}</p>
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default DeviceConnected;
