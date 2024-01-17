<template>
    <div class="row">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <router-link :to="{ name: 'home'}" class="navbar-brand" href="http://localhost:5175/">Home</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link :to="{ name: 'saved-characters'}" class="nav-link active" aria-current="page">Guardados</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search" @submit.preventDefault="search(idLocation)">
                    <input v-model="idLocation" class="form-control me-2" placeholder="Search" aria-label="Search">
                    <!--<router-link v-if="idLocation" class="btn btn-outline-success" :to="{ name: 'characters',  params: {id: idLocation}}" :key="$route.fullPath"><span><i class="fa-solid fa-equals"></i></span>search</router-link>-->
                    <button v-if="idLocation" class="btn btn-outline-success"><span><i class="fa-solid fa-equals"></i></span>search</button>
                </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default{
    data(){
        return{
            idLocation:''
        }
    },
    methods:{
        async search(id){
            
            this.$router.push({name:'characters', params:{id:id}});

        },
    },
}
</script>

<style>
.navbar{
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 80px;
    padding-right: 80px;
}
</style>