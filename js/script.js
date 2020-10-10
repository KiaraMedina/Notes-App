// 1 - alamcenamos en la constante addBtn todo lo que pase con el id add
const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}

// 2.-  Le damos un evento click a la constante en la cual ejecutara la funcion que llama a la funcion addNewNote();
addBtn.addEventListener("click", () => {
    addNewNote();
});

//3.- Creamos la funcion que tiene un parametro text vacio
function addNewNote(text = "") {
    const note = document.createElement("div"); // creamos un elemento div que se almacenara en note
    note.classList.add("note"); // a esa constante le asignare una clase note que le estare dando estilos en css

    note.innerHTML = `
    <div class="notes">
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main hidden"></div>
    <textarea class="text"></textarea>
</div> 
    `; // le asigno el innerHtml viene a ser el template como quiero que se vea DOM

    const editBtn = note.querySelector(".edit"); // clase edit guardado en una constante
    const deleteBtn = note.querySelector(".delete"); // clase deletBtn guardado en una constante

    const main = note.querySelector(".main"); // clase main guardado en una constante 
    const textArea = note.querySelector("textarea"); // etiqueta textarea guardada en una constante

    textArea.value = text; // lo que tengo dentro de la etiqueta textarea se va almacenar en Text que primero inicializa como vacio
    main.innerHTML = marked(text); // para eso en el DOM pusimos un enlace java script

    editBtn.addEventListener("click", () => { // a la constante editBtn donde almacenaba lo que pasa en el boton que tiene como clase edit se agrega un evento click que ejecutara la siguiente funcion
        main.classList.toggle("hidden"); // cuando hago click se esconda la clase hidden que esta en el main   
        textArea.classList.toggle("hidden"); // cuando hago nuevamente clik se esconde ahora el textarea y asi sucesivamente un clik se esconde el main, otro click textarea otro click main
    });

    deleteBtn.addEventListener("click", () => {
        note.remove(); // removemos el div que creamos que se guarda en note

        updateLS(); // actuailzamos el localStorage
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS();

    });

    document.body.appendChild(note); // con appendChild agregamos al body el div que creamos
}

//LOCAL_STORAGE

function updateLS() {

    const noteText = document.querySelectorAll('textarea');

    // need to save in array

    const notes = [];

    noteText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}