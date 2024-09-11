const { useState } = require("react")

const useFormData = (data) => {
	const [formData, setFormData] = useState(data);

	const handleChange = (event) =>
		setFormData(obj => ({
			...obj,
			[event.target.name]: event.target.value
		}))

	const resetData = () => setFormData(data);

	return [formData, handleChange, resetData];
}

export default useFormData