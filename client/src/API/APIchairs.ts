import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:5000"

export const getChairs = async (): Promise<AxiosResponse<ApiDataType>> => {
	const chairs: AxiosResponse<ApiDataType> = await axios.get(
		baseUrl + "/chairs"
	)
	return chairs
}

export const addChair = async (
	formData: furnitureSchema
): Promise<AxiosResponse<ApiDataType>> => {
	const furniture: Omit<furnitureSchema, "_id"> = {
		size: formData.size,
		material: formData.material,
		color: {
			name: formData.color.name,
			HEX: formData.color.HEX
		},
		quantity: formData.quantity,
		description: formData.description,
		image: formData.image
	}
	console.log(furniture)
	console.table(furniture)
	const saveChair: AxiosResponse<ApiDataType> = await axios.post(
		baseUrl + "/chairs",
		furniture
	)
	return saveChair
}

export const editChair = async (
	_id: string,
	formData: furnitureSchema
): Promise<AxiosResponse<ApiDataType>> => {
	console.log({formData})
	const furniture: Omit<furnitureSchema, "_id"> = {
		size: formData.size,
		material: formData.material,
		color: {
			name: formData.color.name,
			HEX: formData.color.HEX
		},
		quantity: formData.quantity,
		description: formData.description,
		image: formData.image
	}
	console.table(furniture)
	const editChair: AxiosResponse<ApiDataType> = await axios.put(
		`${baseUrl}/chairs/${_id}`,
		furniture
	)
	return editChair
}

export const deleteChair = async (
	_id: string
): Promise<AxiosResponse<ApiDataType>> => {
	const deletedChair: AxiosResponse<ApiDataType> = await axios.delete(
		`${baseUrl}/chairs/${_id}`
	)
	return deletedChair
}