new Vue({
    el:'.container',
    data:{
        addressList:[],
        limit:2,
        checkedAddress:0,
        dispatchingmethod:1
    },
    mounted:function(){
        this.$nextTick(function(){
            this.showAddress();
        })
    },
    computed:{
        limitAddress:function(){

            return this.addressList.slice(0,this.limit);
        }
    },

    methods:{
        changeLimit:function(){
            this.limit+=2;
            if(this.limit>=this.addressList.length){
                this.$refs.more.remove();
            }
        },
        changeChecked:function(index){
            this.checkedAddress=index;
        },
        setDefault:function(id){
            this.addressList.forEach(function(item,index){
                if(item.addressId==id){
                    item.isDefault=true;
                }else{
                    item.isDefault=false;
                }
            });
        },
        showAddress:function(){
            var _this=this;
            axios.get('./data/address.json')
                 .then(function(res){
                    if(res.data.status==1){
                          _this.addressList=res.data.result;
                    }
            })
        }
    }
})