import React, {useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../App';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './blogProductDisplay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../../Others/Modal/modal';
import Spinner from '../../../Others/Spinner/spinner';

function BlogProductDisplay () {

    const navigate = useNavigate();

    const products = useContext(AuthContext);

    const productId = useParams();

    const productIndex = productId.index;

    const [product, setProduct] = useState([]);

    const [title, setTitle] = useState('');

    const [date, setDate] = useState('');

    const [details, setDetails] = useState('');

    const [photo, setPhoto] = useState(null);

    const [status, setStatus]= useState('');

    const[modal, setModal] = useState(false);

    const [spinner, setSpinner] = useState(false);

    console.log(productId.blogId);

    console.log(product)
    console.log(products)

    const submitHandler = (e) => {
        e.preventDefault();
        setSpinner(true);
        const formData = new FormData();

        formData.append('data', JSON.stringify({ title, date, details, productIndex, index: productId.blogId }));
        formData.append('photo', photo);

        fetch('https://bechakenabd.onrender.com/update-blog', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            setSpinner(false);
            setStatus(data.status);
            setModal(true);
        }).catch(err => {
            setSpinner(false);
            setStatus('error');
            setModal(true);
        });
    }

    useEffect(() => {
        if (products){
            if (Object.keys(products).length){
                if (products['blogItems'].length){
                    const extractItem = products['blogItems'].filter(item => item._id === productId.blogId);
                    setProduct(extractItem);
                    setTitle(extractItem[0].title);
                    setDate(extractItem[0].date);
                    setDetails(extractItem[0].details);
                }
            }
        }
    }, [products])

    let displayProduct = <div className={styles.defaultDisplay}>
        <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner} />
    </div>;

    if (product.length){
        displayProduct = product.map(item => <div key={item._id} className={styles.blogDisplayContainer}>
            <div className={styles.blogDisplayImgContainer}>
                <img src={item.img} alt={item.title} className={styles.blogDisplayImg}/>
            </div>
            <form className={styles.blogDetailsContainer}>
                <div className={styles.blogInputContainer}>
                    <input type='file'
                           className={styles.input}
                           style={{padding: '5px'}}
                           onChange={(e) => setPhoto(e.target.files[0])}/>
                </div>

                <div className={styles.blogInputContainer}>
                    <p>Title</p>
                    <input type='text'
                           className={styles.input}
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className={styles.blogInputContainer}>
                    <p>Date</p>
                    <input type='text'
                           className={styles.input}
                           value={date}
                           onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={styles.blogInputContainer}>
                    <p>Details</p>
                    <textarea className={styles.detailsInput}
                              value={details}
                              onChange={(e) => setDetails(e.target.value)}/>
                </div>

                <div className={styles.btnGroup}>
                    <button className={styles.btn} onClick={ submitHandler }>Save changes</button>
                </div>

            </form>
        </div>)
    }

    const closeModal = () => {
        setModal(false);
        setStatus('');
    }

    let displayStatus = <div className={styles.displayStatusContainer}>
        <h4>Something went wrong</h4>
        <p>Please try again</p>
        <button className={styles.displayStatusBtn} onClick={ closeModal }>Ok</button>
    </div>

    if (status === 'success'){
        displayStatus = <div className={styles.displayStatusContainer}>
        <h4>Updated</h4>
        <button className={styles.displayStatusBtn} onClick={() => window.location.reload() }>Ok</button>
    </div>
    }
    
    return (
        <>
        <Modal modal={modal}>
            {displayStatus}
        </Modal>
        <div className={styles.blogMain}>
            <div className={styles.blogDisplayMain}>
                {displayProduct}
            </div>
        </div>
        </>
    )
}

export default BlogProductDisplay
