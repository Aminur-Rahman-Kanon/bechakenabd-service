import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './addProducts.module.css';
import Spinner from '../../Others/Spinner/spinner';
import Modal from '../../Others/Modal/modal';

function AddProducts () {

    const productId = useParams().productId;

    const [name, setName] = useState('');

    const [category, setCategory] = useState('');

    const [price, setPrice] = useState('');

    const [quantity, setQuantity] = useState(0);

    const [details, setDetails] = useState('');
    
    const [photo, setPhoto] = useState(null);

    const [btnDisable, setBtnDisable] = useState(false);

    const [status, setStatus] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [productExist, setProductExist] = useState([]);

    const [newCategory, setNewCategory] = useState(false);

    useEffect(() => {
        switch(productId){
            case 'spaceSaverItem':
                setCategory('Space Saver')
                break;
            case 'bluetoothHeadphoneItem':
                setCategory('Bluetooth Headphone');
                break;
            case 'fashionWalletItem':
                setCategory('Fashion Wallet');
                break;
            case 'smartWatchItem':
                setCategory('Smart Watch');
                break;
            case 'homeAndLivingItem':
                setCategory('Home and Living');
                break;
            case 'electronicsItem':
                setCategory('Electronics');
                break;
            case 'healthAndBeautyItem':
                setCategory('Health and Beauty');
                break;
            case 'fashionItem':
                setCategory('Fashion');
                break;
            case 'featuredItem':
                setCategory('Featured');
                break;
            case 'trendingItem':
                setCategory('Trending');
                break;
            case 'exclusiveItem':
                setCategory('Exclusive');
                break;
            case 'topSellerItem':
                setCategory('Top Seller');
                break;
            case 'latestItem':
                setCategory('Latest');
                break;
            case 'new-item':
                setNewCategory(true);
                break;
            default:
                setCategory('');
                break;
        }
    }, [])

    useEffect(() => {
        if (name && price && quantity && details && photo && category) {
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [name, price, quantity, details, photo, category])

    
    const addProduct = async (e) => {
        e.preventDefault();
        setSpinner(true);
        
        const formData = new FormData();

        formData.append('data', JSON.stringify({ name, category, price, quantity, details }));

        const pic = document.getElementById('photo');
        
        for(let i=0; i<pic.files.length; i++){
            formData.append(`photo`, pic.files[i]);
        }

        await fetch('https://bechakenabd.onrender.com/add-products', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            if (result.status === 'product exist'){
                setProductExist(result.product);
            }
            setSpinner(false);
            setStatus(result.status);
            setModal(true);
        })
        .catch(err => setStatus('failed'));
    }

    const closeModal = () => {
        setStatus('');
        setModal(false);
    }

    let displayStatus = <div className={styles.statusContainer}>
        <h3>Something went wrong</h3>
        <p>Please try again</p>
        <button className={styles.displayStatusBtn} onClick={ closeModal }>Ok</button>
    </div>

    if (status === 'success'){
        displayStatus = <div className={styles.statusContainer}>
        <h3>Upload Complete!</h3>
        <button className={styles.displayStatusBtn} onClick={ () => window.location.reload() }>Ok</button>
    </div>
    }

    if (status === 'product exist'){
        displayStatus = <div className={styles.statusContainer}>
            <h3>Product Exists!</h3>
            <div className={styles.productExistContainer}>
                {productExist.map((item, idx) => <div key={idx} className={styles.existProduct}>
                    <div className={styles.existProductImgContainer}>
                        <img src={item.img[0]} alt="karkhana-service" className={styles.existProductImg}/>
                    </div>
                    <div className={styles.existProductDetails}>
                        <p className={styles.existProductDetail}>Category: {item.category}</p>
                        <p className={styles.existProductDetail}>Name: {item.name}</p>
                        <p className={styles.existProductDetail}>Price: {item.price}</p>
                        <p className={styles.existProductDetail}>Quantity: {item.quantity}</p>
                    </div>
                </div>)}
            </div>
            <button className={styles.displayStatusBtn} onClick={ closeModal }>Ok</button>
    </div>
    }

    return (
        <>
        <Modal modal={modal}>
            {displayStatus}
        </Modal>
        <Spinner spinner={spinner}/>
        <div className={styles.addItemContainer}>
            <h2 className={styles.addItemH2}>Add {category} products</h2>
            <form encType='multipart/form-data' className={styles.addItemFormContainer}>
                <div className={styles.inputContainer} style={newCategory ? {display: 'flex'} : {display: 'none'}}>
                    <p className={styles.label}>Category</p>
                    <input required type="text" onChange={(e) => setCategory(e.target.value)} className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <p className={styles.label}>Name</p>
                    <input required type="text" onChange={(e) => setName(e.target.value)} className={styles.input}/>
                </div>

                <div className={styles.inputContainer}>
                    <p className={styles.label}>Price</p>
                    <input required type="number" onChange={(e) => setPrice(e.target.value)} className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <p className={styles.label}>Quantity</p>
                    <input required type="number" onChange={(e) => setQuantity(e.target.value)} className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <p className={styles.label}>Details</p>
                    <textarea required className={styles.detailsInput} onChange={(e) => setDetails(e.target.value)} />
                </div>

                <input id="photo" name={`${productId}`} type="file" multiple onChange={(e) => setPhoto(e.target.files)} className={styles.fileInput}/>

                <button disabled={btnDisable} className={styles.addBtn} onClick={ addProduct }>Ok</button>

            </form>
        </div>
        </>
    )
}

export default AddProducts
