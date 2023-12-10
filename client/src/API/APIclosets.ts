import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:5000"

export const getClosets = async (): Promise<AxiosResponse<ApiDataType>> => {
	const closets: AxiosResponse<ApiDataType> = await axios.get(
		baseUrl + "/closets"
	)
	return closets
}

export const addCloset = async (
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
	const saveCloset: AxiosResponse<ApiDataType> = await axios.post(
		baseUrl + "/closets",
		furniture
	)
	return saveCloset
}

export const editCloset = async (
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
	const editCloset: AxiosResponse<ApiDataType> = await axios.put(
		`${baseUrl}/closets/${_id}`,
		furniture
	)
	return editCloset
}

export const deleteCloset = async (
	_id: string
): Promise<AxiosResponse<ApiDataType>> => {
	const deletedCloset: AxiosResponse<ApiDataType> = await axios.delete(
		`${baseUrl}/closets/${_id}`
	)
	return deletedCloset
}