import PropTypes from 'prop-types';  
import '../../assets/styles/loading/loading.css'

export default function Loading({isOpen}) {
    Loading.propTypes = {
        isOpen:PropTypes.bool.isRequired,
    };

    if (isOpen) {
        return (
            <div className='loading__container'>
                <div className='loading__animation'></div>
            </div>
        )
    }
    return null;
}
