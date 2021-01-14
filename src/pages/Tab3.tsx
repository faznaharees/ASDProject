import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { auth } from '../firebase';

const Tab3: React.FC = () => {
  const [userId,setUserId] = React.useState();
  const changeUser = (user:any) => {
    setUserId(user.uid);
    console.log(user.displayName)
  }
  const [isUser,setisUser] = React.useState(false)
  const getUser = () => {
    auth.onAuthStateChanged((user)=> {
      if (user) {
        // User is signed in.
        console.log("user",user.uid)
        setisUser(true)
        changeUser(user)
      } else {
        // No user is signed in.
        setisUser(false)
      }
    });
    
  }
  React.useEffect(()=>
  getUser(),[])
  return (
    <IonPage>
      <IonContent>
        {isUser===true ? 'place match history here' : 
          <div className="authreq">
            <h3 style={{color:'white'}}>Authentication Required</h3>
            <h6 style={{color:'#dddddd'}}>Please Login to continue</h6>
          </div>}
        </IonContent>
    </IonPage>
  );
};

export default Tab3;
