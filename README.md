# fis3-media-manage

fis3 media管理器，因为fis3配置meida时，相同的规则经常复制来复制去，不方便统一的修改和维护。
本模块是为了更好的维护和管理media的配置规则。

## 使用方法

## 安装
直接全局安装
```bash
npm install fis3-media-manage -g
```
或者在项目的package.json中把is3-media-manage添加到依赖中

## fis-conf.js引入
```js
//注册fis3-media-manage
require('fis3-media-manage')(fis);

```

## 添加规则 fis.addMediaRule
>fis-conf.js添加一条规则
>规则名称：css_need_sprite
>规则用来：合并css/scss中图片

```js
fis.addMediaRule('css_need_sprite',
    '*.{css,scss}',{
        useSprite: true
    }
)
```

##添加一个media fis.addMedia
>fis-conf.js添加一个media
>media名称：test
>该media包含规则：css_need_sprite和pack_js_css_in_one

```js
fis.addMedia('test',[
    'css_need_sprite',
    'pack_js_css_in_one'
]);
```

## media继承 fis.extendMedia
>fis-conf.js添加一个新的media，新的media是在其他已有的media基础上基础而来
>新media名称：pre-qa
>继承的media名称：test
>继承基础上新增规则：publish_and_skip_packed


```js
fis.extendMedia('test','pre-qa',[
    'publish_and_skip_packed'
]);
```