import React, { useEffect, useState } from 'react';
import styles from './addBlogProduct.module.css';
import Spinner from '../../../Others/Spinner/spinner';
import Modal from '../../../Others/Modal/modal';

function AddBlogProduct () {

    const [title, setTitle] = useState('');

    const [date, setDate] = useState('');

    const [details, setDetails] = useState('');

    const [photo, setPhoto] = useState([]);

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [status, setStatus] = useState('');
    
    const [btnDisable, setBtnDisable] = useState(true);

    const [productExist, setProductExist] = useState([]);

    useEffect(() => {
        if (title && date && details && photo.length){
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [title, date, details, photo])

    const submitHandler = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const formData = new FormData();

        formData.append('data', JSON.stringify({ category: 'blog', title, date, details }));
        for (let i=0; i<photo.length; i++){
            formData.append('photo', photo[i])
        }

        await fetch('https://bechakenabd.onrender.com/add-blog', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            if (result.status === 'product exist'){
                setProductExist(result.product);
            }
            setStatus(result.status);
            setSpinner(false);
            setModal(true);
        }).catch(err => {
            setStatus('error');
            setSpinner(false);
            setModal(true);
        })
    }

    const statuHandler = () => {
        setStatus('');
        setModal(false);
    }

    let displayStatus = <div className={styles.displayStatusContainer}>
        <h3>Something went wrong</h3>
        <p>Please try again</p>
        <button className={styles.displayStatusBtn} onClick={ statuHandler }>Ok</button>
    </div>

    if (status === 'success'){
        displayStatus = <div className={styles.displayStatusContainer}>
            <h3>Upload success!</h3>
            <button className={styles.displayStatusBtn} onClick={() => window.location.reload()}>Ok</button>
        </div>
    }

    if (status === 'product exist') {
        displayStatus = <div className={styles.displayStatusContainer}>
            <h3>Product exist!</h3>
            <div className={styles.productExistContainer}>
                <div className={styles.productExistImgContainer}>
                    <img src={productExist[0].img[0]} alt={productExist[0].title} className={styles.productExistImg} />
                </div>
                <div className={styles.productExistDetailsContainer}>
                    <h4>{productExist[0].title}</h4>
                    <p>date: {productExist[0].date}</p>
                </div>
            </div>
            <button className={styles.displayStatusBtn} onClick={ statuHandler }>Ok</button>
        </div>
    }

    return (
        <>
        <Spinner spinner={spinner} />

        <Modal modal={modal}>
            {displayStatus}
        </Modal>

        <div className={styles.AddBlogProductContainer}>
            <h2>Add blog Item</h2>
            <form encType='multipart/form-data' className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <label htmlFor='title' className={styles.inputLabel}>Title</label>
                    <input type="text" name='title' className={styles.input} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor='date' className={styles.inputLabel}>Date</label>
                    <input type="text" name='date' className={styles.input} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor='details' className={styles.inputLabel}>Details</label>
                    <textarea type="text" name='details' className={styles.textarea} onChange={(e) => setDetails(e.target.value)}/>
                </div>
                <div className={styles.inputContainer}>
                    <input type='file' multiple name='photo' className={styles.input} onChange={(e) => setPhoto(e.target.files)} />
                </div>

                <button disabled={btnDisable} className={styles.submitBtn} onClick={ submitHandler } >Upload</button>
            </form>
        </div>
        </>
    )
}

export default AddBlogProduct
