import { IonAlert, IonButton, IonInput,IonItem, IonLabel, IonSelect, IonSelectOption, IonPage } from '@ionic/react'
import React, { Component } from 'react'
import { auth, db } from '../firebase';

export default class AddBook extends Component {
   
 
    constructor(props){
        super(props);
        this.state = {
            userId : props.userid,
            bookid: Math.random(),
            bookName: '',
            bookAuthor:'',
            currentOwner: props.userId,
            interested: [123,125],
            alert:false,
            
        }
    }
     getUser = () => {
        auth.onAuthStateChanged((user)=> {
          if (user) {
            // User is signed in.
            console.log("user",user.uid)
            this.setState({
                userId:user.uid
            })
        } else {
            // No user is signed in.
          }});
        }
        
    changeName = (name) => {
        this.setState({bookName:name})
    }
    changeAuthor = (author) => {
        this.setState({bookAuthor:author})
    }
    clear = () => {
        this.setState({
            bookName:'',
            bookAuthor:''
        })
    }
    onSubmit =() => {
        var id= Math.random();
        auth.onAuthStateChanged((user)=> {
            if (user) {
              // User is signed in.
             let uid = user.uid
              db.collection("books").doc(id.toString()).set({
                owner: uid ,
                id: id,
                bookName: this.state.bookName,
                bookAuthor: this.state.bookAuthor,
                interested: this.state.interested,
                currentUser: uid,
                phoneNumber:parseInt(auth.currentUser.photoURL),
                ownerName:auth.currentUser.displayName
             })
             .then(() =>  {
                 this.setState({
                     alert:true
                 })
                 console.log("Document successfully written!");
                 this.clear()
             })
          
          } else {
              // No user is signed in.
            }});
        
        
    }
    
    render() {
        return (

            <div className="bgview" style={{height:'100vh',backgroundImage:'https://image.freepik.com/free-photo/front-view-books-with-grey-background_23-2148255885.jpg'}}>
                <div style={{height:'50vh',padding:'30px 20px'}}>
                    <IonInput style={{background:'white',margin:'20px 0px'}} placeholder="book name" value={this.state.bookName}  onIonChange={(e)=>this.changeName(e.target.value)}/>
                    <IonInput style={{background:'white',margin:'20px 0px'}} placeholder="book author" value={this.state.bookAuthor} onIonChange={(e)=>this.changeAuthor(e.target.value)}/>
                    <IonItem>
                    {/* <IonLabel>Do you want to retain ownership</IonLabel> */}
                    <IonSelect placeholder="Do you want to retain ownership">
                    <IonSelectOption value="yes">YES</IonSelectOption>
                    <IonSelectOption value="no">NO</IonSelectOption>
                    </IonSelect>
                    </IonItem>
                    <IonButton style={{width:'100%',borderRadius:0,background:'white',margin:'20px 0px'}} onClick={()=>this.onSubmit()}>Add Book</IonButton>
                </div>
                <IonButton onClick={()=>console.log(auth.currentUser.displayName)}>CLikc</IonButton>

                <div style={{height:'50vh'}}>
                    {/* <img width="100%" src="https://image.freepik.com/free-photo/front-view-books-with-grey-background_23-2148255885.jpg"/> */}
                </div>
                <IonAlert
          isOpen={this.state.alert}
          onDidDismiss={() => this.setState({alert:false})}
          cssClass='my-custom-class'
          header={'SUCCESS'}
          subHeader={''}
          message={'New Book Added.'}
          buttons={['OK']}
        />
            </div>
        )
    }
}
