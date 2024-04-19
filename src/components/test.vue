<template>
<div class="wrap">
<div class="circle">
    <span>按我</span>
</div>
</div>
</template>
<style lang="scss" scoped>
.wrap{
    width: 100%;
}
.circle{
    position: relative;
    width: 200px;
    height: 70px;
    border-radius: 40px;
    border: 2px solid $primary;
    
    margin: auto;
    display: flex;
    overflow: hidden;
    &:before{
        content: '';
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 40px;
        background-color: $primary;
        transform: scaleX(0);
        transform-origin: left;
        transition: 0.3s cubic-bezier(0.11, 0.88, 0.42, 1);
        position: absolute;
    }
}
span{
        color: $primary;
        margin: auto;
        display: inline-block;
        z-index: 1;
        font-size: 30px;
        transition: 0.3s cubic-bezier(0.11, 0.88, 0.42, 1);
    }
.circle:hover::before{
    transform: scaleX(1); 
}
.circle:hover{
    span{
        color: rgb(255, 255, 255);
    }
    
}
</style>