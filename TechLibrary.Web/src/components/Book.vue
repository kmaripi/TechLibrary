<template>
    <div v-if="book">
        <b-container class="bookViewContainer">
            <b-row class="h-25 d-inline-block"></b-row>
            <b-row>
                <b-col sm="7">
                    <div v-if="checkbox">
                        <b-card class="mt-3" header="Edit Book Details" header-bg-variant="primary" header-text-variant="white">
                            <b-form @submit="onEdit" @reset="onReset">
                                <b-form-group id="input-group-1"
                                              label="Title"
                                              label-for="input-1">
                                    <b-form-input id="input-1"
                                                  v-model="book.title"
                                                  type="text"
                                                  required></b-form-input>
                                </b-form-group>

                                <b-form-group id="input-group-2" label="Image URL" label-for="input-2">
                                    <b-form-input id="input-2"
                                                  v-model="book.thumbnailUrl"
                                                  type="text"
                                                  required></b-form-input>
                                </b-form-group>

                                <b-form-group id="input-group-3" label="Description" label-for="input-3">
                                    <b-form-textarea id="input-3"
                                                     v-model="book.descr"
                                                     type="text"
                                                     required></b-form-textarea>
                                </b-form-group>

                                <b-button class="mr-1" type="submit" variant="primary">Update</b-button>
                                <b-button class="mr-1" type="reset" variant="danger">Cancel</b-button>
                            </b-form>
                        </b-card>
                    </div>
                    <div v-else>
                        <b-card :title="book.title"
                                :img-src="book.thumbnailUrl"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 30rem;"
                                class="mb-2">
                            <b-card-text>
                                {{ book.descr }}
                            </b-card-text>
                            <b-button to="/" variant="primary">Back</b-button>
                        </b-card>
                    </div>
                </b-col>
                <b-col sm="1">
                    <label class="switch">
                        <input type="checkbox" @click="toggleCheckbox">
                        <span class="slider round"></span>
                    </label>
                </b-col>
                <b-col sm="2">
                    <label class="lblCheckbox">{{controlValue}}</label>
                </b-col>
            </b-row>
            <b-row class="h-25 d-inline-block"></b-row>
            <!--<b-row>
                <b-button class="mr-1" type="submit" variant="success" v-on:click="addNew" v-if="checkbox">Add New Book</b-button>
            </b-row>-->
        </b-container>
    </div>
</template>



<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';

    export default {
        name: 'Book',
        props: ["id"],
        data: () => ({
            book: null,
            checkbox: false,
            controlValue: "View Mode",           
            newBook:null,
        }),
        methods: {
            ...mapActions(['updateBookAction']),
            ...mapActions(['addBookAction']),
            onEdit(event) {
                event.preventDefault();
                this.updatedBook = this.updateBookAction(this.book);                
                this.checkbox = !this.checkbox;
            },
            onReset(event) {
                event.preventDefault();
                this.show = false;
                this.$router.push({ name: 'home' });
            },
            toggleCheckbox() {
                this.checkbox = !this.checkbox;
                this.controlValue = this.checkbox ? "Edit Mode" : "View Mode";                
                this.$emit('setCheckboxVal', this.checkbox);
            },
            //addNew(event) {
            //    event.preventDefault();
            //    this.book.bookId = null;
            //    this.book.isbn = null;
            //    this.book.publishedDate = null;
            //    this.newBook = this.addBookAction(this.book); 
            //    console.log(this.newBook.bookId);
            //    console.log(this.newBook.descr);
            //    this.$router.push({ path: `/book/${this.newBook.bookId}` });
            //}
        },
        computed: {
        },
        mounted() {
            axios.get(`https://localhost:5001/books/${this.id}`)
                .then(response => {
                    this.book = response.data;
                });
        }
    }
</script>
<style scoped src="@/assets/css/BookStyles.css"></style>
