import { IonButton, IonInput } from '@ionic/react'
import React, { Component } from 'react'
import { db } from '../firebase';

export default class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : props.userid,
            bookid: Math.random(),
            bookName: '',
            bookAuthor:'',
            currentOwner: props.userId,
            interested: [123,125]
            
        }
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
        db.collection("books").doc(id.toString()).set({
           owner: this.state.userId ,
           id: id,
           bookName: this.state.bookName,
           bookAuthor: this.state.bookAuthor,
           interested: this.state.interested,
           currentUser: this.state.userId
        })
        .then(() =>  {
            console.log("Document successfully written!");
            this.clear()
        })
     
        
    }
    render() {
        return (
            <div>
                <IonInput placeholder="book name" value={this.state.bookName} onIonChange={(e)=>this.changeName(e.detail.value)}/>
                <IonInput placeholder="book author" value={this.state.bookAuthor} onIonChange={(e)=>this.changeAuthor(e.detail.value)}/>
                <IonButton onClick={()=>this.onSubmit()}>Add Book</IonButton>

            </div>
        )
    }
}
