import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from './productSummary.module.css';
import Modal from '../../Others/Modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../Others/Spinner/spinner';

const ProductSummary = () => {

    const product = useContext(AuthContext);

    const {productCategory, productId} = useParams();

    const [products, setProducts] = useState({});

    const [price, setPrice] = useState(0);

    const [quantity, setQuantity] = useState(0);

    const [productDetails, setProductDetails] = useState('');

    const [deleteQuery, setDeleteQuery] = useState(false);

    const [modal, setModal] = useState(false);

    const [status, setStatus] = useState('');

    const [deleteComplete, setDeleteComplete] = useState(false);

    const [spinner, setSpinner] = useState(false);

    console.log(product);

    useEffect(() => {
        if (product){
            if (Object.keys(product).length){
                if(productCategory && productId){
                    const item = product[productCategory].filter(i => i.name === productId);
                    if (item.length){
                        setProducts(item[0]);
                        setPrice(item[0].price);
                        setProductDetails(item[0].details)
                        setQuantity(item[0].quantity);
                    }
                }
            }
        }
    }, [product])

    let displayProduct = <div className={styles.defaultDisplayContainer}>
        <div className={styles.defaultSpinnerContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.defaultSpinner} />
        </div>

        <div className={styles.defaultPanel}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.defaultSpinner} />
        </div>
    </div>

    if (Object.keys(products).length){
        displayProduct = <div className={styles.productCategoryItem}>
            <div className={styles.productCategoryImgContainer}>
                <img src={products.img} alt={products.name} className={styles.productCategoryImg} />
            </div>
            <form className={styles.productCategoryDetailsContainer}>
                <p className={styles.productSummaryP}>Category: {products.category ? products.category : 'N/A'}</p>
                <p className={styles.productSummaryP}>Item: {products.name ? products.name : 'N/A'}</p>
                <p className={styles.productSummaryP}>Rating: {products.rating || products.rating === 0 ? products.rating : 'N/A'}</p>
                <div className={styles.inputContainer}>
                    <p className={styles.productSummaryP}>Price</p>
                    <input type="number"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           className={styles.input}/>
                </div>

                <div className={styles.inputContainer}>
                    <p className={styles.productSummaryP}>Quantity</p>
                    <input type='number'
                           value={quantity}
                           className={styles.input}
                           onChange={(e) => setQuantity(e.target.value)}/>
                           </div>
                <textarea type="text" value={productDetails} className={styles.productCategoryDetails} onChange={(e) => setProductDetails(e.target.value)}/>
                <div className={styles.btnGroup}>
                    <button className={styles.applyBtn} onClick={(e) => {
                        e.preventDefault();
                        setModal(true)
                    }}>Apply Changes</button>

                    <button className={styles.applyBtn} onClick={(e) => {
                        e.preventDefault();
                        setDeleteQuery(true);
                        setModal(true);
                    }}>Remove Item</button>
                </div>
            </form>
        </div>
    }

    const submithandler = (e) => {
        e.preventDefault();
        setSpinner(true);
        setModal(false);
        fetch('https://bechakenabd.onrender.com/update-product', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products, price, quantity, productDetails
            })
        }).then(res => res.json()).then(result => {
            setSpinner(false);
            setStatus(result.status);
            setModal(true);
        }).catch(err => {
            setSpinner(false);
            setStatus('failed');
            setModal(true);
        });
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        setSpinner(true);
        setModal(false);
        fetch('http://localhost:8000/delete-products', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products
            })
        }).then(res => res.json()).then(result => {
            setSpinner(false);
            if (result.status === 'success'){
                setDeleteComplete(true);
            }
            setStatus(result.status);
            setModal(true);
        }).catch(err => {
            setSpinner(false);
            setStatus('failed');
            setModal(true);
        });
    }

    const statusHandler = () => {
        setModal(false);
        setStatus('');
    }

    let displayMsg = <div className={styles.warningMsgContainer}>
        <h4>Are you sure Applying these changes?</h4>
        <div className={styles.btnGroup}>
            <button className={styles.changesBtn} onClick={ deleteQuery ? deleteHandler : submithandler }>Yes</button>
            <button className={styles.changesBtn} onClick={() => setModal(false)}>No</button>
        </div>
    </div>

    if (status === 'success'){
        displayMsg = <div className={styles.warningMsgContainer}>
            <h4>Information updated</h4>
            <div className={styles.btnGroup}>
                <button className={styles.changesBtn} onClick={ () => {
                    if (deleteComplete){
                        window.location.href = `/product/${productCategory}`
                    }
                    else {
                        window.location.reload();
                    }
                }}>Ok</button>
            </div>
        </div>
    }
    else if (status === 'invalid request' || status === 'failed') {
        displayMsg = <div className={styles.warningMsgContainer}>
            <h4>Something went wrong</h4>
            <p>Try again</p>
            <div className={styles.btnGroup}>
                <button className={styles.changesBtn} onClick={ statusHandler }>Ok</button>
            </div>
        </div>
    }
    else if (status === 'not found') {
        displayMsg = <div className={styles.warningMsgContainer}>
            <h4>Product not found</h4>
            <p>Try again</p>
            <div className={styles.btnGroup}>
                <button className={styles.changesBtn} onClick={ statusHandler }>Ok</button>
            </div>
        </div>
    }

    return (
        <>
        <Spinner spinner={spinner} />
        <Modal modal={modal}>
            {displayMsg}
        </Modal>
        <div className={styles.productSummaryContainer}>
            <h2 className={styles.productSummaryH2}>{productId}</h2>
            {displayProduct}
        </div>
        </>
    )
}

export default ProductSummary
