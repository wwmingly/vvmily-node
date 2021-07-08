* 拉取项目
git clone https://github.com/wwmingly/vvmily-node.git

* 安装依赖
```
cd ./vvmily-node

npm install
```

* 数据库([环境搭建](https://www.kancloud.cn/vvmily_king/vvmily/2331779))，对应两表 bloglist和 users以及对应的字段 key，练习数据库表结构和数据（一般不这么干！！！）已导出存放在`mysql-table`文件中，需要可自行导入
![](https://git.kancloud.cn/repos/vvmily_king/vvmily/raw/4fb75802d481fba6b7697f72e6dd66758395e41e/images/screenshot_1625730082528.png?access-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjU3NTcyNDAsImlhdCI6MTYyNTcxNDA0MCwicmVwb3NpdG9yeSI6InZ2bWlseV9raW5nXC92dm1pbHkiLCJ1c2VyIjp7InVzZXJuYW1lIjoidnZtaWx5X2tpbmciLCJuYW1lIjoidnZtaWx5S2luZyIsImVtYWlsIjoiMjk5MTM3NDQxNUBxcS5jb20iLCJ0b2tlbiI6IjUzM2FmNzU2M2JkY2JhYTZjMmYyNGNiNzI0YTBmNDNjIiwiYXV0aG9yaXplIjp7InB1bGwiOnRydWUsInB1c2giOnRydWUsImFkbWluIjp0cnVlfX19.RzROQfUHi6U0odyasy0ks2UwcHVN0Xn_-KOYVS7LFzI)
*****
* 启动数据库，更多命令请点击 [这里](https://www.kancloud.cn/vvmily_king/vvmily/2331779) 查看
```
net start mysql  // 启动

mysql -u root -p  // 登录
```
* 启动项目
```
npm run dev 

npm run devmon         // 热更新
```