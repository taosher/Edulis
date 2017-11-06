# edu-cli 配置说明

edu-cli的配置托管在[ykt-front/.edu](https://g.hz.netease.com/ykt-front/.edu)

运行```edu update```命令可更新到最新配置

> 在NEI上新建的工程规范，需要添加到配置文件中可以使用

### 配置项内容

以以下的配置为例：

```json
{
    "prefix"   : "nei build -sk",
    "templates": [
        {
            "des"      : "CMS组件",
            "key"       : "fb85e7dbb675ef5e194b6234cfcc90d9",
            "params"    : [
                "name",
                "author"
            ]
        },
        {
            "des"      : "教育产品 - 通用组件",
            "key"       : "8b99059f8292ebced1335a1285e5d94e",
            "params"    : [
                "module",
                "name",
                "author"
            ]
        }
    ]
}
```

- template里配置了可以使用的NEI工程规范
- des字段为提示的工程规范名称
- key字段为该组件的NEI工程规范的key，即

    ```nei build -sk a55cd53d266bfcc60759ef842bb6ac96 -module message -name pager -author caijf```

    中一长串的字符串

- params为参数数组，以

    ```nei build -sk a55cd53d266bfcc60759ef842bb6ac96 -module message -name pager -author caijf```
    
    为例，参数数组的元素为：module,name,author


