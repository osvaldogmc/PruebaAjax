function guardarLibro(i){ 
    let json = document.querySelector('#jsondetalle'+i).innerText; 
    let jsonp = JSON.parse(json);
    if(localStorage.getItem(jsonp.ID)!=null){
        localStorage.removeItem(jsonp.ID);
    }else{
        localStorage.setItem(jsonp.ID, json);
    } 
}
function cargarLibrosDeCategoria(id_categoria){// este parametro será dinámico, irá variando según la categoria que pinches
    $.ajax({
        url:'https://www.etnassoft.com/api/v1/get/?category_id=' + id_categoria, // acá va la url que corresponde al endpoint que va a cargar todos los libros de una categoría y le concatenas el parámetro que entra 
        type:'get',
        beforeSend:function(){
            document.getElementById('list-book').innerHTML = '<h3>cargando</h3>';
        },
        success:function(r){
            let json = JSON.parse(r); 
            console.log(json);
            // document.getElementById('list-book').innerHTML = r;
            let listadoLibros = '';
            listadoLibros += '<div class="row">';
            json.forEach( (e,i) => {
                listadoLibros+='<div class="col"><div class="card"  style="width: 18rem;">'
                    listadoLibros+='<img src="'+e.cover+'" class="card-img-top" onclick="detalleLibro('+e.ID+', '+id_categoria+')" alt="...">';
                    listadoLibros+='<div class="card-body">';
                        listadoLibros+='<h5 class="card-title">ID:'+e.ID+'</h5>';
                        listadoLibros+='<h5 class="card-title">Titulo:'+e.title+'</h5>';
                        listadoLibros+='<h5 class="elelista" onclick="guardarLibro('+i+')">Guardar Libro</h5>';
                        listadoLibros+='<div style="display:none" id="jsondetalle'+i+'">'+JSON.stringify(e)+'</div>';
                        listadoLibros+='<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>';
                        listadoLibros+='<a href="#" class="btn btn-primary">Go somewhere</a>';
                        listadoLibros+='</div>';
                        listadoLibros+='</div>';
                        listadoLibros+='</div>';
            });
            listadoLibros += '</div>';
            document.getElementById('list-book').innerHTML = listadoLibros;
        }
    }); 

}
function obtenerLibros(){
    $.ajax({
        url:'https://www.etnassoft.com/api/v1/get/?criteria=most_viewed', // acá va la url que corresponde al endpoint que va a cargar todos los libros de una categoría y le concatenas el parámetro que entra 
        type:'get',
        beforeSend:function(){
            document.getElementById('list-book').innerHTML = '<h3>cargando</h3>';
        },
        success:function(r){
            let json = JSON.parse(r); 
            console.log(json);
            // document.getElementById('list-book').innerHTML = r;
            let listadoLibros = '';
            listadoLibros += '<div class="row">';
            json.forEach( (e,i) => {
                listadoLibros+='<<div class="col"><div class="card" style="width: 18rem;">';
                    listadoLibros+='<img src="'+e.cover+'" class="card-img-top" onclick="detalleLibro('+e.ID+', 0)" alt="...">';
                    listadoLibros+='<div class="card-body">';
                        listadoLibros+='<h5 class="card-title">ID:'+e.ID+'</h5>';
                        listadoLibros+='<h5 class="card-title">Titulo:'+e.title+'</h5>';
                        listadoLibros+='<h5 class="elelista" onclick="guardarLibro('+i+')">Guardar Libro</h5>';
                        listadoLibros+='<div style="display:none" id="jsondetalle'+i+'">'+JSON.stringify(e)+'</div>';
                        listadoLibros+='<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>';
                        listadoLibros+='<a href="#" class="btn btn-primary">Go somewhere</a>';
                        listadoLibros+='</div>';
                        listadoLibros+='</div>';
                        listadoLibros+='</div>';
            });
            listadoLibros += '</div>';
            document.getElementById('list-book').innerHTML = listadoLibros;
        }
    }); 
}
function detalleLibro (obtenerId, id_categoria){
    $.ajax({
        url:'https://www.etnassoft.com/api/v1/get/?id=' + obtenerId, // acá va la url que corresponde al endpoint que va a cargar todos los libros de una categoría y le concatenas el parámetro que entra 
        type:'get',
        beforeSend:function(){
            document.getElementById('list-book').innerHTML = '<h3>cargando</h3>';
        },
        success:function(r){
            let json = JSON.parse(r); 
            console.log(json);
            // document.getElementById('list-book').innerHTML = r;
            let listadoLibros = '';
            if (id_categoria == 0){
                listadoLibros = '<h4 class="elelista" onclick="obtenerLibros()">Volver</h4>';
            }
            else{
                listadoLibros = '<h4 class="elelista" onclick="cargarLibrosDeCategoria('+id_categoria+')">Volver</h4>';
            }   
            json.forEach(e => {
                listadoLibros+='<div class="card" style="width: 18rem;">';
                    listadoLibros+='<img src="'+e.cover+'" class="card-img-top" alt="...">';
                    listadoLibros+='<div class="card-body">';
                        listadoLibros+='<h5 class="card-title">ID:'+e.ID+'</h5>';
                        listadoLibros+='<h5 class="card-title">Titulo:'+e.title+'</h5>';
                        listadoLibros+='<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>';
                        listadoLibros+='<a href="#" class="btn btn-primary">Go somewhere</a>';
                        listadoLibros+='</div>';
                        listadoLibros+='</div>';
            });
            document.getElementById('list-book').innerHTML = listadoLibros;
        }
    }); 
}
$('#call_service').click(function(){
    $.ajax({
url:'https://www.etnassoft.com/api/v1/get/?get_categories=all',
type:'get',
success:function(r){
    console.log(r);
    let li = '<ul>';
    
JSON.parse(r).forEach(e => {
    li+='<li class="elelista" onclick="cargarLibrosDeCategoria('+e.category_id+')">'+e.name+'</li>';
});
li+='</ul>';
document.querySelector('#json_response').innerHTML+=li;
}
});
});