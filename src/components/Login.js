import { IonButton, IonInput } from '@ionic/react'
import React, { Component } from 'react'
import { db } from '../firebase';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            userPassword:''
            
        }
    }
    changeName = (name) => {
        this.setState({userName:name})
    }
    changeAuthor = (pswd) => {
        this.setState({userPassword:pswd})
    }
    clear = () => {
        this.setState({
            userName:'',
            userPassword:''
        })
    }
    onSubmit =() => {
        //user login here
    }
    render() {
        return (
            <div>
                <div className="bg"></div>
                <div className="form">
                    <IonInput className="greenOutlinedInput" placeholder="eg.John Doe" value={this.state.bookName} onIonChange={(e)=>this.changeName(e.detail.value)}/>
                    <IonInput className="greenOutlinedInput" placeholder="Password" type="password" value={this.state.bookAuthor} onIonChange={(e)=>this.changeAuthor(e.detail.value)}/>
                    <IonButton className="greenButton" onClick={()=>this.onSubmit()}>Login</IonButton>
                </div>
            </div>
        )
    }
}
