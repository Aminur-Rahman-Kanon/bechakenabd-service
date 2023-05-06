import React, { useContext } from 'react';
import { Link }  from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from './productList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const route = (id) => {
    switch (id) {
        case 'Space Saver':
            return '/product/spaceSaverItem';
        case 'Bluetooth Headphone':
            return '/product/bluetoothHeadphoneItem';
        case 'Fashion Wallet':
            return '/product/fashionWalletItem';
        case 'Smart Watch':
            return '/product/smartWatchItem';
        case 'Home and Living':
            return '/product/homeAndLivingItem';
        case 'Electronics':
            return '/product/electronicsItem';
        case 'Health and Beauty':
            return '/product/healthAndBeautyItem';
        case 'Fashion':
            return '/product/fashionItem';
        case 'Featured':
            return '/product/featuredItem';
        case 'Top Seller':
            return '/product/topSellerItem';
        case 'Exclusive':
            return '/product/exclusiveItem';
        case 'Trending':
            return '/product/trendingItem';
        case 'Latest':
            return '/product/latestItem';
        default:
            return '';
    }
}

function ProductList () {
    const products = useContext(AuthContext);

    let displayProduct = Array.from(Array(10)).map((item, index) => {
        return <div key={index} className={styles.defaultDisplay}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.defaultSpinner} />
        </div>
    });

    if (products){
        if (Object.keys(products).length){
            displayProduct = Object.values(products).map(item => {
                if (item.length){
                    return <Link to={route(item[0].category)} key={item[0]._id} className={styles.productContainer}>
                        <div className={styles.productImgContainer}>
                            <img src={item[0].img} alt={item[0].name} className={styles.productImg}/>
                        </div>
                        <div className={styles.productDetailsContainer}>
                            <h3 className={styles.productListH3}>Category: {item[0].category}</h3>
                            <p className={styles.productListP}>Total Item: {item.length}</p>
                        </div>
                    </Link>
                }
            })
        }
    }


    return (
        <div className={styles.productListContainer}>
            <div className={styles.addCategoryContainer}>
                <Link to='/add-products/new-item' className={styles.addCategoryBtn}>Add New Category</Link>
            </div>
            <div className={styles.productListMain}>
                {displayProduct}
            </div>
        </div>
    )
}

export default ProductList;
