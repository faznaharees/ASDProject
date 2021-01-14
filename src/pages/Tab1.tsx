import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import AddBook from '../components/AddBook';
import Login from '../components/Login';
import Register from '../components/Register';
import ViewBook from '../components/ViewBook';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import FrontPage from '../components/FrontPage';
import UserPage from '../components/UserPage';

const Tab1: React.FC = () => {
  const [userId,setUserId] = React.useState('');
  const [user,setUser] = React.useState({})
  const changeUser = (user:any) => {
    setUserId(user.uid);
    console.log(user.displayName)
  }
  const getUser = () => {
    auth.onAuthStateChanged((user)=> {
      if (user) {
        setUser(user);
        // User is signed in.
        console.log("user",user.uid)
        setUserId(user.uid)
      } else {
        // No user is signed in.
        setUserId('');
      }
    });
    
  }
  React.useEffect(()=>{
    getUser();
  },[])
  
  return (
    <IonPage>
      <IonHeader>
        {/* <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <Link to="/login">Login</Link> */}
        {/* <AddBook userid={1}/> */}
        {userId==="" ? <FrontPage setUserId={setUserId}/> : 
        <UserPage userId={user}/>
        }
        
        {/* <button onClick={()=>getUser()}>Get User id</button> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
