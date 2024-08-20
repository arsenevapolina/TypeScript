const enum RequestMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

interface IManeRequest {
  url: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

interface IRequest extends IManeRequest {
  method: RequestMethods;
}

class ReqBuilder {
  private methods: RequestMethods[] = [];
  private urls: IManeRequest["url"][] = [];
  private body?: IManeRequest["body"] = {};
  private headers?: IManeRequest["headers"] = {};

  addMethod(method: RequestMethods) {
    if (this.methods.includes(method)) {
      return this;
    }
    this.methods.push(method);
    return this;
  }

  addUrl(url: IManeRequest["url"]) {
    if (this.urls.includes(url)) {
      return this;
    }
    this.urls.push(url);
    return this;
  }

  addBody(body: IManeRequest["body"]) {
    if (!body || Object.keys(body).length === 0) {
      return this;
    }
    this.body = body;
    return this;
  }

  addHeaders(headers: IManeRequest["headers"]) {
    if (!headers || Object.keys(headers).length === 0) {
      return this;
    }
    this.headers = headers;
    return this;
  }

  build(): IRequest[] {
    const res: IRequest[] = [];

    for (const method of this.methods) {
      for (const url of this.urls) {
        res.push({
          method,
          url,
          body: this.body,
          headers: this.headers,
        });
      }
    }
    return res;
  }
}

console.log(
  new ReqBuilder()
    .addMethod(RequestMethods.Get)
    .addHeaders({
      Accept: "application/json",
    })
    .addUrl("https://www.typescriptlang.org/")
    .build()
);
