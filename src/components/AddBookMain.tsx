import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ViewBook from './ViewBook';
import { auth } from '../firebase';
import Register from './Register';
import AddBook from './AddBook';

type Props = {
    userId:any;
}
const AddBookMain: React.FC<Props> = ({userId}) => {
  
  return (
    <IonPage>
      <AddBook userId={userId}/>
    </IonPage>
  );
};

export default AddBookMain;
