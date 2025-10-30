//Crear la Constante para mandar a llamr a la API
const API_URL = "https://retoolapi.dev"

/*
EndPoint Completo seria este https://retoolapi.dev/VYcY2B/RecuperacionZelaya20240181

Asi vienen los datos del Endpoint
"id": 1,
    "stockProducto": "45",
    "nombreProducto": "Monitor Curvo 27\" 4K",
    "precioProducto": "399.99",
    "categoriaProducto": "Electrónica",
    "descripcionProducto": "Pantalla con alta tasa de refresco, ideal para diseño y juegos."
*/ 


export async function getProduct(){
    const res = await fetch(`${API_URL}/VYcY2B/RecuperacionZelaya20240181`); //nombre del endpoint 
    return res.json();
}

export async function createProduct(data) { //data son los datos que se pide la funcion para ingresarlos en la base 
    await fetch(`${API_URL}/VYcY2B/RecuperacionZelaya20240181`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

export async function updateProduct(id, data){
    await fetch(`${API_URL}/VYcY2B/RecuperacionZelaya20240181/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

export async function deleteProduct(id) {
    await fetch(`${API_URL}/VYcY2B/RecuperacionZelaya20240181/${id}`, {
        method: 'DELETE'
    });
}
