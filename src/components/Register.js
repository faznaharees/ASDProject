import { IonButton, IonInput } from '@ionic/react'
import React, { Component } from 'react'
import { auth,provider } from '../firebase';
import AddBook from './AddBook';

export default class Register extends Component {
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
    changeAuthor = (pswd) => {
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
    render() {
        return (
            <div>
               { !this.state.isloggedin &&<div>
                {/* <IonInput placeholder="eg.John Doe" value={this.state.userName} onIonChange={(e)=>this.changeName(e.detail.value)}/> */}
                {/* <IonInput placeholder="Password" type="password" value={this.state.userPassword} onIonChange={(e)=>this.changeAuthor(e.detail.value)}/> */}
                <IonButton onClick={()=>this.onSubmit()}>Sign Up with Google</IonButton>
                </div>
                }
                {/* <IonButton onClick={()=>console.log(this.state.isloggedin)}>View log</IonButton> */}
                {
                    this.state.isloggedin && <AddBook userid={this.state.userId}/>
                }
            </div>
        )
    }
}
