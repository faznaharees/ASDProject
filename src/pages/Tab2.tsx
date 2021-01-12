import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import ViewBook from '../components/ViewBook';
import { auth } from '../firebase';

const Tab2: React.FC = () => {
  const [userId,setUserId] = React.useState();
  const changeUser = (user:any) => {
    setUserId(user.uid);
    console.log(user.displayName)
  }
  const getUser = () => {
    auth.onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        console.log("user",user.uid)
        changeUser(user)
      } else {
        // No user is signed in.
      }
    });
    
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Books</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ViewBook userid={userId}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
