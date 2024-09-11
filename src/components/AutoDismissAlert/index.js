import React from 'react'
import { motion } from 'framer-motion'

import AutoDismissAlert from './AutoDismissAlert';

const MotionAlert = motion.create(AutoDismissAlert);

const Alert = (props) => (
	<MotionAlert 
		style={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		{...props}
	/>
)

export default Alert
