居然有人忘记吃饭？？？

为了解决这个问题，我写了一个微信机器人到点就提醒他吃饭。

[github](https://github.com/diaozxin007/remindEat)

使用方法

```shell
git clone https://github.com/diaozxin007/remindEat
```

修改 config/default.json 里面的 'toName' 为要提醒人的备注。

```shell
cd remindEat
npm install
```

'wechaty' 使用了无头浏览器，安装的过程中会到 google 下载 chromium。如果遇到下载不成功的错误。可以尝试

```shell
export PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org
npm install
```

编译完成后：

```shell
node remindEat.js
```

如果在 `ubuntu` 上启动报错缺少包，可以参考[github](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)

扫码登录以后，对方应该不会忘记吃饭了。

谢谢大家