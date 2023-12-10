import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:5000"

export const getTables = async (): Promise<AxiosResponse<ApiDataType>> => {
	const tables: AxiosResponse<ApiDataType> = await axios.get(
		baseUrl + "/tables"
	)
	return tables
}

export const addTable = async (
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
	const saveTable: AxiosResponse<ApiDataType> = await axios.post(
		baseUrl + "/tables",
		furniture
	)
	return saveTable
}

export const editTable = async (
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
	const editTable: AxiosResponse<ApiDataType> = await axios.put(
		`${baseUrl}/tables/${_id}`,
		furniture
	)
	return editTable
}

export const deleteTable = async (
	_id: string
): Promise<AxiosResponse<ApiDataType>> => {
	const deletedTable: AxiosResponse<ApiDataType> = await axios.delete(
		`${baseUrl}/tables/${_id}`
	)
	return deletedTable
}