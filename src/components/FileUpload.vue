<template>
    <div style="display: inline-block;">
        <label :for="`fileUploader${mulId}`">
            <slot></slot>
        </label>
        <input v-if="device == 'ios'" type="file" :accept="accept"  @change="uploadFile" :id="`fileUploader${mulId}`" v-show="false" >
        <input v-if="device == 'android'" type="file" :accept="accept" capture="camera" multiple  @change="uploadFile" :id="`fileUploader${mulId}`" v-show="false" >
    </div>
</template>

<script>
    import axios from 'axios'
    import config from '@/utils/config.js'
    import * as qiniu from 'qiniu-js'

    export default {
        props:{
            //多个上传组件区分id
            mulId:{
                type:String,
            },
            accept:{
                type:String,
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
            uploadFile(e) {
                this.progressShow = true
                this.uploadProgress = 0
                let _this = this
                let uploadGo = setInterval(() => {
                    _this.uploadProgress += 10
                    if (_this.uploadProgress == 80) {
                        clearInterval('uploadGo')
                    }
                }, 500)
                let file = e.target.files[0];
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
                this.getQiniuAccessToken((token) => {
                //   console.log(token)
                    let observable = qiniu.upload(file, key, token, putExtra, conf);
                    let subscription = observable.subscribe(function (res) {
                    }, function (error) {
                        console.log(error)
                    }, function (res) {
                        let fileUrl = config.imgUrl + res.key;
                        let fileName = file.name;
                        _this.uploadProgress = 100;
                        setTimeout(() => {
                            _this.progressShow = false
                        }, 1000)
                        // console.log(fileUrl,fileName)
                        _this.$emit('change', fileUrl, fileName, fileSize, _this.id);
                        _this.$emit('changePlus', {fileUrl, fileName, fileSize})
                        _this.fileName = fileName
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
        }
    }
</script>

<style scoped>
    .progress {
        margin-top: 10px;
        width: 200px;
    }
</style>