import React, { useContext } from 'react'
import styles from './blogProduct.module.css';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


function BlogProducts () {

    const products = useContext(AuthContext);

    let displayProducts = null;

    if (products !== undefined) {
        if (products.hasOwnProperty('blogItem')){
            displayProducts = products['blogItem'].map((product, idx) => {
                return <Link to={`/blogItems/${product._id}`} key={product._id} className={styles.productContainer}>
                    <div className={styles.productContainerImgContainer}>
                        <img src={product.img} alt={product.name} className={styles.productContainerImg} />
                    </div>
                    <div className={styles.productContainerDetailsContainer}>
                        <p className={styles.productContainerDetailsP}>Category: {product.category}</p>
                        <p className={styles.productContainerDetailsP}>Title: {product.title}</p>
                        <p className={styles.productContainerDetailsP}>Date: {product.date}</p>
                    </div>
                </Link>
            })
        }
    }
    else {
        displayProducts = Array.from(Array(12)).map((item, index) => {
            return <div key={index} className={styles.itemContainer}>
                <FontAwesomeIcon icon={faSpinner} className={styles.itemSpinner} spinPulse/>
            </div>
        })
    }
    return (
        <div className={styles.productDetailsContainer}>
            <div className={styles.addBtnContainer}>
                <a href='/add-blog-item' className={styles.addBtn}>Add Item</a>
            </div>
            <h2 className={styles.ProductDetailsH2}>Blog Items</h2>
            <div className={styles.productDetailsView}>
                {displayProducts}
            </div>
        </div>
    )
}

export default BlogProducts
