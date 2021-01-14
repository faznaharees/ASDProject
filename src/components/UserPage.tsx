import React from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';

import Login from './Login';
import SignOut from './SignOut';
import { auth } from '../firebase';

type Props = {
    userId:any
}
const UserPage: React.FC<Props> = ({userId}) => {
  
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar className="toolbarRegister">

<IonTitle>
    
   <div style={{float:'left'}}>Book</div> <div color="black" style={{float:'left',color:'black',fontWeight:'bold'}}>Ex</div>
   <IonButton style={{float:'right'}} onClick={()=>auth.signOut()} >SignOut</IonButton>
   </IonTitle>
</IonToolbar>
      </IonHeader>
        <div className="bgview" style={{height:'100vh',backgroundImage:'https://image.freepik.com/free-photo/front-view-books-with-grey-background_23-2148255885.jpg'}}>
                <div style={{height:'30vh',padding:'130px 20px 30px 20px'}}>
                    {/* {JSON.stringify(userId)} */}
                    <div style={{height:'50px',width:'50px',margin:'auto',borderRadius:'50%',background:'#585f5d',padding:'15px 20px',color:'white',fontWeight:'bold',fontSize:'20px'}}>{userId.email[0]}</div>
                    <div style={{textAlign:'center',marginTop:'25px',padding:'auto',color:'#585f5d',fontWeight:'bold'}}>
                        {userId.email}
                    </div>
                    {/* <IonInput style={{background:'white',margin:'20px 0px'}} placeholder="book name" onIonChange={(e)=>{}}/>
                    <IonInput style={{background:'white',margin:'20px 0px'}} placeholder="book author"  onIonChange={(e)=>{}}/>

                    <IonButton style={{width:'100%',borderRadius:0,background:'white',margin:'20px 0px'}} onClick={()=>{}}>Add Book</IonButton> */}
                </div>
                <div className="colorchanged" style={{height:'50vh',padding:'30px 20px'}}>
                <IonRouterLink href="/addbook"><IonButton style={{width:'100%',borderRadius:0,background:'white',margin:'20px 0px'}}>Add Book</IonButton> </IonRouterLink>
                <IonRouterLink href="/tab2"><IonButton style={{width:'100%',borderRadius:0,background:'white',margin:'20px 0px'}}>View Books</IonButton> </IonRouterLink>

                    {/* <img width="100%" src="https://image.freepik.com/free-photo/front-view-books-with-grey-background_23-2148255885.jpg"/> */}
                </div>
            </div>
    </IonPage>
  );
};

export default UserPage;
