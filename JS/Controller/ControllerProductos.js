import{
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../Services/ServiceProductos.js'

 
//Primero lo Primero
document.addEventListener('DOMContentLoaded', ()=>{
    const tableBody = document.querySelector('#ProductTable tbody');
    const form = document.getElementById('productForm');
    const modal = new bootstrap.Modal(document.getElementById('ProductModal'));
    const lblModal = document.getElementById('ProductModalLabel'); 
    const btnAdd = document.getElementById('btnAddProduct')

    Init();

    //Cuando se presione el Boton se mandara el Formulario para que se llene Zelaya
    btnAdd.addEventListener('click', ()=>{
        form.reset();
        form.idProduct.value = '';
        lblModal.textContent = 'Agregar Producto';
        modal.show();
    });


    form.addEventListener('submit', async (e) => {
        e.preventDefault(); //No se Puede hacer Submit asi por asi
        const id = form.idProduct.value; 
        const data = { //datos que vienen del formulario-Zelaya
            stockProducto: form.ProductStock.value.trim(),
            nombreProducto: form.ProductName.value.trim(),
            precioProducto: form.ProductPrice.value.trim(),
            categoriaProducto: form.ProductCategory.value.trim(),
            descripcionProducto: form.ProductDescription.value.trim()
        };

        try{
            //si id es verdadero manda a Update
            if(id){
                await updateProduct(id, data);
            }
            else{ //si no hay id se manda el de Crear
                await createProduct(data);
            }

            modal.hide(); //se oculta el Form despues de que se realize lo anterior
            await CargarProductos();
        }
        catch(err){
            console.error("Error: ", err);
        }
    });



     async function CargarProductos(){

        try{
            const Productos = await getProduct();
            tableBody.innerHTML = ""; //vaciamos la tabla

            if(!Productos || Productos.lenght == 0){
                tableBody.innerHTML = '<td colspan="5"> Actualmente no hay registros</td>';
                return;
            }

            Productos.forEach((Zelaya)=>{
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${Zelaya.id}</td>
                    <td>${Zelaya.stockProducto}</td>
                    <td>${Zelaya.nombreProducto || ""}</td>
                    <td>${Zelaya.precioProducto || ""}</td>
                    <td>${Zelaya.categoriaProducto}</td>
                    <td>${Zelaya.descripcionProducto}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary edit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-square-pen">
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                            </svg>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-trash">
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                            <path d="M3 6h18"/>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </td>
                `;

                //funcionaliad para botones de editar
                tr.querySelector(".edit-btn").addEventListener("click", ()=>{
                    form.idProduct.value = Zelaya.id;
                    form.ProductStock.value = Zelaya.stockProducto;
                    form.ProductName.value = Zelaya.nombreProducto;
                    form.ProductPrice.value = Zelaya.precioProducto;
                    form.ProductCategory.value = Zelaya.categoriaProducto;
                    form.ProductDescription.value = Zelaya.descripcionProducto;
                    lblModal.textContent = "Editar Productos";
                    modal.show();
                });

                //botones de Eliminar Productos
                tr.querySelector(".delete-btn").addEventListener('click', () =>{
                    if(confirm("¿Desea eliminar esta Producto?")){
                        deleteProduct(Zelaya.id).then(CargarProductos);
                    }
                });

                tableBody.appendChild(tr); //al tbody se le asigna tr que es la  nueva fila creada

            });
        }

        catch(err){
            console.error("Error cargando Productos: ", err);
        }
        
    }


 function Init(){
        CargarProductos();
    }

});

