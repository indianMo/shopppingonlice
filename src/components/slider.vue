<template>
    <el-carousel>
        <el-carousel-item v-for="item in sliderlist" :key="item.id">
            <a href="javascript:void(0)">
                <img :src="item.img_url" alt=""></a>
        </el-carousel-item>
    </el-carousel>
</template>
<script>
export default {
    props:["sliderlist"],
    data: function () {
        return {
            
        }
    },
    methods:{ }
}    
</script>

<style>

</style>
