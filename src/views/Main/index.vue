<template>
    <div class="main-wrapper">
        <NavDom />
        <HeaderDom />
        <BreadDom />
        <div class="main-content">
            <transition name="change-animation">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
import HeaderDom from '@/components/Header'
import NavDom from '@/components/Nav'
import BreadDom from '@/components/Breadcrumb'

export default {
    name: 'PAGE_MAIN',
    components: {
        HeaderDom, NavDom, BreadDom
    }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
    width: 100%;
    height: 100%;
    .main-content {
        width: calc(100% - 220px);
        height: calc(100% - 90px);
        position: fixed;
        top: 90px;
        left: 220px;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 20px;
        padding-bottom: 20px;
    }
}
.change-animation-enter {
    transform: translateY(-20px);
    opacity: 0;
}
.change-animation-enter-active {
    transition: all .5s ease;
}
</style>