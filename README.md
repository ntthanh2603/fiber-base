# ⚡ MyProject

[![GitHub release](https://img.shields.io/github/release/yourusername/myproject.svg)](https://github.com/yourusername/myproject/releases)
[![Go Report Card](https://goreportcard.com/badge/github.com/yourusername/myproject)](https://goreportcard.com/report/github.com/yourusername/myproject)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/myproject/badge.svg?branch=master)](https://coveralls.io/github/yourusername/myproject?branch=master)
[![Go Doc](https://godoc.org/github.com/yourusername/myproject?status.svg)](https://godoc.org/github.com/yourusername/myproject)
[![License](https://img.shields.io/github/license/yourusername/myproject.svg)](https://github.com/yourusername/myproject/blob/master/LICENSE)

**MyProject** là một thư viện/framework hiệu suất cao được viết bằng [Go](https://go.dev/). Được thiết kế để đơn giản hóa việc phát triển với hiệu suất tối ưu và [zero memory allocation](https://docs.myproject.com/#zero-allocation).

## ⚡ Quickstart

MyProject yêu cầu Go phiên bản **1.19** trở lên. Nếu bạn cần cài đặt hoặc nâng cấp Go, hãy truy cập [trang tải Go chính thức](https://go.dev/dl/).

### 📦 Installation

```bash
go mod init github.com/your/repo
```

```bash
go get -u github.com/yourusername/myproject
```

### 🤖 Basic Usage

Bắt đầu với MyProject rất đơn giản. Đây là ví dụ cơ bản để tạo một ứng dụng đơn giản:

```go
package main

import (
    "log"
    "github.com/yourusername/myproject"
)

func main() {
    // Khởi tạo ứng dụng mới
    app := myproject.New()

    // Định nghĩa route cho GET method trên đường dẫn gốc '/'
    app.Get("/", func(c myproject.Context) error {
        // Gửi phản hồi string cho client
        return c.SendString("Hello, World 👋!")
    })

    // Khởi động server trên port 3000
    log.Fatal(app.Listen(":3000"))
}
```

## ⚙️ Installation

MyProject được tối ưu hóa cho hiệu suất cao, nghĩa là các giá trị trả về từ `myproject.Context` không phải là bất biến theo mặc định và sẽ được tái sử dụng qua các request. Theo nguyên tắc chung, bạn chỉ nên sử dụng context values trong handler và không được giữ bất kỳ tham chiếu nào.

## 🚀 Features

- **Robust** [Routing](https://docs.myproject.com/guide/routing)
- **Serve** [Static Files](https://docs.myproject.com/api/app#static)
- **Extreme** [Performance](https://docs.myproject.com/extra/benchmarks)
- **Low Memory** footprint
- **API** endpoints
- **Middleware** & **Next** support
- **Rapid** server-side programming
- **Template** Engines
- **WebSocket** Support
- **Server-Sent** Events
- **Rate** Limiter
- Và nhiều hơn nữa, [khám phá MyProject](https://docs.myproject.com/)

## 🎯 Benchmarks

Các test này được thực hiện bởi [TechEmpower](https://www.techempower.com/benchmarks/). Nếu bạn muốn xem tất cả kết quả, vui lòng truy cập [Wiki](https://docs.myproject.com/extra/benchmarks) của chúng tôi.

## 🧠 Philosophy

Các lập trình viên Go mới chuyển từ [Node.js](https://nodejs.org/en/about/) sang [Go](https://go.dev/doc/) thường gặp khó khăn trong việc học trước khi có thể bắt đầu xây dựng ứng dụng web hoặc microservices. MyProject, với tư cách là một framework, được tạo ra với ý tưởng tối giản và tuân theo cách tiếp cận UNIX.

MyProject được lấy cảm hứng từ Express, framework web phổ biến nhất trên Internet. Chúng tôi kết hợp sự dễ dàng của Express và hiệu suất thô của Go.

## ⚠️ Limitations

- Do việc sử dụng unsafe của MyProject, thư viện có thể không phù hợp với phiên bản Go mới nhất. MyProject đã được test với Go phiên bản **1.19** trở lên.
- MyProject không tương thích với net/http interfaces. Điều này có nghĩa là bạn sẽ không thể sử dụng các dự án như gqlgen, go-swagger, hoặc bất kỳ dự án nào khác thuộc hệ sinh thái net/http.

## 📖 Examples

Dưới đây là một số ví dụ phổ biến. Nếu bạn muốn xem thêm ví dụ code, vui lòng truy cập [repository Recipes](https://github.com/yourusername/myproject-recipes) hoặc [API documentation](https://docs.myproject.com).

### Basic Routing

```go
package main

import (
    "fmt"
    "log"
    "github.com/yourusername/myproject"
)

func main() {
    app := myproject.New()

    // GET /api/register
    app.Get("/api/*", func(c myproject.Context) error {
        msg := fmt.Sprintf("✋ %s", c.Params("*"))
        return c.SendString(msg) // => ✋ register
    })

    // GET /flights/LAX-SFO
    app.Get("/flights/:from-:to", func(c myproject.Context) error {
        msg := fmt.Sprintf("💸 From: %s, To: %s", c.Params("from"), c.Params("to"))
        return c.SendString(msg) // => 💸 From: LAX, To: SFO
    })

    log.Fatal(app.Listen(":3000"))
}
```

### Static Files

```go
package main

import (
    "log"
    "github.com/yourusername/myproject"
    "github.com/yourusername/myproject/middleware/static"
)

func main() {
    app := myproject.New()

    // Serve static files từ thư mục "./public"
    app.Get("/*", static.New("./public"))
    // => http://localhost:3000/js/script.js
    // => http://localhost:3000/css/style.css

    log.Fatal(app.Listen(":3000"))
}
```

### Middleware & Next

```go
package main

import (
    "fmt"
    "log"
    "github.com/yourusername/myproject"
)

func main() {
    app := myproject.New()

    // Middleware khớp với bất kỳ route nào
    app.Use(func(c myproject.Context) error {
        fmt.Println("🥇 First handler")
        return c.Next()
    })

    // Middleware khớp với tất cả routes bắt đầu với /api
    app.Use("/api", func(c myproject.Context) error {
        fmt.Println("🥈 Second handler")
        return c.Next()
    })

    // GET /api/list
    app.Get("/api/list", func(c myproject.Context) error {
        fmt.Println("🥉 Last handler")
        return c.SendString("Hello, World 👋!")
    })

    log.Fatal(app.Listen(":3000"))
}
```

### JSON Response

```go
package main

import (
    "log"
    "github.com/yourusername/myproject"
)

type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    app := myproject.New()

    // Route trả về JSON object
    app.Get("/user", func(c myproject.Context) error {
        return c.JSON(&User{"John", 20})
        // => {"name":"John", "age":20}
    })

    // Route trả về JSON map
    app.Get("/json", func(c myproject.Context) error {
        return c.JSON(myproject.Map{
            "success": true,
            "message": "Hi John!",
        })
        // => {"success":true, "message":"Hi John!"}
    })

    log.Fatal(app.Listen(":3000"))
}
```

## 🧬 Built-in Middleware

Đây là danh sách middleware có sẵn trong framework MyProject.

| Middleware                                                                            | Description                                                             |
| :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| [basicauth](https://github.com/yourusername/myproject/tree/main/middleware/basicauth) | Basic auth middleware                                                   |
| [cache](https://github.com/yourusername/myproject/tree/main/middleware/cache)         | Intercept và cache responses                                            |
| [compress](https://github.com/yourusername/myproject/tree/main/middleware/compress)   | Compression middleware với hỗ trợ `deflate`, `gzip`, `brotli` và `zstd` |
| [cors](https://github.com/yourusername/myproject/tree/main/middleware/cors)           | Enable cross-origin resource sharing (CORS)                             |
| [csrf](https://github.com/yourusername/myproject/tree/main/middleware/csrf)           | Bảo vệ từ CSRF exploits                                                 |
| [logger](https://github.com/yourusername/myproject/tree/main/middleware/logger)       | HTTP request/response logger                                            |
| [recover](https://github.com/yourusername/myproject/tree/main/middleware/recover)     | Recover từ panics ở bất kỳ đâu trong stack chain                        |
| [timeout](https://github.com/yourusername/myproject/tree/main/middleware/timeout)     | Thêm max timeout cho requests                                           |

## 🔗 External Middleware

Danh sách external middleware modules được duy trì bởi [MyProject team](https://github.com/orgs/yourusername/people).

| Middleware                                           | Description             |
| :--------------------------------------------------- | :---------------------- |
| [storage](https://github.com/yourusername/storage)   | Premade storage drivers |
| [template](https://github.com/yourusername/template) | Template engines        |

## 💡 More Examples

Để xem thêm articles, middlewares, examples, hoặc tools, hãy kiểm tra [awesome list](https://github.com/yourusername/awesome-myproject) của chúng tôi.

## 👍 Contribute

Nếu bạn muốn nói **Cảm ơn** và/hoặc hỗ trợ việc phát triển tích cực của **MyProject**:

- Thêm một [GitHub Star](https://github.com/yourusername/myproject/stargazers) cho dự án
- Tweet về dự án [trên 𝕏 (Twitter)](https://x.com/intent/tweet?text=MyProject)
- Viết review hoặc tutorial trên [Medium](https://medium.com/), [Dev.to](https://dev.to/) hoặc blog cá nhân của bạn
- Hỗ trợ dự án bằng cách donate một [cup of coffee](https://buymeacoff.ee/yourusername)

### Code Contribution

Để đảm bảo contributions của bạn sẵn sành cho Pull Request, vui lòng sử dụng các lệnh `Makefile` sau. Những công cụ này giúp duy trì chất lượng và tính nhất quán của code.

- `make help`: Hiển thị các lệnh có sẵn
- `make audit`: Thực hiện kiểm tra chất lượng
- `make benchmark`: Benchmark hiệu suất code
- `make coverage`: Tạo báo cáo test coverage
- `make format`: Tự động format code
- `make lint`: Chạy lint checks
- `make test`: Thực thi tất cả tests
- `make tidy`: Tidy dependencies

## ☕ Supporters

MyProject là một dự án mã nguồn mở chạy bằng donations để chi trả các chi phí, ví dụ: tên miền, GitBook, Netlify, và serverless hosting. Nếu bạn muốn hỗ trợ MyProject, bạn có thể ☕ [mua một ly cà phê tại đây](https://buymeacoff.ee/yourusername).

| User                               | Donation |
| :--------------------------------- | :------- |
| [@user1](https://github.com/user1) | ☕ x 5   |
| [@user2](https://github.com/user2) | ☕ x 5   |
| [@user3](https://github.com/user3) | ☕ x 3   |

## ⚖️ License

Copyright (c) 2024-present [YourName](https://github.com/yourusername) and [Contributors](https://github.com/yourusername/myproject/graphs/contributors). **MyProject** is free and open-source software licensed under the [MIT License](https://github.com/yourusername/myproject/blob/master/LICENSE). Official logo was created by [YourName](https://github.com/yourusername) and distributed under [Creative Commons](https://creativecommons.org/licenses/by-sa/4.0/) license (CC BY-SA 4.0 International).
