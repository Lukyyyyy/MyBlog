# 生产环境部署

本仓库只负责 MyBlog 应用栈：

- Next.js/Payload 通过外部 Docker 网络 `server_proxy` 以 `myblog-app:3000` 提供服务。
- MongoDB 仅允许应用栈的内部私有网络访问，并且必须经过身份验证。
- 服务器级 Caddy 网关由独立的私有仓库 `server-infra` 维护。
- 应用不直接映射宿主机端口；MongoDB 仅绑定到 `127.0.0.1:27017`，用于构建阶段经过身份验证的访问。

规范域名为 `https://lukybetter.com`。共享网关会将 `https://www.lukybetter.com` 重定向到该域名。

## 生产环境变量

生产环境变量应保存在 Git 工作区之外：

```text
/etc/myblog/myblog.env
```

以 `.env.production.example` 作为变量清单。使用 `openssl rand -hex 32` 分别生成每一项密钥，不要重复使用同一个值。MongoDB 密码也应生成为十六进制字符串，这样写入 `DATABASE_URL` 时不需要进行 URL 转义。将文件所有者设置为部署用户，并将权限设置为 `600`。

严禁将生产环境变量文件提交到 Git。严禁向生产数据库写入演示种子数据。

## 前置条件

启动应用前，必须确保共享代理网络已经存在：

```bash
docker network inspect server_proxy
```

首次部署会创建一个全新的数据库。在开放公网网关之前，应通过一次性的内部访问创建首个 Payload 管理员。

## 验证并启动

执行 Compose 命令时，必须始终显式指定外部环境变量文件：

```bash
docker compose --env-file /etc/myblog/myblog.env config --quiet
docker compose --env-file /etc/myblog/myblog.env up -d mongo
docker compose --env-file /etc/myblog/myblog.env build app
docker compose --env-file /etc/myblog/myblog.env up -d mongo app
docker compose --env-file /etc/myblog/myblog.env ps
docker compose --env-file /etc/myblog/myblog.env logs --tail=100 mongo app
```

在首个管理员创建并验证完成之前，不要启动共享 Caddy 网关，也不要对公网开放 TCP 80/443 端口。

## 更新流程

生产环境必须部署明确的 Git 标签，不能直接部署任意工作区内容，也不能跟随持续变化的 `main` 分支最新提交。

每次更新前：

1. 创建并验证 MongoDB 与媒体文件备份。
2. 获取计划部署的 Git 标签。
3. 在替换运行中的容器之前，先构建新的应用镜像。
4. 启动带标签的版本，并等待健康检查通过。
5. 如果健康检查失败，回滚到上一个标签。

应用停止时应至少预留 30 秒用于优雅退出。
