### Git

#### 什么是Git?
  - Git是一款源代码管理工具(版本控制工具)

#### Git安装

#### 初始化Git仓储/(仓库)
- 这个仓库会存放，git对我们项目代码进行备份的文件
- 在项目目录右键打开 git bash
- 命令: `git init`


#### 自报家门
- 在git中设置当前使用的用户是谁
- 每一次备份都会把当前备份者的信息存储起来
- 命令: 
    + 配置用户名:`git config --global user.name "xiaoming"`
    + 配置邮箱:  `git config --global user.email "xm@sina.com"`

#### 把代码存储到.git仓储中
- 1.把代码放到仓储的门口
    + `git add ./readme.md` 所指定的文件放到大门口
    + `git add ./` 把所有的修改的文件添加到大门口
- 2.把仓储门口的代码放到里面的房间中去
    + `git commit -m "这是对这次添加的东西的说明" `

#### 可以一次性把修改的代码放到房间里(版本库)
- `git commit --all -m "一些说明"`
    + --all 表示是把所有修改的文件提交到版本库

#### 查看当前的状态
- 可以用来查看当前代码有没有被放到仓储中去
- 命令: `git status`

#### git中的忽略文件
- .gitignore,在这个文件中可以设置要被忽略的文件或者目录。
- 被忽略的文件不会被提交仓储里去.
- 在.gitignore中可以书写要被忽略的文件的路径，以/开头，
- 一行写一个路径，这些路径所对应的文件都会被忽略，不会被提交到仓储中
    + 写法
        * ` /.idea  ` 会忽略.idea文件
        * ` /js`      会忽略js目录里的所有文件
        * ` /js/*.js` 会忽略js目录下所有js文件

#### 查看日志
- `git log` 查看历史提交的日志
- `git log --oneline` 可以看到简洁版的日志

#### 回退到指定的版本
- `git reset --hard Head~0`
    + 表示回退到上一次代码提交时的状态
- `git reset --hard Head~1`
    + 表示回退到上上次代码提交时的状态

- `git reset --hard [版本号]`
    + 可以通过版本号精确的回退到某一次提交时的状态

- `git reflog`
  + 可以看到每一次切换版本的记录:可以看到所有提交的版本号

#### 分支
- 默认是有一个主分支master

##### 创建分支
- `git branch dev`
    + 创建了一个dev分支
    + 在刚创建时dev分支里的东西和master分支里的东西是一样的

#####切换分支
- `git checkout dev`
    + 切换到指定的分支,这里的切换到名为dev的分支
- `git branch` 可以查看当前有哪些分支
- `git branch -D dev` 删除分支

##### 合并分支
- `git merge dev`
    + 合并分支内容,把当前分支与指定的分支(dev),进行合并
    + 当前分支指的是`git branch`命令输出的前面有*号的分支
- 合并时如果有冲突，需要手动去处理（将不需要的删除），处理后还需要再提交一次.

#### 提交代码到github(当作git服务器来用)
- `git push [地址] master`
 + 示例: `git push https:*****.git master  master`
 + 会把当前分支的内容上传到远程的master分支上
- `git pull [地址] master`
 + 示例: `git pull https://****.git master`
 + 会把远程分支的数据得到:(**注意本地-要初始一个仓储!**)

- `git clone [地址]`
 + 会得到远程仓储相同的数据,如果多次执行会覆盖本地内容。

#### git 流程实例
![Alt text](./实例.png)

#### ssh方式上传代码
- 公钥 私钥,两者之间是有关联的。
- 生成公钥,和私钥
    + `ssh-keygen -t rsa -C "xiaoming@sina.com"`

#### 在push和pull操作进
- 先pull , 再push

- 在push时，加上-u参数，那么在下一次push时我们只需要写上`git push`就能上传我们的代码。(加上-u之后，git会把当前分支与远程的指定的分支进行关联。git push origin master)


