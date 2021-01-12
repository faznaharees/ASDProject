import { IonButton, IonCard } from '@ionic/react';
import React, { Component } from 'react'
import { db } from '../firebase';

export default class ViewBook extends Component {
    constructor(){
        super();
        this.state={
            bookList:[],
            interested:[],
            
        }
    }
    select = (id) => {
        //update interested column for the
        console.log(id)
        var collection = db.collection('books').doc(id.toString())
        this.setState({
            interested:[]
        })
        collection.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                this.setState({
                    interested:doc.data().interested
                })
                
              
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            var interest_array = this.state.interested
            interest_array.push(id)
            this.setState({
                interested:interest_array
            })    
            console.log("interested",this.state.interested)
            db.collection("books").doc(id.toString()).update({
                interested: this.state.interested
            })
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });        // var interest = collection.interest
        // interest.push(this.props.userid)
       
    }
    
    reject = (id) => {

    }
    componentDidMount = () => {
        this.load()
    }
    load = () => {
        db.collection('books').get().then(
            snapshot => snapshot.forEach(doc => {
                console.log(doc.data())
                var array= this.state.bookList
                array.push(doc.data())
                this.setState({
                    bookList:array
                })
                console.log(this.state.bookList)
            })
        )
    }
    render() {
        return (
            <div>
               {/* <IonButton onClick={()=>this.load()}>Load Books</IonButton>  */}
               {this.state.bookList.map(
                   item => 
                  <IonCard className="eachbook"> 
                   <h1>{item.bookName}</h1>
                    <IonButton onClick={()=>this.select(item.id)}>Select</IonButton>
                    <IonButton onClick={()=>this.reject(item.id)}>Reject</IonButton>

                   </IonCard>
               )}
            </div>
        )
    }
}
