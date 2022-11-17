import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import { toast } from 'react-toastify';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../storage/FirebaseContext'
import { useHistory } from 'react-router-dom';

const Create = () => {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState(null)
  const [image,setImage] = useState(null)
  const date = new Date()

  const toastOptions =  {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }

    const handleError = (msg) => {
      toast.error(msg,toastOptions)
    }

  const handleSubmit = () => {
    if(!user){
      handleError('Login first')
      history.push('/login')
    }
   else if(name.trim()===''|| name.length<3){
      handleError('This type of usernames are not allowed')
    }else if(image===null){
      handleError('Select an image and then try again')
    }
    else if(price===null || price===''){
      handleError('Seems like you forgot to set Price')
    }else if (category.trim()===''){
      handleError('this kind of category is not allowed')
    }
    else{
      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
        toast.info('Uploading your Product, Please wait',toastOptions)
        ref.getDownloadURL().then((url) => {
          console.log(url,'is the url')
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          }).then((res) => {
            console.log(res,'is the res from add')
            toast.success('Successfully uploaded your Product!',toastOptions)
            setImage(null)
            setCategory('')
            setPrice('')
            setName('')
          })
  
        })
      })
    }
   
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} id="fname" onChange={(e) => setPrice(e.target.value)} name="Price" />
            <br />
         
          <br />
          <img alt=" " width="200px" height="200px" src={image ? URL.createObjectURL(image) :''}></img>
         
            <br />
            <input onChange={(e)=> {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
