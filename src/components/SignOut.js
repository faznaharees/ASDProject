import { IonButton } from '@ionic/react'
import React, { Component } from 'react'

export default class SignOut extends Component {
    render() {
        return (
            <IonButton onClick={()=>signOut()}>
                SignOut
            </IonButton>
        )
    }
}
