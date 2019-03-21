<template>
    <div style="display: inline-block;">
        <label class="needsclick" :for="`fileUploader${mulId}`">
            <slot></slot>
        </label>
        
        <input type="file" :accept="accept"  @change="zip" :id="`fileUploader${mulId}`" v-show="false" >
        <!-- <input v-if="device == 'android'" type="file" :accept="accept" multiple  @change="uploadFile" :id="`fileUploader${mulId}`" v-show="false" > -->
    </div>
</template>

<script>
    import axios from 'axios'
    import config from '@/utils/config.js'
    import * as qiniu from 'qiniu-js'
    import lrz from 'lrz'
    export default {
        props:{
            //多个上传组件区分id
            mulId:{
                type:String,
            },
            accept:{
                //上传文件类型
                type:String,
            },
            isZip:{
                //是否压缩
                type:Boolean,
                default:false
            }
        },
        name: "FileUpload",
        data() {
            return {
                uploadProgress: 0,
                progressShow: false,
                fileName: '',
                device:'',
            }
        },
        created(){
           this.device = this.whichDevice()
        },
        methods: {
            //压缩图片
            zip:function(e){
                let _this = this
                Indicator.open()
                
                if(e.target.files[0].type.indexOf('image')>-1){

                    this.getImgWidth(e.target.files[0]).then(res => {

                        lrz( e.target.files[0], {
                            width : res ? res : 400,
                            quality: 0.9   //自定义使用压缩方式
                        })  
                        .then(function(rst) {
                            _this.uploadFile(rst,true)
                            
                        }).catch(function(error) {
                            //失败时执行
                        }).always(function() {
                            //不管成功或失败，都会执行
                        })
                    })
                }else{
                    _this.uploadFile(e,false)
                }
            },
            uploadFile(e,isZip) {
                this.progressShow = true
                this.uploadProgress = 0
                let _this = this
                let uploadGo = setInterval(() => {
                    _this.uploadProgress += 10
                    if (_this.uploadProgress == 80) {
                        clearInterval('uploadGo')
                    }
                }, 500)
                let file = isZip? e.file : e.target.files[0];
                let putExtra = null;
                let type = file.type.split('/');
                if (type[type.length - 1] === 'vnd.ms-powerpoint') {
                    type[type.length - 1] = 'ppt';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.presentationml.presentation') {
                    type[type.length - 1] = 'pptx';
                } else if (type[type.length - 1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    type[type.length - 1] = 'xlsx';
                } else if (type[type.length - 1] === 'plain') {
                    type[type.length - 1] = 'txt';
                }
                let key = this.guid() + '.' + type[type.length - 1];
                let conf = null;
                let fileSize = file.size;
                // return
                this.getQiniuAccessToken((token) => {
                    let observable = qiniu.upload(file, key, token, putExtra, conf);
                    let subscription = observable.subscribe(function (res) {
                    }, function (error) {
                        
                    }, function (res) {
                        let fileUrl = config.imgUrl + res.key;
                        let fileName = isZip?e.origin.name:file.name;
                        _this.uploadProgress = 100;
                        setTimeout(() => {
                            _this.progressShow = false
                        }, 1000)
                        _this.$emit('change', fileUrl, fileName, fileSize, _this.id);
                        _this.$emit('changePlus', {fileUrl, fileName, fileSize})
                        _this.fileName = fileName
                        Indicator.close();
                    })
                });
            },

            getQiniuAccessToken: function (callback) {
              let instance = axios.create();
              let url = config.apiUrl + '/services/request_qiniu_token'
              instance.defaults.headers = config.getHeaders()
              instance.get(url)
              .then(function (response) {
                callback(response.data.data.token)
              })
              .catch(function (error) {
                  console.log(error);
              });
            },

            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },
             whichDevice:function(){
                let u = navigator.userAgent
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
                let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                if (isIOS) {
                return 'ios'
                }
                if (isAndroid) {
                return 'android'
                }
            },

            // 获取元素原始大小
            getImgWidth (file) {
                return new Promise((resolve, reject) => {
                    const reader  = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function () {
                        const img = new Image()
                        img.src = this.result
                        img.onload = () => {
                            const size = img.width * img.height
                            if (size > 500 * 1024) { // 这里理论上最后图片大小为500k 实际上尺寸比500k小很多 300k左右
                                resolve(size/ (500 * 1024) * img.width)
                            } else {
                                resolve(img.width)
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .progress {
        margin-top: 10px;
        width: 200px;
    }
    label{
        display: inline-block;
        width:100%;
        height: 100%;
    }
</style>