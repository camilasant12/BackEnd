//clase usuario
class Usuario {
    
    constructor(nombre, apellido, mascotas, libros){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }
    nombreCompleto(){
        let nombreCompleto = `Nombre Completo:${this.nombre}  ${this.apellido}`;
        return nombreCompleto;
    }

    addMascota(nombreMascota){
        
        this.mascotas.push(nombreMascota);
        
        return this.mascotas;
    }
    countMascotas(){
        let mascotas = this.mascotas;
        let cantidadMascotas = mascotas.length
        return cantidadMascotas;
    }

    addLibro([libroArray]){
        this.libros.push(libroArray);
        return this.libros;
    }

    countLibros(){
        let libros = this.libros;
        let cantidadLibros = libros.length;
        return cantidadLibros;
    }
    
    getBookName(){
        let arrBooks = this.libros; 
        let nomBook = [];
        for (const producto of arrBooks) {
            nomBook.push(producto.nombre);
        }         

        return nomBook;
    }
}

let u = new Usuario('Camila', 'Santos', ['Perro'], [{nombre:'Orgullo y prejuicio ' , autor:'Jane Austen'}]);
console.log(u.nombreCompleto());
u.addMascota('Conejo');
u.addMascota('Pajaro');
console.log("El usuario tiene: " + u.countMascotas() + " Mascotas");
u.addLibro([{nombre:'Cien años de soledad' , autor:'Gabriel García Márquez'}]);
u.addLibro([{nombre:'Twilight' , autor:'Stephenie Meyer'}]);
console.log("El usuario tiene: " + u.countLibros() + " Libros");
console.log(u.getBookName());