# `Grafana`-7.2.1中文汉化

这里是已经编译好的直接下载后替换掉对应的bin和public文件即可
在官网下载对应的7.2.1版本：https://grafana.com/grafana/download/7.2.1

- Grafana-chs-7.2.1
  - all#已经汉化好了但是没有编译
  - bin-Linux #Linux下启动文件
  - bin-Windows #Windows下启动文件
  - public #前端汉化界面Windows和Linux都可以使用



## 如果需要自己进行一些修改后编译下面的操作步骤

### 1、前端编译环境

#### 1.1、安装`node.js` 

#### 1.2、安装yarn

**注：**这里安装环境就不细讲

### 2、后端编译环境

#### 2.1、先来配置一下`Golang`的环境

```bash
#1安装wget
yun install -y wget
#下载压缩包， 如果没有网络则在官网下载之后上传解压就可以了
wget https://golang.google.cn/dl/go1.15.6.linux-amd64.tar.gz
#解压压缩包
tar -zxvf go1.15.6.linux-amd64.tar.gz
```

#### 2.2、解压后配置环境变量执行命令：vim /etc/profile  添加如下内容后退出保存

```bash
export GOROOT=/usr/local/go     # Golong 安装目录
export GOPATH=$HOME/goProject   # 将来的工作目录
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin # 将 $GOROOT 和 $GOPATH 加入到 PATH中，方便使用
export GOPROXY=https://goproxy.io # 设置代理
```

环境变量配置如图

![image-20210629093717634](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210629093717634.png)

#### 2.3、执行命令查看是否安装成功

```bash
[root@iZwz97c9sssg8bbb97x5Z blog]# vim /etc/profile
[root@iZwz97c9sssg8bbb97x5Z blog]# source /etc/profile
#执行 go version 显示出版本信息表示安装成功。
[root@iZwz97c9sssg8bbb97x5Z blog]# go version
go version go1.15.6 linux/amd64
```

![image-20210629095604316](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210629095604316.png)

#### 2.4、创建工作目录

```bash
[root@iZwz97c9sssg8bbb97x5Z go]# mkdir goProject
```

**注：**我们编译时必须将需要编译的文件放入工作目录，放入其他位置不可。



### 3、编译和运行

**注：**将下载好的`Grafana`汉化压缩文件上传并解压到我们创建的工作目录

#### 3.1、前端环境

```bash
[root@iZwz97c9sssg8bbb97x5Z grafana-grafana-chs-7.2.1]# npm install -g node-gyp
#安装依赖
[root@iZwz97c9sssg8bbb97x5Z grafana-grafana-chs-7.2.1]# yarn install --pure-lockfile 
#执行编译
[root@iZwz97c9sssg8bbb97x5Z grafana-grafana-chs-7.2.1]# yarn start
#编译完成后，在public文件夹会看到多了个build文件夹
```

![image-20210629103849954](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210629103849954.png)

#### 3.2、后端环境

**注：**

​	1、在Windows下编译后端时可能会提示没有`Gcc`环境下载一个即可

​	2、编译后生成的bin目录下还有一层目录，我们需要将这个目录下的启动文件移动到bin下面来，这样才能启动成功。

​		   Windows编译后是 `windows/amd64`  Linux编译后是 `linux-amd64`我们启动时需要将这个文件下面的启动文件

```bash
#执行如下两步即可
[root@iZwz97c9sssg8bbb97x5Z grafana-grafana-chs-7.2.1]# go run build.go setup
[root@iZwz97c9sssg8bbb97x5Z grafana-grafana-chs-7.2.1]# go run build.go build
#编译完成后，会看到多了个bin文件夹
```

​	![image-20210629103946517](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20210629103946517.png)



#### 3.3、运行 

```bash
#在bin目录下执行启动
./grafana-server &
```



