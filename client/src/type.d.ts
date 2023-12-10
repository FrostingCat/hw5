interface furnitureSchema {
	_id: string
	size: string
	material: string
	color: {
		name: string
		HEX: string
	}
	quantity: string
	description: string
	image: string
}

interface furnitureProps {
	furniture: furnitureSchema
}

type ApiDataType = {
	message: string
	status: string
	furniture: furnitureSchema[]
	furniture?: furnitureSchema
}