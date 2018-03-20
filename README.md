<h1 align="center">
  <a href="#">
    <img src="./doc/asserts/edulis.png" alt="Edulis logo" />
  </a>
</h1>

<h3 align="center">网易教育产品交互式前端脚手架</h3>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/midwayjs/pandora/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/npm.svg)
![npm](https://img.shields.io/npm/dy/localeval.svg)



# Edulis - A configurable front-end scaffolding based on NEI
基于NEI的交互式前端脚手架

Edulis致力于提供可扩展的、可配置的、基于NEI工程规范的项目脚手架功能吗，每天为你节省5分钟

## 为什么我们需要交互式脚手架

在NEI工程规范中我们需要类似于：

```bash
nei build -sk 8b99059f8292ebced1335a1285e5d94e -module term -name member-list -author hzhanyuntao
```

这样的命令去生成一个工程的初始结构，which means：

- 每新建一种类型的工程，需要去NEI上找到对应的工程规范的key

- 需要记住这个工程规范包含的参数名，例如:module,name,author

- 一条命令包含了多个参数，难以集成到npm scripts里

在诸如module-term这样的工程里，每新建一个module或component，其命令的module参数其实都是相同的，变化的只有name和author参数。但是由于以上的命令里包含了所有三个参数，所以很难把上面的命令集成到module-term的package.json的scripts里，如果我们添加如下的scripts:

```json
{
    "scripts":{
        "component": "nei build -sk 8b99059f8292ebced1335a1285e5d94e -module term"
    }
}
```

则需要在```npm run component```之后手动添加```-name member-list -author hzhanyuntao```，这种体验显然是不自然和不友好的，很容易因为忘记添加后面的参数导致生成了错误的文件

## Edulis的用法

由于Edulis基于NEI工程规范，显然你需要先安装NEI:

```shell
npm install -g nei
```

然后安装Edulis:

```shell
npm install -g edulis
```

> 因为Edulis的全局配置文件应放置于用户而不是root的home目录下，所以不推荐用sudo进行安装，如果出现非sudo安装权限不够的情况，你需要```sudo chown YOUR_USER_NAME /usr/local/lib/node_modules```，然后安装npm模块就不需要sudo权限了


你可以看到Edulis基本用法如下：

```
  Usage: edulis <command> [--option [value]]

  Options:

    -V, --version            output the version number
    -h, --help               output usage information

  Commands:

    *                        help
    component|com [options]  Build A New Component
    update                   Update Config
    delete                   Delete All Files and Folders in the Current Dictionary
```

在你需要新建module和component的目录，例如```~/develop/module-term/```，运行：

```shell
edulis component
```

你可以看到：

```shell
? Choose a Component Template : (Use arrow keys)
❯ 云课堂 - cms组件
  教育产品 - 通用组件
  教育产品 - 通用模块
  教育产品 - 模块组件
  教育产品 - 业务组件
  教育产品 - 通用缓存
```

就可以用方向键和Enter选择对于的工程模板了，在选择之后，就可以键入对应的参数值。对于上面提到的例子，我们可以这样使用Edulis实现：

```shell
? Choose a Component Template : 教育产品 - 通用模块
? Input the component module: term
? Input the component name: member-list
? Input the component author: hzhanyuntao
```

然后，一个新的“通用模块”就在当前目录诞生啦

## Edulis的配置

NEI上的工程规范那么多，Edulis只会把其中最通用的一部分包含进来。Edulis的全局配置在```~/.edulis.json```，内容如下：

```json
{
    "prefix": "nei build -sk",
    "templates": [

        //...

        {
            "des": "教育产品 - 通用组件",
            "key": "8b99059f8292ebced1335a1285e5d94e",
            "params": [
                "module",
                "name",
                "author"
            ]
        },
        
        //...

    ]
}
```

每一项加入Edulis的工程规范，必须在templates数组里有一个对应的配置对象。

其中，
- ```des```字段表示在Edulis中显示的该工程规范的名称
- ```key```字段表示该工程规范的key
- ```params```表示该工程规范需要的参数

> Notice :
> 
> 1. 要新加入一个工程模板，必须先在NEI上新建对应的工程规范
> 2. 新加入的工程规范如需要配置到Edulis全局配置中，请联系作者
> 3. 全局安装Edulis后，会在home目录自动添加全局配置，如遭遇全局配置错误，可以使用```edulis update```初始化全局配置
> 4. 受限于NEI，Edulis生成新项目的过程并不原子，无法撤销，只能手动删除


### Edulis集成到业务工程里

1. 对于上面提到的module-term的例子，我们可以添加这样的npm scripts：
    ```json
    {
        "scripts":{
            "component": "edulis component -k 8b99059f8292ebced1335a1285e5d94e -m term"
        }
    }
    ```
    用```-k```指定对于工程规范的key，用```-m```指定对应工程规范的module参数，这样，以后使用```npm run component```的时候就不需要在选择模板和输入module参数了，只需要输入name和author参数

2. 有一些业务线里专用的工程规范（例如上面出现过的“云课堂 - cms组件”），我们不需要将其加入全局配置中，只要在相应业务工程中可以使用就行了。Edulis支持业务配置，在实际使用中，Edulis实际取到的配置其实是业务配置和全局配置的和。

    对于“云课堂 - cms组件”这个工程规范，我们可以在component-cms这个工程的根目录里添加业务配置```.edulis.json```:

    ```json
    [
        {
            "des": "云课堂 - cms组件",
            "key": "fb85e7dbb675ef5e194b6234cfcc90d9",
            "params": [
                "name",
        }
    ]
    ```
    > 注意，此时可以省略templates字段，内容直接为templates数组

    添加了以上的业务配置后，只要Edulis在component-cms目录下运行，就能够找到“云课堂 - cms组件”这个工程规范。

## 未来计划

- 添加更多通用工程规范
- 集成umi2project功能，用umi配置生成工程结构
