import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "Home" */ './components/Home.vue');
const Book = () => import(/* webpackChunkName: "Book" */ './components/Book.vue');

const parseProps = r=>({id:parseInt(r.params.id)});

const router = new VueRouter({  
  mode:'history',  
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/book/:id',
            name: 'book_view',
            component: Book,
            props: parseProps,
        },       
  ]
});

export default router;