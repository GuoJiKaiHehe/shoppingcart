 new Vue({
    el:'#app',
    data:{
        title:'hello',
        productList:[],
        checkAll:false,
        totalMoney:0,
        mark_model:false,
        curProduct:null,
        checkedAllFlag:false
    },
    mounted:function(){
        // console.log(this.$refs.dd)
        this.$nextTick(function(){
          
             this.cartView();
        })
       
    },
    filters:{
                formatMoney:function(params,type){
                    return '$'+params.toFixed(2)+type;
                }
            },
   
    methods:{
        delProduct_sure:function(){

            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.mark_model=false;
        },
        hide_mark:function(){
            this.mark_model=false;
        },
        delProduct:function(product){

            this.curProduct=product;

            this.mark_model=true;
        }, 
        checkedAll:function(){
            console.log('aaaa');
            _this=this;
            this.checkedAllFlag=!this.checkedAllFlag;
            
                this.productList.forEach(function(product,index){
                    if(product.checked==undefined){
                        _this.$set(product,'checked',_this.checkedAllFlag);
                    }else{
                        product.checked=_this.checkedAllFlag
                    }
                });
                this.calcTotalMoney();

        },
        
        changeMoney:function(product,type){
            if(type==1){
                product.productQuentity++;
            }else{
                product.productQuentity--;
                if(product.productQuentity==0){
                    product.productQuentity=1;
                }
            }
        },
        changeCheck:function(product){
            if(product.checked==undefined){
                this.$set(product,'checked',true);
            }else{
                product.checked=!product.checked;

            }
            this.calcTotalMoney();
        },
        cancelCheckedAll:function(){
            this.checkedAllFlag=true;
            this.checkedAll();
            this.calcTotalMoney();
        },
        calcTotalMoney:function(){
            this.totalMoney=0;
            var _this=this;
            this.productList.forEach(function(item,index){
                if(item.checked==true){
                    _this.totalMoney+=item.productQuentity*item.productPrice;
                }
            })
        },
        cartView:function(){
            var _this=this;
            axios.get('/data/cart.json',{'id':1234})
                 .then(function(res){
                    if(res.data.status==1){
                        _this.totalMoney=res.data.result.totalMoney;
                        _this.productList=res.data.result.productList;
                     
                    }
                   
                   
                 })
        }
    }

 })