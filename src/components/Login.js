import { IonButton, IonInput, IonTitle, IonToolbar } from '@ionic/react'
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { auth,provider } from '../firebase';
import AddBook from './AddBook';

 class Login extends Component {
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
        auth.signInWithEmailAndPassword(this.state.userName, this.state.userPassword)
        .then((user) => {
            this.setState({
                userId:user.uid,
                isloggedin:true
            },()=>this.props.history.push(`/addbook`));
            console.log("success",user)
        }).catch((err)=>console.log(err));
    }
    render() {
        return (
            <div style={{background:'#dcd4da',height:'100vh'}}>
                <IonToolbar className="toolbarRegister">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
                <div style={{height:'50vh'}}>
                    <img width="100%" src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"/>
                </div>
               { !this.state.isloggedin &&<div style={{padding:'10px 30px'}}>
                {/* <IonInput placeholder="eg.John Doe" value={this.state.userName} onIonChange={(e)=>this.changeName(e.detail.value)}/> */}
                {/* <IonInput placeholder="Password" type="password" value={this.state.userPassword} onIonChange={(e)=>this.changeAuthor(e.detail.value)}/> */}
                <IonInput style={{background:'white',width:'100%',margin:'20px 0px'}} placeholder="John Doe" onIonChange={(e)=>{this.changeName(e.target.value)}}/>
                <IonInput style={{background:'white',margin:'20px 0px'}} type="password" placeholder="********" onIonChange={(e)=>{this.changePassword(e.target.value)}}/>

                <IonButton style={{margin:'20px 0px',width:'100%',border:0}} onClick={()=>this.onSubmitWithUserName()}>Sign Up</IonButton>
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

export default withRouter(Login);