# fis3-deploy-scp

## 说明

FIS的scp部署插件，使用前先配置好目标服务器的authorized_keys。

scp适合单机部署的方式，多机部署请使用rsync。此插件打包原理是首先把输出文件夹压缩成zip包，然后scp到目标服务器，最后在目标服务器上解压缩到指定文件夹。

## 使用方法

配置中指定编译输出文件夹，并且配置给scp插件。

```js
fis.media('dev').match('*', {
  deploy:[
    fis.plugin('local-deliver', {
      to: './output' //配置编译输出路径
    }),
    fis.plugin('scp', {
      source: './output', //要上传的文件夹
      server: 'root@127.0.0.1', //服务器用户和地址
      to: '/***/fis-demo' // 要上传到的远程机器的文件夹
    })
  ] 
})
```

然后执行 fis3 dev 即可发布到服务器指定目录中。


