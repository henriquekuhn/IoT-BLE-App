import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { searchCircleOutline } from 'ionicons/icons'; // Importa o ícone corretamente

import './Home.css';

const Home: React.FC = () => {
  const history = useHistory(); // Obtém o objeto history

  const handleButtonClick = () => {
    history.push('/scan-route');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Ionic React!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className='custom-height'>
            <IonCol className='ion-text-center'>
              <h2>IoT Project</h2>
              <p>Bluetooth Low Energy Communication</p>
            </IonCol>
          </IonRow>

          <IonRow>

            <IonCol className='ion-text-center'>
              <IonButton onClick={handleButtonClick}>
                <IonIcon className="ion-icon-config" icon={searchCircleOutline} slot="start" />
              </IonButton>
            </IonCol>  

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
