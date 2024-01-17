<template>

    <div v-if="id_location < 50" class="container d-flex flex-row color-1">  
        <div class="row">
            <div v-for="character in characters" class="col-md-3 mb-4">
                <div  class="box">
                    <img :src="character.image" class="card-img-top" alt="character image"
                        @mouseover="handleMouseOver"
                        @click="openModal(character)"
                        :style="{ cursor: isHover ? 'pointer' : 'default' }">
                    <div class="card-body">
                        <h5 class="card-title">Name: {{ character.name }}</h5>
                        <h5 class="card-title">Status: {{ character.status }}</h5>
                        <h5 class="card-title">Species: {{ character.species }}</h5>
                        <h5 class="card-title">Origin: {{ character.origin.name }}</h5>
                        <h5 class="card-title">Episodes: <br>
                            <ul>
                                <li v-for="episode in character.episode" style="font-size:x-small;">
                                    {{ episode }}
                                </li>
                            </ul>
                        </h5>    
                        <button @click="save(character)" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>

            <div v-if="selectedCharacter" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>{{ selectedCharacter.name }}</h2>
                    <p>Status: {{ selectedCharacter.status }}</p>
                    <p>Species: {{ selectedCharacter.species }}</p>
                    <p>Gender: {{ selectedCharacter.gender }}</p>
                    <p>URL: {{ selectedCharacter.status }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if=" 80 > id_location >= 50" class="col-md-3 mb-4 color-2">
        <div class="row">
            <div v-for="character in characters" class="col-md-3 mb-4">
                <div  class="box">
                    <img :src="character.image" class="card-img-top" alt="character image"
                        @mouseover="handleMouseOver"
                        @click="openModal(character)"
                        :style="{ cursor: isHover ? 'pointer' : 'default' }">
                    <div class="card-body">
                        <h5 class="card-title">Name: {{ character.name }}</h5>
                        <h5 class="card-title">Status: {{ character.status }}</h5>
                        <h5 class="card-title">Species: {{ character.species }}</h5>
                        <h5 class="card-title">Origin: {{ character.origin.name }}</h5>
                        <h5 class="card-title">Episodes: <br>
                            <ul>
                                <li v-for="episode in character.episode" style="font-size:x-small;">
                                    {{ episode }}
                                </li>
                            </ul>
                        </h5>    
                        <button @click="save(character)" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>

            <div v-if="selectedCharacter" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>{{ selectedCharacter.name }}</h2>
                    <p>Status: {{ selectedCharacter.status }}</p>
                    <p>Species: {{ selectedCharacter.species }}</p>
                    <p>Gender: {{ selectedCharacter.gender }}</p>
                    <p>URL: {{ selectedCharacter.status }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="col-md-3 mb-4 color-3">
        <div class="row">
            <div v-for="character in characters" class="col-md-3 mb-4">
                <div  class="box">
                    <img :src="character.image" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: {{ character.name }}</h5>
                        <h5 class="card-title">Status: {{ character.status }}</h5>
                        <h5 class="card-title">Species: {{ character.species }}</h5>
                        <h5 class="card-title">Origin: {{ character.origin.name }}</h5>
                        <h5 class="card-title">Episodes: <br>
                            <ul>
                                <li v-for="episode in character.episode" style="font-size:x-small;">
                                    {{ episode }}
                                </li>
                            </ul>
                        </h5>    
                        <button @click="save(character)" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios';
export default{
    data(){
        return{
            characters:[],
            id_location:'',
            isHover: false,
            selectedCharacter: null,
        }
    },
    methods:{
        async save(character){
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/character", {
                    name:character.name,
                    status:character.status,
                    species:character.species
                });

                this.$router.push("/saved-characters");
            } catch (error) {
                
                console.error("Error al agregar película:", error);
            }
        },
        async getLocation(){
            await fetch('https://rickandmortyapi.com/api/location/' + this.$route.params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                var residents = ""
                data.residents.length <= 5 ? residents = data.residents : residents = data.residents.slice(0,7);
                residents.forEach(element => {
                    this.get_data_characters(element)
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        get_data_characters(url){
            fetch(url, {
                method: 'GET',
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                
            })
            .then(response => response.json())
            .then(data => {
                
                if(data.episode.length > 3){
                    data.episode = data.episode.slice(0,3)
                }
 

                this.characters.push(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        validate_id(){
            const id = parseInt(this.id_location);

            if(Number.isInteger(id)){
                this.getLocation();
            }
            else{
                    Swal.fire({
                    title: 'Error, no se puede buscar',
                    text: 'La entrada debe ser un número entero, retornando al home',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 4000
                });

                this.$router.push({name:'home'});
            }
           
        },
        handleMouseOver() {
            this.isHover = true;
        },
        openModal(character) {
            this.selectedCharacter = character;
            const modal = document.querySelector(".modal");
            modal.style.display = "block";
        },
        closeModal() {
            const modal = document.querySelector(".modal");
            modal.style.display = "none";
            this.selectedCharacter = null;
        },
    },
    mounted(){
        this.id_location = this.$route.params.id;
        this.validate_id();
        
    },
}
</script>

<style>
.grid-item { width: 200px; }
.grid-item--width2 { width: 400px; }
.galeria{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container{
    width: 1400px;
    margin: 20px auto;
    columns: 4;
    column-gap: 20px;
}

.container .box{
    width: 100%;
    margin-bottom: 10px;
    break-inside: avoid;
    overflow: auto;
}

.container .box img{
    max-width: 100%;
    border-radius: 15px;
}
@media (max-width: 1200px){
    .container{
        width: calc(100% - 40px);
        columns: 3;
    } 
}

@media (max-width: 768px){
    .container{
        width: calc(100% - 40px);
        columns: 2;
    } 
}

@media (max-width: 480px){
    .container{
        width: calc(100% - 40px);
        columns: 1;
    } 
}

.color-1{
    background-color: green;
}
.color-2{
    background-color: blue;
}
.color-3{
    background-color: red;
}

.cursor-img img:hover{
    cursor: hand;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
}
</style>