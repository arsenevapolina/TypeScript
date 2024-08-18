interface IRequestFormat {
  getDataById(id: number): Promise<unknown | undefined>;
}

class APIRequest implements IRequestFormat {
  async getDataById(id: number): Promise<unknown | undefined> {
    const data = await fetch(`https://dummyjson.com/products/${id}`);
    return data.json();
  }
}

class APIRequestProxy implements IRequestFormat {
  constructor(private api: APIRequest) {}
  async getDataById(id: number): Promise<unknown | undefined> {
    if (id > 10) {
      console.error("Id must be less than 10!");
      return undefined;
    }
    return await this.api.getDataById(id);
  }
}

async function dataLog(request: APIRequestProxy, id: number) {
  const data = await request.getDataById(id);
  console.log(data);
}

const request = new APIRequestProxy(new APIRequest());

dataLog(request, 1);
dataLog(request, 11);
