import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './homepage.module.css';
import { AuthContext } from '../../App';

function Homepage() {

    const products = useContext(AuthContext);

    const categoryCount = products ? Object.keys(products).length : 0;

    const date = new Date().toDateString();

    return (
        <div className={styles.homepageContainer}>
            <div className={styles.systemMainContainer}>
                <h1 className={styles.systemMainH1}>System Main</h1>
                <h2 className={styles.systemMainH2}>Welcome!</h2>
                <p>Today: {date}</p>

                <div className={styles.systemDashboardContainer}>
                    <div className={styles.systemDashboardRow}>
                        <div className={`${styles.systemDashboardColumn} ${styles.header}`} id={styles.columnHeader}>Products</div>
                        <div className={`${styles.systemDashboardColumn} ${styles.header}`}>Total</div>
                        <div className={`${styles.systemDashboardColumn} ${styles.header}`}>Sold</div>
                        <div className={`${styles.systemDashboardColumn} ${styles.header}`}>Action</div>
                    </div>
                    {products ?
                        <>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Featured</div>
                            <div className={styles.systemDashboardColumn}>{products.featuredItem ? products.featuredItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to="/product/featuredItem" className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Top Seller</div>
                            <div className={styles.systemDashboardColumn}>{products.topSellerItem ? products.topSellerItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to="/product/topSellerItem" className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Trending</div>
                            <div className={styles.systemDashboardColumn}>{products.trendingItem ? products.trendingItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to="/product/trendingItem" className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Exclusive</div>
                            <div className={styles.systemDashboardColumn}>{products.exclusiveItem ? products.exclusiveItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to="/product/exclusiveItem" className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Space saver</div>
                            <div className={styles.systemDashboardColumn}>{products.spaceSaverItem ? products.spaceSaverItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to="/product/spaceSaverItem" className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Bluetooth headphone</div>
                            <div className={styles.systemDashboardColumn}>{products.bluetoothHeadphoneItem ? products.bluetoothHeadphoneItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/bluetoothHeadphoneItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Fashion Wallet</div>
                            <div className={styles.systemDashboardColumn}>{products.fashionWalletItem ? products.fashionWalletItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/fashionWalletItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Smart watch</div>
                            <div className={styles.systemDashboardColumn}>{products.smartWatchItem ? products.smartWatchItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/smartWatchItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Home and living</div>
                            <div className={styles.systemDashboardColumn}>{products.homeAndLivingItem ? products.homeAndLivingItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/homeAndLivingItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Electronics</div>
                            <div className={styles.systemDashboardColumn}>{products.electronicsItem ? products.electronicsItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/electronicsItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Health and beauty</div>
                            <div className={styles.systemDashboardColumn}>{products.healthAndBeautyItem ? products.healthAndBeautyItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/healthAndBeautyItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Fashion</div>
                            <div className={styles.systemDashboardColumn}>{products.fashionItem ? products.fashionItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/fashionItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        <div className={styles.systemDashboardRow}>
                            <div className={styles.systemDashboardColumn} id={styles.columnHeader}>Latest</div>
                            <div className={styles.systemDashboardColumn}>{products.latestItem ? products.latestItem.length : 0}</div>
                            <div className={styles.systemDashboardColumn}>0</div>
                            <div className={styles.systemDashboardColumn}><Link to='/product/latestItem' className={styles.systemDashboardLink}>Check</Link></div>
                        </div>
                        </>
                        : null
                    
                    }
                </div>
            </div>
            <div className={styles.statusContainer} style={categoryCount ? {backgroundColor: 'darkgreen'} : {backgroundColor: 'darkred'}}>
                <p style={{margin: '5px', fontSize: '14px'}}>{categoryCount ? `Category found: ${categoryCount}` : `Category found: 0`}</p>
            </div>
        </div>
    )
}

export default Homepage
