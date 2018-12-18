import React from 'react'
import './chooseDriveView.scss';
import Icon from '../../common/Icon';

const chooseDriveView = ({selectOneDrive, selectGDrive, selectHardDrive, goToNonePage, BackTranslation}) => (

    <div className="choose-drive-content">   
        <div onClick={selectGDrive} className="btn-container">
            <p>Google Drive</p>
            <i className="fab fa-google-drive"></i>
        </div>
        <div onClick={selectOneDrive} className="btn-container">
            <p>One Drive</p>
            <i className="fab fa-windows"></i>
        </div>
        <div onClick={selectHardDrive} className="btn-container">
            <p>Hard Drive</p>
            <i className="fas fa-hdd"></i>
        </div>
        <button onClick={goToNonePage} className="come-back-btn">{BackTranslation}</button>
    </div>
);

export default chooseDriveView;