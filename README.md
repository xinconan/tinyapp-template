# tinyapp-template
A simple template for alipay miniapp with `scss`。

## 目录结构
生成的目录结构：
```
+----scss  // 存放scss源码，目录结构对应小程序的目录结构
  +---- pages
    -- home.scss
    -- other page.scss
  app.scss
+----source  // 存放小程序目录
  +----pages  
    +-- home  // 首页
      -- home.acss  // build css
      -- home.axml
      -- home.js
      -- home.json
    +-- other page
  --- app.acss
  --- app.js
  --- app.json

--- gulpfile.js  // gulp打包配置文件
--- package.json  // 配置文件，项目依赖
```

## 开发
安装依赖`npm install`，监听scss：
```bash
# dev
npm run watch
# build
npm run build
```

`source`是小程序的源码目录，
在`支付宝开发者工具`中，只需要打开`source`目录即可进行调试和预览。

## License
MIT