<template>
    <div style="width:100vh;height:100vh;overflow-y:scroll;background-color:#fff">
        
        <iframe v-if="['doc','docx','xls','xlsx','ppt','pptx'].includes(fileNameHandler)" class=" mt-30" :src='"https://view.officeapps.live.com/op/view.aspx?src="+url' width='100%' height='90%' frameborder='1' sandbox="allow-forms allow-scripts">
        </iframe>
        <img style="max-width:100%;" v-else-if="['png','gif','bmp','jpg','jpeg'].includes(fileNameHandler)" :src="url">
        <embed v-else-if="fileNameHandler === 'pdf'" :src="url" type="application/pdf" width="100%" height="100%">
        
        <div v-else>不支持此文件格式预览</div>
        
        
    </div>
</template>
<script>
export default {
    data(){
        return{
           url:this.$route.query.url,
           name: this.$route.query.name,


        }
    },
    mounted(){
        alert(222)
        console.log(this.$route.query.url,this.$route.query.name)
    },
    computed:{
        fileNameHandler(){
            if(this.name){
                return String(this.name).split('.').pop()
            }else{
                return String(this.url).split('.').pop()
            }
        }
    },
    watch:{
        $route:function(){
            this.url = this.$route.query.url
            this.name =this.$route.query.name
        }
    }
}
</script>
