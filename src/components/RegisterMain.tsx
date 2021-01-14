import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ViewBook from './ViewBook';
import { auth } from '../firebase';
import Register from './Register';

type Props = {
    setUserId:any;
}
const RegisterMain: React.FC<Props> = ({setUserId}) => {
  
  return (
    <IonPage>
      <Register setUserId={setUserId}/>
    </IonPage>
  );
};

export default RegisterMain;
