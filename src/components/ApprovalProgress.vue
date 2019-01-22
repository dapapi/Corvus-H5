<template>
    <div>
        <ul class="apr-ul">
            <li class="clearfix" v-for="(item,index) in approvalProgress" :key="index">
                <i class="status iconfont" v-if="item.change_state_obj" :class="item.change_state_obj.changed_icon.split('|')[0]" :style="{color:item.change_state_obj.changed_icon.split('|')[1]}"></i>
               <img class="float-left" :src="item.icon_url" alt="" >
               <!-- <span class="float-left">{{item.name}}</span> -->
               <div class="float-left">
                   <p class="name">{{item.name}}{{item.change_state_obj.changed_state}}</p>
                   <p class="time">{{item.change_at}}</p>
               </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import config from '@/utils/config'
export default {
    props:{
       formid:{
           required: true
       }
    },
    data(){
        return {

        }
    },
    computed:{
       ...mapState([
            'approvalProgress',
            
        ])
    },
    mounted(){
        // console.log(this.formid)
        this.getApproval({id:this.formid})
    },
    methods:{
        ...mapActions([
            'getApproval'
        ]),
    },

}
</script>
<style lang="scss" scoped>
    .apr-ul{
        border-left:1px solid #ECECEC;
        padding-left:0.32rem;
        li {
            padding:.16rem 0;
            position: relative;

            // min-height: .8rem;
            img{
                width: 0.48rem;
                height: 0.48rem;
                border-radius: 50%;
                margin-right:.2rem;
            }
            .time{
                color:#A4A4A4;
                font-size: .24rem;
            }
            .name{
                color:#333333;
                font-size: .24rem;
            }
            .status{
                position: absolute;
                left: -0.6rem;
                top:0.1rem
            }
        }
    }
</style>


