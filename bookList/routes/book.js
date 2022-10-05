const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

class Book {
    constructor(title = "", desc = "", id = uuid()) {
        this.title = title;
        this.desc = desc;
        this.id = id;
    }
}
const stor = {
    todo: [
        new Book('Михаил Булгаков - Мастер и Маргарита','Это вечная книга, прославившая Булгакова, которого не имеет определённого жанра.'),
        new Book('Антуан де Сент-Экзюпери - Маленький принц','«Маленький принц» актуален для любого возраста.'),
        new Book('Лев Толстой - Война и мир','Это вечная книга, прославившая Булгакова, которого не имеет определённого жанра.'),
    ]
};

router.get('/', (req, res) => {
    const {todo} = stor;
    res.render("book/index", {
        title: "Список книг",
        todos: todo,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Добавить книгу",
        todo: {},
    });
});

router.post('/create', (req, res) => {
    const {todo} = stor;
    const {title, desc} = req.body;

    const newTodo = new Book(title, desc);
    todo.push(newTodo);

    res.redirect('/')
});

router.get('/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('errors/404');
    } 
        
    res.render("book/view", {
        title: "Информация по книге",
        todo: todo[idx],
    });
    
});

router.get('/update/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('errors/404');
    } 

    res.render("book/update", {
        title: "Редактирование книги",
        todo: todo[idx],
    });
});

router.post('/update/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = todo.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('errors/404');
    } 

    todo[idx] = {
        ...todo[idx],
        title,
        desc,
    };
    res.redirect(`/`);
});

router.post('/delete/:id', (req, res) => {
    const {todo} = stor;
    const {id} = req.params;
    const idx = todo.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('errors/404');
    } 

    todo.splice(idx, 1);
    res.redirect(`/`);
});

module.exports = router;