<template>
    <div class="home">
        <h1>{{ msg }}</h1>
        <b-container fluid>
            <b-row>
                <b-col sm="5" md="5" class="my-1">
                </b-col>
                <b-col lg="7" class="my-1">
                    <b-form-group label=""
                                  label-for="filter-input"
                                  label-cols-sm="3"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="mb-0">
                        <b-input-group size="sm">
                            <b-form-input id="filter-input"
                                          v-model="filter"
                                          type="search"
                                          placeholder="Type to Search"></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="5" md="5" class="my-1">
                    <b-form-group label="Per Page"
                                  label-for="per-page-select"
                                  label-cols-sm="6"
                                  label-cols-md="4"
                                  label-cols-lg="3"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="my-2">
                        <b-form-select id="per-page-select"
                                       v-model="perPage"
                                       :options="pageOptions"
                                       size="md"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col sm="7" md="7" class="my-1">
                    <b-pagination v-model="currentPage"
                                  :total-rows="rows"
                                  :per-page="perPage"
                                  align="fill"
                                  size="md"
                                  :number-of-pages="numPages"
                                  first-text="First"
                                  prev-text="Prev"
                                  next-text="Next"
                                  last-text="Last"
                                  class="my-2"></b-pagination>
                </b-col>
            </b-row>
            <b-row>
                <b-table striped hover
                         :items="books"
                         :fields="fields"
                         :current-page="currentPage"
                         :per-page="perPage"
                         :filter="filter"
                         responsive="md"
                         show-empty
                         small>
                    <template v-slot:cell(thumbnailUrl)="data">
                        <b-img :src="data.value" thumbnail fluid></b-img>
                    </template>
                    <template v-slot:cell(title_link)="data">
                        <b-link :to="{ name: 'book_view', params: { 'id' : data.item.bookId } }">{{ data.item.title }}</b-link>
                    </template>
                </b-table>
            </b-row>
        </b-container>
    </div>
</template>

<script>

    import { mapActions, mapState, mapGetters } from 'vuex';

    const dataFields = [
        { key: 'thumbnailUrl', label: 'Book Image' },
        { key: 'title_link', label: 'Book Title', sortable: true, sortDirection: 'desc' },
        { key: 'isbn', label: 'ISBN', sortable: true, sortDirection: 'desc' },
        { key: 'descr', label: 'Description', sortable: true, sortDirection: 'desc' }

    ];

    export default {
        name: 'Home',
        props: {
            msg: String
        },
        data: () => ({
            currentPage: 1,
            perPage: 10,
            pageOptions: [5, 10, 15, { value: 100, text: "Show More" }],
            fields: [],
            filter: ''
        }),

        methods: {
            ...mapActions(['getBooksAction']),
            async getBooks() {
                await this.getBooksAction();
            },
            getSearchResult() {
                const search = this.filter;
                return this.searchResult(search);
            }
        },
        computed: {
            ...mapState(['books']),
            ...mapGetters(["searchResult"]),

            numPages() {
                return Math.ceil(this.books.length / this.perPage);
            },

            rows() {
                return this.books.length;
            },
        },
        mounted() {

        },
        async created() {
            this.fields = dataFields;
            await this.getBooks();
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

