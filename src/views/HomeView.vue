<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
    <div class="row home">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="Card image cap">
            <div class="card-body">
                <p class="card-text"><b>Ingrese un id de location para buscar a los personajes.</b></p>
            </div>
        </div>
    </div>
</template>

<style>
.home{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
