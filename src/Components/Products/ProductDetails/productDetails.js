import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './productDetails.module.css';
import { AuthContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ProductDetails() {

    let productName = useParams().productId;

    const products = useContext(AuthContext);

    let displayProducts = null;

    if (products){
        if (Object.keys(products).length){
            if (products[productName].length){
                displayProducts = products[productName].map(product => {
                    return <Link to={`/product/${productName}/${product.name}`} key={product._id} className={styles.productContainer}>
                        <div className={styles.productContainerImgContainer}>
                            <img src={product.img} alt={product.name} className={styles.productContainerImg} />
                        </div>
                        <div className={styles.productContainerDetailsContainer}>
                            <p className={styles.productContainerDetailsP}>Category: {product.category}</p>
                            <p className={styles.productContainerDetailsP}>Name: {product.name}</p>
                            <p className={styles.productContainerDetailsP}>Quantity: {product.quantity}</p>
                        </div>
                    </Link>
                })
            }
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
                <Link to={`/add-products/${productName}`} className={styles.addBtn}>Add Item</Link>
            </div>
            <h2 className={styles.ProductDetailsH2}>{productName ? productName : ''}</h2>
            <div className={styles.productDetailsView}>
                {displayProducts}
            </div>
        </div>
    )
}

export default ProductDetails
