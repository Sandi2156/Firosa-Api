class ApiResposne {
  private success: boolean;
  private message: string;
  private data: object | null;

  constructor(success: boolean, message: string, data: object | null = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  public toDict() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}

export default ApiResposne;
