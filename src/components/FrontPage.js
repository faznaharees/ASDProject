import { IonBackButton, IonButton, IonInput, IonRouterLink, IonTabButton, IonTitle, IonToolbar } from '@ionic/react'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { auth,provider } from '../firebase';
import AddBook from './AddBook';

export default class FrontPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            userPassword:'',
            userId:'',
            isloggedin:false,
            
        }
    }
    changeName = (name) => {
        this.setState({userName:name})
    }
    changePassword = (pswd) => {
        this.setState({userPassword:pswd})
    }
   
    // clear = () => {
    //     this.setState({
    //         userName:'',
    //         userPassword:''
    //     })
    // }
    onSubmit =() => {
        //user register here
        auth.signInWithPopup(provider).then((result) =>{
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.setState({
                userId:user.uid,
                isloggedin:true
            })
            this.props.setUserId(result.user).then(
                ()=>console.log("props")
            )
            console.log(result.user)
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
          
    }
    
    onSubmitWithUserName = () => {
        auth.createUserWithEmailAndPassword(this.state.userName, this.state.userPassword)
        .then((user) => {
            console.log("success",user)
        }).catch((err)=>console.log(err));
    }
    render() {
        return (
            <div style={{background:'#dcd4da',height:'100vh'}}>
                <IonToolbar className="toolbarRegister">

                <IonTitle>
                    
                    Book<font color="black" style={{fontWeight:'bold'}}>Ex</font></IonTitle>
                </IonToolbar>
                <div style={{height:'50vh'}}>
                    <img width="100%" src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"/>
                </div>
                <div style={{padding:'10px 20px'}}>
                <IonTabButton href="/login"><IonButton style={{margin:'20px 0px',width:'100%',border:0}}>Login</IonButton></IonTabButton>

                <IonTabButton href="/register"><IonButton style={{margin:'20px 0px',width:'100%',border:0}}>Register</IonButton></IonTabButton>
                </div>
            </div>
        )
    }
}
