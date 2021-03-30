<<!--template>
    <form action="#" @submit.prevent="UpdateBook" v-on:keyup="form.errors.clear($event.target.name)">
        <div class="form-group">
            <label for="type">Title</label>
            <input v-model="book.title" type="text" class="form-control">
        </div>

        <div class="form-group">
            <label for="comment">Description</label>
            <input v-model="book.descr" type="text" class="form-control">
        </div>
    </form>
</template>

<script lang="ts">
</script>

<style scoped>
</style>-->