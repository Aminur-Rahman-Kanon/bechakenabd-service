import React from 'react';
import { SpinnerDotted } from 'spinners-react';
import styles from './spinner.module.css';

function Spinner ({spinner}) {
    
    if (!spinner) return;

    return (
        <div className={styles.spinnerContainer}>
            <SpinnerDotted size={80} thickness={83} speed={100} color="rgba(173, 108, 77, 1)" />
            <p className={styles.spinnerP}>Please Wait</p>
        </div>
    )
}

export default Spinner
