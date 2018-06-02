const expect = require('expect');
const request = require('supertest');
var {ObjectID}=require('mongodb');

const {app}=require('./../server/server');
const {Todo} = require('./../model/todomodel');

const todo = [
    {text:'my first todo',
    _id: new ObjectID() },
            
    {text:'my second to do',
    _id: new ObjectID()
    }
];

before(function (done){
    Todo.remove({}, (err, result)=>done());
    });
    
var todo1 ={
    text:'my first todo',
   // _id: new ObjectID('5b112259473eed2360674a7a')
    _id: '5b112259473eed2360674a7a'
}; 
//}; 
//var text = 'some text';
describe('post/todo',() => {
    it('Should create Todo',(done) =>{        
        //var text= "this is some text";               
        request(app)
        .post('/todos')
        .send(todo1)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(todo1.text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find(todo1).then((result)=>{
              expect(result.length).toBe(1);
              expect(result[0].text).toBe(todo1.text);              
              done();
            }).catch((err)=> done(err));
        });

        });

after(function (done){
    Todo.insertMany(todo, ()=>done());                
});
var text2 ={text:''};
    it('Should not write data',(done)=>{
        request(app)
        .post('/todos')
        .send(text2)
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
        });

        Todo.find().then((todo)=>{
            expect(todo.length).toBe(1);
            done();
        }).catch((err)=>{
            return done(err);
        });

    });
});




describe('GET TESting ', () => {
    
    it('should test GET data', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect (res.body.todos.length).toBe(3);
        })
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        })

    });

})


describe('Testing GET todo/id', ()=>{

    it('should fetch the todo ID', (done)=>{
        request(app)
        .get(`/todos/${todo1._id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todo1.text);
        })
        .end(done)

    });
    
    it('should return invalid object id', (done)=>{
        //var invalid_id = todo1._id+1;
        request(app)
            .get('/todos/5b112259473eed2360674a7b')
            .expect(400)
            .expect((res)=>{
                expect(res.body.error).toBe('ID not found')
            })
            .end(done);
    });

    it('should return invalid object id', (done)=>{
        //var invalid_id = todo1._id+1;
        request(app)
            .get('/todos/123')
            .expect(404)
            .expect((res)=>{
                expect(res.body.error).toBe('Invalid Object ID')
            })
            .end(done);
    });
});