<template>
    <div>
        adminindex
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list:[],
                query:{

                }
            }
        },
        mounted () {
            this.getlist();
        },
        methods: {
            getlist() {
               this.list = this.$router.options.routes;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>