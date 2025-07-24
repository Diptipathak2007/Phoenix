import PropTypes from 'prop-types';
import {motion,AnimatePresence, easeOut} from 'framer-motion';
const Snackbar = ({ snackbar }) => {
    // Define the animation variants
    const snackbarVariant={
        hidden:{scaleY:0},
        visible:{
        scaleY:1,
        transition:{
            duration:0.2,
            ease:[0.05,0.7,0.1,1],
        },
        },
    }
    const snackbarChildVariant={
        hidden:{opacity:0},
        visible:{
            opacity:1,
            
        },
    }
  return (
    <AnimatePresence>
      {snackbar.open && (
        <motion.div  
        initial='hidden'
        animate='visible'
        exit={{
            opacity:0,
            transition:{
                duration:0.15,
                ease:easeOut,
            },
        }}
        
        variants={snackbarVariant} 
        className={`snackbar ${snackbar.type}`}>
          <motion.span variants={snackbarChildVariant} transition={{duration:0.2,delay:0.1,ease:'easeOut'}}>{snackbar.message}</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Snackbar.propTypes = {
  snackbar: PropTypes.object,
};

export default Snackbar;
