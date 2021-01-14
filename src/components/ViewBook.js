import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonPage } from '@ionic/react';
import { checkmark ,close } from 'ionicons/icons';
import React, { Component } from 'react'
import { auth, db } from '../firebase';

export default class ViewBook extends Component {
    constructor(props){
        super(props);
        this.state={
            bookList:[],
            interested:[],
            tempId:null,
            myBookList:[],
            matched:false,
            matchedData:{}
            
        }
    }
    
    select = (id) => {
        //update interested column for the
        var collection = db.collection('books').doc(id.toString())

        

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
            interest_array.push(this.props.userId)
            this.setState({
                interested:interest_array
            })    
            console.log("interested",this.state.interested)
            db.collection("books").doc(id.toString()).update({
                interested: this.state.interested,
                phoneNumber:parseInt(auth.currentUser.photoURL),
                ownerName:auth.currentUser.displayName
            })
                console.log(this.checkifYourIdinAnyItems(this.props.userId,null))
                // if(this.checkifYourIdinAnyItems(this.props.userId,null)===0)
                // console.log("then of checkif",this.state.tempId)
                
            //     let newuserid = this.checkifYourIdinAnyItems(this.props.userId,null);
            //     if(newuserid!==null){
            //         console.log("newuserid",newuserid)
            //         let matched = this.checkifYourIdinAnyItems(newuserid,this.props.userId)
            //         if(matched!==null && matched!==undefined){
            //             console.log("matched with",matched.owner)
            //         }
            // }
            

            //check if there is a match 

        }).catch(function(error) {
            console.log("Error getting document:", error);
        });        // var interest = collection.interest
        // interest.push(this.props.userid)
       
    }
    findMatchedData = (id) => {
        console.log("mybook")
        auth.getUser(id).then(
            rec => console.log(rec)
        )
        this.setState({
            matchedData:this.state.bookList.find(
                i => i.owner === id
            )
        })
        console.log(this.state.matchedData)
    }
    arrayFunction = (array) => {
        array.map( i => this.state.myBookList.map(item => {
            if(item.interested.includes(i)){
                this.setState({matched:true}) 
                this.findMatchedData(i)
            }
            
        })
            )
    }
    checkifMatched = () => {
        var array=[];
        this.state.bookList.map(
            i => i.interested.includes(this.props.userId) && array.push(i.owner)
        )
        console.log("array",array)
        this.arrayFunction(array)
        
    }
  
    reject = (id) => {
        let newarray = this.state.bookList.filter(
            i => i.id!==id
        )
        this.setState({
            bookList:newarray
        })
    }
    componentDidMount = () => {
        this.load()
    }
    load = () => {
        db.collection('books').get().then(
            snapshot => snapshot.forEach(doc => {
            
                var array= this.state.bookList
                var myarray = this.state.myBookList;
                if(doc.data().currentUser !== this.props.userId)
                array.push(doc.data())
                else
                myarray.push(doc.data())
                this.setState({
                    bookList:array
                })
                this.setState({
                    myBookList:myarray
                })
            })
        )
    }
    render() {
        return (
        <div className="bgview" style={{backgroundImage:'https://image.freepik.com/free-photo/front-view-books-with-grey-background_23-2148255885.jpg'}}>
                <div style={{padding:'30px 20px'}}>
            <div>
                {this.state.bookList.length===0 && <h1>No Books Available</h1>}
               {/* <IonButton onClick={()=>this.load()}>Load Books</IonButton>  */}
               {this.state.bookList.map(
                   item => 
                  <IonCard className="containerclass"> 
                     <IonCardHeader>
            <IonCardTitle>{item.bookName}</IonCardTitle>
                        <IonCardSubtitle style={{marginBottom:'25px'}}>{item.bookAuthor}</IonCardSubtitle>
                        <IonButton onClick={()=>this.select(item.id)} style={{marginRight:'20px'}}><IonIcon icon={checkmark} /></IonButton>
                    <IonButton onClick={()=>this.reject(item.id)}><IonIcon icon={close} /></IonButton>
                    <IonButton onClick={()=>this.checkifMatched()}></IonButton>
          </IonCardHeader>

                   
                   </IonCard>
               )}
            </div>
            </div>
            </div>
        )
    }
}
