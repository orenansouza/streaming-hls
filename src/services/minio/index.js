const Minio = require('minio');

class MinioService {
  #DEFAULT_EXPIRES
  #endpoint
  #accessKey
  #secretKey
  #port
  #useSSL

  constructor() {
    this.#DEFAULT_EXPIRES = 7 * 24 * 60 * 60
    this.#endpoint = process.env.MINIO_ENDPOINT;
    this.#accessKey = process.env.MINIO_ACCESS_KEY;
    this.#secretKey = process.env.MINIO_SECRET_KEY;
    this.#port = Number(process.env.MINIO_PORT);
    this.#useSSL = false;

    try {
      this.client = new Minio.Client({
        endPoint: this.#endpoint,
        port: this.#port,
        accessKey: this.#accessKey,
        secretKey: this.#secretKey,
        useSSL: this.#useSSL
      });
    } catch (error) {
      console.log(error)
    }
  }

  async listBuckets() {
    try {
      const buckets = await this.client.listBuckets();
      return buckets.map(bucket => bucket.name);
    } catch (err) {
      console.error("Error:", err);
      return { content: [], success: false };
    }
  }

  async createBucket(bucketName) {
    try {
      await this.client.makeBucket(bucketName);
      return { success: true };
    } catch (err) {
      console.error("Error:", err);
      return { success: false };
    }
  }

  async uploadFile(bucketName, filePath, objectName = null) {
    try {
      if (!objectName) {
        objectName = filePath.split('/').pop();
      }
      await this.client.fPutObject(bucketName, objectName, filePath);
      return { success: true };
    } catch (err) {
      console.error("Error:", err);
      return { success: false };
    }
  }

  async downloadFile(bucketName, objectName, filePath) {
    try {
      await this.client.fGetObject(bucketName, objectName, filePath);
      return { success: true };
    } catch (err) {
      console.error("Error:", err);
      return { success: false };
    }
  }

  async removeObject(bucketName, objectName) {
    try {
      await this.client.removeObject(bucketName, objectName);
      return { success: true };
    } catch (err) {
      console.error("Error:", err);
      return { success: false };
    }
  }

  async removeBucket(bucketName) {
    try {
      await this.client.removeBucket(bucketName);
      return { success: true };
    } catch (err) {
      console.error("Error:", err);
      return { success: false };
    }
  }

  async presignedGetObject(bucketName, objectName, expiresInSeconds = this.#DEFAULT_EXPIRES) {
    try {
      return this.client.presignedGetObject(bucketName, objectName, expiresInSeconds);
    } catch (err) {
      console.error(err)
      return { success: false };
    }
  }
}

module.exports = MinioService