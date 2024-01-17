<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>status</th>
                    <th>species</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="character in characters">
                    <td>{{ character.name }}</td>
                    <td>{{ character.status }}</td>
                    <td>{{ character.species }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            characters:''
        }
    },
    methods:{
        getAllCharacters(){
            axios.get('http://127.0.0.1:8000/api/character')
        .then(response => {
          this.characters = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error al obtener las películas:', error);
        });
        }
    },
    mounted(){
        this.getAllCharacters();
    }
}
</script>