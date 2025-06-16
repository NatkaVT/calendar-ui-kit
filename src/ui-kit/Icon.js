import React from 'react';
import styles from './Icon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEyeSlash,
    faEye as faRegularEye, 
    faChevronRight, 
    faPlay, 
    faPause, 
    faCheck, 
    faPlus, 
    faMinus, 
    faUser, 
    faTruck, 
    faCircleInfo, 
    faChevronUp, 
    faTrashCan, 
    faCartShopping, 
    faCirclePlay as faRegularCirclePlay, 
    faChevronDown, 
    faChevronLeft, 
    faArrowRightFromBracket, 
    faSquare as faRegularSquare, 
    faSquareCheck, 
    faPen, 
    faTrash, 
    faCaretDown, 
    faX as faSolidX 
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const Icon = ({ icon, size, color, onClick }) => {
    return (
        <div className={styles.iconArea} onClick={onClick}>
            {icon ? (
                <FontAwesomeIcon icon={icon} size={size} style={{ color: color }} />
            ) : (
                <>
                    <FontAwesomeIcon icon={faEyeSlash} style={{ color: '#323749' }}/>
                    <FontAwesomeIcon icon={faRegularEye} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faChevronRight} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faPlay} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faPause} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faCheck} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faPlus} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faMinus} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faUser} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faTruck} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faChevronUp} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faRegularCirclePlay} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faChevronDown} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faChevronLeft} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: '#FFFFFF' }} />
                    <FontAwesomeIcon icon={faSquare} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faSquareCheck} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faPen} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faRegularSquare} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faRegularSquare} style={{ color: '#323749', border:'2px solid #323749', padding:'0 1px', borderRadius: '5px' }} />
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: '#323749' }} />
                    <FontAwesomeIcon icon={faSolidX} style={{ color: '#323749' }} />
                </>
            )}
        </div>
    );
};

export default Icon;
