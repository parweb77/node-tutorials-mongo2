const expect = require('expect');
const request = require('supertest');

const {app}=require('./../server');
const {Todo} = require('./../model/todomodel');

beforeEach( (done) => {
Todo.remove({}).then( () => done() );
});

var text = 'some text';
describe('post/todo',() => {
    it('Should create Todo',(done) =>{        
        var text= "this is some text";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((result)=>{
              expect(result.length).toBe(1);
              expect(result[0].text).toBe(text);
              done();
            }).catch((err)=> done(err));
        });

        });
    });

var text ='';
describe("data test",()=>{

    it('Should not write data',(done)=>{
        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
        });

        Todo.find().then((todo)=>{
            expect(todo.length).toBe(0);
            done();
        }).catch((err)=>{
            return done(err);
        });

    });
});


//.expect((res)=>{
 //   expect(res.body.text).toBe({text});
//})