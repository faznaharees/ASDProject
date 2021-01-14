import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ViewBook from './ViewBook';
import { auth } from '../firebase';
import Register from './Register';
import Login from './Login';

type Props = {
    setUserId:any;
}
const LoginMain: React.FC<Props> = () => {
  
  return (
    <IonPage>
      <Login/>
    </IonPage>
  );
};

export default LoginMain;
