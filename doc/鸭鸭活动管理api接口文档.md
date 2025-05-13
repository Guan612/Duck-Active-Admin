---
title: 鸭鸭活动管理
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 鸭鸭活动管理

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# user

<a id="opIdUserController_create"></a>

## POST 用户注册

POST /user/register

> Body 请求参数

```json
{
  "loginId": "snmqwq",
  "password": "123456",
  "email": "snmqwq@love.com",
  "nickname": "尚凝梦",
  "headerimg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHE9zbArNH9InG95HMoBd9ibcynQ85VmvGcw&s"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[CreateUserDto](#schemacreateuserdto)| 否 |none|

> 返回示例

> 201 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|string|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|none|string|

<a id="opIdUserController_login"></a>

## POST 用户登录

POST /user/login

> Body 请求参数

```json
{
  "loginId": "nizai",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[LoginUserDto](#schemaloginuserdto)| 否 |none|

> 返回示例

> 201 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|string|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|string|

<a id="opIdUserController_adminLogin"></a>

## POST 管理员登录

POST /user/adminLogin

> Body 请求参数

```json
{
  "loginId": "nizai",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[LoginUserDto](#schemaloginuserdto)| 否 |none|

> 返回示例

> 201 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|string|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|none|string|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|string|

<a id="opIdUserController_findAll"></a>

## GET 获取用户列表

GET /user

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdUserController_findOne"></a>

## GET 获取单个用户信息

GET /user/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 201 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|string|

<a id="opIdUserController_update"></a>

## PATCH 更新用户信息

PATCH /user/{id}

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[UpdateUserDto](#schemaupdateuserdto)| 否 |none|

> 返回示例

> 201 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|string|

<a id="opIdUserController_remove"></a>

## DELETE 删除用户

DELETE /user/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

# active

<a id="opIdActiveController_create"></a>

## POST 创建活动

POST /active

> Body 请求参数

```json
{
  "title": "活动标题1",
  "content": "活动详情1",
  "activitieImgUrl": "http://www.baidu.com",
  "activitieType": 0,
  "isOnline": 0,
  "activeAddress": "活动地点1",
  "activitiePeopleNum": 10,
  "createdPeople": 1,
  "point": 1,
  "startDate": "2024-12-06T16:00:00.000Z",
  "endDate": "2024-12-08T16:00:00.000Z"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[CreateActiveDto](#schemacreateactivedto)| 否 |none|

> 返回示例

> 201 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|string|

<a id="opIdActiveController_findAll"></a>

## GET 获取所有活动

GET /active

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findShowActive"></a>

## GET 获取所有学生活动

GET /active/showActive

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_join"></a>

## POST  是否加入活动

POST /active/join

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

<a id="opIdActiveController_checkActiveStatus"></a>

## GET 检查活动状态

GET /active/checkActiveStatus/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findIsJoin"></a>

## GET 获取用户是否加入活动

GET /active/isJoin

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|activeId|query|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findActiveByCreatUser"></a>

## GET 获取创建者活动

GET /active/findByCreatUser

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findActiveByStatus"></a>

## GET 获取活动状态

GET /active/findByStatus

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|status|query|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findActiveByTime"></a>

## GET 获取活动时间

GET /active/findByTime

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string| 是 |none|
|endDate|query|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findActiveByType"></a>

## GET 获取活动类型

GET /active/findByType

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findHotActive"></a>

## GET 获取最新活动

GET /active/newactive

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_findOne"></a>

## GET 获取单个活动

GET /active/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_update"></a>

## PATCH 更新活动

PATCH /active/{id}

> Body 请求参数

```json
{
  "title": "活动标题1",
  "content": "活动详情1",
  "activitieImgUrl": "http://www.baidu.com",
  "activeAddress": "活动地点1",
  "activitiePeopleNum": 10,
  "activitStatus": 0,
  "remainingNum": 10,
  "point": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|[UpdateActiveDto](#schemaupdateactivedto)| 否 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdActiveController_remove"></a>

## DELETE 删除活动

DELETE /active/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

# registration

<a id="opIdRegistrationController_join"></a>

## POST 加入活动

POST /registration/join

> Body 请求参数

```json
{
  "activeId": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» activeId|body|number| 否 |活动的 ID|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|none|string|

<a id="opIdRegistrationController_findIsJoin"></a>

## GET 获取用户是否加入活动

GET /registration/isJoin

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|activeId|query|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdRegistrationController_findAll"></a>

## GET 获取所有报名信息

GET /registration

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdRegistrationController_findByActiveId"></a>

## GET 查找活动id

GET /registration/findByActiveId/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdRegistrationController_findMyActive"></a>

## GET 获取我的活动

GET /registration/myactive

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdRegistrationController_signInActive"></a>

## GET 签到活动

GET /registration/signInActive/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

# uploadfile

<a id="opIdUploadfileController_uploadImg"></a>

## POST 上传图片文件

POST /uploadfile/img

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

<a id="opIdUploadfileController_uploadavterImg"></a>

## POST 上传头像

POST /uploadfile/avter

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

<a id="opIdUploadfileController_uploadVideo"></a>

## POST 上传视频文件

POST /uploadfile/video

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

<a id="opIdUploadfileController_uploadDoc"></a>

## POST 上传文档文件

POST /uploadfile/doc

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### 返回数据结构

# integral

<a id="opIdIntegralController_create"></a>

## POST 创建积分

POST /integral

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdIntegralController_findAll"></a>

## GET 查询所有用户积分

GET /integral

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdIntegralController_addActivityPoints"></a>

## POST 给活动参与者加分

POST /integral/addpoint/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdIntegralController_findByuser"></a>

## GET 查找用户积分

GET /integral/findByUser

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdIntegralController_update"></a>

## PATCH 更新分数

PATCH /integral/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
"string"
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|string|

<a id="opIdIntegralController_remove"></a>

## DELETE 删除分数

DELETE /integral/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 数据模型

<h2 id="tocS_CreateUserDto">CreateUserDto</h2>

<a id="schemacreateuserdto"></a>
<a id="schema_CreateUserDto"></a>
<a id="tocScreateuserdto"></a>
<a id="tocscreateuserdto"></a>

```json
{
  "loginId": "snmqwq",
  "password": "123456",
  "email": "snmqwq@love.com",
  "nickname": "尚凝梦",
  "headerimg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHE9zbArNH9InG95HMoBd9ibcynQ85VmvGcw&s"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|loginId|string|true|none||用户的用户名|
|password|string|true|none||用户的密码|
|email|string|true|none||用户的邮箱|
|nickname|string|true|none||用户的昵称|
|headerimg|string|true|none||用户的头像|

<h2 id="tocS_LoginUserDto">LoginUserDto</h2>

<a id="schemaloginuserdto"></a>
<a id="schema_LoginUserDto"></a>
<a id="tocSloginuserdto"></a>
<a id="tocsloginuserdto"></a>

```json
{
  "loginId": "nizai",
  "password": "123456"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|loginId|string|true|none||用户的用户名|
|password|string|true|none||用户的密码|

<h2 id="tocS_CreateActiveDto">CreateActiveDto</h2>

<a id="schemacreateactivedto"></a>
<a id="schema_CreateActiveDto"></a>
<a id="tocScreateactivedto"></a>
<a id="tocscreateactivedto"></a>

```json
{
  "title": "活动标题1",
  "content": "活动详情1",
  "activitieImgUrl": "http://www.baidu.com",
  "activitieType": 0,
  "isOnline": 0,
  "activeAddress": "活动地点1",
  "activitiePeopleNum": 10,
  "createdPeople": 1,
  "point": 1,
  "startDate": "2024-12-06T16:00:00.000Z",
  "endDate": "2024-12-08T16:00:00.000Z"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|true|none||活动标题|
|content|string|true|none||活动详情|
|activitieImgUrl|string|true|none||活动图片|
|activitieType|number|true|none||活动类型|
|isOnline|number|true|none||线上或线下|
|activeAddress|string|true|none||活动地点|
|activitiePeopleNum|number|true|none||活动人数|
|createdPeople|number|true|none||创建人id|
|point|number|true|none||活动分数|
|startDate|string(date-time)|true|none||活动开始时间|
|endDate|string(date-time)|true|none||活动结束时间|

<h2 id="tocS_UpdateActiveDto">UpdateActiveDto</h2>

<a id="schemaupdateactivedto"></a>
<a id="schema_UpdateActiveDto"></a>
<a id="tocSupdateactivedto"></a>
<a id="tocsupdateactivedto"></a>

```json
{
  "title": "活动标题1",
  "content": "活动详情1",
  "activitieImgUrl": "http://www.baidu.com",
  "activeAddress": "活动地点1",
  "activitiePeopleNum": 10,
  "activitStatus": 0,
  "remainingNum": 10,
  "point": 1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|title|string|true|none||活动标题|
|content|string|true|none||活动详情|
|activitieImgUrl|string|true|none||活动图片|
|activeAddress|string|true|none||活动地点|
|activitiePeopleNum|number|true|none||活动人数|
|activitStatus|number|true|none||活动状态|
|remainingNum|number|true|none||活动报名人数|
|point|number|true|none||活动分数|

<h2 id="tocS_CreateRegistrationDto">CreateRegistrationDto</h2>

<a id="schemacreateregistrationdto"></a>
<a id="schema_CreateRegistrationDto"></a>
<a id="tocScreateregistrationdto"></a>
<a id="tocscreateregistrationdto"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_UpdateRegistrationDto">UpdateRegistrationDto</h2>

<a id="schemaupdateregistrationdto"></a>
<a id="schema_UpdateRegistrationDto"></a>
<a id="tocSupdateregistrationdto"></a>
<a id="tocsupdateregistrationdto"></a>

```json
{}

```

### 属性

*None*

<h2 id="tocS_UpdateUserDto">UpdateUserDto</h2>

<a id="schemaupdateuserdto"></a>
<a id="schema_UpdateUserDto"></a>
<a id="tocSupdateuserdto"></a>
<a id="tocsupdateuserdto"></a>

```json
{}

```

### 属性

*None*

