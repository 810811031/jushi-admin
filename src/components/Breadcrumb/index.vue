<template>
    <div class="breadcrumb-wrapper">
        <i :class="$route.meta.icon"></i>
        {{ $route.meta.title }}
    </div>
</template>

<script>
export default {
    name: 'COMPONENT_BREADCRUMB',
}
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
    width: calc(100% - 220px);
    height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fbfbfb;
    position: fixed;
    top: 50px;
    left: 220px;
    font-size: 14px;
    padding-left: 20px;
    line-height: 40px;
    color: #999;
}
</style>