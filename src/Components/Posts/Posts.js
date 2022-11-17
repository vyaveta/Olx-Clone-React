import React,{useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../storage/FirebaseContext';
import { PostContext } from '../../storage/PostContext';
import './Post.css';

function Posts() {
const history = useHistory()
const [flag,setFlag] = useState(false)
const {firebase} = useContext(FirebaseContext)
const [products,setProducts] = useState([])
const {setPostDetails} = useContext(PostContext)

  useEffect(() => {
    async function fetchProducts(){
      
    await firebase.firestore().collection('products').get().then(async(snapshot) => {
        const allPosts = await snapshot.docs.map((product,index) => {
         return{
          ...product.data(),
          id:product.id
         }
        })
        setProducts(allPosts)
        console.log(products,'is the products')
      })
      if(flag===false) setFlag(true)
    }
    fetchProducts()
  },[flag])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         {
          products.map((product,index) => {
            return(
              <div
            className="card" key={index}
            onClick={() => {
              setPostDetails(product)
              history.push('/viewpost')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            )
          })
         }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
