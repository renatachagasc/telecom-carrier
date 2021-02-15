import * as numbers from "../store/ducks/numbers/actions";
import { createServer, Model } from "miragejs"
import store from '../store';
// import axios from 'axios';

// SIMULATION OF API
createServer({
    models: {
        numbers: Model,
    },
    
    routes() {
        this.get("/numbers", (schema) => { 
            return schema.db.numbers;
        }, { timing: 2000 });

        this.post("/numbers", (schema, request) => {
            schema.db.numbers.insert(request.requestBody);
        });

        this.put("/numbers/:id", (schema, request) => {
            schema.db.numbers.update(request.params.id, request.requestBody);
        });

        this.delete("/numbers/:id", (schema, request) => {
            schema.db.numbers.remove(request.params.id);
        });
    }
});

export function api() {
    let action;
    // const instance = axios.create({
    //     baseURL: '',
    // });

    function error() {
        action = numbers.loadFailure();
        store.dispatch(action);
    }

    async function get() {
        try {
            action = numbers.loadRequest();
            store.dispatch(action);
            
            /*
             *   RETURN ARRAY OF NUMBERS
             */

            // let res = await instance.get('/numbers');
            // DEV
            await fetch("/numbers")
                .then((res) => res.json())
                .then((json) => {
                    action = numbers.loadSuccess(json);
                });

            store.dispatch(action);

        } catch (err) {
            error();
            // 
        }
    }

    async function insert(data) {
        try {
            /*
             *   RETURN OBJECT
             */
            
            // let res = await instance.post('/', data);
            // DEV
            await fetch("/numbers", { method: "POST", body: data })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                });
            get();
        } catch (err) {
            error();
            // 
        }
    }

    async function update(id, data) {
        try {
            /*
             *   RETURN OBJECT
             */

            // let res = await instance.put(`/${id}`);
            // DEV
            await fetch(`/numbers/${id}`, { method: "PUT", body: data });
            get();
        } catch (err) {
            error();
            // 
        }
    }

    async function del(id) {
        try {
            /*
             *   RETURN ID
             */

            // let res = await instance.delete(`/${id}`);
            // DEV
            await fetch(`/numbers/${id}`, { method: "DELETE" });
            get();
        } catch (err) {
            error();
            // 
        }
    }

    return {
        get,
        insert,
        update,
        del
    };
}